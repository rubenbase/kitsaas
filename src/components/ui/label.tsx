import type { ComponentProps } from '@solidjs/web'
import { Label as UiLabel } from '@ui-sdk/solid/label'
import { omit, Show } from 'solid-js'

import './label.css'

export type { LabelOptions, LabelPrimitive } from '@ui-sdk/solid/label'

/**
 * Label, matching `field.css` label typography on top of ui-sdk's headless
 * Label.
 *
 * Unlike a plain `<label>`, ui-sdk's Label also names and activates non-native
 * controls such as `Switch`, `RadioGroup` and `Slider` by `for` or wrapping,
 * and prevents text selection on double-click.
 */

type UiLabelProps = ComponentProps<typeof UiLabel>

export type LabelProps = Omit<
  UiLabelProps,
  'class' | 'render' | 'children'
> & {
  /** Shows a subtle required indicator (`*`) and marks `data-required`. */
  required?: boolean
  /** Marks the label disabled (`data-disabled`). */
  disabled?: boolean
  /** Marks the label invalid (`data-invalid`). */
  invalid?: boolean
  class?: UiLabelProps['class']
  render?: UiLabelProps['render']
  children?: UiLabelProps['children']
}

export function Label(props: LabelProps) {
  const rest = omit(
    props,
    'required',
    'disabled',
    'invalid',
    'class',
    'render',
    'children',
  )

  return (
    <UiLabel
      {...rest}
      class={props.class}
      render={props.render}
      data-required={props.required ? '' : undefined}
      data-disabled={props.disabled ? '' : undefined}
      data-invalid={props.invalid ? '' : undefined}
    >
      {(state) => (
        <>
          {typeof props.children === 'function'
            ? props.children(state)
            : props.children}
          <Show when={props.required}>
            <span data-slot="label-required" aria-hidden="true">
              *
            </span>
          </Show>
        </>
      )}
    </UiLabel>
  )
}
