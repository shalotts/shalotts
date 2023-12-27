import { $shalotts }      from '~/app/const.ts';
import AppModel           from '~/app/module/app/app.model.ts';
import config, { logger } from '~/sha.config.ts';

export default class PluginModule extends AppModel {
  async __init() {
    if (config.shalottsOptions?.plugins) {
      const plugins = $shalotts.state.isProduction
        ? [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.production]
        : [...config.shalottsOptions.plugins.base, ...config.shalottsOptions.plugins.development];

      for (const plugin of plugins) {
        const [instance, options] = plugin;
        this.app.register(instance, options);
      }
    } else {
      logger.error('No plugins in configuration, something wrong');
    }
  }
}