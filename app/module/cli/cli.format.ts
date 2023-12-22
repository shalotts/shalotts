import consola          from 'consola';
import { colors }       from 'consola/utils';
import { IPinoMessage } from '~/app/module/cli/cli.type.ts';

export const emojiLog = {
  emerg: '💀',
  alert: '🥀',
  crit: '🛑',
  error: '🚨',
  warn: '⚠️',
  notice: '✨',
  info: '📌',
  debug: '🐛',
};

export const LOG_LVL = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

export const formatMessageName = (message: string) => {
  if (message === 'request') return '<--';
  if (message === 'response') return '-->';
  return message;
};

export const isWideEmoji = (character: string): boolean => {
  return character !== '⚠️';
};
export const formatLevel = (level: string) => {
  const emoji = emojiLog[level.toLowerCase()];
  const padding = isWideEmoji(emoji) ? '' : ' ';
  return emoji + padding;
};
export const printMessage = (message: IPinoMessage) => {
  if (!message.msg || message.msg.charAt(0) === 'S') {
    return;
  }

  const status = message.res?.statusCode ? ` ${ message.res?.statusCode?.toString() } ` : '';
  const arrow = message.req || message.res
    ? message.req ? '-->' : ''
    : message.res ? '<--' : '';
  const date = new Date(message.time);
  const time = `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }:${ date.getMilliseconds() }`;
  const request = message.req ? `${ colors.cyan(' [' + message.req.method + ']') } ${ message.reqId } PATH:${ colors.cyan(message.req.url) }` : '';
  const response = message.res ? ` ${ colors.magenta(message.responseTime + 'ms' || '') }` : '';

  const text = `${ colors.gray(time) } ${ formatLevel(message.level) }  ${ colors.bgMagenta(status) }${ arrow }${ request }${ response } ${ colors.yellow('.:' + message.msg) }`;
  consola.log(text);
}
