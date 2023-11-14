import { etag } from '@bogeychan/elysia-etag';
import { staticPlugin } from '@elysiajs/static';
import { fileLogger, logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { rateLimit } from 'elysia-rate-limit';
import { Transform } from 'node:stream';
import { STATIC_DIR_CLIENT } from '~/app/const';
import { pluginBaseRequest } from '~/app/module/plugin/plugin.base-request';
import { pluginStatic } from '~/app/module/plugin/plugin.static';
import { pluginTrace } from '~/app/module/plugin/plugin.trace';
import pretty from 'pino-pretty';
import type { Logger } from 'pino';

// @ts-ignore
export const plugins = (log: Logger<pretty.PrettyStream>, stream: Transform<any>) => {
  return {
    base: [
      pluginBaseRequest(log),
      pluginStatic({ assets: STATIC_DIR_CLIENT }),
      fileLogger({ file: `${import.meta.dir}/log/app.log` }),
      logger({ stream }),
      helmet({
        xFrameOptions: { action: 'deny' },
      }),
      // rateLimit(),
      cors(),
      etag(),
    ],
    development: [pluginTrace(log)],
    production: [],
  };
};
