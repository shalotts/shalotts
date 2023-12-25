import { FastifyInstance } from 'fastify';

export default function(app: FastifyInstance, options: { name: string }, next: () => void) {
  app.get('/', async function handler(request, response) {
    request.log.info('Health Check Request');
    response.status(200).send();
  });

  app.get('/live', async function handler(request, response) {
    response.status(200).send();
  });
  app.get('/health/ready', async function handler(request, response) {
    let isReady = false;

    // anything you need to verify before confirming your application is ready
    // to start handling incoming requests.

    if (isReady) {
      response.status(200).send();
    } else {
      response.status(503).send();
    }
  });

  next();
}