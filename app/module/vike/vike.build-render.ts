import { ROOT_DIR } from '~/app/const';

/**
 * @description build render functions for more compatibility with other adapters.
 */
export default async function () {
	await Bun.build({
		entrypoints: [
			`${ROOT_DIR}/renderer/+onRenderClient.ts`,
			`${ROOT_DIR}/renderer/+onRenderHtml.ts`,
		],
		outdir: `${ROOT_DIR}/renderer`,
		target: 'bun',
	});
}
