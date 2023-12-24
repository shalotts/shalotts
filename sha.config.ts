import { defineConfig } from '~/app/module/config/config.ts';
import LoggerModule     from '~/app/module/logger/logger.module.ts';


const loggerModule = new LoggerModule();
export const logger = loggerModule.create();

const listen = {
  host: 'localhost',
  port: 8000,
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
    },
    tunnelHost: 'shalotts.site',
    secured: {
      qr: false,
    },
  },
});