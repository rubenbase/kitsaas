import type { ComponentProps } from '@solidjs/web'
import { Textarea as UiTextarea } from '@ui-sdk/solid/textarea'
import { omit } from 'solid-js'

import './textarea.css'

/**
 * Textarea, a 1:1 port of opencode's `@opencode/ui` Textarea (MIT):
 * `packages/ui/src/forms/textarea` (`textarea-v2`, `textarea.css`).
 *
 * Styling lives in `textarea.css` as attribute rules (`data-surface`,
 * `data-invalid`, `data-disabled`), so every state — rest, hover, focus,
 * invalid and disabled — matches upstream.
 *
 * Upstream renders a wrapper div around a bare `<textarea>`; ui-sdk renders the
 * native `<textarea>` as its root, so the wrapper's box, focus ring and surface
 * land on the field itself (see `textarea.css`). Behaviour (value and change
 * reasons, native typing, form submission and reset, `autoResize`,
 * `submitShortcut`, controllers, `data-filled`, `data-disabled` and
 * `data-readonly`) comes from `@ui-sdk/solid`.
 *
 * `surface="base"` (default) is upstream's raised input fill; `layer-1` is the
 * flat layer fill. `rows` defaults to 3, as upstream does.
 */

export type TextareaSurface = 'base' | 'layer-1'

type UiTextareaProps = ComponentProps<typeof UiTextarea>

export type TextareaProps = Omit<
  UiTextareaProps,
  'class' | 'render' | 'rows'
> & {
  /** Background fill. Defaults to `base`. */
  surface?: TextareaSurface
  /** Marks the outline and the text red, like upstream's `invalid`. */
  invalid?: boolean
  /** Visible lines at rest. Defaults to 3, like upstream. */
  rows?: UiTextareaProps['rows']
  class?: UiTextareaProps['class']
  render?: UiTextareaProps['render']
}

export function Textarea(props: TextareaProps) {
  const rest = omit(props, 'surface', 'invalid', 'rows', 'class', 'render')

  return (
    <UiTextarea
      {...rest}
      class={props.class}
      render={props.render}
      rows={props.rows ?? 3}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}
