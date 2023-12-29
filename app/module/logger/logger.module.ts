import consola from 'consola';
import { defu } from 'defu';
import type { PinoLoggerOptions } from 'fastify/types/logger';
import isbot from 'isbot';
import pino from 'pino';
import { ENV_VAR, ROOT_DIR } from '~/app/const.ts';
import { LOG_LVL, printMessage } from '~/app/module/cli/cli.format.ts';
import { IPinoMessage } from '~/app/module/cli/cli.type.ts';

export default class LoggerModule {
  pretty(msg: string) {
    try {
      const log = JSON.parse(msg) as IPinoMessage;
      printMessage(log);
    } catch (e) {
      const error = e as Error;
      consola.error(error.message);
    }
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
        bindings: (bindings) => ({ pid: bindings.pid }),
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
            ip: request.raw.ip,
            isBot: isbot(request.headers['user-agent']),
            method: request.method,
            url: request.url,
            headers: request.headers,
            hostname: request.hostname,
            remotePort: request.socket.remotePort,
          };
        },
      },
    } as PinoLoggerOptions;
    const defaultMultiSteam = [
      { stream: pino.destination(`${ ROOT_DIR }/app/log/app.log`) },
      { write: this.pretty },
    ];

    const multiDef = defu({ i: defaultMultiSteam }, { i: multistream });
    return pino(
      defu(options, defaultOptions),
      pino.multistream(multiDef.i),
    );
  }
}