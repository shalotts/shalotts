import vue from '@vitejs/plugin-vue';
import path, { join } from 'node:path';
import url from 'node:url';
import UnoCSS from 'unocss/vite';
import { vavite } from 'vavite';
import ssr from 'vike/plugin';
import { defineConfig } from 'vite';

const root = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
  },
  buildSteps: [
    { name: 'client' },
    {
      name: 'server',
      config: {
        build: { ssr: true },
      },
    },
  ],
  publicDir: `${ root }/asset/public`,
  plugins: [
    vavite({
      handlerEntry: '/app/server.ts',
      serveClientAssetsInDev: true,
    }),
    ssr(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS(),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: [
      {
        find: '~/',
        replacement: `${ root }/`,
      },
      {
        find: '~/app/',
        replacement: `${ root }/app/`,
      },
      {
        find: '#root',
        replacement: `${ root }/src/`,
      },
    ],
  },
  css: {
    transformer: 'lightningcss',
    devSourcemap: true,
  },
  build: {
    manifest: true,
    target: 'esnext',
    cssMinify: 'lightningcss',
    outDir: 'build'
  },
  cacheDir: join(root, './app/cache'),
});