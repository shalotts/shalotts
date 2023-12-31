import consola from 'consola';
import { colors } from 'consola/utils';
import { fastifyPlugin } from 'fastify-plugin';
import { ENV_VAR } from '~/app/const.ts';
import AppModel from '~/app/module/app/app.model.ts';
import { scopedModule } from '~/app/module/app/app.scoped-module.ts';
import CliModule from '~/app/module/cli/cli.module.ts';
import CliService from '~/app/module/cli/cli.service.ts';

export default class AppModule extends AppModel {
  async create() {
    const cliService = new CliService();
    const cli = new CliModule(cliService);
    this.app.register(fastifyPlugin(scopedModule));

    try {
      await cli.start();

      this.app.log.info(`Shalotts mode: ${ ENV_VAR.MODE }`);
    } catch (error: any) {
      this.app.log.error(error);
      consola.error(colors.red(`${ error.message }`));
      process.exit(1);
    }
  }
}
