import { Plugin } from 'vite';

interface DefaultNodeEntryOptions {
  elysiaEntry?: string;
}

/**
 * @param { string } elysiaEntry -
 * @returns {string} -
 */
function makeDefaultNodeEntry(elysiaEntry: string | undefined) {
  if (!elysiaEntry) {
    throw new Error('No elysia entry found');
  }

  return "console.log('default entry')";
}

/**
 * @returns {Plugin} -
 * @param {DefaultNodeEntryOptions} options - Options
 */
export function defaultNodeEntry(options: DefaultNodeEntryOptions): Plugin {
  const name = 'virtual:elysia:default-node-entry';
  let root: string;
  const elysiaEntry = options.elysiaEntry;

  return {
    name,
    enforce: 'pre',
    config(config) {
      root = config.root ?? process.cwd();
    },
    async resolveId(source, importer, options) {
      if (!options.ssr || source !== name) {
        return;
      }

      if (root) {
        const resolved = await this.resolve(root, importer, {
          ...options,
          skipSelf: true,
        });

        if (resolved) return resolved;
      }

      return name;
    },

    load(id) {
      if (id === name) {
        return makeDefaultNodeEntry(elysiaEntry);
      }
    },
  };
}
