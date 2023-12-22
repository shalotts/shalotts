import { defu }                   from 'defu';
import type { PinoLoggerOptions } from 'fastify/types/logger';
import pino                       from 'pino';
import { ENV_VAR, ROOT_DIR }      from '~/app/const.ts';
import { LOG_LVL }                from '~/app/module/cli/cli.format.ts';

export default class LoggerModule {
  constructor() {
  }

  /**
   * @description Create Logger instance
   * @param {PinoLoggerOptions} options - merged with default
   * @param {[]} multistream - merged with default, configure https://getpino.io/#/docs/help?id=log-to-different-streams
   */
  create(options: PinoLoggerOptions = {}, multistream: any[] = []) {
    const defaultOptions = {
      name: '#shalotts',
      level: ENV_VAR.LOG_LVL,
      customLevels: LOG_LVL,
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      serializers: {
        res(reply) {
          // The default
          return {
            statusCode: reply.statusCode,
          };
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            headers: request.headers,
            hostname: request.hostname,
            remoteAddress: request.ip,
            remotePort: request.socket.remotePort,
          };
        },
      },
    } as PinoLoggerOptions;
    const defaultMultiSteam = [
      { stream: pino.destination(`${ ROOT_DIR }/app/log/app.log`) },
      { stream: process.stdout },
    ];

    const multiDef = defu({ i: defaultMultiSteam }, { i: multistream });
    return pino(
      defu(options, defaultOptions),
      pino.multistream(multiDef.i),
    );
  }
}