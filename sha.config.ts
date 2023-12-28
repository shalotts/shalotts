import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions } from '@fastify/cors';
import fastifyEarlyHints from '@fastify/early-hints';
import fastifyEtag from '@fastify/etag';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { resolve } from 'node:path';
import { defineConfig } from '~/app/module/config/config.ts';
import BaseRoutes from '~/app/module/http/base-routes';
import HealthCheck from '~/app/module/http/health-check';
import ServeStatic from '~/app/module/http/serve-static';
import Vike from '~/app/module/http/vike';
import LoggerModule from '~/app/module/logger/logger.module.ts';

const loggerModule = new LoggerModule();
export const logger = loggerModule.create();

const listen = {
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 3000,
};
export default defineConfig({
  mode: 'server',
  fastifyInstanceOptions: {
    logger,
  },
  listen,
  shalottsOptions: {
    tunnel: {
      name: 'shalotts',
      url: `http://${ listen.host }:${ listen.port.toString() }`,
      loglevel: 'info',
      logDirectory: resolve(__dirname, './app/log'),
    },
    tunnelHost: 'shalotts.site',
    secured: {
      qr: false,
    },
    plugins: {
      base: [
        [cors, {} as FastifyCorsOptions],
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
});