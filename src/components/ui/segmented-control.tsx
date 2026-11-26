import type { ComponentProps } from '@solidjs/web'
import {
  SegmentedControl as UiSegmentedControl,
  SegmentedControlIndicator as UiSegmentedControlIndicator,
  SegmentedControlItem as UiSegmentedControlItem,
} from '@ui-sdk/solid/segmented-control'
import { omit } from 'solid-js'

import './segmented-control.css'

/**
 * SegmentedControl, a 1:1 port of opencode's SegmentedControl (`@opencode/ui`,
 * MIT): `packages/ui/src/navigation/segmented-control`, on top of ui-sdk's
 * headless SegmentedControl.
 *
 * Styling lives in `segmented-control.css` as attribute rules (`data-checked`,
 * `data-disabled`, `data-orientation`, `data-activation-direction`), so rest,
 * hover, checked, focus and disabled — and the indicator sliding to the
 * checked item — match upstream. Behaviour (radio-group semantics, the single
 * tab stop, arrow keys, the hidden form radios, measuring the indicator) comes
 * from `@ui-sdk/solid`.
 *
 * `SegmentedControlItem` keeps upstream's label box around its children:
 * ui-sdk renders an item's children straight into the button, and the ellipsis
 * and icon spacing live on that box.
 */

type UiSegmentedControlProps = ComponentProps<typeof UiSegmentedControl>

export type SegmentedControlProps = Omit<
  UiSegmentedControlProps,
  'class' | 'render'
> & {
  class?: UiSegmentedControlProps['class']
  render?: UiSegmentedControlProps['render']
}

export function SegmentedControl(props: SegmentedControlProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSegmentedControl {...rest} class={props.class} render={props.render} />
  )
}

type UiSegmentedControlIndicatorProps = ComponentProps<
  typeof UiSegmentedControlIndicator
>

export type SegmentedControlIndicatorProps = Omit<
  UiSegmentedControlIndicatorProps,
  'class' | 'render'
> & {
  class?: UiSegmentedControlIndicatorProps['class']
  render?: UiSegmentedControlIndicatorProps['render']
}

export function SegmentedControlIndicator(
  props: SegmentedControlIndicatorProps,
) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSegmentedControlIndicator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiSegmentedControlItemProps = ComponentProps<typeof UiSegmentedControlItem>

export type SegmentedControlItemProps = Omit<
  UiSegmentedControlItemProps,
  'class' | 'render'
> & {
  class?: UiSegmentedControlItemProps['class']
  render?: UiSegmentedControlItemProps['render']
}

export function SegmentedControlItem(props: SegmentedControlItemProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiSegmentedControlItem
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state) => (
        <span data-slot="segmented-control-item-label">
          {typeof props.children === 'function'
            ? props.children(state)
            : props.children}
        </span>
      )}
    </UiSegmentedControlItem>
  )
}
