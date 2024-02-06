import consola from 'consola';
import { colors } from 'consola/utils';
import { IPinoMessage } from '~/app/module/cli/cli.type.ts';
export const emojiLog = {
  emerg:    colors.bgRed('::EMERG::'),
  alert:colors.bgMagenta('::ALERT::'),
  crit:     colors.bgRed('::CRITI::'),
  error:    colors.bgRed('::ERROR::'),
  warn:  colors.bgYellow('::WARNI::'),
  notice:  colors.bgBlack('::NOTIC::'),
  info:    colors.bgBlack('::INFO:::'),
  debug: colors.bgYellow('::DEBUG::'),
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
  return character !== ':X:';
};

type TemojiLog = typeof emojiLog;
export const formatLevel = (level: string) => {
  const levelType = level.toLowerCase() as unknown as keyof TemojiLog;
  const emoji = emojiLog[levelType];
  const padding = isWideEmoji(emoji) ? '' : ' ';
  return emoji + padding;
};

export const statusColored = (status: number): string | undefined => {
  const padding = (text: string) => ` ${ text } `;
  switch (status) {
    case 200:
      return colors.bgGreen(padding(status.toString()));
    case 201:
      return colors.bgGreenBright(padding(status.toString()));
    case 404:
      return colors.bgRed(padding(status.toString()));
    default:
      return colors.bgMagenta(padding(status.toString()));
  }
};
export const printMessage = (message: IPinoMessage) => {
  if (!message.msg || message.msg.charAt(0) === 'S') {
    return;
  }

  const status = message.res?.statusCode ? ` ${ statusColored(message.res?.statusCode) } ` : '';
  const arrow = message.req || message.res
    ? message.req ? '<--' : ''
    : message.res ? '-->' : '';
  const date = new Date(message.time);
  const time = `${ date.getHours() }:${ date.getMinutes() }:${ date.getSeconds() }:${ date.getMilliseconds() }`;
  const request = message.req ? `${ colors.cyan(` [${ message.req.method }]`) } ${ message.reqId } PATH:${ colors.cyan(message.req.url) }` : '';
  const response = message.res ? `${ colors.magenta(message.responseTime || ' null ' + 'ms' || '') }` : '';

  const text = `${ colors.gray(time) } ${ formatLevel(message.level.toString()) } ${ status } ${ arrow }${ request }${ response } ${ colors.yellow(`.:${ message.msg }`) }`;
  consola.log(text);
};
