import type { ComponentProps } from '@solidjs/web'
import { Separator as UiSeparator } from '@ui-sdk/solid/separator'
import { omit } from 'solid-js'

import './separator.css'

/**
 * Separator, a 1:1 port of opencode's `@opencode/ui` Divider visuals (MIT):
 * `packages/ui/src/layout/divider` (`divider-v2`, `divider.css`), on top of
 * ui-sdk's headless Separator.
 *
 * Styling lives in `separator.css` as attribute rules (`data-orientation`), so
 * the 1px hairline, its half-pixel transform and its colour match upstream.
 * Behaviour comes from `@ui-sdk/solid`: the `separator` role,
 * `aria-orientation`, and `role="none"` when `decorative`. It never takes
 * focus. `orientation` and `decorative` need no data-* of their own: ui-sdk
 * already renders `data-orientation` for the styling.
 *
 * Upstream's Divider is horizontal only. `orientation="vertical"` mirrors its
 * values onto the other axis; that rule is a Kitsaas addition, since ui-sdk
 * supports the orientation.
 */

type UiSeparatorProps = ComponentProps<typeof UiSeparator>

export type SeparatorProps = Omit<UiSeparatorProps, 'class' | 'render'> & {
  class?: UiSeparatorProps['class']
  render?: UiSeparatorProps['render']
}

export function Separator(props: SeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return <UiSeparator {...rest} class={props.class} render={props.render} />
}
