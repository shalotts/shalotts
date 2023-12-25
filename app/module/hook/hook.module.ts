import closeWithGrace                  from 'close-with-grace';
import { ENV_VAR }                     from '~/app/const.ts';
import AppModel                        from '~/app/module/app/app.model.ts';
import { onRequestLog, onResponseLog } from '~/app/module/hook/hook.log.ts';

export default class HookModule extends AppModel {
  __init() {
    const closeListeners = closeWithGrace({ delay: ENV_VAR.CLOSE_GRACE_DELAY },
      async ({
               signal,
               err,
               manual,
             }) => {
        if (err) {
          this.app.log.error(err);
        }
        await this.app.close();
      });

    this.app.addHook('onRequest', onRequestLog); // TODO: separate hooks
    this.app.addHook('onResponse', onResponseLog);
    this.app.addHook('onClose', (_, done) => {
      closeListeners.uninstall();
      done();
    });
  }
}