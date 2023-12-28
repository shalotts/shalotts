import { FastifyPluginAsync } from 'fastify';
import { TApp } from '~/app/server.ts';

export type AppOptions = {
  // Place your custom options for app below here.
};

export default class AppModel {
  protected _app: TApp;

  constructor(app: TApp) {
    this._app = app;
  }

  get app(): TApp {
    return this._app;
  }

  get pluginAsync(): FastifyPluginAsync<AppOptions> {
    return async (fastify, opts) => {
    };
  }
}
