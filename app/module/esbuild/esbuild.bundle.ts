import { build } from 'esbuild';
import type { BuildOptions } from 'esbuild';
import path from 'node:path';

export const esbuildBundleConfig: BuildOptions = {
  absWorkingDir: process.cwd(),
  entryPoints: [Bun.main],
  outfile: 'index.js',
  write: false,
  platform: 'node',
  bundle: true,
  format: 'cjs',
  sourcemap: false,
  treeShaking: true,
  banner: {
    js: `/* eslint-disable prettier/prettier */`,
  },
  tsconfig: await Bun.resolve('./json/tsconfig.bundle.json', import.meta.dir),
  plugins: [
    {
      name: 'externalize-deps',
      setup(build) {
        build.onResolve({ filter: /.*/ }, arguments_ => {
          const id = arguments_.path;
          if (id[0] !== '.' && !path.isAbsolute(id)) {
            return {
              external: true,
            };
          }
        });
      },
    },
  ],
};

export const esbuildBundle = async () => {
  const result = await build(esbuildBundleConfig);

  const { text } = result.outputFiles![0];
};
