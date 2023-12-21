import closeWithGrace                  from 'close-with-grace';
import consola                         from 'consola';
import { colors }                      from 'consola/utils';
import { checkPort }                   from 'get-port-please';
import { $shalotts, ENV_VAR }          from '~/app/const.ts';
import CliModule                       from '~/app/module/cli/cli.module.ts';
import CliService                      from '~/app/module/cli/cli.service.ts';
import { onRequestLog, onResponseLog } from '~/app/module/hook/hook.log.ts';
import HttpModule                      from '~/app/module/http/http.module.ts';
import { plugin }                      from '~/app/module/plugin/plugin.ts';
import config, { logger }              from '~/sha.config.ts';

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

const closeListeners = closeWithGrace({ delay: ENV_VAR.CLOSE_GRACE_DELAY }, async function({
                                                                                             signal,
                                                                                             err,
                                                                                             manual,
                                                                                           }) {
  if (err) {
    app.log.error(err);
  }
  await app.close();
});

app.addHook('onRequest', onRequestLog); // TODO: separate hooks
app.addHook('onResponse', onResponseLog);
app.addHook('onClose', (instance, done) => {
  closeListeners.uninstall();
  done();
});

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


process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception encountered');

  app.close(() => {
    process.exit(1);
  });

  setTimeout(() => {
    process.abort();
  }, 1000).unref();

  process.exit(1);
});

export type TApp = typeof app;