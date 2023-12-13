import { resolve } from 'node:path';

export interface IENVConfig {
  readonly MODE: string;
  readonly SENTRY_HOST: string;
}

export const ENV_VAR: IENVConfig = {
  MODE: Bun.env.MODE ?? 'development',
  SENTRY_HOST: Bun.env.SENTRY_HOST ?? '',
};

export const $shalotts = {
  state: {
    isProduction: ENV_VAR.MODE === 'production',
  },
};

export const ROOT_DIR: string = resolve(import.meta.dir, '../');
export const PUBLIC_DIR: string = `${ROOT_DIR}/public`;
export const STATIC_DIR_CLIENT: string = $shalotts.state.isProduction
  ? `${ROOT_DIR}/dist/client`
  : PUBLIC_DIR;
