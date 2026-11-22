import type { ComponentProps } from '@solidjs/web'
import {
  Toast as UiToast,
  ToastAction as UiToastAction,
  ToastClose as UiToastClose,
  ToastDescription as UiToastDescription,
  ToastRegion as UiToastRegion,
  ToastTitle as UiToastTitle,
} from '@ui-sdk/solid/toast'
import { omit } from 'solid-js'

import './toast.css'

/**
 * Toast, a 1:1 port of opencode's Toast (`@opencode/ui`, MIT):
 * `packages/ui/src/feedback/toast` (`toast-v2`), on top of ui-sdk's headless
 * ToastRegion, Toast, ToastTitle, ToastDescription, ToastAction and ToastClose.
 *
 * Styling lives in `toast.css` as attribute rules (`data-icon`,
 * `data-front`, `data-expanded`, `data-motion`), so the 320px card, the
 * collapsed stack, the expanded stack, the close button and the action row
 * match `data-component="toast"`. Behaviour (queue, stacking, timers, swipe,
 * Escape, focus and the live-region announcements) comes from `@ui-sdk/solid`.
 *
 * Upstream's `ToastContent` and `ToastActions` were plain wrappers the author
 * wrote, so keep them around the parts, as upstream did:
 *
 *   <Toast>
 *     <span data-icon>…</span>
 *     <div data-slot="toast-content">
 *       <ToastTitle />
 *       <ToastDescription />
 *     </div>
 *     <ToastClose render={(props) => <Button {...props} … />} />
 *     <div data-slot="toast-actions">
 *       <ToastAction render={(props) => <Button {...props} … />} />
 *     </div>
 *   </Toast>
 *
 * The toast's type (`data-type`), `data-front` and `data-expanded` come from
 * ui-sdk, so no extra data-* props are needed here. Render `ToastAction` and
 * `ToastClose` as Kitsaas Buttons: upstream restyled `button-v2`,
 * `toast.css` only sizes the dismiss button's 20px box.
 *
 * `toast` and `createToaster` are re-exported from the same entry, so a page
 * shows a toast without importing ui-sdk directly.
 */

export { createToaster, toast } from '@ui-sdk/solid/toast'

type UiToastRegionProps = ComponentProps<typeof UiToastRegion>

export type ToastRegionProps = Omit<UiToastRegionProps, 'class' | 'render'> & {
  class?: UiToastRegionProps['class']
  render?: UiToastRegionProps['render']
}

export function ToastRegion(props: ToastRegionProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToastRegion {...rest} class={props.class} render={props.render} />
}

type UiToastProps = ComponentProps<typeof UiToast>

export type ToastProps = Omit<UiToastProps, 'class' | 'render'> & {
  class?: UiToastProps['class']
  render?: UiToastProps['render']
}

export function Toast(props: ToastProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToast {...rest} class={props.class} render={props.render} />
}

type UiToastTitleProps = ComponentProps<typeof UiToastTitle>

export type ToastTitleProps = Omit<UiToastTitleProps, 'class' | 'render'> & {
  class?: UiToastTitleProps['class']
  render?: UiToastTitleProps['render']
}

/** Renders a `div`; pass `render` to make it the toast's `h3`. */
export function ToastTitle(props: ToastTitleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToastTitle {...rest} class={props.class} render={props.render} />
}

type UiToastDescriptionProps = ComponentProps<typeof UiToastDescription>

export type ToastDescriptionProps = Omit<
  UiToastDescriptionProps,
  'class' | 'render'
> & {
  class?: UiToastDescriptionProps['class']
  render?: UiToastDescriptionProps['render']
}

export function ToastDescription(props: ToastDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiToastDescription {...rest} class={props.class} render={props.render} />
  )
}

type UiToastActionProps = ComponentProps<typeof UiToastAction>

export type ToastActionProps = Omit<UiToastActionProps, 'class' | 'render'> & {
  class?: UiToastActionProps['class']
  render?: UiToastActionProps['render']
}

/** The toast's action, like Undo. A Promise keeps the toast open and pending. */
export function ToastAction(props: ToastActionProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToastAction {...rest} class={props.class} render={props.render} />
}

type UiToastCloseProps = ComponentProps<typeof UiToastClose>

export type ToastCloseProps = Omit<UiToastCloseProps, 'class' | 'render'> & {
  class?: UiToastCloseProps['class']
  render?: UiToastCloseProps['render']
}

/** Closes the toast; with an `action`, runs it first. */
export function ToastClose(props: ToastCloseProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToastClose {...rest} class={props.class} render={props.render} />
}
