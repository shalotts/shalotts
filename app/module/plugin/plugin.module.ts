import { FastifyPluginAsync } from 'fastify';
import { $shalotts }          from '~/app/const.ts';
import AppModel               from '~/app/module/app/app.model.ts';
import { PluginsOptions }     from '~/app/module/plugin/plugin.type.ts';
import config                 from '~/sha.config.ts';

export default class PluginModule extends AppModel {
  async __scoped() {
    if (config.shalottsOptions?.plugins) {
      const plugins = $shalotts.state.isProduction
        ? [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.production]
        : [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.development];

      const scopedModule: FastifyPluginAsync<PluginsOptions> = async (_app, opts): Promise<void> => {
        for (const plugin of plugins) {
          const [instance, options] = plugin;
          _app.register(instance, options);
        }
      }

      return { scopedModule };
    } else {
      throw new Error('No plugins in configuration, something wrong');
    }
  }
}