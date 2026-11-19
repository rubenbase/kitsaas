# Agents

## ui-sdk

Kitsaas components are styled wrappers over [ui-sdk](https://ui-sdk.dev), which
provides the headless behavior and accessibility. Before adding or changing a
component, read `node_modules/@ui-sdk/solid/docs/llms.txt`. To build a new
component, search `node_modules/@ui-sdk/solid/docs/core.md` by heading and read
`node_modules/@ui-sdk/solid/docs/rendering.md`.

Do not add Base UI, Radix or another headless library. If a behavior is missing,
build it on `@ui-sdk/core` so it stays available to every framework binding.
