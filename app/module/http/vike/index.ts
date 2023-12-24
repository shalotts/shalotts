import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { renderPage }                                    from 'vike/server';

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
};
export default function(app: FastifyInstance, options: { name: string }, next: () => void) {
  options.name = '@shalotts/vike';

  app.get('*', vikeMiddleware);

  next();
}