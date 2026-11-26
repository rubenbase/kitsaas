import type { ComponentProps } from '@solidjs/web'
import {
  createToggleController,
  createToggleGroupController,
  Toggle as UiToggle,
  ToggleGroup as UiToggleGroup,
  ToggleIcon as UiToggleIcon,
} from '@ui-sdk/solid/toggle'
import { createContext, omit, useContext } from 'solid-js'

import './toggle.css'

export { createToggleController, createToggleGroupController }

export type {
  ToggleApi,
  ToggleChangeOptions,
  ToggleController,
  ToggleGroupApi,
  ToggleGroupChangeOptions,
  ToggleGroupController,
  ToggleGroupOptions,
  ToggleGroupOrientation,
  ToggleGroupState,
  ToggleGroupValueChangeReason,
  ToggleIconProps,
  ToggleIconState,
  ToggleOptions,
  TogglePressedChangeReason,
  ToggleState,
} from '@ui-sdk/solid/toggle'

/**
 * Toggle and ToggleGroup, styled for Kitsaas on top of ui-sdk's headless
 * Toggle primitives.
 *
 * Supports `variant` (`neutral`, `outline`, `ghost`) and `size` (`small`,
 * `normal`, `large`). Inside a `ToggleGroup`, child toggles inherit the
 * group's `variant` (defaulting to `ghost`) and `size` unless overridden.
 */

export type ToggleVariant = 'neutral' | 'outline' | 'ghost'
export type ToggleSize = 'small' | 'normal' | 'large'

interface ToggleGroupStyleContextValue {
  variant: () => ToggleVariant
  size: () => ToggleSize
}

const ToggleGroupStyleContext =
  createContext<ToggleGroupStyleContextValue | null>(null)

type UiToggleProps = ComponentProps<typeof UiToggle>

export type ToggleProps = Omit<UiToggleProps, 'class' | 'render'> & {
  /** Defaults to `neutral` standalone, or inherits from `ToggleGroup` (default `ghost`). */
  variant?: ToggleVariant
  /** Defaults to `normal` (28px), or inherits from `ToggleGroup`. */
  size?: ToggleSize
  class?: UiToggleProps['class']
  render?: UiToggleProps['render']
}

export function Toggle(props: ToggleProps) {
  const groupStyle = useContext(ToggleGroupStyleContext)
  const rest = omit(props, 'variant', 'size', 'class', 'render')

  const variant = () =>
    props.variant ?? (groupStyle ? groupStyle.variant() : 'neutral')
  const size = () =>
    props.size ?? (groupStyle ? groupStyle.size() : 'normal')

  return (
    <UiToggle
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={variant()}
      data-size={size()}
    />
  )
}

type UiToggleIconProps = ComponentProps<typeof UiToggleIcon>

export type ToggleIconPartProps = Omit<UiToggleIconProps, 'class' | 'render'> & {
  class?: UiToggleIconProps['class']
  render?: UiToggleIconProps['render']
}

export function ToggleIcon(props: ToggleIconPartProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToggleIcon {...rest} class={props.class} render={props.render} />
}

type UiToggleGroupProps<T extends string = string> = ComponentProps<
  typeof UiToggleGroup<T>
>

export type ToggleGroupProps<T extends string = string> = Omit<
  UiToggleGroupProps<T>,
  'class' | 'render'
> & {
  /** Shared variant for child toggles. Defaults to `ghost`. */
  variant?: ToggleVariant
  /** Shared size for child toggles. Defaults to `normal`. */
  size?: ToggleSize
  class?: UiToggleGroupProps<T>['class']
  render?: UiToggleGroupProps<T>['render']
}

export function ToggleGroup<T extends string = string>(
  props: ToggleGroupProps<T>,
) {
  const rest = omit(props, 'variant', 'size', 'class', 'render')

  return (
    <ToggleGroupStyleContext
      value={{
        variant: () => props.variant ?? 'ghost',
        size: () => props.size ?? 'normal',
      }}
    >
      <UiToggleGroup<T>
        {...rest}
        class={props.class}
        render={props.render}
      />
    </ToggleGroupStyleContext>
  )
}
