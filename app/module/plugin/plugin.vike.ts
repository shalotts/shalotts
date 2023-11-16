import { Elysia } from 'elysia';
import { renderPage } from 'vike/server';
import { relativeURL } from '~/app/module/helper/helper.url';
import {
  viteDevelopment,
  viteDevelopmentMiddleware,
} from '~/app/module/plugin/plugin.vite-middleware';
import { log } from '~/app/http';

/**
 * @description Vike middleware for Elysia
 *  @returns { Elysia } plugin
 */
export default function pluginVike(): Elysia {
  return new Elysia()
    .onStop(async () => {
      log.info(`Vite stopped`);
      return await viteDevelopment.close();
    })
    .onBeforeHandle(async context => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const handled = await (context as any).elysiaConnect(viteDevelopmentMiddleware, context);
      log.info(
        `[vite] ${handled ? '✓' : '✝'} [${JSON.stringify(context)}] ${relativeURL(
          context.request.url,
        )}`,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (handled) return handled;
    })
    .get('*', async ({ set, request }) => {
      const urlOriginal = relativeURL(request.url);
      console.log(urlOriginal);
      if (!urlOriginal) return 'not found';

      const pageContext = await renderPage({ urlOriginal });
      const { httpResponse } = pageContext;

      if (httpResponse) {
        // TODO: implement earlyHints
        const { body, statusCode, headers } = httpResponse;

        for (const [name, value] of headers) {
          set.headers[name] = value;
        }

        set.status = statusCode;
        return body;
      }
    });
}
