import FastifyStatic       from '@fastify/static';
import { FastifyInstance } from 'fastify';
import { fastifyPlugin }   from 'fastify-plugin';
import { join }            from 'node:path';
import { ROOT_DIR }        from '~/app/const.ts';

/**
 * @description Serve static files from public. Best practice use NGINX or Apache.
 */
const plugin = fastifyPlugin(function(app: FastifyInstance, options: any, done: () => void) {
  app.log.info('nodejs serve static');
  app.register(FastifyStatic, {
    root: join(ROOT_DIR, 'asset/public'),
  });

  done();
}, {
  name: '@shalotts/static',
});

export default plugin;