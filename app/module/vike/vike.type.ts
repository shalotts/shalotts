import type { ComponentPublicInstance } from "vue";

type Component = ComponentPublicInstance;
export type Page = Component;
// eslint-disable-next-line unicorn/prevent-abbreviations
type PageProps = NonNullable<unknown>;

// https://vike.dev/pageContext#typescript

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      // @ts-ignore
      Page: Page;
      pageProps?: PageProps;
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
          description?: string;
        };
      };
    }
  }
}

export type { PageProps };
export type { Component };
export type {
  PageContextServer,
  PageContextClientWithServerRouting as PageContextClient,
  PageContextWithServerRouting as PageContext,
} from "vike/types";
