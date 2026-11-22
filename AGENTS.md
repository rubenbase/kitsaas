# Agents

## ui-sdk

Kitsaas components are styled wrappers over [ui-sdk](https://ui-sdk.dev), which
provides the headless behavior and accessibility. Before adding or changing a
component, read `node_modules/@ui-sdk/solid/docs/llms.txt`. To build a new
component, search `node_modules/@ui-sdk/solid/docs/core.md` by heading and read
`node_modules/@ui-sdk/solid/docs/rendering.md`.

The goal is opencode's look with shadcn's developer experience: shadcn's
component and part names (`Card`, `CardHeader`, `CardTitle`, …) and
composition, opencode's CSS, and ui-sdk for behavior. Never add Base UI, Radix
or another headless library. If ui-sdk lacks a behavior, build it on
`@ui-sdk/core` so it stays available to every framework binding.

Even a component with no behavior of its own (a table, a list row) should be
checked against ui-sdk: if a primitive already solves part of it (selection,
keyboard navigation, sorting, roving focus), use it rather than leaving it
out or hand-rolling it.

## opencode styles

Kitsaas looks like opencode's **console** (opencode.ai/console: Activity,
Billing, Settings). When a component is named, the reference is the console's
version of it, not a same-named component elsewhere in opencode. `@opencode/ui`
is the console's component library, so it is the source only for components
the console renders from it.

Before adding or restyling a component:

1. Find it in the console. The console is hosted and its source is not in the
   opencode checkout, so read its live stylesheet: its class names are
   readable (`.activity-card`, `.billing-notice`, `.activity-facts`), so take
   the rules from `document.styleSheets`, not from screenshots or computed
   values alone. Ask the user before opening their console.
2. Check whether that console element is an `@opencode/ui` component (a
   `data-component` or `data-slot` attribute, or values that match it). If it
   is, port the upstream source from `../effect-examples/opencode/packages/ui/src`
   (relative to this repo); if not, port the console's own rules.
3. Port 1:1. Copy the rules beside the component (`src/components/ui/<slug>.css`)
   as attribute rules (`data-variant`, `data-size`, `data-state`,
   `data-disabled`), changing only the selectors (`.billing-notice` becomes
   `[data-slot="alert"]`). Map `--oc-*` to the `--v2-*` token it aliases, since
   `--oc-*` resolves once at `:root`. Name the source rule or file, every token
   mapping and every Kitsaas addition in the CSS header comment, and list
   `@opencode/ui` ports in `NOTICES.md`.
4. If neither the console nor `@opencode/ui` has it, say so in the CSS header
   and build it from the console's tokens and spacing.

The rule sets are framework agnostic, so the other ui-sdk bindings reuse them
unchanged.
