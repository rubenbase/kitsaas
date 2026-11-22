import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createResizableController,
  Resizable as UiResizable,
  ResizableHandle as UiResizableHandle,
  ResizablePanel as UiResizablePanel,
  resizableStorageKey,
  type ResizableApi,
  type ResizableChangeOptions,
  type ResizableController,
  type ResizableHandleProps as UiResizableHandleOptions,
  type ResizableHandleState,
  type ResizableLayoutChangeDetails,
  type ResizableLayoutChangeReason,
  type ResizableLayoutCommitDetails,
  type ResizableOptions,
  type ResizablePanelProps as UiResizablePanelOptions,
  type ResizablePanelState,
  type ResizablePrimitive,
  type ResizableSize,
  type ResizableState,
  type ResizableStorage,
} from '@ui-sdk/solid/resizable'
import { omit } from 'solid-js'

import './resizable.css'

type UiResizableProps = ComponentProps<typeof UiResizable>

export type ResizableProps = Omit<UiResizableProps, 'class' | 'render'> & {
  class?: UiResizableProps['class']
  render?: UiResizableProps['render']
}

export function Resizable(props: ResizableProps) {
  const rest = omit(props, 'class', 'render')

  return <UiResizable {...rest} class={props.class} render={props.render} />
}

type UiResizablePanelProps = ComponentProps<typeof UiResizablePanel>

export type ResizablePanelProps = Omit<
  UiResizablePanelProps,
  'class' | 'render'
> & {
  class?: UiResizablePanelProps['class']
  render?: UiResizablePanelProps['render']
}

export function ResizablePanel(props: ResizablePanelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiResizablePanel {...rest} class={props.class} render={props.render} />
  )
}

type UiResizableHandleProps = ComponentProps<typeof UiResizableHandle>

export type ResizableHandleProps = Omit<
  UiResizableHandleProps,
  'class' | 'render' | 'children'
> & {
  /** Renders a centered visual grip pill on the separator. */
  withHandle?: boolean
  class?: UiResizableHandleProps['class']
  render?: UiResizableHandleProps['render']
  children?: UiResizableHandleProps['children']
}

export function ResizableHandle(props: ResizableHandleProps) {
  const rest = omit(props, 'withHandle', 'class', 'render', 'children')

  return (
    <UiResizableHandle {...rest} class={props.class} render={props.render}>
      {props.children !== undefined ? (
        props.children
      ) : props.withHandle ? (
        <span data-slot="resizable-handle-grip" aria-hidden="true">
          <GripDots />
        </span>
      ) : undefined}
    </UiResizableHandle>
  )
}

function GripDots(): JSX.Element {
  return (
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="4" cy="3.5" r="0.9" fill="currentColor" />
      <circle cx="4" cy="7" r="0.9" fill="currentColor" />
      <circle cx="4" cy="10.5" r="0.9" fill="currentColor" />
    </svg>
  )
}

export { createResizableController, resizableStorageKey }
export type {
  ResizableApi,
  ResizableChangeOptions,
  ResizableController,
  ResizableHandleState,
  ResizableLayoutChangeDetails,
  ResizableLayoutChangeReason,
  ResizableLayoutCommitDetails,
  ResizableOptions,
  ResizablePanelState,
  ResizablePrimitive,
  ResizableSize,
  ResizableState,
  ResizableStorage,
  UiResizableHandleOptions,
  UiResizablePanelOptions,
}
