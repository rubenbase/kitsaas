import type { ComponentProps } from '@solidjs/web'
import {
  Switch as UiSwitch,
  SwitchThumb as UiSwitchThumb,
} from '@ui-sdk/solid/switch'
import { omit } from 'solid-js'

import './switch.css'

/**
 * Switch, a 1:1 port of opencode's `@opencode/ui/switch` visuals (MIT) on top
 * of ui-sdk's headless Switch and SwitchThumb. Upstream lives in
 * `packages/ui/src/forms/switch`.
 *
 * Styling lives in `switch.css` as attribute rules (`data-appearance`,
 * `data-checked`, `data-invalid`, `data-disabled`, `data-readonly`), copied
 * from opencode's `forms/switch/switch.css`, so every state — rest, hover,
 * checked, checked hover, focus-visible, disabled, invalid and read-only —
 * matches upstream in both of its appearances.
 *
 * `appearance="compact"` (default, as upstream) is the design-system switch;
 * `appearance="standard"` is its legacy look with a bordered track.
 *
 * Behaviour (Space toggles, the hidden native input, name / value submission
 * and reset, `<fieldset>` disabling, read-only, required validation, ARIA
 * switch state, controllers) comes from `@ui-sdk/solid`.
 *
 * Upstream's root is a row that also holds the label, description and error.
 * ui-sdk renders the control itself as the root, so wrap `<Switch>` and its
 * text in a `<label>` and style that text yourself.
 */

export type SwitchAppearance = 'compact' | 'standard'

type UiSwitchProps = ComponentProps<typeof UiSwitch>

export type SwitchProps = Omit<UiSwitchProps, 'class' | 'render'> & {
  /** Defaults to `compact`, like opencode's switch. */
  appearance?: SwitchAppearance
  /** Marks the track red, like upstream's `validationState="invalid"`. */
  invalid?: boolean
  class?: UiSwitchProps['class']
  render?: UiSwitchProps['render']
}

export function Switch(props: SwitchProps) {
  const rest = omit(props, 'appearance', 'invalid', 'class', 'render')

  return (
    <UiSwitch
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={props.appearance ?? 'compact'}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiSwitchThumbProps = ComponentProps<typeof UiSwitchThumb>

export type SwitchThumbProps = Omit<UiSwitchThumbProps, 'class' | 'render'> & {
  class?: UiSwitchThumbProps['class']
  render?: UiSwitchThumbProps['render']
}

/** The sliding 12px (compact) or 14px (standard) thumb. */
export function SwitchThumb(props: SwitchThumbProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiSwitchThumb {...rest} class={props.class} render={props.render} />
  )
}
