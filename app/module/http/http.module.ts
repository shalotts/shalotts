import { defu }                           from 'defu';
import type { FastifyHttp2SecureOptions } from 'fastify';
import Fastify                            from 'fastify';
import { readFile }                       from 'node:fs/promises';

export default class HttpModule {
  config: FastifyHttp2SecureOptions<any> | {};

  constructor(config: FastifyHttp2SecureOptions<any> | {} = {}) {
    this.config = config;
  }

  async createServer() {
    const defaultConfig = async (): Promise<FastifyHttp2SecureOptions<any, any>> => {
      return {
        http2: true,
        https: {
          allowHTTP1: true,
          key: await readFile(`${ process.cwd() }/asset/https/shalotts.key`),
          cert: await readFile(`${ process.cwd() }/asset/https/shalotts.cert`),
        },
      };
    };

    return Fastify(defu(this.config, await defaultConfig()));
  }
}