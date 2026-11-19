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
