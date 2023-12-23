// import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions } from '@fastify/cors';
import fastifyEtag                  from '@fastify/etag';
// import fastifyHelmet, { FastifyHelmetOptions }         from '@fastify/helmet';
// import BaseRoutes                                      from '~/app/module/http/base-routes';
import fastifyMiddie                from '@fastify/middie';
import HealthCheck                  from '~/app/module/http/health-check';
import Vike                         from '~/app/module/http/vike';


export const plugin = {
  base: [
    [cors, {} as FastifyCorsOptions],
    // [fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE } as FastifyCachingPluginOptions],
    [fastifyEtag, {}],
    // [fastifyHelmet, { contentSecurityPolicy: false } as FastifyHelmetOptions],
    [HealthCheck, { prefix: '/health' }],
    [fastifyMiddie, {}],
    [Vike, {}],
  ],
  development: [],
  production: [],
};