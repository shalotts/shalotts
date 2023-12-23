import vue              from '@vitejs/plugin-vue';
import path             from 'node:path';
import url              from 'node:url';
import UnoCSS           from 'unocss/vite';
import ssr              from 'vike/plugin';
import { defineConfig } from 'vite';

const root = path.dirname(url.fileURLToPath(import.meta.url));
export default defineConfig({
  publicDir: `${ root }/asset/public`,
  plugins: [
    ssr(),
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