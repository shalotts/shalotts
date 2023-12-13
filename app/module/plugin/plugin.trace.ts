import Elysia from 'elysia';
import type { Logger } from 'pino';
import pretty from 'pino-pretty';

export const pluginTrace = (log: Logger<pretty.PrettyStream>) => {
  return new Elysia().trace(async ({ handle }) => {
    const { time, end, children } = await handle;

    for (const child of children) {
      const { time: start, end, name } = await child;

      log.trace(name, 'took', (await end) - start, 'ms');
    }

    log.trace('beforeHandle took', (await end) - time);
  });
};
