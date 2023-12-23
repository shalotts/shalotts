import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { renderPage }                                    from 'vike/server';
import { ROOT_DIR }                                      from '~/app/const.ts';
import { logger }                                        from '~/sha.config.ts';


export const viteMiddleware = async () => {
  const vite = await import('vite');
  const server = await vite.createServer({
    root: ROOT_DIR,
    server: { middlewareMode: true },
  });

  server.ssrFixStacktrace(err => logger.error(err.message));

  return server.middlewares;
}

export const vikeMiddleware = async (request: FastifyRequest, response: FastifyReply) => {
  const pageContextInit = {
    urlOriginal: request.url,
    userAgent: request.headers['user-agent'],
  };

  try {
    const pageContext = await renderPage(pageContextInit);
    const {
      httpResponse,
      errorWhileRendering,
    } = pageContext;

    if (errorWhileRendering) {
      request.log.error(errorWhileRendering);
    }

    if (!httpResponse) return;

    const {
      statusCode,
      body,
      contentType,
    } = httpResponse;
    response.code(statusCode).type(contentType).send(body);

  } catch (e) {
    const Error = e as Error;
    response.log.error(Error.stack);
    response.status(500);
    return Error.stack;
  }
}
export default function(app: FastifyInstance, options: { name: string }, next: () => void) {
  options.name = '@shalotts/vike';

  // if (!$shalotts.state.isProduction) {
  //   app.use(viteMiddleware);
  // }

  app.get('*', vikeMiddleware);

  next();
}