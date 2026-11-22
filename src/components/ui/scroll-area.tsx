import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createScrollAreaController,
  ScrollArea as UiScrollArea,
  ScrollAreaContent as UiScrollAreaContent,
  ScrollAreaCorner as UiScrollAreaCorner,
  ScrollAreaScrollbar as UiScrollAreaScrollbar,
  ScrollAreaScrollToEnd as UiScrollAreaScrollToEnd,
  ScrollAreaThumb as UiScrollAreaThumb,
  ScrollAreaViewport as UiScrollAreaViewport,
  type ScrollAreaController,
  type ScrollAreaOptions,
  type ScrollAreaPrimitive,
  type ScrollAreaScrollbarProps as UiScrollAreaScrollbarOptions,
  type ScrollAreaScrollbarState,
  type ScrollAreaScrollOptions,
  type ScrollAreaScrollToEndState,
  type ScrollAreaState,
  type ScrollAreaThumbState,
  type ScrollAreaType,
} from '@ui-sdk/solid/scroll-area'
import { omit } from 'solid-js'

import './scroll-area.css'

type UiScrollAreaProps = ComponentProps<typeof UiScrollArea>

export type ScrollAreaProps = Omit<UiScrollAreaProps, 'class' | 'render'> & {
  /** Applies Kitsaas rounded border + base surface styling. */
  framed?: boolean
  class?: UiScrollAreaProps['class']
  render?: UiScrollAreaProps['render']
}

export function ScrollArea(props: ScrollAreaProps) {
  const rest = omit(props, 'framed', 'class', 'render')

  return (
    <UiScrollArea
      {...rest}
      class={props.class}
      render={props.render}
      data-framed={props.framed ? '' : undefined}
    />
  )
}

type UiScrollAreaViewportProps = ComponentProps<typeof UiScrollAreaViewport>

export type ScrollAreaViewportProps = Omit<
  UiScrollAreaViewportProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaViewportProps['class']
  render?: UiScrollAreaViewportProps['render']
}

export function ScrollAreaViewport(props: ScrollAreaViewportProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaViewport
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiScrollAreaContentProps = ComponentProps<typeof UiScrollAreaContent>

export type ScrollAreaContentProps = Omit<
  UiScrollAreaContentProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaContentProps['class']
  render?: UiScrollAreaContentProps['render']
}

export function ScrollAreaContent(props: ScrollAreaContentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaContent {...rest} class={props.class} render={props.render} />
  )
}

type UiScrollAreaScrollbarProps = ComponentProps<typeof UiScrollAreaScrollbar>

export type ScrollAreaScrollbarProps = Omit<
  UiScrollAreaScrollbarProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaScrollbarProps['class']
  render?: UiScrollAreaScrollbarProps['render']
}

export function ScrollAreaScrollbar(props: ScrollAreaScrollbarProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaScrollbar
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiScrollAreaThumbProps = ComponentProps<typeof UiScrollAreaThumb>

export type ScrollAreaThumbProps = Omit<
  UiScrollAreaThumbProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaThumbProps['class']
  render?: UiScrollAreaThumbProps['render']
}

export function ScrollAreaThumb(props: ScrollAreaThumbProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaThumb {...rest} class={props.class} render={props.render} />
  )
}

type UiScrollAreaCornerProps = ComponentProps<typeof UiScrollAreaCorner>

export type ScrollAreaCornerProps = Omit<
  UiScrollAreaCornerProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaCornerProps['class']
  render?: UiScrollAreaCornerProps['render']
}

export function ScrollAreaCorner(props: ScrollAreaCornerProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaCorner {...rest} class={props.class} render={props.render} />
  )
}

type UiScrollAreaScrollToEndProps = ComponentProps<
  typeof UiScrollAreaScrollToEnd
>

export type ScrollAreaScrollToEndProps = Omit<
  UiScrollAreaScrollToEndProps,
  'class' | 'render'
> & {
  class?: UiScrollAreaScrollToEndProps['class']
  render?: UiScrollAreaScrollToEndProps['render']
}

export function ScrollAreaScrollToEnd(props: ScrollAreaScrollToEndProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiScrollAreaScrollToEnd
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

export type ScrollAreaFadeEdge = 'top' | 'bottom' | 'left' | 'right'

export type ScrollAreaFadeProps = JSX.HTMLAttributes<HTMLDivElement> & {
  edge: ScrollAreaFadeEdge
}

/**
 * Edge fade indicator driven by ui-sdk's `--scroll-area-overflow-*` variables.
 * Place as a direct child of `ScrollArea`.
 */
export function ScrollAreaFade(props: ScrollAreaFadeProps) {
  const rest = omit(props, 'edge')

  return (
    <div
      {...rest}
      data-slot="scroll-area-fade"
      data-edge={props.edge}
      aria-hidden="true"
    />
  )
}

export { createScrollAreaController }
export type {
  ScrollAreaController,
  ScrollAreaOptions,
  ScrollAreaPrimitive,
  ScrollAreaScrollbarState,
  ScrollAreaScrollOptions,
  ScrollAreaScrollToEndState,
  ScrollAreaState,
  ScrollAreaThumbState,
  ScrollAreaType,
  UiScrollAreaScrollbarOptions,
}
