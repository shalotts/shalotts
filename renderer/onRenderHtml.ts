import { defu } from 'defu';
import { CapoPlugin, createHead, UseHeadInput } from 'unhead';
import { TemplateWrapped } from 'vike/dist/esm/node/runtime/html/renderHtml';
import type { PageContextServer } from 'vike/dist/esm/types';
import { createApp } from 'vue';
import { renderToString } from '../app/module/helper/helper.render.ts';
import TEMPLATE_BASE from '../app/module/template/template.base';

interface PageCtx extends PageContextServer {
  pageProps?: NonNullable<unknown> | undefined;
}

/**
 * @description SSR vike page rendering
 * @param { PageCtx } pageContext vike page context
 * @returns {{ documentHtml: object, pageContext: object }} ready for render page. Page context for redirects
 */
async function onRenderHtml(
  pageContext: PageCtx,
): Promise<{ pageContext: object; documentHtml: TemplateWrapped }> {
  const {
    Page,
    pageProps,
    config,
  } = pageContext;
  if (!Page) throw new Error('My render() hook expects pageContext.Page to be defined');

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-call
  const app = createApp(Page, pageProps, pageContext);
  const appHtml = Page ? await renderToString(app) : ''; // SSR | SPA

  // // See https://vike.dev/head

  const headSchema = createHead({
    plugins: [
      CapoPlugin({ track: true }),
    ],
  });

  const { head } = config as { head: UseHeadInput<object> };
  const defaultHead = { title: 'Unknown' };

  headSchema.push(defu(head, defaultHead));

  const documentHtml = await TEMPLATE_BASE(
    headSchema,
    appHtml,
  );

  return {
    documentHtml,
    pageContext: {}
  };
}

export default onRenderHtml;
