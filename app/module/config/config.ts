export const defineConfig = (options: {
  mode: string;
  shalottsOptions: {
    tunnelHost: string;
    secured: { qr: boolean };
    tunnel: { name: string; url: 'http://localhost:8000' }
  };
  listen: { port: number; host: string };
  fastifyInstanceOptions: { logger: any | pino.BaseLogger | LoggerExtras<never> | CustomLevelLogger<never> }
}) => options;