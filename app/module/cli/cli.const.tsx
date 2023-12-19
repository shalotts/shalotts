import { colors } from 'consola/utils';
import pk         from '~/package.json';
import config     from '~/sha.config.ts';

const SITE_URL = `${ config.fastifyServerOptions?.https ? 'https' : 'http' }://${ config.listen.host }:${ config.listen.port }`;
export const serverStartMessage = colors.red(`🆂🅷🅰🅻🅾🆃🆃🆂 v${ pk.version }`)
  + `\n Server starting on ${ SITE_URL }`;

export const cloudflaredAddress = (url: string) => `\n Cloudflared Argo Tunnel ${ url }`;