import consola                                    from 'consola';
import { colors }                                 from 'consola/utils';
import { renderUnicodeCompact }                   from 'uqr';
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
      await this.service.install();
      const hasTunnelName = typeof config.shalottsOptions?.secured?.tunnel === 'string';
      const tunnelName = hasTunnelName ? config.shalottsOptions?.secured?.tunnel : '';
      const tunnel = await this.service.open(tunnelName as string);
      const link = hasTunnelName ? `https://${ config.shalottsOptions?.secured?.tunnelHost }` : await tunnel.url;
      this.introMessage += cloudflaredAddress(colors.yellow(link));

      if (config.shalottsOptions?.secured?.qr) {
        this.introMessage += '\n\n' + renderUnicodeCompact(link, {
          ecc: 'L',
          border: 1,
        });
      }
    }

    consola.box(this.introMessage);
  }
}