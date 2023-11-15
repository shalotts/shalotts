import type { TemplateWrapped } from 'vike/dist/esm/node/runtime/html/renderHtml';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';

/**
 * @description Base template for render html
 * @param {string} html Vue app html
 * @returns {{ documentHtml: TemplateWrapped, pageContext: object }} special escaped template
 */
export default function TEMPLATE_BASE(html: string = '<h1>Sharlotts</h1>'): {
  documentHtml: TemplateWrapped;
  pageContext: any;
} {
  const documentHtml = escapeInject`<!DOCTYPE html>
<html class="no-js" lang="">

<head>
  <meta charset="utf-8">
  <title>Shalotts</title>
  <meta name="description" content="">
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
  return {
    documentHtml,
    pageContext: {},
  };
}
