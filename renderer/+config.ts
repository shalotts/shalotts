import { Unhead } from '@unhead/schema';
import type { Config, PageContext } from 'vike/types';

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
  },
} satisfies Config);

export type OnBeforeMountAppSync = (pageContext: PageContext) => void;
export type OnBeforeMountAppAsync = (pageContext: PageContext) => Promise<void>;

declare global {
  namespace VikePackages {
    interface ConfigF3v {
      head: Unhead<object>;
      onBeforeMountApp?: OnBeforeMountAppSync | OnBeforeMountAppAsync;
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
