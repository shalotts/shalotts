import consola       from 'consola';
import { $shalotts } from '~/app/const.ts';
import HttpModule    from '~/app/module/http/http.module.ts';
import { plugin }    from '~/app/module/plugin/plugin.ts';
import config        from '~/sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const app = await http.createServer();

const plugins = $shalotts.state.isProduction
  ? [...plugin.base, ...plugin.production]
  : [...plugin.base, ...plugin.development];

for (const plugin of plugins) {
  const [instance, options] = plugin;
  app.register(instance, options);
}

try {
  await app.listen(config.listen);
} catch (error: any) {
  app.log.error(error);
  consola.error(error.message);
  process.exit(1);
}