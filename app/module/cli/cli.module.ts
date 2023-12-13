import pc from 'picocolors';
import shumai from 'shumai';
import buildPackages from '~/app/module/build/build.packages';
import cliCommand from '~/app/module/cli/cli.command';
import { ShumaiValues } from '~/app/module/cli/cli.type';
import Package from '~/package.json';

export default class CliModule {
  values: ShumaiValues;

  constructor() {
    const client = new shumai.Shumai(cliCommand);
    client.parse();
    this.values = client.values;

    this.exec().catch((error: Error) => console.info(pc.red(error.message)));
  }

  async exec() {
    if (this.values.help) {
      const short = (string_: string | undefined) => (string_ ? `(-${string_})` : '');
      const info = cliCommand
        // @ts-ignore sonarjs/no-nested-template-literals
        .map((index) => `--${index.name} ${short(index.short)} [NAME]`);
      const title = pc.cyan(`\n#Shalotts CLI -- v${Package.version}`);
      const infoJSON = pc.yellow(JSON.stringify(info, undefined, 4));

      console.info(`${title} \n \n${infoJSON}`);
    } else if (this.values['build:package']) {
      await buildPackages();
    }
  }
}
