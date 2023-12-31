import { FastifyPluginAsync } from 'fastify';
import { PluginsOptions } from '~/app/module/plugin/plugin.type.ts';

export const scopedModule: FastifyPluginAsync<PluginsOptions> = async (_app, opts): Promise<void> => {
  const modules = [
    await import('~/app/module/plugin/plugin.module.ts'),
    await import('~/app/module/hook/hook.module.ts'),
  ];

  for (const module of modules) {
    const initiated = new module.default(_app as any);
    const { scopedModule } = await initiated.__scoped();
    _app.register(scopedModule);
  }
}