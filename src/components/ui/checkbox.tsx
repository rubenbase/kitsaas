import type { ComponentProps } from '@solidjs/web'
import {
  Checkbox as UiCheckbox,
  CheckboxIndicator as UiCheckboxIndicator,
} from '@ui-sdk/solid/checkbox'
import { omit } from 'solid-js'

import './checkbox.css'

/**
 * Checkbox, a 1:1 port of opencode's `@opencode/ui/checkbox` visuals on top of
 * ui-sdk's headless Checkbox.
 *
 * Styling lives in `checkbox.css` as attribute rules (`data-appearance`,
 * `data-surface`, `data-checked`, `data-indeterminate`, `data-invalid`,
 * `data-disabled`, `data-readonly`), copied from opencode's
 * `forms/checkbox/checkbox.css` and `forms/checkbox/checkbox-compact.css`, so
 * every state — rest, hover, focus, checked, mixed, invalid, disabled,
 * read-only — matches upstream. Behaviour (Space and Enter, the hidden native
 * input, form submission and reset, ARIA state, groups and parent checkboxes)
 * comes from `@ui-sdk/solid`.
 *
 * `appearance="standard"` (default) is upstream's legacy look;
 * `appearance="compact"` is its design-system checkbox, which also takes
 * `surface="layer-1"` for a control on a raised layer.
 *
 * Upstream's label, description and error are parts of its root; ui-sdk keeps
 * the label outside the control, so wrap `<Checkbox>` and its text in a
 * `<label>` and style that text yourself.
 */

export type CheckboxAppearance = 'standard' | 'compact'
export type CheckboxSurface = 'base' | 'layer-1'

type UiCheckboxProps = ComponentProps<typeof UiCheckbox>

export type CheckboxProps = Omit<UiCheckboxProps, 'class' | 'render'> & {
  /** Defaults to `standard`, upstream's legacy look. */
  appearance?: CheckboxAppearance
  /** Control fill for `appearance="compact"`. Defaults to `base`. */
  surface?: CheckboxSurface
  /** Marks the box red, like upstream's `validationState="invalid"`. */
  invalid?: boolean
  class?: UiCheckboxProps['class']
  render?: UiCheckboxProps['render']
}

export function Checkbox(props: CheckboxProps) {
  const rest = omit(props, 'appearance', 'surface', 'invalid', 'class', 'render')

  const appearance = () => props.appearance ?? 'standard'

  return (
    <UiCheckbox
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={appearance()}
      data-surface={
        appearance() === 'compact' ? (props.surface ?? 'base') : undefined
      }
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiCheckboxIndicatorProps = ComponentProps<typeof UiCheckboxIndicator>

export type CheckboxIndicatorProps = Omit<
  UiCheckboxIndicatorProps,
  'class' | 'render'
> & {
  class?: UiCheckboxIndicatorProps['class']
  render?: UiCheckboxIndicatorProps['render']
}

/** The check (and minus) inside the box; see `checkbox.css` for the icon order. */
export function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCheckboxIndicator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
