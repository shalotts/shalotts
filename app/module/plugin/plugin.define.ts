import { $shalotts } from '~/app/const.ts';
import { plugin }    from '~/app/module/plugin/plugin.ts';
import { TApp }      from '~/app/server.ts';

export default function(app: TApp) {
  const plugins = $shalotts.state.isProduction
    ? [...plugin.base, ...plugin.production]
    : [...plugin.base, ...plugin.development];

  for (const plugin of plugins) {
    const [instance, options] = plugin;
    app.register(instance, options);
  }
}