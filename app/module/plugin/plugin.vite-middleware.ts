import { createServer } from 'vite';
import { ROOT_DIR } from '~/app/const';
export const viteDevelopment = await createServer({
  root: ROOT_DIR,
  publicDir: 'public',
  server: {
    middlewareMode: 'ssr',
  },
});

export const viteDevelopmentMiddleware = viteDevelopment.middlewares;
