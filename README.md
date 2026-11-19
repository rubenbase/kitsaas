# kitsaas

A Vite + Solid 2 single-page app. No meta-framework, no SSR — just Vite, Solid and Tailwind.

# Getting Started

```bash
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

# Building For Production

```bash
pnpm build      # static output in dist/
pnpm preview    # serve the production build locally
pnpm typecheck  # tsc --noEmit
```

`dist/` is plain static files, so it deploys to any static host (Vercel, Netlify, Cloudflare Pages, S3, ...).

## Project Structure

```
index.html            HTML shell, mounts #root
src/index.tsx         entry: imports styles, mounts the router
src/router.tsx        route table (Solid Router 2)
src/routes/           pages: usage, charts, components, not-found
src/routes/charts/    charts layout + one page per chart type
src/styles.css        Tailwind + font imports + base styles
src/theme.css         design tokens (--v2-*, --oc-*) and @theme mapping
src/components/       AppShell, page layout primitives, MockDashboard, icons
src/components/ui/    styled components (Button) built on ui-sdk
```

## Solid 2 Notes

This project runs on Solid 2 (`solid-js` 2.0.3), which differs from Solid 1.x in a few ways you will hit while writing components:

- The DOM runtime lives in `@solidjs/web` — `render` comes from there, not `solid-js/web`.
- JSX types come from `@solidjs/web` (`import type { JSX } from '@solidjs/web'`).
- Use `class`, never `className`.
- SVG presentation attributes are kebab-case in types: `stroke-width`, `stroke-linecap`, `stroke-linejoin`.
- Lists use `<For each={items}>{(item, i) => ...}</For>` from `solid-js`; `i` is an accessor (`i()`).
- `createResource` is replaced by `createAsync` in Solid 2.

## Styling

[Tailwind CSS](https://tailwindcss.com/) v4 via `@tailwindcss/vite`. Design
tokens are declared in `src/theme.css` and exposed to Tailwind through the
`@theme` block at the bottom of that file, so utilities like `bg-background`,
`text-muted` and `border-border` work out of the box.

The token file is a 1:1 port of opencode's `@opencode/ui`
(`packages/ui/src/styles/tokens` + `styles/theme.css`): the same `--v2-*`
primitives, the same 97 semantic tokens per scheme, and the same typography
scale. Utilities map straight to `--v2-*` (not through the `--oc-*` aliases,
which resolve once at `:root`), so a region can opt into the other scheme:

```html
<div data-color-scheme="dark">…</div>
```

Dark mode is attribute driven. The inline script in `index.html` sets
`data-color-scheme` on `<html>` before the first paint and follows the OS
afterwards; `src/theme.css` and the component stylesheets both read that
attribute, so keep it as the single switch — a bare `prefers-color-scheme`
block would flip the tokens without flipping the components.

### Component stylesheets

Components that are a straight port of an opencode component keep their
upstream CSS beside the component (`src/components/ui/button.css`) as
attribute rules (`data-variant`, `data-size`, `data-state`, `data-disabled`).
The rule set is framework agnostic, so the other ui-sdk bindings can reuse it.

Those files are layered into Tailwind's `components` layer, and cascade layers
are ordered by first appearance. Import `src/styles.css` **before** any
component module that ships CSS, or the component rules land below
Tailwind's preflight:

```tsx
// src/index.tsx
import './styles.css' // first: declares the cascade layers
import { Router } from '#/router'
```

### Removing Tailwind CSS

1. Replace the Tailwind import in `src/styles.css` with your own styles
2. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
3. Remove `@tailwindcss/vite` and `tailwindcss` from `package.json`

## UI SDK

Kitsaas is a shadcn-style layer on top of [ui-sdk](https://ui-sdk.dev), not
Base UI or Radix. Components live in `src/components/ui/`, are styled with CSS
(`button.css` uses `data-variant` / `data-size` / `data-state` attribute rules),
and delegate behavior (focus, keyboard, ARIA, pending state) to
[`@ui-sdk/solid`](https://ui-sdk.dev/docs/solid) on top of the
framework-agnostic `@ui-sdk/core`. The Solid version is the reference
implementation; the same attribute-driven styles can be reused by the React,
Vue, Svelte and web component bindings.

`Button` renders a native button, and an anchor when given `href`:

```tsx
<Button href="/components" variant="nav" icon={<ComponentsIcon />}>
  Components
</Button>
<Button variant="neutral">Save</Button>
```

`variant` is the full opencode set — `neutral` (default), `danger`, `warning`,
`outline`, `contrast`, `submit`, `ghost`, `ghost-muted`, `ghost-faint`,
`ghost-danger`, `loading` — plus `nav`, the settings-sidebar link that lives
outside `button-v2`. `size` is `small` (24px), `normal` (28px, default) or
`large` (32px); `nav` is always 28px.

Every state is styled from the DOM: `:hover`, `:active`, `:focus-visible`,
`:disabled`/`data-disabled`, `data-expanded` for menu triggers and
`data-pending` while a Promise-returning `onClick` runs. Pass
`data-state="hover" | "pressed" | "focus"` to pin a state in docs or tests.

## Routing

Pages are defined in `src/router.tsx` with
[`@solidjs/router`](https://docs.solidjs.com/solid-router) 2:

```tsx
const routes = defineRoutes([
  { path: '/', component: UsagePage },
  {
    path: '/charts',
    component: ChartsLayout,
    children: [
      { path: '/', component: ChartsIndex }, // redirects to /charts/area
      { path: '/area', component: AreaChartsPage },
      { path: '/bar', component: BarChartsPage },
      // line, pie, radar, radial …
    ],
  },
  { path: '/components', component: ComponentsPage },
  { path: '*404', component: NotFoundPage },
])

export const Router = createRouter({ routes })
```

The root layout wraps every page with `AppShell` (the sticky top bar); each
page picks its own layout primitive:

- `PageLayout tabs` — the console window frame: 49px tab bar + scrolling main
  (Usage and Charts).
- `PageLayout` — no tab bar (Components, Not Found).

Charts is a nested layout: `ChartsLayout` puts the chart-type tabs in the
window tab bar — the same strip opencode uses for Activity / Go / Models /
Providers / Controls / Settings — and each chart type is a child page
(`/charts/area`, `/charts/bar`, `/charts/line`, `/charts/pie`, `/charts/radar`,
`/charts/radial`). `/charts` redirects to `/charts/area`. Components renders
without a tab bar.

Chart types are pages, so the tabs are plain anchors with the `ghost` (active)
and `ghost-muted` (idle) Button variants, not in-page tabs. Router 2 claims
every `<a href>` and sets `aria-current="page"` on an exact match and
`data-active` on a pathname prefix match. `TabBar` measures the active label and
animates a 1px underline to it — the same sliding indicator opencode uses.
ui-sdk's `Tabs` primitive is for panels inside one URL, so it is intentionally
not used here.

Links are plain `<a>` elements, so `Button href="…"` is a router link. When
deploying the static build, rewrite unknown paths to `index.html` (Netlify
`/* /index.html 200`; Vercel `rewrites`), otherwise deep links 404.

## Adding SSR Later

If the landing page needs prerendered HTML for SEO, the smallest step is static prerendering of `/` at build time. If you need server functions or per-request data, move to [SolidStart v2](https://docs.solidjs.com/solid-start) (Vite-native, Nitro v3).

# Learn More

- [Solid Docs](https://docs.solidjs.com)
- [Vite Docs](https://vite.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ui-sdk Docs](https://ui-sdk.dev/docs/solid)

# License

[MIT](./LICENSE).

The design tokens and the Button stylesheet are ported from
[opencode](https://github.com/anomalyco/opencode)'s `@opencode/ui` (MIT); see
[NOTICES.md](./NOTICES.md).
