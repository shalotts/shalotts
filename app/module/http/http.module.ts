import { defu }                                               from 'defu';
import type { FastifyHttp2SecureOptions, FastifyHttpOptions } from 'fastify';
import Fastify                                                from 'fastify';

export default class HttpModule {
  config: FastifyHttp2SecureOptions<any> | {};

  constructor(config: FastifyHttp2SecureOptions<any> | {} = {}) {
    this.config = config;
  }

  async createServer() {
    const defaultConfig = async (): Promise<FastifyHttp2SecureOptions<any, any> & FastifyHttpOptions<any> | {}> => {
      return {};
    };

    return Fastify(defu(this.config, await defaultConfig()));
  }
}