import type { ComponentProps, JSX } from '@solidjs/web'
import {
  PasswordInput as UiPasswordInput,
  PasswordInputControl as UiPasswordInputControl,
  PasswordInputToggle as UiPasswordInputToggle,
  type PasswordInputState,
} from '@ui-sdk/solid/password-input'
import { omit, Show } from 'solid-js'

import './password-input.css'

export { createPasswordInputController } from '@ui-sdk/solid/password-input'
export type {
  InputValueChangeReason,
  PasswordInputController,
  PasswordInputOptions,
  PasswordInputPrimitive,
  PasswordInputState,
  PasswordInputVisibleChangeReason,
} from '@ui-sdk/solid/password-input'

export type PasswordInputAppearance = 'small' | 'base' | 'large'
export type PasswordInputSurface = 'base' | 'layer-1' | 'invisible'

type UiPasswordInputProps = ComponentProps<typeof UiPasswordInput>

export type PasswordInputProps = Omit<
  UiPasswordInputProps,
  'class' | 'render' | 'children'
> & {
  /** Field height: `small` (24px), `base` (28px, default), or `large` (32px). */
  appearance?: PasswordInputAppearance
  /** Background fill. Defaults to `base`. */
  surface?: PasswordInputSurface
  /** Marks the outline and text red. */
  invalid?: boolean
  /** Optional icon rendered before the field. */
  leadingIcon?: JSX.Element
  class?: UiPasswordInputProps['class']
  render?: UiPasswordInputProps['render']
  children?: UiPasswordInputProps['children']
}

export function PasswordInput(props: PasswordInputProps) {
  const rest = omit(
    props,
    'appearance',
    'surface',
    'invalid',
    'leadingIcon',
    'class',
    'render',
    'children',
  )

  return (
    <UiPasswordInput
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      data-leading-icon={props.leadingIcon ? '' : undefined}
    >
      {(state: PasswordInputState) => (
        <>
          <Show when={props.leadingIcon}>
            <span data-slot="password-input-leading-icon">
              {props.leadingIcon}
            </span>
          </Show>
          {typeof props.children === 'function'
            ? props.children(state)
            : props.children}
        </>
      )}
    </UiPasswordInput>
  )
}

type UiPasswordInputControlProps = ComponentProps<typeof UiPasswordInputControl>

export type PasswordInputControlProps = Omit<
  UiPasswordInputControlProps,
  'class' | 'render'
> & {
  /** Marks the native input invalid for assistive tech. */
  invalid?: boolean
  class?: UiPasswordInputControlProps['class']
  render?: UiPasswordInputControlProps['render']
}

export function PasswordInputControl(props: PasswordInputControlProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiPasswordInputControl
      {...rest}
      class={props.class}
      render={props.render}
      aria-invalid={props.invalid ? 'true' : props['aria-invalid']}
    />
  )
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.25}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M1.75 8s2.25-4 6.25-4 6.25 4 6.25 4-2.25 4-6.25 4S1.75 8 1.75 8Z" />
      <circle cx="8" cy="8" r="1.75" />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.25}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6.7 4.2A6.6 6.6 0 0 1 8 4c4 0 6.25 4 6.25 4a11.3 11.3 0 0 1-1.9 2.35" />
      <path d="M9.3 9.3a1.75 1.75 0 0 1-2.6-2.6" />
      <path d="M10.7 11.5A6.7 6.7 0 0 1 8 12c-4 0-6.25-4-6.25-4a11.5 11.5 0 0 1 2.75-3" />
      <path d="m2 2 12 12" />
    </svg>
  )
}

type UiPasswordInputToggleProps = ComponentProps<typeof UiPasswordInputToggle>

export type PasswordInputToggleProps = Omit<
  UiPasswordInputToggleProps,
  'class' | 'render' | 'children'
> & {
  class?: UiPasswordInputToggleProps['class']
  render?: UiPasswordInputToggleProps['render']
  children?: UiPasswordInputToggleProps['children']
}

export function PasswordInputToggle(props: PasswordInputToggleProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiPasswordInputToggle
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state: PasswordInputState) => {
        if (props.children !== undefined) {
          return typeof props.children === 'function'
            ? props.children(state)
            : props.children
        }
        return state.visible ? <EyeOffIcon /> : <EyeIcon />
      }}
    </UiPasswordInputToggle>
  )
}
