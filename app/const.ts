import { join } from 'node:path';

export interface IENVConfig {
  readonly MODE: string;
  readonly SENTRY_HOST: string;
  readonly LOG_LVL: string;
  readonly CLOSE_GRACE_DELAY: number;
  readonly HOST: string;
  readonly PORT: number;
}

export const ENV_VAR: IENVConfig = {
  MODE: process.env.NODE_ENV || 'development',
  SENTRY_HOST: process.env.SENTRY_HOST || '',
  LOG_LVL: process.env.LOG_LVL || 'info',
  CLOSE_GRACE_DELAY: Number(process.env.CLOSE_GRACE_DELAY) || 500,
  HOST: process.env.HOST || '0.0.0.0',
  PORT: Number(process.env.PORT) || 3000,
};

export const $shalotts = {
  state: {
    isDevelopment: ENV_VAR.MODE === 'development' || ENV_VAR.MODE === 'dev',
    isTest: ENV_VAR.MODE === 'test',
    isProduction: ENV_VAR.MODE === 'production' || ENV_VAR.MODE === 'prod',
  },
};
export const ROOT_DIR: string = process.cwd();
export const LOG_DIR = join(ROOT_DIR, './app/log');

// export const PUBLIC_DIR: string = join(ROOT_DIR, 'public');
// export const CLOUDFLARED_CONFIG: string = resolve(ROOT_DIR, 'asset/cloudflared/config.yml');