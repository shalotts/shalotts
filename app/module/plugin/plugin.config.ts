import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions }                    from '@fastify/cors';
import fastifyEarlyHints                               from '@fastify/early-hints';
import fastifyEtag                                     from '@fastify/etag';
import fastifyHelmet, { FastifyHelmetOptions }         from '@fastify/helmet';
import BaseRoutes                                      from '~/app/module/http/base-routes';
import HealthCheck                                     from '~/app/module/http/health-check';
import ServeStatic                                     from '~/app/module/http/serve-static';
import Vike                                            from '~/app/module/http/vike';

export const pluginConfig = {
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
  production: [
    [ServeStatic, {}],
  ],
};