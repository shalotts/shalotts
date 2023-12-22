import closeWithGrace                  from 'close-with-grace';
import { ENV_VAR }                     from '~/app/const.ts';
import { onRequestLog, onResponseLog } from '~/app/module/hook/hook.log.ts';
import { TApp }                        from '~/app/server.ts';

export default function(app: TApp) {
  const closeListeners = closeWithGrace({ delay: ENV_VAR.CLOSE_GRACE_DELAY }, async function({
                                                                                               signal,
                                                                                               err,
                                                                                               manual,
                                                                                             }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  });

  app.addHook('onRequest', onRequestLog); // TODO: separate hooks
  app.addHook('onResponse', onResponseLog);
  app.addHook('onClose', (instance, done) => {
    closeListeners.uninstall();
    done();
  });
}