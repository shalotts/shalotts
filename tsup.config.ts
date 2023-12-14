import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/index.ts'],
  format: ['esm'],
  onSuccess: 'node dist/index.js',
  splitting: false,
  sourcemap: true,
  clean: true,
  watch: true,
});