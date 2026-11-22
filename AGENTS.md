# Agents

## ui-sdk

Kitsaas components are styled wrappers over [ui-sdk](https://ui-sdk.dev), which
provides the headless behavior and accessibility. Before adding or changing a
component, read `node_modules/@ui-sdk/solid/docs/llms.txt`. To build a new
component, search `node_modules/@ui-sdk/solid/docs/core.md` by heading and read
`node_modules/@ui-sdk/solid/docs/rendering.md`.

Do not add Base UI, Radix or another headless library. If a behavior is missing,
build it on `@ui-sdk/core` so it stays available to every framework binding.

## opencode styles

Kitsaas looks like [opencode](https://github.com/anomalyco/opencode), so a
component's styles come from opencode, not from shadcn or your own taste.
Before adding or restyling a component, search opencode's source for it:

- The local checkout is `../effect-examples/opencode` (relative to this repo).
  Start with `packages/ui/src` (`@opencode/ui`), then `packages/app/src` and
  `packages/session-ui/src` for how it is used. Search by the shadcn name and
  by likely synonyms (a badge is `data-component="tag"` upstream).
- If opencode has the component, port it 1:1. Copy its CSS beside the
  component (`src/components/ui/<slug>.css`) as attribute rules
  (`data-variant`, `data-size`, `data-state`, `data-disabled`), changing only
  the selectors (`[data-component="tag"]` becomes `[data-slot="badge"]`) and
  keeping its prop names and variants. Map any token Kitsaas does not port to
  its closest `--v2-*` token. Say what was ported, from which file, and every
  deviation in the CSS header comment and in `NOTICES.md`.
- If opencode does not have it, say so in the CSS header, along with which
  opencode screen or tokens the values were read from.

The rule sets are framework agnostic, so the other ui-sdk bindings reuse them
unchanged.
