import { Connection } from 'cloudflared';
import consola from 'consola';
import { colors } from 'consola/utils';
import { ChildProcess } from 'node:child_process';
import { renderUnicodeCompact } from 'uqr';
import { cloudflaredAddress, serverStartMessage } from '~/app/module/cli/cli.const.tsx';
import CliService from '~/app/module/cli/cli.service.ts';
import ConfigModule from '~/app/module/config/config.module.ts';
import { IAppConfig } from '~/app/module/config/config.type.ts';

export default class CliModule extends ConfigModule {
  tunnel: {
    url: Promise<string>;
    connections: Promise<Connection>[];
    child: ChildProcess;
    stop: ChildProcess['kill']
  } | null = null;
  _introMessage = '';
  service: CliService;

  constructor(config: IAppConfig) {
    super(config);
    this.service = new CliService();
  }

  set introMessage(text: string) {
    this._introMessage = text;
  }

  get introMessage() {
    return this._introMessage;
  }

  async start() {
    this.introMessage = serverStartMessage(this.config);

    if (this.config.shalottsOptions?.tunnel) {
      await this.service.install();
      const hasTunnelName = !!this.config.shalottsOptions?.tunnelHost;
      this.tunnel = await this.service.open(this.config.shalottsOptions?.tunnel);
      const link = hasTunnelName ? `https://${ this.config.shalottsOptions?.tunnelHost }` : await this.tunnel.url;
      this.introMessage += cloudflaredAddress(colors.yellow(link));

      if (this.config.shalottsOptions?.secured?.qr) {
        this.introMessage += `\n\n${ renderUnicodeCompact(link, {
          ecc: 'L',
          border: 1,
        }) }`;
      }
    }

    consola.box(this.introMessage);
  }
}