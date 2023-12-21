import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions }                    from '@fastify/cors';
import fastifyEtag                                     from '@fastify/etag';
import fastifyHelmet, { FastifyHelmetOptions }         from '@fastify/helmet';
import BaseRoutes                                      from '~/app/module/http/base-routes';
import HealthCheck                                     from '~/app/module/http/health-check';

export const plugin = {
  base: [
    [cors, {} as FastifyCorsOptions],
    [fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE } as FastifyCachingPluginOptions],
    [fastifyEtag, {}],
    [fastifyHelmet, { contentSecurityPolicy: false } as FastifyHelmetOptions],
    [BaseRoutes, {}],
    [HealthCheck, { prefix: '/health' }],
  ],
  development: [],
  production: [],
};