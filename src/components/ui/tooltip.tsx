import type { ComponentProps } from '@solidjs/web'
import {
  Tooltip as UiTooltip,
  TooltipArrow as UiTooltipArrow,
  TooltipContent as UiTooltipContent,
  TooltipShortcut as UiTooltipShortcut,
  TooltipTrigger as UiTooltipTrigger,
} from '@ui-sdk/solid/tooltip'
import { createContext, omit, useContext } from 'solid-js'

import './tooltip.css'

/**
 * Tooltip, a 1:1 port of opencode's Tooltip (`@opencode/ui`, MIT):
 * `packages/ui/src/overlays/tooltip` (`tooltip-v2`), on top of ui-sdk's
 * headless Tooltip.
 *
 * Styling lives in `tooltip.css` as attribute rules (`data-appearance`,
 * `data-closed`, `data-side`, `data-motion`), so the compact look, the 120ms
 * in, the 80ms out and the large appearance match upstream. Behaviour (hover
 * and focus open, delay, grouping, dismissal, positioning, ARIA wiring) comes
 * from `@ui-sdk/solid`.
 *
 * Upstream's `standard` appearance reads opencode app-level tokens this repo
 * does not ship (`--surface-float-base`, `--text-invert-strong`, `--shadow-md`),
 * so only `compact`, upstream's default, and `large` are ported.
 *
 * `forceOpen` is upstream's prop: it maps to a controlled `open`, which keeps
 * the tooltip open and leaves `data-closed` off. `inactive` is not ported;
 * render the trigger without a Tooltip instead, or use ui-sdk's `disabled` to
 * keep the trigger but never open the tip. `contentClass`, `contentStyle` and
 * `triggerTabIndex` are not ported: `class`, `style` and the trigger's own
 * attributes already cover them.
 */

export type TooltipAppearance = 'compact' | 'large'

const TooltipAppearanceContext = createContext<TooltipAppearance>()

type UiTooltipProps = ComponentProps<typeof UiTooltip>

export type TooltipProps = Omit<UiTooltipProps, 'class' | 'render'> & {
  /** Defaults to `compact`, upstream's default. */
  appearance?: TooltipAppearance
  /** Holds the tooltip open, like upstream's `forceOpen`. */
  forceOpen?: boolean
}

export function Tooltip(props: TooltipProps) {
  const rest = omit(props, 'appearance', 'forceOpen')

  return (
    <TooltipAppearanceContext value={props.appearance ?? 'compact'}>
      <UiTooltip {...rest} open={props.forceOpen ? true : props.open} />
    </TooltipAppearanceContext>
  )
}

type UiTooltipTriggerProps = ComponentProps<typeof UiTooltipTrigger>

export type TooltipTriggerProps = Omit<
  UiTooltipTriggerProps,
  'class' | 'render'
> & {
  class?: UiTooltipTriggerProps['class']
  render?: UiTooltipTriggerProps['render']
}

export function TooltipTrigger(props: TooltipTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTooltipTrigger {...rest} class={props.class} render={props.render} />
}

type UiTooltipContentProps = ComponentProps<typeof UiTooltipContent>

export type TooltipContentProps = Omit<
  UiTooltipContentProps,
  'class' | 'render'
> & {
  class?: UiTooltipContentProps['class']
  render?: UiTooltipContentProps['render']
}

export function TooltipContent(props: TooltipContentProps) {
  const appearance = useContext(TooltipAppearanceContext) ?? 'compact'
  const rest = omit(props, 'class', 'render')

  return (
    <UiTooltipContent
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={appearance}
    />
  )
}

type UiTooltipArrowProps = ComponentProps<typeof UiTooltipArrow>

export type TooltipArrowProps = Omit<UiTooltipArrowProps, 'class' | 'render'> & {
  class?: UiTooltipArrowProps['class']
  render?: UiTooltipArrowProps['render']
}

export function TooltipArrow(props: TooltipArrowProps) {
  const rest = omit(props, 'class', 'render')

  return <UiTooltipArrow {...rest} class={props.class} render={props.render} />
}

type UiTooltipShortcutProps = ComponentProps<typeof UiTooltipShortcut>

export type TooltipShortcutProps = Omit<
  UiTooltipShortcutProps,
  'class' | 'render'
> & {
  class?: UiTooltipShortcutProps['class']
  render?: UiTooltipShortcutProps['render']
}

export function TooltipShortcut(props: TooltipShortcutProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTooltipShortcut {...rest} class={props.class} render={props.render} />
  )
}
