import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions } from '@fastify/cors';
import fastifyEarlyHints from '@fastify/early-hints';
import fastifyEtag from '@fastify/etag';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import requiestId from 'fastify-x-request-id';
import { nanoid } from 'nanoid';
import { IAppConfig } from '~/app/module/config/config.type.ts';
import BaseRoutes from '~/app/module/http/base-routes';
import HealthCheck from '~/app/module/http/health-check';
import ServeStatic from '~/app/module/http/serve-static';
import Vike from '~/app/module/http/vike';
import LoggerModule from '~/app/module/logger/logger.module.ts';

export const defineConfig = (options: IAppConfig) => options;

export const listen = {
  host: process.env.HOST || '0.0.0.0',
  port: Number(process.env.PORT) || 3000,
};
export const defaultConfig = async () => {
  const loggerModule = new LoggerModule();
  const logger = await loggerModule.create();

  return {
    fastifyInstanceOptions: {
      genReqId: () => nanoid(),
      logger,
    },
    listen,
    shalottsOptions: {
      plugins: {
        base: [
          [cors, {} as FastifyCorsOptions],
          [requiestId, {}],
          [fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE } as FastifyCachingPluginOptions],
          [fastifyEtag, {}],
          [fastifyHelmet, { contentSecurityPolicy: false } as FastifyHelmetOptions],
          [fastifyEarlyHints, {}],
          [BaseRoutes, {}],
          [HealthCheck, { prefix: '/health' }],
          [Vike, {}],
        ],
        development: [],
        test: [],
        production: [
          [ServeStatic, {}],
        ],
      },
    },
  };
};