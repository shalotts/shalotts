import { afterAll, beforeAll } from '@jest/globals';
import Fastify from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import PluginModule from '~/app/module/plugin/plugin.module.ts';

export const build = () => {
  const app = Fastify();
  const plugins = new PluginModule(app as any);

  beforeAll(async () => {
    plugins.__scoped().then(({ scopedModule }) => {
      app.register(fastifyPlugin(scopedModule));
    });
  });

  afterAll(() => app.close());

  return app;
}