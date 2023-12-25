import { $shalotts }    from '~/app/const.ts';
import AppModel         from '~/app/module/app/app.model.ts';
import { pluginConfig } from '~/app/module/plugin/plugin.config.ts';

export default class PluginModule extends AppModel {
  __init() {
    const plugins = $shalotts.state.isProduction
      ? [...pluginConfig.base, ...pluginConfig.production]
      : [...pluginConfig.base, ...pluginConfig.development];

    for (const plugin of plugins) {
      const [instance, options] = plugin;
      this.app.register(instance, options);
    }
  }
}