import { bin, Connection, install, service, tunnel } from 'cloudflared';
import { consola }                                   from 'consola';
import { ChildProcess, spawn }                       from 'node:child_process';
import { existsSync }                                from 'node:fs';
import { SITE_URL }                                  from '~/app/module/cli/cli.const.tsx';

export default class CloudflaredService {
  constructor() {
  }

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

  async open(id: string) {
    spawn(bin, ['--version'], { stdio: 'inherit' });
    const options = id ? { '--tunnel-id': id } : { '--url': SITE_URL };
    return tunnel(options);
  }

  async list(tunnel: { connections: Promise<Connection>[], child: ChildProcess }) {
    const {
      connections,
      child,
    } = tunnel;
    const connectionList = await Promise.all(connections);
    consola.log('Connections Ready! \n', JSON.stringify(connectionList, undefined, 4));

    child.on('exit', code => {
      consola.warn('Tunnel process exited with code', code);
    });
  }
}