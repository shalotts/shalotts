import FastifyStatic from '@fastify/static';
import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { join } from 'node:path';
import { ROOT_DIR } from '~/app/const.ts';

/**
 * @description Serve static files from public. Best practice use NGINX or Apache.
 */
const plugin = fastifyPlugin((app: FastifyInstance, options: any, done: () => void) => {
  const root = join(ROOT_DIR, 'dist/client');
  app.log.info(`nodejs serve static: "${ root }"`);
  app.register(FastifyStatic, {
    root,
    index: false,
    list: true,
    serveDotFiles: false,
    wildcard: false,
  });

  done();
}, {
  name: '@shalotts/static',
});

export default plugin;