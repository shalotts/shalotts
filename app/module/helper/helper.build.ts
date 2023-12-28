import Fastify      from 'fastify';
import PluginModule from '~/app/module/plugin/plugin.module.ts';

export const build = async () => {
  const app = Fastify();
  const plugins = new PluginModule(app as any);
  const { scopedModule } = await plugins.__scoped();

  return {
    app,
    scopedModule,
  };
}