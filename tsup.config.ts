import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/server.ts'],
  bundle: true,
  format: ['esm'],
  target: 'esnext',
  platform: 'node',
  splitting: false,
  sourcemap: true,
  minify: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod',
  clean: true,
  banner: {
    js: `import{fileURLToPath}from"node:url";import path from"node:path";import{createRequire as topLevelCreateRequire}from"module";const require=topLevelCreateRequire(import.meta.url),__filename=fileURLToPath(import.meta.url),__dirname=path.dirname(__filename);`,
  },
});