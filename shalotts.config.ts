import { defineConfig } from 'app/module/tool/tool.config';

export default defineConfig({
  mode: 'server',
  server: {
    host: 'localhost',
    port: 8080,
  },
});
