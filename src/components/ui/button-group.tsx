import type { ComponentProps, JSX } from '@solidjs/web'
import { Separator as UiSeparator } from '@ui-sdk/solid/separator'
import { omit } from 'solid-js'

import './button-group.css'

/**
 * ButtonGroup, Kitsaas's take on shadcn's ButtonGroup: joins related actions
 * (buttons, input groups, select triggers, text) into one segmented row or
 * column.
 *
 * ui-sdk has no button group, so the root is a plain `role="group"` and the
 * joining lives in `button-group.css` as attribute rules. The separator is
 * ui-sdk's headless Separator (`role="separator"`, `aria-orientation`) with
 * Kitsaas's hairline from `separator.css`.
 *
 * Purely visual: each control keeps its own tab stop. Use `Toolbar` when the
 * set should be one tab stop with arrow keys, and `ToggleGroup` for buttons
 * that stay pressed. Nest ButtonGroups to space sets apart; each nested group
 * joins its own children.
 */

export type ButtonGroupOrientation = 'horizontal' | 'vertical'

export type ButtonGroupProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Names the group for assistive tech, e.g. "Text alignment". */
  'aria-label'?: string
  /** Defaults to `horizontal`. */
  orientation?: ButtonGroupOrientation
}

export function ButtonGroup(props: ButtonGroupProps) {
  const rest = omit(props, 'orientation')

  return (
    <div
      role="group"
      {...rest}
      data-slot="button-group"
      data-orientation={props.orientation ?? 'horizontal'}
    />
  )
}

type UiSeparatorProps = ComponentProps<typeof UiSeparator>

export type ButtonGroupSeparatorProps = Omit<
  UiSeparatorProps,
  'class' | 'render'
> & {
  /** Defaults to `vertical`, to split a horizontal group. */
  orientation?: UiSeparatorProps['orientation']
  class?: UiSeparatorProps['class']
  render?: UiSeparatorProps['render']
}

/**
 * The seam between filled buttons (`neutral`, `contrast`…); `outline` buttons
 * draw their own. Pass `orientation="horizontal"` inside a vertical group.
 */
export function ButtonGroupSeparator(props: ButtonGroupSeparatorProps) {
  const rest = omit(props, 'orientation', 'class', 'render')

  return (
    <UiSeparator
      {...rest}
      class={props.class}
      render={props.render}
      orientation={props.orientation ?? 'vertical'}
    />
  )
}

export type ButtonGroupTextProps = JSX.HTMLAttributes<HTMLDivElement>

/** A static label or value joined into a ButtonGroup, e.g. a URL prefix. */
export function ButtonGroupText(props: ButtonGroupTextProps) {
  return <div {...props} data-slot="button-group-text" />
}
