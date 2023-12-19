import { colors } from 'consola/utils';
import pk         from '~/package.json';
import config     from '~/sha.config.ts';

export const serverStartMessage = colors.red(`🆂🅷🅰🅻🅾🆃🆃🆂 v${ pk.version }`) + '\n' +
  +colors.cyan(`Server starting on ${ config.listen.host }:${ config.listen.port }`);

export const cloudflaredAddress = colors.yellow('Cloudflared Argo Tunnel');