import { Unhead } from '@unhead/schema';
import type { PageContext } from 'vike/types';
import { App } from 'vue';

export default ({
  onRenderClient: 'import:f3v/renderer/onRenderClient:default',
  onRenderHtml: 'import:f3v/renderer/onRenderHtml:default',
  passToClient: ['pageProps', 'urlPathname', 'is404', 'urlParsed'],
  meta: {
    head: {
      env: { server: true, client: true },
    },
    onBeforeMountApp: {
      env: { server: false, client: true },
    },
    onCreateApp: {
      env: { server: true, client: true }
    },
  },
});

export type vikeHook = (app: App, pageContext: PageContext) => void;
export type vikeHookAsync = (app: App, pageContext: PageContext) => Promise<void>;

declare global {
  namespace Vike {
    interface Config {
      head: Unhead<object>;
      /**
       * @description client only hook
       */
      onBeforeMountApp?: vikeHook | vikeHookAsync;
      /**
       * @description client | server hook. Use for mount vue plugins
       */
      onCreateApp?: vikeHook | vikeHookAsync;
    }
  }
}

const globalName = (target: object, value: string) =>
  Object.defineProperty(target, 'name', {
    value,
    configurable: true,
  });
declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var __name: typeof globalName;
}
globalThis.__name = globalName;
