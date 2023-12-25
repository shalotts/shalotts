import consola       from 'consola';
import { colors }    from 'consola/utils';
import { checkPort } from 'get-port-please';
import AppModel      from '~/app/module/app/app.model.ts';
import CliModule     from '~/app/module/cli/cli.module.ts';
import CliService    from '~/app/module/cli/cli.service.ts';
import config        from '~/sha.config.ts';

export default class AppModule extends AppModel {
  async defineModules() {
    const modules = [
      await import('~/app/module/plugin/plugin.module.ts'),
      await import('~/app/module/hook/hook.module.ts'),
    ];


    for (const module of modules) {
      const initiated = new module.default(this.app);
      initiated.__init();
    }
  }

  async create() {
    const cliService = new CliService();
    const cli = new CliModule(cliService);

    await this.defineModules();

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
      this._app.log.error(error);
      consola.error(colors.red(`${ error.message }`));
      process.exit(1);
    }
  }
}