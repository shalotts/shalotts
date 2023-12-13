// import { etag } from '@bogeychan/elysia-etag';
// import { compression } from 'elysia-compression';
import { fileLogger, logger } from '@bogeychan/elysia-logger';
// @ts-ignore
import { elysiaConnectDecorate } from 'elysia-connect';
// import { cors } from '@elysiajs/cors';
// import { helmet } from 'elysia-helmet';
import { Transform } from 'node:stream';
import type { Logger } from 'pino';
import pretty from 'pino-pretty';
import { STATIC_DIR_CLIENT } from '~/app/const';
// import { pluginBaseRequest } from '~/app/module/plugin/plugin.base-request';
import { pluginStatic } from '~/app/module/plugin/plugin.static';
import { pluginTrace } from '~/app/module/plugin/plugin.trace';
// @ts-ignore
// import { rateLimit } from 'elysia-rate-limit';
import pluginVike from '~/app/module/plugin/plugin.vike';

const vike = pluginVike();

// @ts-ignore
export const plugins = (log: Logger<pretty.PrettyStream>, stream: Transform<any>) => {
  return {
    base: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      elysiaConnectDecorate(),
      fileLogger({ file: `${import.meta.dir}/log/app.log` }),
      logger({ stream }),
      // compression(),
      // cors(),
      // etag(),
      // pluginBaseRequest(log),
      // rateLimit(),
    ],
    development: [pluginTrace(log), vike],
    production: [
      // helmet({
      //   xFrameOptions: { action: 'deny' },
      //   contentSecurityPolicy: false,
      // }),
      vike,
      pluginStatic({ assets: STATIC_DIR_CLIENT }),
    ],
  };
};
