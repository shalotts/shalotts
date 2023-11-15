import { createSSRApp, h } from 'vue';
import type { VNode } from 'vue';
import { setPageContext } from '../vike/vike.vue-context';
import Layout from './layout.vue';
import type { PageContextServer } from '../vike/vike.type';
import type App from '@vue/runtime-core/dist/runtime-core';

export const renderClient = (pageContext: PageContextServer): App<any> => {
  const { Page, pageProps } = pageContext;
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const PageWithLayout = {
    render(): VNode {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      return h(
        Layout,
        {},
        {
          default(): VNode {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            return h(Page, pageProps || {});
          },
        },
      );
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const app = createSSRApp(PageWithLayout);
  setPageContext(app, pageContext);

  return app;
};
