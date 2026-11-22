import type { ComponentProps } from '@solidjs/web'
import {
  Field as UiField,
  FieldDescription as UiFieldDescription,
  FieldError as UiFieldError,
  FieldLabel as UiFieldLabel,
} from '@ui-sdk/solid/field'
import { omit } from 'solid-js'

import './field.css'

/**
 * Field, a 1:1 port of opencode's `@opencode/ui` Field visuals (MIT):
 * `packages/ui/src/forms/field` (`field-v2`, `field.css`), on top of ui-sdk's
 * headless Field, FieldLabel, FieldDescription and FieldError.
 *
 * Styling lives in `field.css` as attribute rules (`data-slot`, `data-invalid`,
 * `data-required`, `data-disabled`), so the row layout, label and helper copy
 * match upstream. Behaviour comes from `@ui-sdk/solid`: the control's `id`,
 * `for`, `aria-labelledby`, `aria-describedby` and `aria-invalid`, native
 * constraint validation once a submit finds a problem, `<fieldset>` disabling,
 * and the shared `data-*` state every part carries.
 *
 * This is the wrapper around the controls; it does not restyle them. Compose it
 * with the Kitsaas Input, Textarea or Select:
 *
 *   <Field name="email" invalid>
 *     <FieldLabel>Email</FieldLabel>
 *     <InputGroup>
 *       <Input type="email" required />
 *     </InputGroup>
 *     <FieldDescription>We'll only use it for receipts.</FieldDescription>
 *     <FieldError />
 *   </Field>
 *
 * Upstream also renders an info button with a tooltip beside the label and a
 * `Field.Control` layout wrapper. ui-sdk's Field has no tooltip part, and its
 * `FieldControl` is a native `<input>`, not a wrapper, so neither is wrapped
 * here. Use a native `<fieldset>` to disable several fields at once.
 */

type UiFieldProps = ComponentProps<typeof UiField>

export type FieldProps = Omit<UiFieldProps, 'class' | 'render'> & {
  class?: UiFieldProps['class']
  render?: UiFieldProps['render']
}

export function Field(props: FieldProps) {
  const rest = omit(props, 'class', 'render')

  return <UiField {...rest} class={props.class} render={props.render} />
}

type UiFieldLabelProps = ComponentProps<typeof UiFieldLabel>

export type FieldLabelProps = Omit<UiFieldLabelProps, 'class' | 'render'> & {
  class?: UiFieldLabelProps['class']
  render?: UiFieldLabelProps['render']
}

/** The label that names the field's control; carries `data-required` with it. */
export function FieldLabel(props: FieldLabelProps) {
  const rest = omit(props, 'class', 'render')

  return <UiFieldLabel {...rest} class={props.class} render={props.render} />
}

type UiFieldDescriptionProps = ComponentProps<typeof UiFieldDescription>

export type FieldDescriptionProps = Omit<
  UiFieldDescriptionProps,
  'class' | 'render'
> & {
  class?: UiFieldDescriptionProps['class']
  render?: UiFieldDescriptionProps['render']
}

/** Upstream's prefix/suffix copy: 11px, muted, one line high. */
export function FieldDescription(props: FieldDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiFieldDescription {...rest} class={props.class} render={props.render} />
  )
}

type UiFieldErrorProps = ComponentProps<typeof UiFieldError>

export type FieldErrorProps = Omit<UiFieldErrorProps, 'class' | 'render'> & {
  class?: UiFieldErrorProps['class']
  render?: UiFieldErrorProps['render']
}

/**
 * Shows while the field is invalid. Without children it shows the browser's
 * message; `match` picks one validity flag.
 */
export function FieldError(props: FieldErrorProps) {
  const rest = omit(props, 'class', 'render')

  return <UiFieldError {...rest} class={props.class} render={props.render} />
}
