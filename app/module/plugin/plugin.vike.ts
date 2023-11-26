import { Elysia } from 'elysia';
import type { Request, Response, NextFunction } from 'express';
import { renderPage } from 'vike/server';
import { ConnectedContext } from '~/app/module/plugin/plugin.type';
import { viteDevelopment } from '~/app/module/plugin/plugin.vite-middleware';
import { log } from '~/app/http';

export const vikeConnectMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const pageContextInit = { urlOriginal: request.url };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse, errorWhileRendering } = pageContext;

    if (errorWhileRendering) {
      log.error(errorWhileRendering);
    }

    if (httpResponse) {
      const { body, statusCode, headers, earlyHints } = httpResponse;

      for (const [name, value] of headers) {
        response.setHeader(name, value);
      }

      if (response.writeEarlyHints) {
        response.writeEarlyHints({
          // eslint-disable-next-line unicorn/prevent-abbreviations
          link: earlyHints.map(e => e.earlyHintLink),
        });
      }

      response.statusCode = statusCode;
      response.end(body);
    } else {
      next();
    }
  } catch (error) {
    const Error = error as Error;
    viteDevelopment.ssrFixStacktrace(Error);
    log.error(Error.stack);
    response.statusCode = 500;
    response.end(Error.stack);
  }
};

/**
 * @description Vike middleware for Elysia
 *  @returns { Elysia } plugin
 */
export default function pluginVike(): Elysia {
  const app = new Elysia();

  app.get('*', async context => {
    const response = await (context as ConnectedContext).elysiaConnect(
      vikeConnectMiddleware,
      context,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (response) return response;
  });

  return app.onStop(async () => {
    log.info(`Vite stopped`);
    return await viteDevelopment.close();
  });
}
