import consola                                    from 'consola';
import { cloudflaredAddress, serverStartMessage } from '~/app/module/cli/cli.const.tsx';
import CliService                                 from '~/app/module/cli/cli.service.ts';
import config                                     from '~/sha.config.ts';

export default class CliModule {
  _introMessage: string = '';
  service: CliService;

  constructor(service: CliService) {
    this.service = service;
  }

  set introMessage(text: string) {
    this._introMessage = text;
  }

  get introMessage() {
    return this._introMessage;
  }

  async start() {
    this.introMessage = serverStartMessage;

    if (config.shalottsOptions?.secured?.tunnel) {
      const child = await this.service.install();

      const tunnel = await this.service.open();
      const url = await tunnel.url;
      console.log('ss', url);
      this.introMessage += cloudflaredAddress(url);
    }

    consola.box(this.introMessage);
  }
}