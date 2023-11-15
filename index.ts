import { App, log } from 'app/http';

log.info(`Elysia running at http://${App.server?.hostname}:${App.server?.port}`);
log.info(
  `Routes: ${JSON.stringify(
    App.routes.map(route => `[${route.method}] - ${route.path}`),
    undefined,
    4,
  )}`,
);
