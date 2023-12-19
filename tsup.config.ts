import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/server.ts'],
  format: ['esm'],
  onSuccess: 'node dist/server.js',
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  watch: true,
});