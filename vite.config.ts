import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

/**
 * Production builds hide development-only sections (Pages, Blocks).
 *
 * Workers Builds injects `WORKERS_CI_BRANCH`, the branch being built. A build
 * of `main` is production; any other branch is a preview and keeps the
 * development sections, and so does a local build, where the variable is unset.
 * `pnpm deploy:production` sets it to `main` for a deploy from this machine.
 */
const isProduction = process.env.WORKERS_CI_BRANCH === "main";

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  optimizeDeps: { exclude: ["@ui-sdk/core"] },
  plugins: [tailwindcss(), solid()],
  define: {
    "import.meta.env.KITSAAS_PRODUCTION": JSON.stringify(isProduction),
  },
});

export default config;
