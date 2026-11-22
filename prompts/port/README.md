# Port prompts

One file per primitive, ready to paste as the first message of a fresh session.
`00-template.md` is the same prompt with `{{PLACEHOLDER}}`s, for a primitive not covered below.

Each prompt is filled in with the upstream opencode files, the upstream selector and its
attributes, the exact ui-sdk primitive and parts to wrap, the docs groups to show, and the
three files it may touch (`ui/<name>.tsx`, `ui/<name>.css`, one section in `routes/components.tsx`).

## Order

Dependency first: `Input` before `Field`, `Menu` before `Select`, `Button` before `Toast`.
Running them in the numbered order keeps each port self-consistent.

| # | File | Primitive | Upstream | ui-sdk |
| --- | --- | --- | --- | --- |
| 01 | `01-checkbox.md` | Checkbox | `forms/checkbox/checkbox.css` | `@ui-sdk/solid/checkbox` |
| 02 | `02-radio.md` | Radio | `forms/radio/radio.css` | `@ui-sdk/solid/radio` |
| 03 | `03-switch.md` | Switch | `forms/switch/switch.css` | `@ui-sdk/solid/switch` |
| 04 | `04-input.md` | Input | `forms/text-input/text-input.css` | `@ui-sdk/solid/input` |
| 05 | `05-textarea.md` | Textarea | `forms/textarea/textarea.css` | `@ui-sdk/solid/textarea` |
| 06 | `06-field.md` | Field | `forms/field/field.css` | `@ui-sdk/solid/field` |
| 07 | `07-separator.md` | Separator | `layout/divider/divider.css` | `@ui-sdk/solid/separator` |
| 08 | `08-avatar.md` | Avatar | `data-display/avatar/avatar.css` | `@ui-sdk/solid/avatar` |
| 09 | `09-progress.md` | Progress | `components/progress.css` | `@ui-sdk/solid/progress` |
| 10 | `10-tabs.md` | Tabs | `navigation/tabs/tabs-current.css` | `@ui-sdk/solid/tabs` |
| 11 | `11-menu.md` | Menu | `navigation/menu/menu.css` | `@ui-sdk/solid/menu` |
| 12 | `12-select.md` | Select | `forms/select/select.css` | `@ui-sdk/solid/select` |
| 13 | `13-segmented-control.md` | SegmentedControl | `navigation/segmented-control/segmented-control.css` | `@ui-sdk/solid/segmented-control` |
| 14 | `14-accordion.md` | Accordion | `data-display/accordion/accordion.css` | `@ui-sdk/solid/accordion` |
| 15 | `15-collapsible.md` | Collapsible | `components/collapsible.css` | `@ui-sdk/solid/collapsible` |
| 16 | `16-tooltip.md` | Tooltip | `overlays/tooltip/tooltip.css` | `@ui-sdk/solid/tooltip` |
| 17 | `17-popover.md` | Popover | `components/popover.css` | `@ui-sdk/solid/popover` |
| 18 | `18-hover-card.md` | HoverCard | `components/hover-card.css` | `@ui-sdk/solid/hover-card` |
| 19 | `19-dialog.md` | Dialog | `overlays/dialog/dialog.css` | `@ui-sdk/solid/dialog` |
| 20 | `20-toast.md` | Toast | `feedback/toast/toast.css` | `@ui-sdk/solid/toast` |

## Running them

Every prompt appends a section to `src/routes/components.tsx`, so they cannot run in parallel
on one checkout. Either:

- run them one at a time, in order, in the same working directory; or
- give each one its own worktree (`tools.opencode.worktree_create`) and merge the sections afterwards.

## Not covered here

The primitives with no opencode stylesheet (AlertDialog, Calendar, Combobox, Command, Slider,
Toggle, Tree, …) need a design-first prompt, not a port: there is nothing upstream to copy.
Ask for `prompts/design/` if you want those too.

## Scope rule: web console only

Port what the opencode **web console** uses, not the desktop app's chrome. In practice:

- Keep each component's default look (`compact` for Menu and Tooltip, the
  `data-component="…-v2"` rulesets), which is what the console renders.
- Skip `appearance="standard"` blocks. They exist in `packages/app` and
  `packages/session-ui` (titlebar, side region, session review) and are written
  in the legacy OC-1 token layer (`--surface-*`, `--text-strong`,
  `--text-invert-strong`, `--shadow-md`), which Kitsaas does not ship — it
  ports the `--v2-*` layer only.
- Same for anything else that only appears in the Electron app.

