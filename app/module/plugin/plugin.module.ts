import { FastifyPluginAsync } from 'fastify';
import { $shalotts } from '~/app/const.ts';
import AppModel from '~/app/module/app/app.model.ts';
import { PluginsOptions } from '~/app/module/plugin/plugin.type.ts';
import config from '~/sha.config.ts';

export const plugins = () => {
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
  } else {
    throw new Error(`Current stage "${ process.env.NODE_ENV }" is not supported`);
  }
};

export default class PluginModule extends AppModel {
  async __scoped() {
    if (config.shalottsOptions?.plugins) {
      const scopedModule: FastifyPluginAsync<PluginsOptions> = async (_app, opts): Promise<void> => {
        for (const plugin of plugins()) {
          const [instance, options] = plugin;
          _app.register((instance as any), options);
        }
      }
      return { scopedModule };
    } else {
      throw new Error('No plugins in configuration, something wrong');
    }
  }
}