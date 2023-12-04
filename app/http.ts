import { plugins } from '/app/plugins.ts';
import Elysia from 'elysia';
import pretty from 'pino-pretty';
import { pino } from '@bogeychan/elysia-logger';
import config from '/shalotts.config.ts';
import { $shalotts } from '/app/const.ts';
import { relativeURL } from '/app/module/helper/helper.url.ts';
import pc from 'picocolors';

// @ts-ignore
export const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  hideObject: true,
  ignore: 'req,res,responseTime',
  messageFormat: (log: any) => {
    const request = log.request as any;
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    if (log.request)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return `[${request.method}] - ${relativeURL(request.url)}  - ${(log as any).responseTime}ms`;
    return `${(log as any).msg}`;
  },
  customPrettifiers: {
    time: (timestamp: any) => `🕰 ${typeof timestamp === 'string' ? timestamp : 'no-time'}`,
    pid: (pid: number) => pc.dim(pid),
    hostname: () => '',
  },
});

export const log = pino(stream);

export const App = new Elysia();

const pluginList = plugins(log, stream);
const moddedPlugins = $shalotts.state.isProduction
  ? [...pluginList.production, ...pluginList.base]
  : [...pluginList.development, ...pluginList.base];

for (const plugin of moddedPlugins) {
  App.use(plugin);
}

App.listen({
  hostname: config.server.host,
  port: config.server.port,
});

// export type TApp = typeof App