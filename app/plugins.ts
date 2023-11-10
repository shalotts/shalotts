import { etag }               from '@bogeychan/elysia-etag';
import { fileLogger, logger } from '@bogeychan/elysia-logger';
import { cors }               from '@elysiajs/cors';
import { helmet }             from 'elysia-helmet';
import { Transform }          from 'stream';

export const plugins = (stream: Transform<any>) => [
  fileLogger({ file: `${ import.meta.dir }/log/app.log` }),
  logger({ stream }),
  helmet({
    xFrameOptions: { action: 'deny' },
  }),
  cors(),
  etag(),
]
