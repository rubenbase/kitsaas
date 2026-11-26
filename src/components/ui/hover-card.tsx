import type { ComponentProps } from '@solidjs/web'
import {
  HoverCard as UiHoverCard,
  HoverCardArrow as UiHoverCardArrow,
  HoverCardContent as UiHoverCardContent,
  HoverCardTrigger as UiHoverCardTrigger,
} from '@ui-sdk/solid/hover-card'
import { omit } from 'solid-js'

import './hover-card.css'

/**
 * HoverCard, a 1:1 port of opencode's HoverCard (`@opencode/ui`, MIT):
 * `packages/ui/src/components/hover-card.css`, on top of ui-sdk's headless
 * HoverCard.
 *
 * Styling lives in `hover-card.css` as attribute rules (`data-open`,
 * `data-closed`), so the card's surface, its 4px inset and its two 150ms
 * scale animations match `data-component="hover-card-content"`. Behaviour (the
 * pointer and focus delays, staying open while the pointer crosses the gap,
 * flipping and shifting, the arrow's offset, Escape, ARIA wiring) comes from
 * `@ui-sdk/solid`.
 *
 * Upstream's trigger is a plain wrapper div with `tabIndex={-1}`. ui-sdk's
 * trigger is the link itself, so give it an `href`: it opens the card on hover
 * and focus and still follows the link on press.
 *
 * Upstream wraps the children in a `data-slot="hover-card-body"` div with the
 * 4px inset. ui-sdk's content holds the children directly, so the content
 * carries that inset as its own padding.
 *
 * Upstream has no arrow part; ui-sdk's `HoverCardArrow` renders an empty div
 * that this port leaves unstyled.
 */

type UiHoverCardProps = ComponentProps<typeof UiHoverCard>

export type HoverCardProps = UiHoverCardProps

export function HoverCard(props: HoverCardProps) {
  return <UiHoverCard {...props} />
}

type UiHoverCardTriggerProps = ComponentProps<typeof UiHoverCardTrigger>

export type HoverCardTriggerProps = Omit<
  UiHoverCardTriggerProps,
  'class' | 'render'
> & {
  class?: UiHoverCardTriggerProps['class']
  render?: UiHoverCardTriggerProps['render']
}

export function HoverCardTrigger(props: HoverCardTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiHoverCardTrigger {...rest} class={props.class} render={props.render} />
  )
}

type UiHoverCardContentProps = ComponentProps<typeof UiHoverCardContent>

export type HoverCardContentProps = Omit<
  UiHoverCardContentProps,
  'class' | 'render'
> & {
  class?: UiHoverCardContentProps['class']
  render?: UiHoverCardContentProps['render']
}

export function HoverCardContent(props: HoverCardContentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiHoverCardContent {...rest} class={props.class} render={props.render} />
  )
}

type UiHoverCardArrowProps = ComponentProps<typeof UiHoverCardArrow>

export type HoverCardArrowProps = Omit<
  UiHoverCardArrowProps,
  'class' | 'render'
> & {
  class?: UiHoverCardArrowProps['class']
  render?: UiHoverCardArrowProps['render']
}

export function HoverCardArrow(props: HoverCardArrowProps) {
  const rest = omit(props, 'class', 'render')

  return <UiHoverCardArrow {...rest} class={props.class} render={props.render} />
}
