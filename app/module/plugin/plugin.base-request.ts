import Elysia from 'elysia';
import { Logger } from 'pino';
import pretty from 'pino-pretty';
import { relativeURL } from '~/app/module/helper/helper.url';
import TEMPLATE_ERROR from '~/app/module/template/template.400';
import TEMPLATE_NOT_FOUND from '~/app/module/template/template.404';
import TEMPLATE_BASE from '~/app/module/template/template.base';

export const pluginBaseRequest = (log: Logger<pretty.PrettyStream>) => {
  return new Elysia()
    .get('/', ({ set }) => {
      set.headers['Content-Type'] = 'text/html';
      return TEMPLATE_BASE();
    })
    .onError(({ request, code, error, set }) => {
      set.headers['Content-Type'] = 'text/html';
      log.error(`[${code}] ${relativeURL(request.url)}`);

      if (code === 'NOT_FOUND') {
        set.status = 404;
        return TEMPLATE_NOT_FOUND();
      } else {
        set.status = 400;
        return TEMPLATE_ERROR(`ERROR :( \n ${JSON.stringify(error, undefined, 4)}`);
      }
    });
};
