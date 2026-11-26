import type { ComponentProps } from '@solidjs/web'
import {
  Collapsible as UiCollapsible,
  CollapsiblePanel as UiCollapsiblePanel,
  CollapsibleTrigger as UiCollapsibleTrigger,
} from '@ui-sdk/solid/collapsible'
import { omit } from 'solid-js'

import './collapsible.css'

/**
 * Collapsible, a 1:1 port of opencode's Collapsible (`@opencode/ui`, MIT):
 * `packages/ui/src/components/collapsible` (`collapsible.css`), on top of
 * ui-sdk's headless Collapsible, CollapsibleTrigger and CollapsiblePanel.
 *
 * Styling lives in `collapsible.css` as attribute rules (`data-variant`,
 * `data-open`, `data-disabled`, `data-hide-details`), copied from upstream,
 * so the 32px trigger row, the hover fill, the fading arrow, the ghost
 * variant and the disabled cursor match. Behaviour (toggle on press, keyboard,
 * ARIA wiring, panel mounting) comes from `@ui-sdk/solid`.
 *
 * Upstream is Kobalte based, so its `data-expanded` and
 * `data-slot="collapsible-content"` become ui-sdk's `data-open` and
 * `data-slot="collapsible-panel"`. The arrow is markup, not a wrapper part:
 * render `[data-slot="collapsible-arrow"]` and
 * `[data-slot="collapsible-arrow-icon"]` inside the trigger, as upstream's
 * `Collapsible.Arrow` does.
 */

export type CollapsibleVariant = 'normal' | 'ghost'

type UiCollapsibleProps = ComponentProps<typeof UiCollapsible>

export type CollapsibleProps = Omit<
  UiCollapsibleProps,
  'class' | 'render'
> & {
  /** Defaults to `normal`, like opencode's collapsible. */
  variant?: CollapsibleVariant
  class?: UiCollapsibleProps['class']
  render?: UiCollapsibleProps['render']
}

export function Collapsible(props: CollapsibleProps) {
  const rest = omit(props, 'variant', 'class', 'render')

  return (
    <UiCollapsible
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant ?? 'normal'}
    />
  )
}

type UiCollapsibleTriggerProps = ComponentProps<typeof UiCollapsibleTrigger>

export type CollapsibleTriggerProps = Omit<
  UiCollapsibleTriggerProps,
  'class' | 'render'
> & {
  /** Lays the trigger out as a block instead of a 32px row. */
  hideDetails?: boolean
  class?: UiCollapsibleTriggerProps['class']
  render?: UiCollapsibleTriggerProps['render']
}

export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  const rest = omit(props, 'hideDetails', 'class', 'render')

  return (
    <UiCollapsibleTrigger
      {...rest}
      class={props.class}
      render={props.render}
      data-hide-details={props.hideDetails ? 'true' : undefined}
    />
  )
}

type UiCollapsiblePanelProps = ComponentProps<typeof UiCollapsiblePanel>

export type CollapsiblePanelProps = Omit<
  UiCollapsiblePanelProps,
  'class' | 'render'
> & {
  class?: UiCollapsiblePanelProps['class']
  render?: UiCollapsiblePanelProps['render']
}

export function CollapsiblePanel(props: CollapsiblePanelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCollapsiblePanel
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
