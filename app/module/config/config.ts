import pino from 'pino';

export const defineConfig = (options: {
  mode: string;
  shalottsOptions: {
    tunnelHost: string;
    secured: { qr: boolean };
    tunnel: { name: string; url: string }
  };
  listen: { port: number; host: string };
  fastifyInstanceOptions: { logger: any | pino.BaseLogger }
}) => options;