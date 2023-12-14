export interface IAppConfig {
  mode: 'server' | 'client';
  server: {
    host: string;
    secured?: {
      cors: any;
      force: boolean;
      hsts?: boolean;
    };
    port: number;
  };
}