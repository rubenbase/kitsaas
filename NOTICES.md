# Third-party notices

## opencode (`@opencode/ui`)

Parts of Kitsaas are ported from [opencode](https://github.com/anomalyco/opencode),
which is MIT licensed:

```
MIT License

Copyright (c) 2025 opencode

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Ported material:

- `src/theme.css` — design tokens (palette, alpha overlays, semantic layers,
  typography, elevation), from `packages/ui/src/styles/tokens/*` and
  `packages/ui/src/styles/theme.css`.
- `src/components/ui/button.css` — the `button-v2` rule set, from
  `packages/ui/src/actions/button/button.css` and
  `packages/ui/src/actions/submit.css`. Only selectors were adapted (from
  `data-component="button-v2"` to ui-sdk's `data-slot="button"`), plus a
  `nav` variant that has no upstream counterpart.

Every other component in `src/components/ui/` is the same kind of port: the
upstream stylesheet's declarations kept as written, with only the selectors
adapted to ui-sdk's markup (`data-component="…"` → `data-slot="…"`, Kobalte's
runtime variables replaced by ui-sdk's). Kitsaas-only props, parts and token
mappings are called out in each file's header.

| Kitsaas | Upstream |
| --- | --- |
| `ui/accordion.css` | `data-display/accordion/accordion.css` |
| `ui/avatar.css` | `data-display/avatar/avatar.css` |
| `ui/badge.css` | `data-display/badge/badge.css` |
| `ui/checkbox.css` | `forms/checkbox/checkbox.css` + `checkbox-compact.css` |
| `ui/collapsible.css` | `components/collapsible.css` |
| `ui/dialog.css` | `overlays/dialog/dialog.css` |
| `ui/field.css` | `forms/field/field.css` |
| `ui/hover-card.css` | `components/hover-card.css` |
| `ui/input.css` | `forms/text-input/text-input.css` |
| `ui/kbd.css` | `data-display/keybind/keybind.css` |
| `ui/menu.css` | `navigation/menu/menu.css` |
| `ui/popover.css` | `components/popover.css` |
| `ui/progress.css` | `components/progress.css` |
| `ui/radio.css` | `forms/radio/radio.css` |
| `ui/segmented-control.css` | `navigation/segmented-control/segmented-control.css` |
| `ui/select.css` | `forms/select/select.css` |
| `ui/separator.css` | `layout/divider/divider.css` |
| `ui/spinner.css` | `feedback/loader/loader.css` |
| `ui/switch.css` | `forms/switch/switch.css` |
| `ui/tabs.css` | `navigation/tabs/tabs-current.css` |
| `ui/textarea.css` | `forms/textarea/textarea.css` |
| `ui/toast.css` | `feedback/toast/toast.css` |
| `ui/tooltip.css` | `overlays/tooltip/tooltip.css` |

All upstream paths are relative to `packages/ui/src` in the opencode repo.

Some values also come from session-ui (`packages/session-ui`, same MIT
license): the framed variant of `ui/table.css` and the inline code, blockquote
and list marker in `ui/typography.css` (from `src/components/markdown.css`), and
the empty-state colours in `ui/empty.css` (from
`src/v2/components/session-review-v2.css`). Kitsaas also follows opencode's
hosted console; rules read from its stylesheet are named in each file's header.
