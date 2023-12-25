import { resolve }      from 'node:path';
import { defineConfig } from '~/app/module/config/config.ts';
import LoggerModule     from '~/app/module/logger/logger.module.ts';


const loggerModule = new LoggerModule();
export const logger = loggerModule.create();

const listen = {
  host: process.env.HOST || 'localhost',
  port: Number(process.env.PORT) || 3000,
};
export default defineConfig({
  mode: 'server',
  fastifyInstanceOptions: {
    logger,
  },
  listen,
  shalottsOptions: {
    tunnel: {
      name: 'shalotts',
      url: `http://${ listen.host }:${ listen.port.toString() }`,
      loglevel: 'info',
      logDirectory: resolve(__dirname, './app/log'),
    },
    tunnelHost: 'shalotts.site',
    secured: {
      qr: false,
    },
  },
});