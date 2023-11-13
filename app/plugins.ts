import { etag } from '@bogeychan/elysia-etag';
import { fileLogger, logger } from '@bogeychan/elysia-logger';
import { cors } from '@elysiajs/cors';
import { helmet } from 'elysia-helmet';
import { Transform } from 'node:stream';

// @ts-ignore
export const plugins = (stream: Transform<any>) => {
  return {
    base: [
      fileLogger({ file: `${import.meta.dir}/log/app.log` }),
      logger({ stream }),
      helmet({
        xFrameOptions: { action: 'deny' },
      }),
      cors(),
      etag(),
    ],
    development: [],
    production: [],
  };
};
