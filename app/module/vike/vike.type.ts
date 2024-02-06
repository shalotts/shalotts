import type { ComponentPublicInstance } from 'vue';

type Component = ComponentPublicInstance;
export type Page = Component;
type PageProps = NonNullable<unknown>;

// https://vike.dev/pageContext#typescript

declare global {
  namespace Vike {
    interface PageContext {
      Page: Page;
      pageProps?: PageProps;
      urlPathname: string;
    }
  }
}

export type { PageProps };
export type { Component };
export type {
  PageContextServer,
  PageContextClientWithServerRouting as PageContextClient,
  PageContextWithServerRouting as PageContext,
}                                       from 'vike/types';