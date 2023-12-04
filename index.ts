import { App, log } from '/app/http.ts';

log.info(`Elysia running at http://${App.server?.hostname}:${App.server?.port}`);
