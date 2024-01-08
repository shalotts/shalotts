import { FastifyPluginAsync } from 'fastify';
import { $shalotts } from '~/app/const.ts';
import AppModel from '~/app/module/app/app.model.ts';
import { IAppConfig } from '~/app/module/config/config.type.ts';
import { PluginsOptions } from '~/app/module/plugin/plugin.type.ts';

export const plugins = (config: IAppConfig) => {
  if (!config.shalottsOptions?.plugins) {
    throw new Error('Plugins is undefined');
  }

  const {
    isDevelopment,
    isTest,
    isProduction,
  } = $shalotts.state;

  if (isDevelopment) {
    return [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.development];
  } else if (isTest) {
    return [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.test];
  } else if (isProduction) {
    return [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.production];
  }

  throw new Error(`Current stage "${ process.env.NODE_ENV }" is not supported`);
};

export default class PluginModule extends AppModel {
  async __scoped(config: IAppConfig) {
    if (this.config.shalottsOptions?.plugins) {
      const scopedModule: FastifyPluginAsync<PluginsOptions> = async (_app, opts): Promise<void> => {
        for (const plugin of plugins(config)) {
          const [instance, options] = plugin;
          _app.register((instance as any), options);
        }
      }
      return { scopedModule };
    }

    throw new Error('No plugins in configuration, something wrong');
  }
}