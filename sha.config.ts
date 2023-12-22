// import { readFile }     from 'node:fs/promises';
import { defineConfig } from '~/app/module/config/config.ts';
import LoggerModule     from '~/app/module/logger/logger.module.ts';


const loggerModule = new LoggerModule();
export const logger = loggerModule.create();
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
  // shalottsOptions: {
  //   secured: {
  //     tunnel: 'shalotts',
  //     tunnelHost: 'shalotts.site',
  //     qr: false,
  //   },
  // },
});