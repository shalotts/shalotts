import consola                  from 'consola';
import { colors }               from 'consola/utils';
import type { IncomingMessage } from 'node:http';

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
export const formatLevel = (level: number) => {
  const levelIndex = Object.keys(LOG_LVL).find((key: string) => LOG_LVL[key] === level);
  const emoji = emojiLog[levelIndex];
  const padding = isWideEmoji(emoji) ? '' : ' ';
  return emoji + padding;
};
export const printConsole = (args: any, level: number) => {
  const [arg] = args;

  if (typeof arg === 'string' && arg.charAt(0) !== 'S') {
    consola.warn(`${ formatLevel(level) }  ${ arg }`);
  } else {
    if (arg.res) {
      printHTTPMessage(arg.res.request, level, arg.responseTime);
    }
  }
};

export const printHTTPMessage = (process: IncomingMessage, level: number, time: number | null = null) => {
  let http = `[${ process.method }] ${ process.raw.httpVersion } - ${ process.url }`;
  const code = process.statusCode || 0;
  let status = code.toString();

  if (level === 40) {
    http = colors.yellow(http);
  } else if (level <= 30) {
    http = colors.cyan(http);
  } else {
    http = colors.red(http);
  }

  if (code < 300) {
    status = colors.green(status);
  } else if (code > 300 && code < 303) {
    status = colors.yellow(status);
  } else {
    status = colors.red(status);
  }

  const message = `${ formatLevel(level) }  ${ status } --> ${ http } ${ time ? '-- ' + time : '' }`;
  consola.info(message);
};

