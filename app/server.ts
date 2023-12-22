import consola       from 'consola';
import { colors }    from 'consola/utils';
import { checkPort } from 'get-port-please';
import CliModule     from '~/app/module/cli/cli.module.ts';
import CliService    from '~/app/module/cli/cli.service.ts';
import hookDefine    from '~/app/module/hook/hook.define.ts';
import HttpModule    from '~/app/module/http/http.module.ts';
import pluginDefine  from '~/app/module/plugin/plugin.define.ts';
import config        from '~/sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const app = await http.createServer();

const cliService = new CliService();
const cli = new CliModule(cliService);

pluginDefine(app);
hookDefine(app);

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

export type TApp = typeof app;