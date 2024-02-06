import { colors } from 'consola/utils';
import { IAppConfig } from '~/app/module/config/config.type.ts';
import pk from '~/package.json';

export const SITE_URL = (config: IAppConfig) => `${ config.fastifyServerOptions?.https ? 'https' : 'http' }://${ config.listen.host }:${ config.listen.port }`;
export const serverStartMessage = (config: IAppConfig) => colors.red(` SHA.LO.TTS v${ pk.version }`)
  + '\n' + colors.yellow(` ENV: ${ process.env.NODE_ENV }`)
  + '\n' + `Server starting on ${ SITE_URL(config) }`;

export const cloudflaredAddress = (url: string) => `\n Cloudflared Argo Tunnel ${ url }`;