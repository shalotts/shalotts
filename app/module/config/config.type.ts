import type {
  FastifyHttp2SecureOptions,
  FastifyHttpOptions,
  FastifyListenOptions,
  FastifyServerOptions,
} from 'fastify';

/**
 * @description
 * @param secured.tunnel - boolean or TUNNEL_NAME
 * @param secured.qr - enable qr code in intro message for production link
 * @param secured.cors
 * @param secured.force
 * @param secured.hsts
 */
export interface ShalottsOptions {
  secured?: {
    tunnel?: boolean | string; // cloudflared argo tunnel (warp)
    tunnelHost?: string;
    qr?: boolean;
    cors?: any;
    force?: boolean;
    hsts?: boolean;
  };
}

/**
 * @description Use for define new #shallots app.
 */
export interface IAppConfig {
  mode: 'server' | 'client';
  fastifyInstanceOptions?: FastifyServerOptions;
  fastifyServerOptions?: FastifyHttp2SecureOptions<any> & FastifyHttpOptions<any>;
  listen: FastifyListenOptions;
  shalottsOptions?: ShalottsOptions;
}