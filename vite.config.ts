import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vike from 'vike/plugin';
import eslint from 'vite-plugin-eslint';
import path from 'node:path';
import url from 'node:url';

const root = path.dirname(url.fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [vue(), vike(), eslint()],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~/*': `${root}/`,
      '~app/': `${root}/app/`,
      '#root': `${root}/src/`,
    },
  },
  build: {
    target: 'esnext',
  },
});
console.log(`${path.dirname(url.fileURLToPath(import.meta.url))}`);
