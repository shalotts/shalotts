import { bin, Connection, install, service, tunnel } from 'cloudflared';
import { consola }                                   from 'consola';
import { ChildProcess, spawn }                       from 'node:child_process';
import { existsSync }                                from 'node:fs';

export default class CloudflaredService {
  _cloudflaredURL: Promise<string> | null = null;

  constructor() {
  }

  get cloudflaredURL(): Promise<string> | null {
    return this._cloudflaredURL;
  }

  async install() {
    if (!existsSync(bin)) {
      const path = await install(bin);
    }

    const child = spawn(bin, ['--version'], { stdio: 'inherit' });

    child.on('error', (error) => {
      consola.error(error.message);
      process.exit(1);
    });

    child.on('message', (message) => {
      consola.info(JSON.stringify(message));
    });

    child.on('close', () => {
      consola.warn('Cloudflared was closed');
    });

    child.on('disconnect', () => {
      consola.warn('Cloudflared was disconnected');
    });

    child.on('exit', (code) => {
      consola.error('Cloudflared exited with code', code);
      process.exit(1);
    });

    return child.connected;
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
    return tunnel({ '--hello-world': null });
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