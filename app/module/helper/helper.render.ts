import { renderToString as renderToString_ } from '@vue/server-renderer';
import type { App } from 'vue';

/**
 * @description Rendered html content
 * @param {App} app Vue application instance
 * @returns {Promise<string>} html
 */
export async function renderToString(app: App): Promise<string> {
	let error: unknown;
	// Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
	app.config.errorHandler = (error_) => {
		error = error_;
	};
	const appHtml = await renderToString_(app);
	if (error) throw error;
	return appHtml;
}
