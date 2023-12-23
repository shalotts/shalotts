import { FastifyInstance } from 'fastify';
import { renderPage }      from 'vike/server';

export default function(app: FastifyInstance, options: { name: string }, next: () => void) {
  options.name = '@shalotts/vike';


  app.addHook('preHandler', async () => {
    const vite = await import('vite');
    const server = await vite.createServer();
    const middleware = server.middlewares;

    app.use(middleware);
  });
  app.get('*', async function handler(request, response) {
    const pageContextInit = {
      urlOriginal: request.url,
      userAgent: request.headers['user-agent'],
    };

    try {
      const pageContext = await renderPage(pageContextInit);
      console.log(pageContext);
      const {
        httpResponse,
        errorWhileRendering,
      } = pageContext;

      if (errorWhileRendering) {
        request.log.error(errorWhileRendering);
      }

      if (httpResponse) {
        const { headers } = httpResponse;

        for (const [name, value] of headers) {
          response.headers(name, value);
        }

        return httpResponse.getBody();
      }
    } catch (e) {
      const Error = e as Error;
      response.log.error(Error.stack);
      response.status(500);
      return Error.stack;
    }
  });

  next();
}