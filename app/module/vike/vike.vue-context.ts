import type { PageContext } from 'vike/types';
import { inject } from 'vue';

const key = Symbol('key');

/**
 * @returns { PageContext } Returns page context
 */
export function usePageContext(): PageContext | undefined {
  return inject(key);
}

/**
 * @description setPageContext
 * @param {object} app hosted app element
 * @param {PageContext} pageContext page context
 */
export async function setPageContext(app: any, pageContext: PageContext) {
  app.provide(key, pageContext);
}