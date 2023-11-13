export interface IENVConfig {
  readonly MODE: string;
  readonly SENTRY_HOST: string;
}
export const ENV_VAR: IENVConfig = {
  MODE: Bun.env.mode ?? 'development',
  SENTRY_HOST: Bun.env.SENTRY_HOST ?? '',
};

export const $shalotts = {
  state: {
    isProduction: ENV_VAR.MODE === 'production',
  },
};
