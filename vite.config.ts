import vue              from '@vitejs/plugin-vue';
import path             from 'node:path';
import url              from 'node:url';
import UnoCSS           from 'unocss/vite';
import { vavite }       from 'vavite';
import ssr              from 'vike/plugin';
import { defineConfig } from 'vite';

const root = path.dirname(url.fileURLToPath(import.meta.url));
export default defineConfig({
  server: {
    port: 3001,
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
      handlerEntry: '/dist/server.js',
      serveClientAssetsInDev: true,
    }),
    ssr({ disableAutoFullBuild: true }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    UnoCSS(),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~/*': `${ root }/`,
      '~/app/': `${ root }/app/`,
      '#root': `${ root }/src/`,
    },
  },
  css: {
    transformer: 'lightningcss',
    devSourcemap: true,
  },
  build: {
    manifest: true,
    target: 'esnext',
    cssMinify: 'lightningcss',
  },
  cacheDir: './cache',
});