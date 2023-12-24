import { FastifyInstance } from 'fastify';

export default function BaseRoutes(app: FastifyInstance, options: { name: string }, next: () => void) {
  options.name = '@shalotts/base-routes';

  app.get('/', async function handler() {
    return '👋🤗🎉💗 Hello ss';
  });

  next();
}