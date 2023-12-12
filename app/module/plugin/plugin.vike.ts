import { Elysia } from "elysia";
import type { Request, Response, NextFunction } from "express";
import { renderPage } from "vike/server";
import { $shalotts, ROOT_DIR } from "~/app/const";
import { ConnectedContext } from "~/app/module/plugin/plugin.type";
import { log } from "~/app/http";
import viteDevServer from "vavite/vite-dev-server";

export const vikeConnectMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const pageContextInit = {
      urlOriginal: request.url,
      userAgent: request.headers["user-agent"],
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse, errorWhileRendering } = pageContext;

    if (errorWhileRendering) {
      log.error(errorWhileRendering);
    }

    if (httpResponse) {
      const { statusCode, headers, earlyHints } = httpResponse;

      for (const [name, value] of headers) {
        response.setHeader(name, value);
      }

      if (response.writeEarlyHints) {
        response.writeEarlyHints({
          // eslint-disable-next-line unicorn/prevent-abbreviations
          link: earlyHints.map((e) => e.earlyHintLink),
        });
      }

      response.statusCode = statusCode;
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
  const app = new Elysia();

  if (!$shalotts.state.isProduction) {
    app.get("*", async (context) => {
      console.log("ss");
      const vite = await import("vite");
      const viteServer = await vite.createServer({
        root: ROOT_DIR,
        server: { middlewareMode: true },
      });
      const viteDevelopmentMiddleware = viteServer.middlewares;
      const response = await (context as ConnectedContext).elysiaConnect(
        viteDevelopmentMiddleware,
        context,
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (response) return response;
    });
  }
  app.get("*", async (context) => {
    await Bun.sleep(300);
    const response = await (context as ConnectedContext).elysiaConnect(
      vikeConnectMiddleware,
      context,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (response) return response;
  });

  return app;
}
