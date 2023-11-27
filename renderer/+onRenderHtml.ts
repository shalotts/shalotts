export const doNotPrerender = true;
export const passToClient = ['pageProps', 'urlPathname', 'is404', 'urlParsed'];
export { serverRender as render } from '../app/module/vike/vike.server';
