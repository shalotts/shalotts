import exposeDevServer from "#root/module/development/development.server.ts";
import { defaultNodeEntry } from "#root/module/plugin/plugin.default-entry.ts";
import { PluginOption } from "vite";
import { vaviteConnect } from "@vavite/connect";

/**
 *
 */
export async function build() {
  await Bun.build({
    entrypoints: [import.meta.path],
    outdir: `${import.meta.dir}/dist`,
    format: "esm",
  });
}

/* eslint-disable */
/**
 * TODO: UNCOMMENT ESLINT RULES
 * @description Elysia plugin for Vite (Vike Middleware Support)
 * @returns {PluginOption} -
 */
export default function ElysiaPlugin(): PluginOption {
  console.log("[elysia-init]");
  return [
    exposeDevServer(),
    defaultNodeEntry({ elysiaEntry: "index.ts" }),
    vaviteConnect({
      handlerEntry: "virtual:elysia:default-node-entry",
      serveClientAssetsInDev: true,
      clientAssetsDir: "dist/client",
    }),
  ];
}
/* eslint-enable */
