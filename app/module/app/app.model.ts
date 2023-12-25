import { TApp } from '~/app/server.ts';

export default class AppModel {
  protected _app: TApp;

  constructor(app: TApp) {
    this._app = app;
  }

  get app(): TApp {
    return this._app;
  }
}