import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Input as UiInput,
  InputClear as UiInputClear,
  InputGroup as UiInputGroup,
} from '@ui-sdk/solid/input'
import { omit, Show } from 'solid-js'

import './input.css'

/**
 * Input, a 1:1 port of opencode's TextInput (`@opencode/ui`, MIT):
 * `packages/ui/src/forms/text-input/text-input.css` (`text-input-v2`).
 *
 * Styling lives in `input.css` as attribute rules (`data-appearance`,
 * `data-surface`, `data-invalid`, `data-numeric`, `data-leading-icon`,
 * `data-disabled`), so every state — rest, hover, focus, invalid and disabled —
 * matches upstream. Behaviour (value, change reasons, native typing and form
 * submission, the clear button, disabled and read-only, pressing the group's
 * text to focus the field, `data-filled`) comes from `@ui-sdk/solid`.
 *
 * Upstream renders one container that holds the field, its leading icon and
 * its icon button. ui-sdk splits that into three parts, so the box is
 * `InputGroup` and a bare `<Input>` is the native field it wraps:
 *
 *   <InputGroup appearance="base" leadingIcon={<SearchIcon />} invalid>
 *     <Input placeholder="Search" />
 *     <InputClear aria-label="Clear search"><CloseIcon /></InputClear>
 *   </InputGroup>
 *
 * `appearance="base"` (default) is upstream's 28px field; `small` is 24px and
 * `large` 32px. `surface="layer-1"` fills with the raised layer and
 * `surface="invisible"` drops the fill and elevation, gaining a hover fill.
 * Upstream also nests a settings `Field` wrapper (`text-field.css`); that is a
 * label, description and error around the control, so it stays with ui-sdk's
 * own `Field` and is not ported here.
 */

export type InputAppearance = 'small' | 'base' | 'large'
export type InputSurface = 'base' | 'layer-1' | 'invisible'

type UiInputGroupProps = ComponentProps<typeof UiInputGroup>

export type InputGroupProps = Omit<
  UiInputGroupProps,
  'class' | 'render' | 'children'
> & {
  /** Defaults to `base`, like opencode's text input. */
  appearance?: InputAppearance
  /** Background fill. Defaults to `base`. */
  surface?: InputSurface
  /** Marks the outline and the text red, like upstream's `invalid`. */
  invalid?: boolean
  /** Applies tabular numerals to the field value. */
  numeric?: boolean
  /** Icon or adornment shown before the field value. */
  leadingIcon?: JSX.Element
  class?: UiInputGroupProps['class']
  render?: UiInputGroupProps['render']
  children?: JSX.Element
}

export function InputGroup(props: InputGroupProps) {
  const rest = omit(
    props,
    'appearance',
    'surface',
    'invalid',
    'numeric',
    'leadingIcon',
    'class',
    'render',
    'children',
  )

  return (
    <UiInputGroup
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'base'}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      data-numeric={props.numeric ? '' : undefined}
      data-leading-icon={props.leadingIcon ? '' : undefined}
    >
      <Show when={props.leadingIcon}>
        <span data-slot="input-leading-icon">{props.leadingIcon}</span>
      </Show>
      {props.children}
    </UiInputGroup>
  )
}

type UiInputProps = ComponentProps<typeof UiInput>

export type InputProps = Omit<UiInputProps, 'class' | 'render'> & {
  /** Marks the field itself invalid for assistive tech; the group carries the look. */
  invalid?: boolean
  class?: UiInputProps['class']
  render?: UiInputProps['render']
}

export function Input(props: InputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiInput
      {...rest}
      class={props.class}
      render={props.render}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiInputClearProps = ComponentProps<typeof UiInputClear>

export type InputClearProps = Omit<UiInputClearProps, 'class' | 'render'> & {
  class?: UiInputClearProps['class']
  render?: UiInputClearProps['render']
}

/** The 20px icon button at the field's end; ui-sdk renders it while there is text. */
export function InputClear(props: InputClearProps) {
  const rest = omit(props, 'class', 'render')

  return <UiInputClear {...rest} class={props.class} render={props.render} />
}
