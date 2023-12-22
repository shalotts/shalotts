import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['app/server.ts'],
  bundle: true,
  format: ['esm'],
  target: 'esnext',
  platform: 'node',
  onSuccess: 'node dist/server.js',
  splitting: false,
  sourcemap: true,
  minify: true,
  clean: true,
  watch: true,
  banner: {
    js:
      `import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);`, // TODO: NOT MINIFIED
  },
});