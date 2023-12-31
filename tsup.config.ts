import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';
export default defineConfig({
  entry: ['app/server.ts'],
  bundle: true,
  minify: isProduction,
  format: ['esm'],
  target: 'esnext',
  skipNodeModulesBundle: true,
  platform: 'node',
  splitting: false,
  sourcemap: true,
  clean: true,
  banner: {
    js: `import{fileURLToPath}from"node:url";import path from"node:path";import{createRequire as topLevelCreateRequire}from"module";const require=topLevelCreateRequire(import.meta.url),__filename=fileURLToPath(import.meta.url),__dirname=path.dirname(__filename);`,
  },
});