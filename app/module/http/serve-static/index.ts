import FastifyStatic       from '@fastify/static';
import { FastifyInstance } from 'fastify';
import { ROOT_DIR }        from '~/app/const.ts';

/**
 * @description Serve static files from public. Best practice use NGINX or Apache.
 * @param app
 * @param options
 * @param next
 */
export default async function(app: FastifyInstance, options: { name: string }, next: () => void) {
  options.name = '@shalotts/static';

  await app.register(FastifyStatic, {
    root: `${ ROOT_DIR }/asset/public`,
  });
}