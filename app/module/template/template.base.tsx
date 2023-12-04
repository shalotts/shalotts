import type { TemplateWrapped } from 'vike/dist/esm/node/runtime/html/renderHtml';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import { IHtmlHead } from '~/app/module/template/template.type';

/**
 * @description Base template for render escaped html
 * @param {IHtmlHead} head meta tags
 * @param {string} html Vue app html
 * @returns {TemplateWrapped} special escaped template
 */
export default function TEMPLATE_BASE(
  head: IHtmlHead,
  html: string = '<h1>Sharlotts</h1>',
): TemplateWrapped {
  return escapeInject`<!DOCTYPE html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>${head.title}</title>
  <meta name="description" content="${head.description}">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <meta property="og:title" content="" />
  <meta property="og:type" content="" />
  <meta property="og:url" content="" />
  <meta property="og:image" content="" />

  <link rel="manifest" href="/site.webmanifest">
  <link rel="apple-touch-icon" href="/icon.png">

  <meta name="theme-color" content="#fafafa">
  <link rel="icon" href="/favicon.ico">
</head>

<body>
  <div id="app">${dangerouslySkipEscape(html)}</div>
</body>

</html>`;
}
