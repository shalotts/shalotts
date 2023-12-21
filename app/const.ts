export interface IENVConfig {
  readonly MODE: string;
  readonly SENTRY_HOST: string;
  readonly LOG_LVL: string;
  readonly CLOSE_GRACE_DELAY: number;
}

export const ENV_VAR: IENVConfig = {
  MODE: process.env.MODE || 'development',
  SENTRY_HOST: process.env.SENTRY_HOST || '',
  LOG_LVL: process.env.LOG_LVL || 'info',
  CLOSE_GRACE_DELAY: Number(process.env.CLOSE_GRACE_DELAY) || 500,
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

export const LOG_LVL = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};