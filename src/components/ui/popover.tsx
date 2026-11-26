import type { ComponentProps } from '@solidjs/web'
import {
  Popover as UiPopover,
  PopoverArrow as UiPopoverArrow,
  PopoverClose as UiPopoverClose,
  PopoverContent as UiPopoverContent,
  PopoverDescription as UiPopoverDescription,
  PopoverTitle as UiPopoverTitle,
  PopoverTrigger as UiPopoverTrigger,
} from '@ui-sdk/solid/popover'
import { omit } from 'solid-js'

import './popover.css'

/**
 * Popover, a 1:1 port of opencode's Popover (`@opencode/ui`, MIT):
 * `packages/ui/src/components/popover.css`, on top of ui-sdk's headless
 * Popover.
 *
 * Styling lives in `popover.css` as attribute rules (`data-side` on the
 * arrow), so the panel, its title, description, close part and arrow match
 * `data-component="popover-content"`. Behaviour (open and close, focus moving
 * in and back, dismissal, flipping and shifting, the arrow's offset, ARIA
 * wiring) comes from `@ui-sdk/solid`.
 *
 * Upstream's Content renders the header, description and body itself. ui-sdk
 * composes them as parts, so the content carries upstream's 12px body inset
 * as its own padding, and the author places `PopoverTitle`,
 * `PopoverDescription` and `PopoverClose` where they belong. A plain
 * `data-slot="popover-header"` wrapper rebuilds upstream's header row.
 *
 * Upstream's close button is an IconButton and its arrow an SVG path. Kitsaas
 * has no icon button, so render `PopoverClose` as a `Button` through `render`;
 * the arrow is the div ui-sdk sizes and places.
 */

type UiPopoverProps = ComponentProps<typeof UiPopover>

export type PopoverProps = UiPopoverProps

export function Popover(props: PopoverProps) {
  return <UiPopover {...props} />
}

type UiPopoverTriggerProps = ComponentProps<typeof UiPopoverTrigger>

export type PopoverTriggerProps = Omit<
  UiPopoverTriggerProps,
  'class' | 'render'
> & {
  class?: UiPopoverTriggerProps['class']
  render?: UiPopoverTriggerProps['render']
}

export function PopoverTrigger(props: PopoverTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPopoverTrigger {...rest} class={props.class} render={props.render} />
}

type UiPopoverContentProps = ComponentProps<typeof UiPopoverContent>

export type PopoverContentProps = Omit<
  UiPopoverContentProps,
  'class' | 'render'
> & {
  class?: UiPopoverContentProps['class']
  render?: UiPopoverContentProps['render']
}

export function PopoverContent(props: PopoverContentProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPopoverContent {...rest} class={props.class} render={props.render} />
}

type UiPopoverArrowProps = ComponentProps<typeof UiPopoverArrow>

export type PopoverArrowProps = Omit<UiPopoverArrowProps, 'class' | 'render'> & {
  class?: UiPopoverArrowProps['class']
  render?: UiPopoverArrowProps['render']
}

export function PopoverArrow(props: PopoverArrowProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPopoverArrow {...rest} class={props.class} render={props.render} />
}

type UiPopoverTitleProps = ComponentProps<typeof UiPopoverTitle>

export type PopoverTitleProps = Omit<UiPopoverTitleProps, 'class' | 'render'> & {
  class?: UiPopoverTitleProps['class']
  render?: UiPopoverTitleProps['render']
}

export function PopoverTitle(props: PopoverTitleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPopoverTitle {...rest} class={props.class} render={props.render} />
}

type UiPopoverDescriptionProps = ComponentProps<typeof UiPopoverDescription>

export type PopoverDescriptionProps = Omit<
  UiPopoverDescriptionProps,
  'class' | 'render'
> & {
  class?: UiPopoverDescriptionProps['class']
  render?: UiPopoverDescriptionProps['render']
}

export function PopoverDescription(props: PopoverDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiPopoverDescription {...rest} class={props.class} render={props.render} />
  )
}

type UiPopoverCloseProps = ComponentProps<typeof UiPopoverClose>

export type PopoverCloseProps = Omit<
  UiPopoverCloseProps,
  'class' | 'render'
> & {
  class?: UiPopoverCloseProps['class']
  render?: UiPopoverCloseProps['render']
}

export function PopoverClose(props: PopoverCloseProps) {
  const rest = omit(props, 'class', 'render')

  return <UiPopoverClose {...rest} class={props.class} render={props.render} />
}
