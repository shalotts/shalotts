import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vike from "vike/plugin";
import eslint from "vite-plugin-eslint";
import path from "node:path";
import url from "node:url";
import UnoCSS from "unocss/vite";
import { vavite } from "vavite";

const root = path.dirname(url.fileURLToPath(import.meta.url));
console.log(root);
export default defineConfig({
  buildSteps: [
    {
      name: "client",
      config: {
        build: {
          outDir: "dist/client",
          manifest: true,
        },
      },
    },
    {
      name: "server",
      config: {
        build: {
          ssr: true,
          outDir: "dist/server",
        },
      },
    },
  ],
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vike(),
    vavite({
      reloadOn: "static-deps-change",
      handlerEntry: "/index.ts",
      serveClientAssetsInDev: true,
    }),
    // (await import('./package/vite/dist/index.js')).default(),
    eslint(),
    UnoCSS(),
  ],
  resolve: {
    dedupe: ["vue"],
    alias: {
      "~/*": `${root}/`,
      "~/app/": `${root}/app/`,
      "#root": `${root}/src/`,
    },
  },
  css: {
    transformer: "lightningcss",
    devSourcemap: true,
  },
  build: {
    manifest: true,
    target: "esnext",
    cssMinify: "lightningcss",
  },
  cacheDir: "./cache",
});
