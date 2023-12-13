import pc from 'picocolors';
import { $shalotts } from '~/app/const';
import app, { log } from '~/app/http';

const productionMessage = `${pc.green('[PROD]')} Elysia running at http://${app.server
  ?.hostname}:${app.server?.port}`;
const developmentMessage = `${pc.red('[DEV] Not supported. Use vite for development')}`;

log.info($shalotts.state.isProduction ? productionMessage : developmentMessage);
