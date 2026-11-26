import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Carousel as UiCarousel,
  CarouselContent as UiCarouselContent,
  CarouselIndicator as UiCarouselIndicator,
  CarouselIndicatorGroup as UiCarouselIndicatorGroup,
  CarouselItem as UiCarouselItem,
  CarouselNext as UiCarouselNext,
  CarouselPlayToggle as UiCarouselPlayToggle,
  CarouselPrevious as UiCarouselPrevious,
  CarouselViewport as UiCarouselViewport,
  createCarouselController,
} from '@ui-sdk/solid/carousel'
import { omit } from 'solid-js'

import './carousel.css'

export { createCarouselController }
export type {
  CarouselAlign,
  CarouselController,
  CarouselOrientation,
  CarouselSlidesPerPage,
  CarouselState,
} from '@ui-sdk/solid/carousel'

type UiCarouselProps = ComponentProps<typeof UiCarousel>

export type CarouselProps = Omit<UiCarouselProps, 'class' | 'render'> & {
  class?: UiCarouselProps['class']
  render?: UiCarouselProps['render']
}

export function Carousel(props: CarouselProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCarousel {...rest} class={props.class} render={props.render} />
}

type UiCarouselViewportProps = ComponentProps<typeof UiCarouselViewport>

export type CarouselViewportProps = Omit<
  UiCarouselViewportProps,
  'class' | 'render'
> & {
  class?: UiCarouselViewportProps['class']
  render?: UiCarouselViewportProps['render']
}

export function CarouselViewport(props: CarouselViewportProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCarouselViewport {...rest} class={props.class} render={props.render} />
  )
}

type UiCarouselContentProps = ComponentProps<typeof UiCarouselContent>

export type CarouselContentProps = Omit<
  UiCarouselContentProps,
  'class' | 'render'
> & {
  class?: UiCarouselContentProps['class']
  render?: UiCarouselContentProps['render']
}

export function CarouselContent(props: CarouselContentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCarouselContent {...rest} class={props.class} render={props.render} />
  )
}

type UiCarouselItemProps = ComponentProps<typeof UiCarouselItem>

export type CarouselItemProps = Omit<
  UiCarouselItemProps,
  'class' | 'render'
> & {
  class?: UiCarouselItemProps['class']
  render?: UiCarouselItemProps['render']
}

export function CarouselItem(props: CarouselItemProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCarouselItem {...rest} class={props.class} render={props.render} />
}

type UiCarouselPreviousProps = ComponentProps<typeof UiCarouselPrevious>

export type CarouselPreviousProps = Omit<
  UiCarouselPreviousProps,
  'class' | 'render' | 'children'
> & {
  class?: UiCarouselPreviousProps['class']
  render?: UiCarouselPreviousProps['render']
  children?: UiCarouselPreviousProps['children']
}

export function CarouselPrevious(props: CarouselPreviousProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiCarouselPrevious
      aria-label="Previous slide"
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ChevronLeft />)
      }
    </UiCarouselPrevious>
  )
}

type UiCarouselNextProps = ComponentProps<typeof UiCarouselNext>

export type CarouselNextProps = Omit<
  UiCarouselNextProps,
  'class' | 'render' | 'children'
> & {
  class?: UiCarouselNextProps['class']
  render?: UiCarouselNextProps['render']
  children?: UiCarouselNextProps['children']
}

export function CarouselNext(props: CarouselNextProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiCarouselNext
      aria-label="Next slide"
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <ChevronRight />)
      }
    </UiCarouselNext>
  )
}

type UiCarouselIndicatorGroupProps = ComponentProps<
  typeof UiCarouselIndicatorGroup
>

export type CarouselIndicatorGroupProps = Omit<
  UiCarouselIndicatorGroupProps,
  'class' | 'render'
> & {
  class?: UiCarouselIndicatorGroupProps['class']
  render?: UiCarouselIndicatorGroupProps['render']
}

export function CarouselIndicatorGroup(props: CarouselIndicatorGroupProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCarouselIndicatorGroup
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiCarouselIndicatorProps = ComponentProps<typeof UiCarouselIndicator>

export type CarouselIndicatorProps = Omit<
  UiCarouselIndicatorProps,
  'class' | 'render'
> & {
  class?: UiCarouselIndicatorProps['class']
  render?: UiCarouselIndicatorProps['render']
}

export function CarouselIndicator(props: CarouselIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCarouselIndicator {...rest} class={props.class} render={props.render} />
  )
}

type UiCarouselPlayToggleProps = ComponentProps<typeof UiCarouselPlayToggle>

export type CarouselPlayToggleProps = Omit<
  UiCarouselPlayToggleProps,
  'class' | 'render'
> & {
  class?: UiCarouselPlayToggleProps['class']
  render?: UiCarouselPlayToggleProps['render']
}

export function CarouselPlayToggle(props: CarouselPlayToggleProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCarouselPlayToggle {...rest} class={props.class} render={props.render} />
  )
}

function ChevronLeft(): JSX.Element {
  return (
    <svg
      data-slot="carousel-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9.75 4.25L6 8L9.75 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function ChevronRight(): JSX.Element {
  return (
    <svg
      data-slot="carousel-icon"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.25 4.25L10 8L6.25 11.75"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
