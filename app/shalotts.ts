import { $shalotts, ENV_VAR } from '~/app/const.ts';
import AppModule from '~/app/module/app/app.module.ts';
import { defaultConfig, defineConfig, listen } from '~/app/module/config/config.ts';
import type { IAppConfig, ITunnelOptions, ShalottsOptions } from '~/app/module/config/config.type.ts';
import { defaultViteF3vConfig } from '~/app/module/config/config.vite.ts';
import HttpModule from '~/app/module/http/http.module.ts';
import onRenderClient from '~/renderer/+onRenderClient.ts';
import onRenderHtml from '~/renderer/+onRenderHtml.ts';
import type { PageContext } from '~/renderer/renderer.type.ts';

export {
  HttpModule,
  AppModule,
  defineConfig,
  defaultConfig,
  defaultViteF3vConfig,
  listen,
  $shalotts,
  ENV_VAR,
  onRenderClient,
  onRenderHtml,
};

export type { ITunnelOptions, ShalottsOptions, IAppConfig, PageContext };