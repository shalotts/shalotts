import type { Context } from 'elysia';
import { Elysia } from 'elysia';
import type { NextFunction, Request, Response } from 'express';
import pc from 'picocolors';
import viteDevServer from 'vavite/vite-dev-server';
import { renderPage } from 'vike/server';
import { log } from '~/app/http';
import { relativeURL } from '~/app/module/helper/helper.url';
import { ConnectedContext } from '~/app/module/plugin/plugin.type';

/**
 * @description Bun version SSR middleware
 * @param { Context } root0 -
 * @param { Context.Request } root0.request -
 * @param { Context.set } root0.set -
 * @returns { Promise<string> } SSR string response
 */
export const vikeMiddeleware = async ({ request, set }: Context) => {
  const t0 = performance.now();
  const pageContextInit = {
    urlOriginal: request.url,
    userAgent: request.headers.get('user-agent'),
  };

  try {
    const pageContext = await renderPage(pageContextInit);
    const t1 = performance.now();
    const { httpResponse, errorWhileRendering } = pageContext;

    if (errorWhileRendering) {
      log.error(errorWhileRendering);
    } else {
      const time = pc.magenta(`${t1 - t0}ms`);
      log.info(`[${pc.yellow(request.method)}] - ${relativeURL(request.url)} - render: ${time}`);
    }

    if (httpResponse) {
      const { headers } = httpResponse;

      for (const [name, value] of headers) {
        set.headers[name] = value;
      }

      return httpResponse.getBody();
    }
  } catch (error) {
    const Error = error as Error;
    viteDevServer?.ssrFixStacktrace(Error);
    log.error(Error.stack);
    set.status = 500;
    return Error.stack;
  }
};

/**
 * @deprecated Express like Middleware for SSR
 * @param { Request } request -
 * @param { Response } response -
 * @param { NextFunction } next -
 */
export const vikeConnectMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { req } = request as unknown as { req: Request }; // its may be elysia or other request
    const expectedRequest = req || request;
    const pageContextInit = {
      urlOriginal: expectedRequest.url,
      userAgent: expectedRequest.headers['user-agent'],
    };

    const pageContext = await renderPage(pageContextInit);
    const { httpResponse, errorWhileRendering } = pageContext;

    if (errorWhileRendering) {
      log.error(errorWhileRendering);
    }

    if (httpResponse) {
      const { headers, earlyHints } = httpResponse;

      for (const [name, value] of headers) {
        response.setHeader(name, value);
      }

      if (response.writeEarlyHints) {
        response.writeEarlyHints({
          // eslint-disable-next-line unicorn/prevent-abbreviations
          link: earlyHints.map((e) => e.earlyHintLink),
        });
      }

      httpResponse.pipe(response);
    } else {
      next();
    }
  } catch (error) {
    const Error = error as Error;
    viteDevServer?.ssrFixStacktrace(Error);
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
  const app = new Elysia({ name: '@shalotts/vike' });
  app.get('*', async (context) => {
    const vite = await import('vite');
    const server = await vite.createServer();
    const middleware = server.middlewares;
    const response = await (context as ConnectedContext).elysiaConnect(middleware, context);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (response) return response;
  });
  app.get('*', vikeMiddeleware);

  return app;
}
