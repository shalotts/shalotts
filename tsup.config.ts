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
  format: ['esm'],
  target: ['es2021'],
  platform: 'node',
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  // banner: {
  //   js: `import{fileURLToPath}from"node:url";import path from"node:path";import{createRequire as topLevelCreateRequire}from"module";const require=topLevelCreateRequire(import.meta.url),__filename=fileURLToPath(import.meta.url),__dirname=path.dirname(__filename);`,
  // },
});
