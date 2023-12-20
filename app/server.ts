import consola       from 'consola';
import { colors }    from 'consola/utils';
import { checkPort } from 'get-port-please';
import { $shalotts } from '~/app/const.ts';
import CliModule     from '~/app/module/cli/cli.module.ts';
import CliService    from '~/app/module/cli/cli.service.ts';
import HttpModule    from '~/app/module/http/http.module.ts';
import { plugin }    from '~/app/module/plugin/plugin.ts';
import config        from '~/sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const app = await http.createServer();

const cliService = new CliService();
const cli = new CliModule(cliService);

const plugins = $shalotts.state.isProduction
  ? [...plugin.base, ...plugin.production]
  : [...plugin.base, ...plugin.development];

for (const plugin of plugins) {
  const [instance, options] = plugin;
  app.register(instance, options);
}

try {
  const {
    port,
    host,
  } = config.listen;
  const checked = await checkPort(port || 8000, host);

  if (checked) {
    await app.listen(config.listen);
    await cli.start();
  } else {
    consola.warn(`Port ${ port } is busy. Dont spam process, kill app or change port`);
  }
} catch (error: any) {
  app.log.error(error);
  consola.error(colors.red(`${ error.message }`));
  process.exit(1);
}