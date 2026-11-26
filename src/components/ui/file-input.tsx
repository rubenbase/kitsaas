import type { ComponentProps } from '@solidjs/web'
import {
  FileInput as UiFileInput,
  FileInputDropzone as UiFileInputDropzone,
  FileInputItem as UiFileInputItem,
  FileInputItemRemove as UiFileInputItemRemove,
  FileInputList as UiFileInputList,
  FileInputTrigger as UiFileInputTrigger,
} from '@ui-sdk/solid/file-input'
import { omit } from 'solid-js'

import './file-input.css'

export {
  createFileInputController,
  formatFileSize,
  relativePath,
} from '@ui-sdk/solid/file-input'
export type {
  FileInputApi,
  FileInputChange,
  FileInputChangeOptions,
  FileInputController,
  FileInputDropzoneProps,
  FileInputDropzoneState,
  FileInputDropzoneTarget,
  FileInputItemProps as UiFileInputItemProps,
  FileInputItemRemoveState,
  FileInputItemState,
  FileInputOptions,
  FileInputPasteTarget,
  FileInputPrimitive,
  FileInputState,
  FileInputTriggerProps as UiFileInputTriggerProps,
  FileInputValueChangeDetails,
  FileInputValueChangeReason,
  FileLike,
  FileRejection,
  FileRejectionReason,
  FileRules,
} from '@ui-sdk/solid/file-input'

export type FileInputTriggerVariant = 'neutral' | 'outline' | 'ghost'
export type FileInputTriggerSize = 'small' | 'normal' | 'large'

type UiFileInputProps = ComponentProps<typeof UiFileInput>

export type FileInputProps = Omit<UiFileInputProps, 'class' | 'render'> & {
  /** Marks the dropzone and trigger invalid. */
  invalid?: boolean
  class?: UiFileInputProps['class']
  render?: UiFileInputProps['render']
}

export function FileInput(props: FileInputProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiFileInput
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiFileInputDropzonePartProps = ComponentProps<typeof UiFileInputDropzone>

export type FileInputDropzonePartProps = Omit<
  UiFileInputDropzonePartProps,
  'class' | 'render'
> & {
  /** Marks the dropzone invalid. */
  invalid?: boolean
  class?: UiFileInputDropzonePartProps['class']
  render?: UiFileInputDropzonePartProps['render']
}

export function FileInputDropzone(props: FileInputDropzonePartProps) {
  const rest = omit(props, 'invalid', 'class', 'render')

  return (
    <UiFileInputDropzone
      {...rest}
      class={props.class}
      render={props.render}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type UiFileInputTriggerPartProps = ComponentProps<typeof UiFileInputTrigger>

export type FileInputTriggerPartProps = Omit<
  UiFileInputTriggerPartProps,
  'class' | 'render'
> & {
  /** Visual style of the trigger button. Defaults to `neutral`. */
  variant?: FileInputTriggerVariant
  /** Height of the trigger button. Defaults to `normal` (28px). */
  size?: FileInputTriggerSize
  class?: UiFileInputTriggerPartProps['class']
  render?: UiFileInputTriggerPartProps['render']
}

export function FileInputTrigger(props: FileInputTriggerPartProps) {
  const rest = omit(props, 'variant', 'size', 'class', 'render')

  return (
    <UiFileInputTrigger
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant ?? 'neutral'}
      data-size={props.size ?? 'normal'}
    />
  )
}

type UiFileInputListPartProps = ComponentProps<typeof UiFileInputList>

export type FileInputListProps = Omit<
  UiFileInputListPartProps,
  'class' | 'render'
> & {
  class?: UiFileInputListPartProps['class']
  render?: UiFileInputListPartProps['render']
}

export function FileInputList(props: FileInputListProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiFileInputList {...rest} class={props.class} render={props.render} />
  )
}

type UiFileInputItemPartProps = ComponentProps<typeof UiFileInputItem>

export type FileInputItemPartProps = Omit<
  UiFileInputItemPartProps,
  'class' | 'render'
> & {
  class?: UiFileInputItemPartProps['class']
  render?: UiFileInputItemPartProps['render']
}

export function FileInputItem(props: FileInputItemPartProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiFileInputItem {...rest} class={props.class} render={props.render} />
  )
}

type UiFileInputItemRemovePartProps = ComponentProps<
  typeof UiFileInputItemRemove
>

export type FileInputItemRemoveProps = Omit<
  UiFileInputItemRemovePartProps,
  'class' | 'render'
> & {
  class?: UiFileInputItemRemovePartProps['class']
  render?: UiFileInputItemRemovePartProps['render']
}

function RemoveIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width={14}
      height={14}
      fill="none"
      stroke="currentColor"
      stroke-width={1.35}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
    </svg>
  )
}

export function FileInputItemRemove(props: FileInputItemRemoveProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiFileInputItemRemove
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <RemoveIcon />}
    </UiFileInputItemRemove>
  )
}
