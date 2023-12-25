import { ENV_VAR }      from '~/app/const.ts';
import { defineConfig } from '~/app/module/config/config.ts';
import LoggerModule     from '~/app/module/logger/logger.module.ts';


const loggerModule = new LoggerModule();
export const logger = loggerModule.create();

const listen = {
  host: ENV_VAR.HOST,
  port: ENV_VAR.PORT,
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