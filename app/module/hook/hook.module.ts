import closeWithGrace from 'close-with-grace';
import { FastifyPluginAsync } from 'fastify';
import { ENV_VAR } from '~/app/const.ts';
import AppModel from '~/app/module/app/app.model.ts';
import { onRequestLog, onResponseLog } from '~/app/module/hook/hook.log.ts';
import { PluginsOptions } from '~/app/module/plugin/plugin.type.ts';

export default class HookModule extends AppModel {
  __scoped() {
    const scopedModule: FastifyPluginAsync<PluginsOptions> = async (_app, opts): Promise<void> => {
      const closeListeners = closeWithGrace({ delay: ENV_VAR.CLOSE_GRACE_DELAY },
        async ({
                 signal,
                 err,
                 manual,
               }) => {
          if (err) {
            _app.log.error(err);
          }
          await this.app.close();
        });

      _app.addHook('onRequest', onRequestLog); // TODO: separate hooks
      _app.addHook('onResponse', onResponseLog);
      _app.addHook('onClose', (_, done) => {
        closeListeners.uninstall();
        done();
      });
    }

    return { scopedModule };
  }
}