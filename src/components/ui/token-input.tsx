import type { ComponentProps } from '@solidjs/web'
import {
  TokenInput as UiTokenInput,
  TokenInputEditor as UiTokenInputEditor,
  TokenInputToken as UiTokenInputToken,
  TokenInputTokenRemove as UiTokenInputTokenRemove,
} from '@ui-sdk/solid/token-input'
import { omit } from 'solid-js'

import './token-input.css'

export {
  createTokenInputController,
  defaultCodec,
  fromText,
  toLabel,
  toText,
} from '@ui-sdk/solid/token-input'
export type {
  TextEditorAdapter,
  TextRange,
  Token,
  TokenCodec,
  TokenDeletion,
  TokenInputApi,
  TokenInputChangeOptions,
  TokenInputController,
  TokenInputEditorProps as UiTokenInputEditorProps,
  TokenInputEditorState,
  TokenInputOptions,
  TokenInputPrimitive,
  TokenInputProps as UiTokenInputProps,
  TokenInputSubmitDetails,
  TokenInputTokenProps,
  TokenInputTokenState,
  TokenInputValue,
  TokenInputValueChangeDetails,
  TokenInputValueChangeReason,
  TokenInsert,
  UndoStackOptions,
} from '@ui-sdk/solid/token-input'

export type TokenInputSurface = 'base' | 'layer-1'

export type TokenInputProps = ComponentProps<typeof UiTokenInput>

export function TokenInput(props: TokenInputProps) {
  return <UiTokenInput {...props} />
}

type UiTokenInputEditorPartProps = ComponentProps<typeof UiTokenInputEditor>

export type TokenInputEditorPartProps = Omit<
  UiTokenInputEditorPartProps,
  'class' | 'render'
> & {
  /** Background fill. Defaults to `base`. */
  surface?: TokenInputSurface
  /** Marks the container outline invalid. */
  invalid?: boolean
  class?: UiTokenInputEditorPartProps['class']
  render?: UiTokenInputEditorPartProps['render']
}

export function TokenInputEditor(props: TokenInputEditorPartProps) {
  const rest = omit(props, 'surface', 'invalid', 'class', 'render')

  return (
    <UiTokenInputEditor
      {...rest}
      class={props.class}
      render={props.render}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : props['aria-invalid']}
    />
  )
}

type UiTokenInputTokenPartProps = ComponentProps<typeof UiTokenInputToken>

export type TokenInputTokenPartProps = Omit<
  UiTokenInputTokenPartProps,
  'class' | 'render'
> & {
  class?: UiTokenInputTokenPartProps['class']
  render?: UiTokenInputTokenPartProps['render']
}

export function TokenInputToken(props: TokenInputTokenPartProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTokenInputToken {...rest} class={props.class} render={props.render} />
  )
}

function TokenRemoveIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      width={10}
      height={10}
      fill="none"
      stroke="currentColor"
      stroke-width={1.5}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m3 3 6 6M9 3 3 9" />
    </svg>
  )
}

type UiTokenInputTokenRemoveProps = ComponentProps<typeof UiTokenInputTokenRemove>

export type TokenInputTokenRemoveProps = Omit<
  UiTokenInputTokenRemoveProps,
  'class' | 'render'
> & {
  class?: UiTokenInputTokenRemoveProps['class']
  render?: UiTokenInputTokenRemoveProps['render']
}

export function TokenInputTokenRemove(props: TokenInputTokenRemoveProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiTokenInputTokenRemove
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children ?? <TokenRemoveIcon />}
    </UiTokenInputTokenRemove>
  )
}
