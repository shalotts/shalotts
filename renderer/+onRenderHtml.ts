import { TemplateWrapped } from 'vike/dist/esm/node/runtime/html/renderHtml';
import { createApp } from 'vue';
import { renderToString } from '../app/module/helper/helper.render';
import TEMPLATE_BASE from '../app/module/template/template.base';
import type { PageContextServer } from 'vike/types';

/**
 * @description SSR vike page rendering
 * @param { PageContextServer } pageContext vike page context
 * @returns {{ documentHtml: TemplateWrapped, pageContext: object }} ready for render page. Page context for redirects
 */
async function onRenderHtml(
  pageContext: PageContextServer,
): Promise<{ documentHtml: TemplateWrapped; pageContext: object }> {
  const { Page, pageProps, config } = pageContext;
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
  const app = createApp(Page, pageProps, pageContext);
  const appHtml = Page ? await renderToString(app) : ''; // SSR | SPA

  // See https://vike.dev/head
  const { title, description } = config as any;

  const documentHtml = TEMPLATE_BASE({ title, description }, appHtml);

  return {
    documentHtml,
    pageContext: {},
  };
}

export default onRenderHtml;
