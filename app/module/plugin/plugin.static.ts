import Elysia from 'elysia';
import { readdir, stat } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { resolve as resolveFunction } from 'node:path/posix';

const listFiles = async (directory: string): Promise<string[]> => {
  const files = await readdir(directory);

  const all = await Promise.all(
    files.map(async (name) => {
      const file = directory + '/' + name;
      const stats = await stat(file);

      return stats && stats.isDirectory() ? await listFiles(file) : [resolve(directory, file)];
    }),
  );

  return all.flat();
};

export type TStaticConfig = {
  assets: string;
  staticLimit: number;
  ignorePatterns: string[];
};

const _default: TStaticConfig = {
  assets: 'public',
  staticLimit: 1024,
  ignorePatterns: ['.DS_Store', '.git', '.gitignore', '.env'],
};

export const pluginStatic = async (config: Partial<TStaticConfig> = _default) => {
  config = { ..._default, ...config };
  const app = new Elysia({
    name: 'static',
    seed: {
      ...config,
      resolve: resolve.toString(),
    },
  });

  let files = await listFiles(resolveFunction(<string>config.assets));
  files = files.filter((file) => !(config.ignorePatterns as string[]).includes(file));
  const publicName = basename(<string>config.assets);

  for (const file of files) {
    const fileName = file
      .replace(resolve() + publicName, '')
      .replace(`${<string>config.assets}`, '');
    app.get(fileName, () => Bun.file(file));
  }

  return app;
};
