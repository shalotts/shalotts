import { Connection } from 'cloudflared';
import consola from 'consola';
import { colors } from 'consola/utils';
import { ChildProcess } from 'node:child_process';
import { renderUnicodeCompact } from 'uqr';
import { cloudflaredAddress, serverStartMessage } from '~/app/module/cli/cli.const.tsx';
import CliService from '~/app/module/cli/cli.service.ts';
import config from '~/sha.config.ts';

export default class CliModule {
  tunnel: {
    url: Promise<string>;
    connections: Promise<Connection>[];
    child: ChildProcess;
    stop: ChildProcess['kill']
  } | null = null;
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

    if (config.shalottsOptions?.tunnel) {
      await this.service.install();
      const hasTunnelName = !!config.shalottsOptions?.tunnelHost;
      const tunnelName = hasTunnelName ? config.shalottsOptions?.tunnel.name : '';
      this.tunnel = await this.service.open(tunnelName as string);
      const link = hasTunnelName ? `https://${ config.shalottsOptions?.tunnelHost }` : await this.tunnel.url;
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