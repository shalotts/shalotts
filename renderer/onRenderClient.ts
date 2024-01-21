import type { OnRenderClientAsync } from 'vike/types';
import { createSSRApp } from 'vue';
import { setPageContext } from '../app/module/vike/vike.vue-context';

/**
 * @description Render function for "/renderer/_default.page.client"
 * @param {PageContextClient} pageContext -
 * @returns {ReturnType<OnRenderClientAsync>} -
 */
export const onRenderClient: OnRenderClientAsync = async (pageContext): ReturnType<OnRenderClientAsync> => {
  const {
    Page,
    pageProps,
    config,
  } = pageContext
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const app = createSSRApp(Page, pageProps);
  await (config as any).onBeforeMountApp?.(app); // Test custom hook from vike-vue
  await setPageContext(app, pageContext);
  app.mount('#app');
}

export default onRenderClient;
