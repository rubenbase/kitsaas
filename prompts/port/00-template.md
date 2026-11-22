Port another opencode component into Kitsaas exactly the way Button was done.

TARGET: {{COMPONENT}}

CONTEXT
- Repo: /Users/rubencostamartinez/Desktop/kitsaas — Vite + Solid 2 (solid-js 2.0.3, @solidjs/web) + Tailwind v4.
- Kitsaas is a shadcn-style layer: behavior from @ui-sdk/solid, visuals ported 1:1 from opencode's @opencode/ui (MIT).
- Upstream checkout: /Users/rubencostamartinez/Desktop/effect-examples/opencode/packages/ui/src
- Upstream visuals for this component: {{UPSTREAM_CSS}}
- Upstream root selector: data-component="{{UPSTREAM_ROOT}}"; attributes in use: {{UPSTREAM_ATTRS}}
- Headless primitive: @ui-sdk/solid/{{SLUG}} — docs at node_modules/@ui-sdk/solid/docs/components/{{SLUG}}.md
- Parts to wrap: {{PARTS}}
- Anything already in src/components/ui is fair to reuse; do not assume the other ports in this series exist yet.
- Exemplar to copy the shape of: src/components/ui/button.tsx, src/components/ui/button.css, and the Button section in src/routes/components.tsx.

BEFORE WRITING
1. Read AGENTS.md, then node_modules/@ui-sdk/solid/docs/llms.txt; search core.md by heading and read rendering.md (and popups.md for anything portalled).
2. Read the upstream .tsx + .css listed above; they are the single source of truth for every value.
3. Read the primitive's docs first: Composition, Data Attributes and Styling sections.

SCOPE
Only these files may change:
- src/components/ui/{{SLUG}}.tsx (new)
- src/components/ui/{{SLUG}}.css (new)
- one new <section> in src/routes/components.tsx, appended after the last section; change nothing else in that file
Do not modify Button, app-shell.tsx, theme.css, router.tsx, package.json or any other component.
If another session is editing src/routes/components.tsx at the same time, still append only your own section and do not reformat the rest of the file.

DELIVER
A. src/components/ui/{{SLUG}}.tsx — thin wrapper: props typed from ComponentProps<typeof Ui…>, omit class/render and re-expose them, one exported component per part ({{PARTS}}), style props forwarded as data-* attributes. Header comment: what it is, that it is a 1:1 port of @opencode/ui (`packages/ui/src/{{UPSTREAM_DIR}}`) (MIT), and the behavior split (ui-sdk vs Kitsaas).
B. src/components/ui/{{SLUG}}.css — @layer components, attribute-driven rules only ([data-slot="…"] plus data-variant / data-size / data-state / data-disabled / data-expanded / data-pending and the upstream-specific attributes above), every state the upstream CSS styles (rest, hover, active/pressed, focus-visible, expanded, disabled, invalid, read-only, checked/indeterminate where they apply), plus a [data-color-scheme="dark"] block where upstream has one. Header comment lists the selector mapping (data-component="x" → data-slot="x", :disabled → also [data-disabled]). Reuse the existing --v2-* tokens; do not invent colors, sizes or radii. No Tailwind utilities in this file.
C. Docs in src/routes/components.tsx — one <section> shaped like the Button one: header card (name, one-line behavior note, package chip @ui-sdk/solid/{{SLUG}}), then a grid of <Group> blocks on these axes: {{AXES}}.

RULES
- No new dependencies. No Base UI, Radix or another headless library — behavior stays in @ui-sdk.
- One component per pass; do not refactor anything else.
- Do not edit src/theme.css unless upstream ships a token we lack — then port just that token and say so in your final message.
- Solid 2: class not className, JSX types from @solidjs/web, <For each> with an accessor index, kebab-case SVG presentation attributes.
- Keep comments short and factual. No emoji.

VERIFY (report what you actually saw, not what should happen)
- pnpm typecheck
- dev server on localhost:3000: open /components, screenshot the new section, exercise hover / active / focus-visible / disabled / invalid and compare against the upstream stories in the checkout
- re-check three numeric values in your CSS (height, padding, border-radius) against the upstream .css and name the ones you compared
- end with: files added, what you could not port 1:1, and anything the next sessions need to know
