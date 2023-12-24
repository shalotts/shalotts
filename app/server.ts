import consola                             from 'consola';
import { colors }                          from 'consola/utils';
import { checkPort }                       from 'get-port-please';
import { IncomingMessage, ServerResponse } from 'node:http';
import CliModule                           from '~/app/module/cli/cli.module.ts';
import CliService                          from '~/app/module/cli/cli.service.ts';
import hookDefine                          from '~/app/module/hook/hook.define.ts';
import HttpModule                          from '~/app/module/http/http.module.ts';
import pluginDefine                        from '~/app/module/plugin/plugin.define.ts';
import config                              from '~/sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const app = await http.createServer();

const cliService = new CliService();
const cli = new CliModule(cliService);

pluginDefine(app);
hookDefine(app);

let fastifyReadyPromise: PromiseLike<void> | undefined = app.ready();

try {
  const {
    port,
    host,
  } = config.listen;
  const checked = await checkPort(port, host);

  await cli.start();

  if (!checked) {
    consola.warn(`Port ${ port } is busy. Shalotts reopening...`);
  }
} catch (error: any) {
  app.log.error(error);
  consola.error(colors.red(`${ error.message }`));
  process.exit(1);
}

export type TApp = typeof app;
export default async function handler(request: IncomingMessage, reply: ServerResponse) {
  if (fastifyReadyPromise) {
    await fastifyReadyPromise;
    fastifyReadyPromise = undefined;
  }

  app.server.emit('request', request, reply);
}