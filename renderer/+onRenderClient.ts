import { createSSRApp } from 'vue';
import type { Page, PageContextServer } from '../app/module/vike/vike.type';
import { setPageContext } from '../app/module/vike/vike.vue-context';

/**
 * @description Render function for "/renderer/_default.page.client"
 * @param {PageContextServer} pageContext page context
 */
function onRenderClient(pageContext: PageContextServer): void {
  const {
    Page,
    pageProps,
  } = pageContext as {
    Page: Page;
    pageProps: NonNullable<unknown> | undefined;
  };
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const app = createSSRApp(Page, pageProps);
  setPageContext(app, pageContext);
  app.mount('#app');
}

export default onRenderClient;
