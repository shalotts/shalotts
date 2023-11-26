import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vike from 'vike/plugin';
import eslint from 'vite-plugin-eslint';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [
    vike({ prerender: true }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    eslint(),
  ],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~/*': `${root}/`,
      '~app/': `${root}/app/`,
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
});
