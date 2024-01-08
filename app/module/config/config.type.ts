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
  tunnel?: string
  credentialsFile?: string
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

export type ShalottsPlugin = [object, object]

export interface ShalottsOptions {
  tunnel?: ITunnelOptions,
  /**
   * @description Set url for console for tunnel with name. (if use free cloudflared domain, no need)
   */
  tunnelHost?: string;
  secured?: {
    /**
     * @description Enable QR code in intro message for production link
     */
    qr?: boolean;
    cors?: any;
    force?: boolean;
    hsts?: boolean;
  };
  /**
   * @description Plugins for fastify with different stages
   */
  plugins?: {
    /**
     * @description Will start at any stage
     */
    base: ShalottsPlugin[];
    development: ShalottsPlugin[];
    test: ShalottsPlugin[];
    production: ShalottsPlugin[];
  }
}

/**
 * @description Use for define new #shallots app.
 */
export interface IAppConfig {
  /**
   * not available, only SSR defaults
   * 'server' - hybrid SSR
   * 'client' - SPA
   */
  mode: 'server' | 'client';
  fastifyInstanceOptions?: FastifyServerOptions;
  fastifyServerOptions?: FastifyHttp2SecureOptions<any> & FastifyHttpOptions<any>;
  listen: FastifyListenOptions;
  shalottsOptions?: ShalottsOptions;
}