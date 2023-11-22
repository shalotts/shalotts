import { Elysia } from 'elysia';
import { renderPage } from 'vike/server';
import { fixRoute, isStaticFilePath, relativeURL } from '~/app/module/helper/helper.url';
import { ConnectedContext } from '~/app/module/plugin/plugin.type';
import {
  viteDevelopment,
  viteDevelopmentMiddleware,
} from '~/app/module/plugin/plugin.vite-middleware';
import { log } from '~/app/http';
import pc from 'picocolors';
// @ts-ignore
import { elysiaConnect } from 'elysia-connect';

/**
 * @description Vike middleware for Elysia
 *  @returns { Elysia } plugin
 */
export default function pluginVike(): Elysia {
  const app = new Elysia();

  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    elysiaConnect(viteDevelopmentMiddleware, {
      name: 'vite-middleware',
    }),
  );

  return app
    .onStop(async () => {
      log.info(`Vite stopped`);
      return await viteDevelopment.close();
    })
    .get('*', async context => {
      if (!isStaticFilePath(context.request.url)) {
        const { set, request } = context;
        const urlOriginal = fixRoute(request.url) || '';

        log.info(`${pc.green('[vike]')} pageContextInit ${relativeURL(urlOriginal)}`);
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
      }
    });
}
