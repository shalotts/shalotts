import { startTunnel } from 'untun';
import HttpModule      from '~/app/module/http/http.module.ts';
import config          from '~/sha.config.ts';

const http = new HttpModule();
const app = await http.createServer();

app.get('/ping', async function handler() {
  return '🏓 Pong!';
});

try {
  await app.listen(config.server);
  await startTunnel({
    hostname: config.server.host,
    port: config.server.port,
    protocol: 'https',
  });
} catch (error: any) {
  app.log.error(error);
  process.exit(1);
}