import type { PageContextServer } from '../vike/vike.type';
import { inject } from 'vue';

const key = Symbol('key');

/**
 * @returns { object } Returns page context
 */
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export function usePageContext(): unknown | undefined {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	return inject(key);
}

/**
 * @description setPageContext
 * @param {object} app hosted app element
 * @param {PageContextServer} pageContext page context
 */
export function setPageContext(app: any, pageContext: PageContextServer) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	app.provide(key, pageContext);
}
