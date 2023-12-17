import { defineConfig } from '~/app/module/config/config.ts';

export default defineConfig({
  mode: 'server',
  server: {
    host: 'localhost',
    port: 8000,
  },
});