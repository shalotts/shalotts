import { Elysia } from 'elysia'
import { helmet } from 'elysia-helmet'
import { etag }   from '@bogeychan/elysia-etag'
import pretty     from 'pino-pretty'
import { logger, pino, fileLogger } from '@bogeychan/elysia-logger'
import config     from 'shalotts.config'
import { cors }   from '@elysiajs/cors'

const stream = pretty({
  colorize: true,
})

export const log = pino(stream)

const date = new Date()
const logFileName = `${date.getFullYear()}_${date.getMonth()}_${date.getDay()}.log`

export const App = new Elysia()
  .use(fileLogger({ file: `./app/log/${logFileName}` }))
  .use(logger(stream))
  .use(
    helmet({
      xFrameOptions: { action: 'deny' },
    }),
  )
  .use(cors())
  .use(etag())
  .get('/', (context) => {
    return 'pino-pretty'
  })
  .listen({
    hostname: config.server.host,
    port: config.server.port,
  })

// export type TApp = typeof App
