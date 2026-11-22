import type { ComponentProps } from '@solidjs/web'
import {
  createDrawerController,
  Drawer as UiDrawer,
  DrawerBackdrop as UiDrawerBackdrop,
  DrawerClose as UiDrawerClose,
  DrawerContent as UiDrawerContent,
  DrawerDescription as UiDrawerDescription,
  DrawerHandle as UiDrawerHandle,
  DrawerOutlet as UiDrawerOutlet,
  DrawerShortcut as UiDrawerShortcut,
  DrawerTitle as UiDrawerTitle,
  DrawerTrigger as UiDrawerTrigger,
  sheetPhysics,
} from '@ui-sdk/solid/drawer'
import { omit } from 'solid-js'

import './drawer.css'

export { createDrawerController, sheetPhysics }

export type {
  DrawerApi,
  DrawerBackdropState,
  DrawerContentState,
  DrawerController,
  DrawerDismissAttemptDetails,
  DrawerDismissReason,
  DrawerDriver,
  DrawerHandleState,
  DrawerKeyframes,
  DrawerOpenChangeReason,
  DrawerOptions,
  DrawerOutletState,
  DrawerPayloadChangeReason,
  DrawerSide,
  DrawerSnapPointChangeReason,
  SheetPhysics,
  SnapPoint,
} from '@ui-sdk/solid/drawer'

/**
 * Drawer, styled for Kitsaas on top of ui-sdk's headless Drawer.
 *
 * Supports all edges (`bottom`, `top`, `left`, `right`, `start`, `end`),
 * pointer and scroll-snap dragging, snap points with `DrawerHandle`, non-modal
 * thresholds (`modalAbove`), nested stacking and `DrawerOutlet` keyframes.
 */

type UiDrawerProps = ComponentProps<typeof UiDrawer>

export type DrawerProps = UiDrawerProps

export function Drawer(props: DrawerProps) {
  return <UiDrawer {...props} />
}

type UiDrawerTriggerProps = ComponentProps<typeof UiDrawerTrigger>

export type DrawerTriggerProps = Omit<
  UiDrawerTriggerProps,
  'class' | 'render'
> & {
  class?: UiDrawerTriggerProps['class']
  render?: UiDrawerTriggerProps['render']
}

export function DrawerTrigger(props: DrawerTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDrawerTrigger {...rest} class={props.class} render={props.render} />
}

type UiDrawerBackdropProps = ComponentProps<typeof UiDrawerBackdrop>

export type DrawerBackdropProps = Omit<
  UiDrawerBackdropProps,
  'class' | 'render'
> & {
  class?: UiDrawerBackdropProps['class']
  render?: UiDrawerBackdropProps['render']
}

export function DrawerBackdrop(props: DrawerBackdropProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDrawerBackdrop {...rest} class={props.class} render={props.render} />
  )
}

export type DrawerSize = 'small' | 'normal' | 'large'

type UiDrawerContentProps<Payload = unknown> = ComponentProps<
  typeof UiDrawerContent<Payload>
>

export type DrawerContentProps<Payload = unknown> = Omit<
  UiDrawerContentProps<Payload>,
  'class' | 'render'
> & {
  /** Controls sheet width (side drawers) or max-width (top/bottom drawers). */
  size?: DrawerSize
  /** Sets full viewport height on top/bottom sheets so large snap points fill the screen. */
  fullHeight?: boolean
  class?: UiDrawerContentProps<Payload>['class']
  render?: UiDrawerContentProps<Payload>['render']
}

export function DrawerContent<Payload = unknown>(
  props: DrawerContentProps<Payload>,
) {
  const rest = omit(props, 'size', 'fullHeight', 'class', 'render')

  return (
    <UiDrawerContent<Payload>
      {...rest}
      class={props.class}
      render={props.render}
      data-size={props.size ?? 'normal'}
      data-full-height={props.fullHeight ? '' : undefined}
    />
  )
}

type UiDrawerHandleProps = ComponentProps<typeof UiDrawerHandle>

export type DrawerHandleProps = Omit<
  UiDrawerHandleProps,
  'class' | 'render'
> & {
  class?: UiDrawerHandleProps['class']
  render?: UiDrawerHandleProps['render']
}

export function DrawerHandle(props: DrawerHandleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDrawerHandle {...rest} class={props.class} render={props.render} />
}

type UiDrawerTitleProps = ComponentProps<typeof UiDrawerTitle>

export type DrawerTitleProps = Omit<UiDrawerTitleProps, 'class' | 'render'> & {
  class?: UiDrawerTitleProps['class']
  render?: UiDrawerTitleProps['render']
}

export function DrawerTitle(props: DrawerTitleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDrawerTitle {...rest} class={props.class} render={props.render} />
}

type UiDrawerDescriptionProps = ComponentProps<typeof UiDrawerDescription>

export type DrawerDescriptionProps = Omit<
  UiDrawerDescriptionProps,
  'class' | 'render'
> & {
  class?: UiDrawerDescriptionProps['class']
  render?: UiDrawerDescriptionProps['render']
}

export function DrawerDescription(props: DrawerDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDrawerDescription {...rest} class={props.class} render={props.render} />
  )
}

type UiDrawerCloseProps = ComponentProps<typeof UiDrawerClose>

export type DrawerCloseProps = Omit<UiDrawerCloseProps, 'class' | 'render'> & {
  class?: UiDrawerCloseProps['class']
  render?: UiDrawerCloseProps['render']
}

export function DrawerClose(props: DrawerCloseProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDrawerClose {...rest} class={props.class} render={props.render} />
}

type UiDrawerShortcutProps = ComponentProps<typeof UiDrawerShortcut>

export type DrawerShortcutProps = Omit<
  UiDrawerShortcutProps,
  'class' | 'render'
> & {
  class?: UiDrawerShortcutProps['class']
  render?: UiDrawerShortcutProps['render']
}

export function DrawerShortcut(props: DrawerShortcutProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDrawerShortcut {...rest} class={props.class} render={props.render} />
  )
}

type UiDrawerOutletProps = ComponentProps<typeof UiDrawerOutlet>

export type DrawerOutletProps = Omit<
  UiDrawerOutletProps,
  'class' | 'render'
> & {
  class?: UiDrawerOutletProps['class']
  render?: UiDrawerOutletProps['render']
}

export function DrawerOutlet(props: DrawerOutletProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDrawerOutlet {...rest} class={props.class} render={props.render} />
}
