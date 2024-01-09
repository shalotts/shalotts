import { defu } from 'defu';
import { LOG_DIR } from '~/app/const.ts';
import { defaultConfig, defineConfig, listen } from '~/app/module/config/config.ts';
import { IAppConfig } from '~/app/module/config/config.type.ts';

const shalottsConfig = await defaultConfig();

const myConfig = {
  mode: 'server',
  shalottsOptions: {
    tunnel: {
      name: 'shalotts',
      url: `http://${ listen.host }:${ listen.port.toString() }`,
      loglevel: 'info',
      logDirectory: LOG_DIR,
    },
    tunnelHost: 'shalotts.site',
  }
} satisfies Omit<IAppConfig, 'listen'>
export default defineConfig(defu(shalottsConfig, myConfig));