import { createSSRApp } from 'vue';
import { setPageContext } from '../vike/vike.vue-context';
import type { PageContextServer } from '../vike/vike.type';

/**
 * @description Render function for "/renderer/_default.page.client"
 * @param {PageContextServer} pageContext page context
 */
export const renderClient = (pageContext: PageContextServer): void => {
  const { Page, pageProps } = pageContext;
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const app = createSSRApp(Page, pageProps);
  setPageContext(app, pageContext);
  app.mount('#app');
};
