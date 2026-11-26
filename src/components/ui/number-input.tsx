import type { ComponentProps } from '@solidjs/web'
import {
  NumberInput as UiNumberInput,
  NumberInputControl as UiNumberInputControl,
  NumberInputDecrement as UiNumberInputDecrement,
  NumberInputGroup as UiNumberInputGroup,
  NumberInputIncrement as UiNumberInputIncrement,
  NumberInputScrubArea as UiNumberInputScrubArea,
  NumberInputScrubAreaCursor as UiNumberInputScrubAreaCursor,
} from '@ui-sdk/solid/number-input'
import { omit } from 'solid-js'

import './number-input.css'

export { createNumberInputController } from '@ui-sdk/solid/number-input'
export type {
  NumberInputApi,
  NumberInputButtonProps,
  NumberInputButtonState,
  NumberInputChangeOptions,
  NumberInputController,
  NumberInputOptions,
  NumberInputPrimitive,
  NumberInputScrubAreaProps as UiNumberInputScrubAreaProps,
  NumberInputState,
  NumberInputValueChangeReason,
} from '@ui-sdk/solid/number-input'

export type NumberInputAppearance = 'small' | 'base' | 'large'
export type NumberInputSurface = 'base' | 'layer-1' | 'invisible'

type UiNumberInputProps = ComponentProps<typeof UiNumberInput>

export type NumberInputProps = Omit<UiNumberInputProps, 'class' | 'render'> & {
  /** Marks the field group invalid. */
  invalid?: boolean
  class?: UiNumberInputProps['class']
  render?: UiNumberInputProps['render']
}

export function NumberInput(props: NumberInputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiNumberInput
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiNumberInputGroupProps = ComponentProps<typeof UiNumberInputGroup>

export type NumberInputGroupProps = Omit<
  UiNumberInputGroupProps,
  'class' | 'render'
> & {
  /** Field height: `small` (24px), `base` (28px, default), or `large` (32px). */
  appearance?: NumberInputAppearance
  /** Background fill. Defaults to `base`. */
  surface?: NumberInputSurface
  /** Marks the outline and text red. */
  invalid?: boolean
  class?: UiNumberInputGroupProps['class']
  render?: UiNumberInputGroupProps['render']
}

export function NumberInputGroup(props: NumberInputGroupProps) {
  const rest = omit(props, 'appearance', 'surface', 'invalid', 'class', 'render')

  return (
    <UiNumberInputGroup
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiNumberInputControlProps = ComponentProps<typeof UiNumberInputControl>

export type NumberInputControlProps = Omit<
  UiNumberInputControlProps,
  'class' | 'render'
> & {
  /** Marks the field invalid for assistive tech. */
  invalid?: boolean
  class?: UiNumberInputControlProps['class']
  render?: UiNumberInputControlProps['render']
}

export function NumberInputControl(props: NumberInputControlProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiNumberInputControl
      {...rest}
      class={props.class}
      render={props.render}
      aria-invalid={props.invalid ? 'true' : props['aria-invalid']}
    />
  )
}

function MinusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.35}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3.5 8h9" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.35}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M8 3.5v9M3.5 8h9" />
    </svg>
  )
}

type UiNumberInputDecrementProps = ComponentProps<typeof UiNumberInputDecrement>

export type NumberInputDecrementProps = Omit<
  UiNumberInputDecrementProps,
  'class' | 'render'
> & {
  class?: UiNumberInputDecrementProps['class']
  render?: UiNumberInputDecrementProps['render']
}

export function NumberInputDecrement(props: NumberInputDecrementProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiNumberInputDecrement
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <MinusIcon />}
    </UiNumberInputDecrement>
  )
}

type UiNumberInputIncrementProps = ComponentProps<typeof UiNumberInputIncrement>

export type NumberInputIncrementProps = Omit<
  UiNumberInputIncrementProps,
  'class' | 'render'
> & {
  class?: UiNumberInputIncrementProps['class']
  render?: UiNumberInputIncrementProps['render']
}

export function NumberInputIncrement(props: NumberInputIncrementProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiNumberInputIncrement
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <PlusIcon />}
    </UiNumberInputIncrement>
  )
}

type UiNumberInputScrubAreaPartProps = ComponentProps<
  typeof UiNumberInputScrubArea
>

export type NumberInputScrubAreaPartProps = Omit<
  UiNumberInputScrubAreaPartProps,
  'class' | 'render'
> & {
  class?: UiNumberInputScrubAreaPartProps['class']
  render?: UiNumberInputScrubAreaPartProps['render']
}

export function NumberInputScrubArea(props: NumberInputScrubAreaPartProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNumberInputScrubArea
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiNumberInputScrubAreaCursorProps = ComponentProps<
  typeof UiNumberInputScrubAreaCursor
>

export type NumberInputScrubAreaCursorProps = Omit<
  UiNumberInputScrubAreaCursorProps,
  'class' | 'render'
> & {
  class?: UiNumberInputScrubAreaCursorProps['class']
  render?: UiNumberInputScrubAreaCursorProps['render']
}

export function NumberInputScrubAreaCursor(
  props: NumberInputScrubAreaCursorProps,
) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNumberInputScrubAreaCursor
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
