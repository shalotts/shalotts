import { Elysia } from 'elysia';
import { renderPage } from 'vike/server';

/**
 * @description Vike middleware for Elysia
 *  @returns { Elysia } plugin
 */
export default function pluginVike(): Elysia {
  const plugin = new Elysia();

  plugin.group('/', app => {
    return app.get('*', async ({ set, request }) => {
      const urlOriginal = request.url;
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
  });

  return plugin;
}
