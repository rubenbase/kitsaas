import type { ComponentProps } from '@solidjs/web'
import {
  AlertDialog as UiAlertDialog,
  AlertDialogBackdrop as UiAlertDialogBackdrop,
  AlertDialogClose as UiAlertDialogClose,
  AlertDialogContent as UiAlertDialogContent,
  AlertDialogDescription as UiAlertDialogDescription,
  AlertDialogShortcut as UiAlertDialogShortcut,
  AlertDialogTitle as UiAlertDialogTitle,
  AlertDialogTrigger as UiAlertDialogTrigger,
  confirm,
  createAlertDialogController,
  createConfirm,
} from '@ui-sdk/solid/alert-dialog'
import { omit } from 'solid-js'

import './alert-dialog.css'

export { confirm, createAlertDialogController, createConfirm }

export type {
  AlertDialogBackdropState,
  AlertDialogCloseActionDetails,
  AlertDialogCloseState,
  AlertDialogContentState,
  AlertDialogController,
  AlertDialogOpenChangeReason,
  AlertDialogOptions,
  AlertDialogPayloadChangeReason,
  AlertDialogShortcutState,
  AlertDialogTriggerState,
  ConfirmEntry,
  ConfirmOptions,
} from '@ui-sdk/solid/alert-dialog'

/**
 * AlertDialog, styled to match Kitsaas's Dialog (`dialog.css`) on top of
 * ui-sdk's headless AlertDialog.
 *
 * Always modal, ignores outside presses, and starts focus on its first Close
 * part. Re-exports `createConfirm`, `confirm` and `createAlertDialogController`
 * for imperative confirmations.
 */

type UiAlertDialogProps = ComponentProps<typeof UiAlertDialog>

export type AlertDialogProps = UiAlertDialogProps

export function AlertDialog(props: AlertDialogProps) {
  return <UiAlertDialog {...props} />
}

type UiAlertDialogTriggerProps = ComponentProps<typeof UiAlertDialogTrigger>

export type AlertDialogTriggerProps = Omit<
  UiAlertDialogTriggerProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogTriggerProps['class']
  render?: UiAlertDialogTriggerProps['render']
}

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogTrigger
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAlertDialogBackdropProps = ComponentProps<typeof UiAlertDialogBackdrop>

export type AlertDialogBackdropProps = Omit<
  UiAlertDialogBackdropProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogBackdropProps['class']
  render?: UiAlertDialogBackdropProps['render']
}

export function AlertDialogBackdrop(props: AlertDialogBackdropProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogBackdrop
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

export type AlertDialogSize = 'normal' | 'large'

type UiAlertDialogContentProps<Payload = unknown> = ComponentProps<
  typeof UiAlertDialogContent<Payload>
>

export type AlertDialogContentProps<Payload = unknown> = Omit<
  UiAlertDialogContentProps<Payload>,
  'class' | 'render'
> & {
  /** Defaults to `normal` (420px max width). `large` is 480px. */
  size?: AlertDialogSize
  class?: UiAlertDialogContentProps<Payload>['class']
  render?: UiAlertDialogContentProps<Payload>['render']
}

export function AlertDialogContent<Payload = unknown>(
  props: AlertDialogContentProps<Payload>,
) {
  const rest = omit(props, 'size', 'class', 'render')

  return (
    <UiAlertDialogContent<Payload>
      {...rest}
      class={props.class}
      render={props.render}
      data-size={props.size ?? 'normal'}
    />
  )
}

type UiAlertDialogTitleProps = ComponentProps<typeof UiAlertDialogTitle>

export type AlertDialogTitleProps = Omit<
  UiAlertDialogTitleProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogTitleProps['class']
  render?: UiAlertDialogTitleProps['render']
}

export function AlertDialogTitle(props: AlertDialogTitleProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogTitle {...rest} class={props.class} render={props.render} />
  )
}

type UiAlertDialogDescriptionProps = ComponentProps<
  typeof UiAlertDialogDescription
>

export type AlertDialogDescriptionProps = Omit<
  UiAlertDialogDescriptionProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogDescriptionProps['class']
  render?: UiAlertDialogDescriptionProps['render']
}

export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogDescription
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiAlertDialogCloseProps = ComponentProps<typeof UiAlertDialogClose>

export type AlertDialogCloseProps = Omit<
  UiAlertDialogCloseProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogCloseProps['class']
  render?: UiAlertDialogCloseProps['render']
}

export function AlertDialogClose(props: AlertDialogCloseProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogClose {...rest} class={props.class} render={props.render} />
  )
}

type UiAlertDialogShortcutProps = ComponentProps<typeof UiAlertDialogShortcut>

export type AlertDialogShortcutProps = Omit<
  UiAlertDialogShortcutProps,
  'class' | 'render'
> & {
  class?: UiAlertDialogShortcutProps['class']
  render?: UiAlertDialogShortcutProps['render']
}

export function AlertDialogShortcut(props: AlertDialogShortcutProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiAlertDialogShortcut
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}
