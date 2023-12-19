import { readFile }     from 'node:fs/promises';
import { ROOT_DIR }     from '~/app/const.ts';
import { defineConfig } from '~/app/module/config/config.ts';

const tslCert = async () => {
  return {
    allowHTTP1: true,
    key: await readFile(`${ process.cwd() }/asset/https/shalotts.key`),
    cert: await readFile(`${ process.cwd() }/asset/https/shalotts.cert`),
  };
};
export default defineConfig({
  mode: 'server',
  fastifyInstanceOptions: {
    logger: {
      level: 'info',
      file: `${ ROOT_DIR }/app/log/app.log`,
    },
  },
  fastifyServerOptions: {
    http2: true,
    https: await tslCert(),
  },
  listen: {
    host: 'localhost',
    port: 8000,
  }
});