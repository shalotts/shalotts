import { plugins } from 'app/plugins';
import Elysia from 'elysia';
import pretty from 'pino-pretty';
import { pino } from '@bogeychan/elysia-logger';
import config from 'shalotts.config';
import { $shalotts } from '~/app/const';
import { relativeURL } from '~/app/module/helper/helper.url';
import BASE_HTML_TEMPLATE from '~/app/module/template/template.base';

export const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  hideObject: true,
  ignore: 'req,res,responseTime',
  messageFormat: log => {
    const request = log.request as any;
    // eslint-disable-next-line sonarjs/no-nested-template-literals
    if (log.request)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return `[${ request.method }] - ${ relativeURL(request.url) }  - ${ (log as any).responseTime }ms`;
    return `${ (log as any).msg }`;
  },
  customPrettifiers: {
    time: timestamp => `🕰 ${ typeof timestamp === 'string' ? timestamp : 'no-time' }`,
  },
});

export const log = pino(stream);

export const App = new Elysia();

const pluginList = plugins(log, stream);
const moddedPlugins = $shalotts.state.isProduction
  ? [...pluginList.base, ...pluginList.production]
  : [...pluginList.base, ...pluginList.development];

for (const plugin of moddedPlugins) {
  App.use(plugin);
}

App.listen({
  hostname: config.server.host,
  port: config.server.port,
});

// export type TApp = typeof App
