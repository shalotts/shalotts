// import { readFile }     from 'node:fs/promises';
import pino                           from 'pino';
import { ENV_VAR, LOG_LVL, ROOT_DIR } from '~/app/const.ts';
import { defineConfig }               from '~/app/module/config/config.ts';


export const logger = pino({
  level: ENV_VAR.LOG_LVL,
  customLevels: LOG_LVL,
  useOnlyCustomLevels: true,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
}, pino.destination(`${ ROOT_DIR }/app/log/app.log`));

// const tslCert = async () => {
//   return {
//     allowHTTP1: true,
//     key: await readFile(`${ process.cwd() }/asset/https/shalotts.key`),
//     cert: await readFile(`${ process.cwd() }/asset/https/shalotts.cert`),
//   };
// };
export default defineConfig({
  mode: 'server',
  fastifyInstanceOptions: {
    logger,
  },
  // fastifyServerOptions: {
  //   http2: true,
  //   https: await tslCert(),
  // },
  listen: {
    host: 'localhost',
    port: 8000,
  },
  shalottsOptions: {
    secured: {
      tunnel: 'shalotts',
      tunnelHost: 'shalotts.site',
      qr: false,
    },
  }
});