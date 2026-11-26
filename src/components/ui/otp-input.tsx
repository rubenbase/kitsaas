import type { ComponentProps } from '@solidjs/web'
import {
  OTPInput as UiOTPInput,
  OTPInputGroup as UiOTPInputGroup,
  OTPInputSeparator as UiOTPInputSeparator,
  OTPInputSlot as UiOTPInputSlot,
} from '@ui-sdk/solid/otp-input'
import { omit } from 'solid-js'

import './otp-input.css'

export { createOTPInputController } from '@ui-sdk/solid/otp-input'
export type {
  OTPInputApi,
  OTPInputChangeOptions,
  OTPInputController,
  OTPInputOptions,
  OTPInputPattern,
  OTPInputSlotData,
  OTPInputSlotProps as UiOTPInputSlotProps,
  OTPInputSlotState,
  OTPInputState,
  OTPInputValueChangeReason,
  OtpInputPrimitive,
} from '@ui-sdk/solid/otp-input'

type UiOTPInputProps = ComponentProps<typeof UiOTPInput>

export type OTPInputProps = Omit<UiOTPInputProps, 'class' | 'render'> & {
  /** Marks all slots invalid and sets `aria-invalid="true"` on the underlying input. */
  invalid?: boolean
  class?: UiOTPInputProps['class']
  render?: UiOTPInputProps['render']
}

export function OTPInput(props: OTPInputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiOTPInput
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : props['aria-invalid']}
    />
  )
}

type UiOTPInputGroupProps = ComponentProps<typeof UiOTPInputGroup>

export type OTPInputGroupProps = Omit<
  UiOTPInputGroupProps,
  'class' | 'render'
> & {
  class?: UiOTPInputGroupProps['class']
  render?: UiOTPInputGroupProps['render']
}

export function OTPInputGroup(props: OTPInputGroupProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiOTPInputGroup {...rest} class={props.class} render={props.render} />
  )
}

type UiOTPInputSlotPartProps = ComponentProps<typeof UiOTPInputSlot>

export type OTPInputSlotPartProps = Omit<
  UiOTPInputSlotPartProps,
  'class' | 'render'
> & {
  class?: UiOTPInputSlotPartProps['class']
  render?: UiOTPInputSlotPartProps['render']
}

export function OTPInputSlot(props: OTPInputSlotPartProps) {
  const rest = omit(props, 'class', 'render')

  return <UiOTPInputSlot {...rest} class={props.class} render={props.render} />
}

function SeparatorDash() {
  return (
    <svg
      viewBox="0 0 12 12"
      width={12}
      height={12}
      fill="none"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 6h7" />
    </svg>
  )
}

type UiOTPInputSeparatorProps = ComponentProps<typeof UiOTPInputSeparator>

export type OTPInputSeparatorProps = Omit<
  UiOTPInputSeparatorProps,
  'class' | 'render'
> & {
  class?: UiOTPInputSeparatorProps['class']
  render?: UiOTPInputSeparatorProps['render']
}

export function OTPInputSeparator(props: OTPInputSeparatorProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiOTPInputSeparator
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <SeparatorDash />}
    </UiOTPInputSeparator>
  )
}
