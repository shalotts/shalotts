import type { PageContext } from 'vike/types';
import { contextKey } from '~/app/module/vike/vike.key.ts';

/**
 * @description setPageContext
 * @param {object} app hosted app element
 * @param {PageContext} pageContext page context
 */
export async function setPageContext(app: any, pageContext: PageContext) {
  app.provide(contextKey, pageContext);
}