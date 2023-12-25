import type {
  FastifyHttp2SecureOptions,
  FastifyHttpOptions,
  FastifyListenOptions,
  FastifyServerOptions,
} from 'fastify';

/**
 * @description More info https://github.com/withfig/autocomplete/blob/master/src/cloudflared.ts
 */
export interface ITunnelOptions {
  name: string,
  hostname?: string,
  destination?: string,
  url?: string,
  serviceTokenId?: string,
  serviceTokenSecret?: string,
  logDirectory?: string,
  loglevel?: string,
  metrics?: string,
  address?: string,
  port?: string,
  upstream?: string,
  bootstrap?: string,
  maxUpstreamConns?: string,
}

/**
 * @description
 * @param {ITunnelOptions} tunnel - The tunnel options
 * @param secured.qr - enable qr code in intro message for production link
 * @param secured.cors
 * @param secured.force
 * @param secured.hsts
 */
export interface ShalottsOptions {
  tunnel?: ITunnelOptions,
  tunnelHost?: string;
  secured?: {
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