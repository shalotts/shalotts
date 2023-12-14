import Fastify      from 'fastify';
import { readFile } from 'node:fs/promises';

const fastify = Fastify({
  http2: true,
  https: {
    allowHTTP1: true,
    key: await readFile(`${ process.cwd() }/asset/https/shalotts.key`),
    cert: await readFile(`${ process.cwd() }/asset/https/shalotts.cert`),
  },
});
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

try {
  await fastify.listen({ port: 3000 });
} catch (error: any) {
  fastify.log.error(error);
  process.exit(1);
}