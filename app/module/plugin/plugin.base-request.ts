import Elysia from 'elysia';
import { Logger } from 'pino';
import pretty from 'pino-pretty';
import { relativeURL } from '~/app/module/helper/helper.url';
import TEMPLATE_ERROR from '~/app/module/template/template.400';
import TEMPLATE_NOT_FOUND from '~/app/module/template/template.404';

export const pluginBaseRequest = (log: Logger<pretty.PrettyStream>) => {
	return new Elysia().onError(({ request, code, error, set }) => {
		set.headers['Content-Type'] = 'text/html';
		log.error(`[${code}] ${relativeURL(request.url)}`);

		if (code === 'NOT_FOUND') {
			set.status = 404;
			return TEMPLATE_NOT_FOUND();
		} else {
			set.status = 400;
			return TEMPLATE_ERROR(
				`${JSON.stringify(error, undefined, '<br/>')}`,
			);
		}
	});
};

// .get('/', ({ set }) => {
//   set.headers['Content-Type'] = 'text/html';
//   return 'test';
// })
