import { Plugin, ViteDevServer } from 'vite';

declare global {
  // eslint-disable-next-line no-var, camelcase
  var __vite_development_server__: ViteDevServer | undefined;
}

// Copy from https://github.com/hattipjs/hattip/blob/main/packages/cli/vite/src/expose-dev-server.ts
/**
 * @returns {Plugin} expose-vite-dev-server
 */
export default function exposeDevelopmentServer(): Plugin {
  let development = false;

  return {
    name: 'virtual:expose-vite-dev-server',
    enforce: 'pre',
    config(_, environment) {
      development = environment.command === 'serve';
    },
    configureServer(server) {
      (globalThis as any).__vite_dev_server__ = server;
    },
    resolveId(source, _importer, options) {
      if (source === 'virtual:vite-development-server' && options.ssr) {
        return '\0virtual:vite-development-server';
      }
    },
    load(id) {
      if (id === 'virtual:vite-development-server' || id === '\0virtual:vite-development-server') {
        return 'export default ' + (development ? 'globalThis.__vite_dev_server__' : 'undefined');
      }
    },
  };
}
