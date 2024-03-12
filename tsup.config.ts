import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    shalotts: 'app/shalotts.ts',
    onRenderClient: 'renderer/onRenderClient.ts',
    onRenderHtml: 'renderer/onRenderHtml.ts',
    '+config': 'renderer/+config.ts',
  },
  skipNodeModulesBundle: true,
  legacyOutput: true,
  treeshake: true,
  shims: true,
  dts: true,
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
  ]
});
