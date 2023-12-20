import fastifyCaching, { FastifyCachingPluginOptions } from '@fastify/caching';
import cors, { FastifyCorsOptions }                    from '@fastify/cors';
import BaseRoutes                                      from '~/app/module/http/base-routes';
// import Etag       from '~/app/module/http/etag';

export const plugin = {
  base: [
    [cors, {} as FastifyCorsOptions],
    [fastifyCaching, { privacy: fastifyCaching.privacy.NOCACHE } as FastifyCachingPluginOptions],
    [BaseRoutes, {}],
    // [Etag, {}],
  ],
  development: [],
  production: [],
};