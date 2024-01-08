import consola from 'consola';
import { colors } from 'consola/utils';
import { FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { ENV_VAR } from '~/app/const.ts';
import AppModel from '~/app/module/app/app.model.ts';
import CliModule from '~/app/module/cli/cli.module.ts';
import { PluginsOptions } from '~/app/module/plugin/plugin.type.ts';

export default class AppModule extends AppModel {
  async create() {
    const cli = new CliModule(this.config);
    const scopedModules: FastifyPluginAsync<PluginsOptions> = async (_app: any) => {
      const modules = [
        await import('~/app/module/plugin/plugin.module.ts'),
        await import('~/app/module/hook/hook.module.ts'),
      ];

      for (const module of modules) {
        const initiated = new module.default(_app, this.config);
        const { scopedModule } = await initiated.__scoped(this.config);
        _app.register(scopedModule);
      }
    };

    this.app.register(fastifyPlugin(scopedModules));

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
