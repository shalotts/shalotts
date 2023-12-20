export interface IENVConfig {
  readonly MODE: string;
  readonly SENTRY_HOST: string;
}

export const ENV_VAR: IENVConfig = {
  MODE: process.env.MODE ?? 'development',
  SENTRY_HOST: process.env.SENTRY_HOST ?? '',
};

export const $shalotts = {
  state: {
    isProduction: ENV_VAR.MODE === 'production' || ENV_VAR.MODE === 'prod',
  },
};
export const ROOT_DIR: string = process.cwd();
export const PUBLIC_DIR: string = `${ ROOT_DIR }/public`;
export const STATIC_DIR_CLIENT: string = $shalotts.state.isProduction
  ? `${ ROOT_DIR }/dist/client`
  : PUBLIC_DIR;