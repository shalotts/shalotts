import { pino } from '@bogeychan/elysia-logger';
import Elysia from 'elysia';
import pc from 'picocolors';
import pretty from 'pino-pretty';
import { $shalotts } from '~/app/const';
import { relativeURL } from '~/app/module/helper/helper.url';
import { plugins } from '~/app/plugins';
import config from '~/shalotts.config';

// @ts-ignore
export const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  hideObject: true,
  ignore: 'req,res,responseTime',
  messageFormat: (log) => {
    const { request } = log as any;
    const time = +(log as any).responseTime;
    let coloredTime = time.toString() + 'ms';

    if (time < 1) {
      coloredTime = pc.green(coloredTime);
    } else if (time > 1 && time < 2) {
      coloredTime = pc.yellow(coloredTime);
    } else {
      coloredTime = pc.red(coloredTime);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const message = `[${pc.yellow(request?.method)}] - ${relativeURL(
      request?.url || '',
    )}  - ${coloredTime}`;

    return request ? message : `${(log as any).msg}`;
  },
  customPrettifiers: {
    time: (timestamp) => `🕰 ${typeof timestamp === 'string' ? timestamp : 'no-time'}`,
    // @ts-ignore
    pid: (pid: number) => pc.dim(pid),
    hostname: () => '',
  },
});

export const log = pino(stream);

const app = new Elysia();

const pluginList = plugins(log, stream);
const moddedPlugins = $shalotts.state.isProduction
  ? [...pluginList.production, ...pluginList.base]
  : [...pluginList.development, ...pluginList.base];

for (const plugin of moddedPlugins) {
  app.use(plugin);
}

app.listen({
  hostname: config.server.host,
  port: config.server.port,
});

// export type TApp = typeof App
export default app;
