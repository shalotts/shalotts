import { FastifyInstance } from 'fastify';

export default function Etag(app: FastifyInstance, options: any, next: () => void) {
  options.name = '@shalotts/etag';
  app.get('*', (request, response) => {
    response.etag();
  });
}