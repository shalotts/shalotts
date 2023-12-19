import type {
  FastifyHttp2SecureOptions,
  FastifyHttpOptions,
  FastifyListenOptions,
  FastifyServerOptions,
} from 'fastify';

export interface IAppConfig {
  mode: 'server' | 'client';
  fastifyInstanceOptions?: FastifyServerOptions;
  fastifyServerOptions?: FastifyHttp2SecureOptions<any> & FastifyHttpOptions<any>;
  listen: FastifyListenOptions;
  shalottsOptions?: {
    secured?: {
      tunnel?: boolean; // cloudflared argo tunnel (warp)
      qr?: boolean;
      cors?: any;
      force?: boolean;
      hsts?: boolean;
    };
  }
}