import consola from 'consola';
import { colors } from 'consola/utils';
import { fastifyPlugin } from 'fastify-plugin';
import { checkPort } from 'get-port-please';
import viteDevServer from 'vavite/vite-dev-server';
import { ENV_VAR } from '~/app/const.ts';
import appDefineModules from '~/app/module/app/app.define-modules.ts';
import AppModel from '~/app/module/app/app.model.ts';
import CliModule from '~/app/module/cli/cli.module.ts';
import CliService from '~/app/module/cli/cli.service.ts';
import config from '~/sha.config.ts';

export default class AppModule extends AppModel {
  async create() {
    const cliService = new CliService();
    const cli = new CliModule(cliService);

    const { scopedModule } = appDefineModules();
    this.app.register(fastifyPlugin(scopedModule));

    try {
      const {
        port,
        host,
      } = config.listen;

      const checked = await checkPort(port || 3000, host || 'localhost');
      await cli.start();

      this.app.log.info(`Shalotts mode: ${ ENV_VAR.MODE }`);

      if (checked && !viteDevServer) {
        await this.app.listen(config.listen);
      }

    } catch (error: any) {
      this.app.log.error(error);
      consola.error(colors.red(`${ error.message }`));
      process.exit(1);
    }
  }
}