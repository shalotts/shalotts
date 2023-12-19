import consola                from 'consola';
import { serverStartMessage } from '~/app/module/cli/cli.const.tsx';

export default class CliModule {
  constructor() {
  }

  start() {
    consola.start(serverStartMessage);
  }
}