import { Elysia } from 'elysia';
import { renderPage } from 'vike/server';
import { relativeURL } from '~/app/module/helper/helper.url';

/**
 * @description Vike middleware for Elysia
 *  @returns { Elysia } plugin
 */
export default function pluginVike(): Elysia {
  const plugin = new Elysia();

  plugin.on('request', async ({ set, request }) => {
    const urlOriginal = relativeURL(<string>request.url);
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

  return plugin;
}
