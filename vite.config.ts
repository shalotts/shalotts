import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import url from 'node:url';
import UnoCSS from 'unocss/vite';
import { vavite } from 'vavite';
import ssr from 'vike/plugin';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const root = path.dirname(url.fileURLToPath(import.meta.url));

const pluginMap = {
  development: [],
  production: [
    vavite({
      handlerEntry: '/index.ts',
      reloadOn: 'static-deps-change',
      serveClientAssetsInDev: true,
    }),
  ],
};

const plugins =
  process.env.NODE_ENV === 'production' ? pluginMap.production : pluginMap.development;
export default defineConfig({
  plugins: [
    ssr(),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    eslint(),
    UnoCSS(),
    ...plugins,
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~/*': `${root}/`,
      '~/app/': `${root}/app/`,
      '#root': `${root}/src/`,
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
