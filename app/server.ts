import { IncomingMessage, ServerResponse } from 'node:http';
import AppModule from '~/app/module/app/app.module.ts';
import HttpModule from '~/app/module/http/http.module.ts';
import config from '~/sha.config.ts';

const http = new HttpModule(config.fastifyInstanceOptions);
const FastifyInstance = await http.createServer();
const $sha = new AppModule(FastifyInstance);
await $sha.create();

let fastifyReadyPromise: PromiseLike<void> | undefined = $sha.app.ready();
export default async function handler(request: IncomingMessage, reply: ServerResponse) {
  if (fastifyReadyPromise) {
    await fastifyReadyPromise;
    fastifyReadyPromise = undefined;
  }

  $sha.app.server.emit('request', request, reply);
}

export type TApp = typeof FastifyInstance;