import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import isbot from 'isbot';
import viteDevServer from 'vavite/vite-dev-server';
import { renderPage } from 'vike/server';

export const vikeMiddleware = async (request: FastifyRequest, response: FastifyReply) => {
  const pageContextInit = {
    urlOriginal: request.url,
    userAgent: request.headers['user-agent'],
    isBot: isbot(request.headers['user-agent']),
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
      headers,
      earlyHints,
    } = httpResponse;

    for (const [key, value] of headers) {
      response.header(key, value);
    }

    const recordEarlyHints = earlyHints.map((i) => {
      return {
        name: 'Link',
        value: i.earlyHintLink,
      };
    });

    await response.writeEarlyHints(recordEarlyHints);

    response.code(statusCode).send(body);

  } catch (e) {
    // biome-ignore lint/suspicious/noShadowRestrictedNames: need type for error
    const Error = e as Error;
    viteDevServer?.ssrFixStacktrace(Error);
    response.log.error(Error.stack);
    response.status(500);
    return Error.stack;
  }
};

const plugin = fastifyPlugin((app: FastifyInstance, options: any, done: () => void) => {
  app.get('*', vikeMiddleware);
  done();
}, {
  fastify: '4.x',
  name: '@shalotts/vike',
});

export default plugin;