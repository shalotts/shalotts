// @ts-ignore
import type { Unhead } from '@unhead/schema';
import { renderSSRHead } from '@unhead/ssr';
import type { TemplateWrapped } from 'vike/dist/esm/node/runtime/html/renderHtml';
import { dangerouslySkipEscape, escapeInject } from 'vike/server';

/**
 * @description Base template for render escaped html
 * @param {IHtmlHead} head meta tags
 * @param {string} html Vue app html
 * @returns {TemplateWrapped} special escaped template
 */
export default async function TEMPLATE_BASE(
  head: Unhead<object>,
  html = '<h1>No content</h1>',
): Promise<TemplateWrapped> {
  const {
    htmlAttrs,
    headTags,
    bodyAttrs,
    bodyTags,
    bodyTagsOpen,
  } = await renderSSRHead(head);
  return escapeInject`<!DOCTYPE html>
<html ${ dangerouslySkipEscape(htmlAttrs) }>
  <head>
    ${ dangerouslySkipEscape(headTags) }
  </head>
  <body ${ dangerouslySkipEscape(bodyAttrs) }>
    ${ dangerouslySkipEscape(bodyTagsOpen) }
    <div id="app">${ dangerouslySkipEscape(html) }</div>
    ${ dangerouslySkipEscape(bodyTags) }
  </body>
</html>`;
}