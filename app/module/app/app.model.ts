import { FastifyInstance } from 'fastify';
import { IAppConfig } from '~/app/module/config/config.type.ts';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export  type AppOptions = {
  // Place your custom options for app below here.
};

export default class AppModel {
  protected _app: FastifyInstance;
  private readonly _config: IAppConfig;

  constructor(app: FastifyInstance<any, any, any, any, any>, config: IAppConfig) {
    this._app = app;
    this._config = config;
  }

  get app(): any {
    return this._app;
  }

  get config(): IAppConfig {
    return this._config;
  }
}
