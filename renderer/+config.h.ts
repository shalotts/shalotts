import type { Config } from 'vike/types';
import vikeVue from 'vike-vue';

const config = {
  passToClient: ['pageProps', 'urlPathname', 'is404', 'urlParsed'],
  meta: {
    title: {
      // Make `title` value available on both the server and client
      env: { server: true, client: true },
    },
    description: {
      // Make `description` value available only on the server-side
      env: { server: true },
    },
  },
  extends: vikeVue,
};

export default {
  ...config,
} satisfies Config;
