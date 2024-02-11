import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    shalotts: 'app/shalotts.ts',
    onRenderClient: 'renderer/onRenderClient.ts',
    onRenderHtml: 'renderer/onRenderHtml.ts',
    '+config': 'renderer/+config.ts',
  },
  legacyOutput: true,
  treeshake: true,
  shims: true,
  dts: true,
  target: 'es2020',
  format: ['esm'],
  platform: 'node',
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  external: [
    'vue',
    'vue/server-renderer',
    'vike/server',
  ],
  banner: {
    js: `import{fileURLToPath}from"node:url";import path from"node:path";import{createRequire as topLevelCreateRequire}from"module";const require=topLevelCreateRequire(import.meta.url),__filename=fileURLToPath(import.meta.url),__dirname=path.dirname(__filename);`,
  },
});
