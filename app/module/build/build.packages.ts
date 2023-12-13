import { Glob } from 'bun';
import pc from 'picocolors';
import { ROOT_DIR } from '~/app/const';
import { IPackage } from '~/app/module/build/build.type';

/**
 * @description Build packages for $shalotts
 * @returns {Promise<Function>} -
 */
export default async function () {
  const glob = new Glob('*/index.ts');
  const packages = glob.scan(`${ROOT_DIR}/package/`);

  try {
    for await (const module of packages) {
      const locate = Bun.resolveSync(`./${module}`, `${ROOT_DIR}/package/`);
      const file = (await import(locate)) as IPackage;
      file.build();
      console.log(`${pc.green('[OK]')} Package: ${module.replace('/index.ts', '')}`);
    }
  } catch (error: any) {
    throw new Error(pc.red(`Build package error \n${error.message}`));
  }
}
