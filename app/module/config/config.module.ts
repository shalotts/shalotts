import { IAppConfig } from '~/app/module/config/config.type.ts';

export default class ConfigModule {
  private readonly _config: IAppConfig;
  constructor(config: IAppConfig) {
    this._config = config;
  }

  get config(): IAppConfig {
    return this._config;
  }
}
