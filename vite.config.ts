import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

/**
 * Production builds hide development-only sections (Pages, Blocks).
 *
 * Cloudflare injects the branch being built: `WORKERS_CI_BRANCH` in Workers
 * Builds, `CF_PAGES_BRANCH` in Pages. A build of `main` is production; any
 * other branch is a preview and keeps the development sections. Local and
 * manual deploys set `KITSAAS_ENV=production` (see `pnpm deploy`).
 */
const branch = process.env.WORKERS_CI_BRANCH ?? process.env.CF_PAGES_BRANCH;
const isProduction = process.env.KITSAAS_ENV === "production" || branch === "main";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ["@ui-sdk/core"] },
  plugins: [tailwindcss(), solid()],
  define: {
    "import.meta.env.KITSAAS_PRODUCTION": JSON.stringify(isProduction),
  },
});

export default config;
