import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vike from 'vike/plugin';

export default defineConfig({
  plugins: [vue(), vike()],
  resolve: {
    dedupe: ['vue'],
    alias: {
      '~/*': './*',
      '~app/': './app/*',
      '~main/': './src/*',
    },
  },
});
