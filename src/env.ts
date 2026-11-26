/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    /** Set at build time by vite.config.ts from Cloudflare's branch variable. */
    readonly KITSAAS_PRODUCTION: boolean;
  }
}

/**
 * True when development-only sections (Pages, Blocks and their links) should
 * render: the dev server and preview builds. False on the production site.
 */
export const showDevOnly: boolean = !import.meta.env.KITSAAS_PRODUCTION;
