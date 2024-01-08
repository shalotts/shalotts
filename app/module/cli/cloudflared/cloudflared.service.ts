import { bin, Connection, install, service, tunnel } from 'cloudflared';
import { consola } from 'consola';
import { ChildProcess, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { toConsoleArg } from '~/app/module/helper/helper.cli.ts';
import config from '~/sha.config.ts';

export default class CloudflaredService {
  async install() {
    if (!existsSync(bin)) {
      const path = await install(bin);
      consola.info(`Cloudflared installed to ${ path }`);

      return path;
    }

    return null;
  }

  exist(): boolean {
    if (service.exists()) {
      consola.info('Cloudflared running...');
      const current = service.current();
      const ingress = current.config.ingress;

      if (ingress) {
        for (const {
          service,
          hostname
        } of ingress) {
          consola.log(`  - ${ service } -> ${ hostname }`);
        }
        consola.info('Metrics server:', current.metrics);
      } else {
        consola.warn('Cloundflared ingress undefined');
      }
    } else {
      consola.error('Cloundflared is not running');
    }

    return service.exists();
  }

  async open() {
    spawnSync(bin, ['--version'], { stdio: 'inherit' });
    const options = toConsoleArg(config.shalottsOptions?.tunnel || {});
    return tunnel(options);
  }

  async list(tunnel: { connections: Promise<Connection>[]; child: ChildProcess }) {
    const {
      connections,
      child,
    } = tunnel;
    const connectionList = await Promise.all(connections);
    consola.log('Connections Ready! \n', JSON.stringify(connectionList, undefined, 4));

    child.on('exit', (code) => {
      consola.warn('Tunnel process exited with code', code);
    });
  }
}
