import { etag } from '@bogeychan/elysia-etag';
import { compression } from 'elysia-compression'
import { fileLogger, logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { Transform } from 'node:stream';
import { STATIC_DIR_CLIENT } from '~/app/const';
import { pluginBaseRequest } from '~/app/module/plugin/plugin.base-request';
import { pluginStatic } from '~/app/module/plugin/plugin.static';
import { pluginTrace } from '~/app/module/plugin/plugin.trace';
import pretty from 'pino-pretty';
import type { Logger } from 'pino';
import { elysiaConnect } from 'elysia-connect';
// import { rateLimit } from 'elysia-rate-limit';
// import pluginVike from '~/app/module/plugin/plugin.vike';
import { viteDevelopmentMiddleware } from '~/app/module/plugin/plugin.vite-middleware';

// @ts-ignore
export const plugins = (log: Logger<pretty.PrettyStream>, stream: Transform<any>) => {
  return {
    base: [
      fileLogger({ file: `${import.meta.dir}/log/app.log` }),
      logger({ stream }),
      compression(),
      helmet({
        xFrameOptions: { action: 'deny' },
      }),
      // rateLimit(),
      cors(),
      etag(),
      pluginBaseRequest(log),
      // pluginVike(),
    ],
    development: [
      elysiaConnect(viteDevelopmentMiddleware),
      pluginTrace(log)
    ],
    production: [pluginStatic({ assets: STATIC_DIR_CLIENT })],
  };
};
