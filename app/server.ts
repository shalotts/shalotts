import HttpModule from '~/app/module/http/http.module.ts';
import config     from '~/sha.config.ts';

const http = new HttpModule();
const app = await http.createServer();

app.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

try {
  await app.listen(config.server);
} catch (error: any) {
  app.log.error(error);
  process.exit(1);
}