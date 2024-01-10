import { join } from 'node:path';

export const defaultViteF3vConfig = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  buildSteps: [
    {
      name: 'client',
    },
    {
      name: 'server',
      config: {
        build: {
          ssr: true,
        },
      },
    },
  ],
  publicDir: join(process.cwd(), 'asset/public'),
  css: {
    transformer: 'lightningcss',
    devSourcemap: true,
  },
  build: {
    manifest: true,
    target: 'esnext',
    cssMinify: 'lightningcss',
  },
  cacheDir: join(process.cwd(), 'app/cache'),
};
