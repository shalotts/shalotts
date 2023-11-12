import { plugins } from 'app/plugins';
import Elysia from 'elysia';
import pretty from 'pino-pretty';
import { pino } from '@bogeychan/elysia-logger';
import config from 'shalotts.config';

export const stream = pretty({
  colorize: true,
  translateTime: 'SYS:standard',
  hideObject: true,
  ignore: 'req,res,responseTime',
  messageFormat: log => {
    const request = log.request as any;
    if (log.request) return `[${request.method}] - ${request.url} - ${(log as any).responseTime}ms`;
    return `${(log as any).msg}`;
  },
  customPrettifiers: {
    time: timestamp => `🕰 ${typeof timestamp === 'string' ? timestamp : 'no-time'}`,
    level: logLevel => `LEVEL: ${typeof logLevel === 'string' ? logLevel : 'no-time'}`,
  },
});

export const log = pino(stream);

export const App = new Elysia();

for (const plugin of plugins(stream).production) {
  App.use(plugin);
}

App.get('/', () => {
  return 'pino-pretty';
}).listen({
  hostname: config.server.host,
  port: config.server.port,
});

// export type TApp = typeof App
