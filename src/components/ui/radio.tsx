import type { ComponentProps } from '@solidjs/web'
import {
  Radio as UiRadio,
  RadioGroup as UiRadioGroup,
  RadioIndicator as UiRadioIndicator,
} from '@ui-sdk/solid/radio'
import { omit } from 'solid-js'

import './radio.css'

/**
 * Radio, a 1:1 port of opencode's `@opencode/ui/radio` visuals on top of
 * ui-sdk's headless RadioGroup, Radio and RadioIndicator.
 *
 * Styling lives in `radio.css` as attribute rules (`data-checked`,
 * `data-disabled`, `data-readonly`, `data-invalid`), copied from opencode's
 * `forms/radio/radio.css`, so every state — rest, hover, checked, checked
 * hover, focus-visible, disabled and invalid — matches upstream.
 *
 * Behaviour (one tab stop per group, arrow keys that check as they move,
 * Space, form submission and reset, read-only, `<fieldset>` disabling, ARIA
 * state) comes from `@ui-sdk/solid`.
 *
 * Upstream's group also renders its own label, description and error, and each
 * item renders its own label text and description. ui-sdk keeps those outside
 * the parts, so wrap a `<Radio>` and its text in a `<label>` and style the text
 * yourself, as the docs page does.
 */

type UiRadioGroupProps = ComponentProps<typeof UiRadioGroup>

export type RadioGroupProps = Omit<UiRadioGroupProps, 'class' | 'render'> & {
  /** Marks the group's unchecked radios red, like upstream's `validationState="invalid"`. */
  invalid?: boolean
  class?: UiRadioGroupProps['class']
  render?: UiRadioGroupProps['render']
}

export function RadioGroup(props: RadioGroupProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiRadioGroup
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiRadioProps = ComponentProps<typeof UiRadio>

export type RadioProps = Omit<UiRadioProps, 'class' | 'render'> & {
  /** Marks this radio red while unchecked, when it is not in an invalid group. */
  invalid?: boolean
  class?: UiRadioProps['class']
  render?: UiRadioProps['render']
}

export function Radio(props: RadioProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiRadio
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiRadioIndicatorProps = ComponentProps<typeof UiRadioIndicator>

export type RadioIndicatorProps = Omit<
  UiRadioIndicatorProps,
  'class' | 'render'
> & {
  class?: UiRadioIndicatorProps['class']
  render?: UiRadioIndicatorProps['render']
}

/** The 6px dot, rendered while its radio is checked. */
export function RadioIndicator(props: RadioIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiRadioIndicator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
