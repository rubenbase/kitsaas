import type { ComponentProps } from '@solidjs/web'
import {
  Dialog as UiDialog,
  DialogBackdrop as UiDialogBackdrop,
  DialogClose as UiDialogClose,
  DialogContent as UiDialogContent,
  DialogDescription as UiDialogDescription,
  DialogTitle as UiDialogTitle,
  DialogTrigger as UiDialogTrigger,
} from '@ui-sdk/solid/dialog'
import { omit } from 'solid-js'

import './dialog.css'

/**
 * Dialog, a 1:1 port of opencode's Dialog (`@opencode/ui`, MIT):
 * `packages/ui/src/overlays/dialog`, on top of ui-sdk's headless Dialog.
 *
 * Styling lives in `dialog.css` as attribute rules (`data-size`, `data-fit`,
 * `data-hide-close`), so the scrim, the box, the three sizes, `fit`, the
 * header, footer, body and the close button match `data-component="dialog-v2"`.
 * Behaviour (top layer, focus trap and return, Escape, outside presses,
 * ARIA wiring) comes from `@ui-sdk/solid`.
 *
 * Upstream nests a fixed wrapper around a sized container around a scrolling
 * content column. ui-sdk renders one element in the top layer, so upstream's
 * wrapper and container collapse into `DialogContent`, which is why `size` and
 * `fit` live there instead of on `Dialog`. Header, title group, body and
 * footer are plain `data-slot` wrappers the author writes, as upstream's
 * `DialogHeader`, `DialogTitleGroup`, `DialogBody` and `DialogFooter` were.
 * `data-hide-close` goes on the author's header wrapper.
 *
 * `DialogTitle` renders an `h2`; inside dialog content render it as an `h3`
 * through `render`.
 */

type UiDialogProps = ComponentProps<typeof UiDialog>

export type DialogProps = UiDialogProps

export function Dialog(props: DialogProps) {
  return <UiDialog {...props} />
}

type UiDialogTriggerProps = ComponentProps<typeof UiDialogTrigger>

export type DialogTriggerProps = Omit<
  UiDialogTriggerProps,
  'class' | 'render'
> & {
  class?: UiDialogTriggerProps['class']
  render?: UiDialogTriggerProps['render']
}

export function DialogTrigger(props: DialogTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDialogTrigger {...rest} class={props.class} render={props.render} />
}

type UiDialogBackdropProps = ComponentProps<typeof UiDialogBackdrop>

export type DialogBackdropProps = Omit<
  UiDialogBackdropProps,
  'class' | 'render'
> & {
  class?: UiDialogBackdropProps['class']
  render?: UiDialogBackdropProps['render']
}

export function DialogBackdrop(props: DialogBackdropProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDialogBackdrop {...rest} class={props.class} render={props.render} />
  )
}

export type DialogSize = 'normal' | 'large' | 'x-large'

type UiDialogContentProps = ComponentProps<typeof UiDialogContent>

export type DialogContentProps = Omit<
  UiDialogContentProps,
  'class' | 'render'
> & {
  /** Defaults to `normal`: 480 × 368, clamped to the window. */
  size?: DialogSize
  /** Height follows the content, up to the size's height. */
  fit?: boolean
  class?: UiDialogContentProps['class']
  render?: UiDialogContentProps['render']
}

export function DialogContent(props: DialogContentProps) {
  const rest = omit(props, 'size', 'fit', 'class', 'render')

  return (
    <UiDialogContent
      {...rest}
      class={props.class}
      render={props.render}
      data-size={props.size ?? 'normal'}
      data-fit={props.fit ? '' : undefined}
    />
  )
}

type UiDialogTitleProps = ComponentProps<typeof UiDialogTitle>

export type DialogTitleProps = Omit<UiDialogTitleProps, 'class' | 'render'> & {
  class?: UiDialogTitleProps['class']
  render?: UiDialogTitleProps['render']
}

export function DialogTitle(props: DialogTitleProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDialogTitle {...rest} class={props.class} render={props.render} />
}

type UiDialogDescriptionProps = ComponentProps<typeof UiDialogDescription>

export type DialogDescriptionProps = Omit<
  UiDialogDescriptionProps,
  'class' | 'render'
> & {
  class?: UiDialogDescriptionProps['class']
  render?: UiDialogDescriptionProps['render']
}

export function DialogDescription(props: DialogDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiDialogDescription {...rest} class={props.class} render={props.render} />
  )
}

type UiDialogCloseProps = ComponentProps<typeof UiDialogClose>

export type DialogCloseProps = Omit<UiDialogCloseProps, 'class' | 'render'> & {
  class?: UiDialogCloseProps['class']
  render?: UiDialogCloseProps['render']
}

export function DialogClose(props: DialogCloseProps) {
  const rest = omit(props, 'class', 'render')

  return <UiDialogClose {...rest} class={props.class} render={props.render} />
}
