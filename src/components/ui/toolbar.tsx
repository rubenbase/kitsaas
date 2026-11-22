import type { ComponentProps } from '@solidjs/web'
import {
  createToolbarController,
  Toolbar as UiToolbar,
  ToolbarButton as UiToolbarButton,
  ToolbarGroup as UiToolbarGroup,
  ToolbarInput as UiToolbarInput,
  ToolbarLink as UiToolbarLink,
  ToolbarSeparator as UiToolbarSeparator,
} from '@ui-sdk/solid/toolbar'
import { omit } from 'solid-js'

import './toolbar.css'

export { createToolbarController }

export type {
  ToolbarApi,
  ToolbarButtonState,
  ToolbarController,
  ToolbarGroupState,
  ToolbarInputState,
  ToolbarLinkState,
  ToolbarOptions,
  ToolbarOrientation,
  ToolbarSeparatorState,
  ToolbarState,
} from '@ui-sdk/solid/toolbar'

/**
 * Toolbar, styled for Kitsaas on top of ui-sdk's headless Toolbar.
 *
 * Provides roving focus with a single tab stop and arrow-key navigation across
 * buttons, links, inputs, toggles, toggle groups and menu triggers.
 */

type UiToolbarProps = ComponentProps<typeof UiToolbar>

export type ToolbarProps = Omit<UiToolbarProps, 'class' | 'render'> & {
  class?: UiToolbarProps['class']
  render?: UiToolbarProps['render']
}

export function Toolbar(props: ToolbarProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToolbar {...rest} class={props.class} render={props.render} />
}

type UiToolbarButtonProps = ComponentProps<typeof UiToolbarButton>

export type ToolbarButtonProps = Omit<
  UiToolbarButtonProps,
  'class' | 'render'
> & {
  class?: UiToolbarButtonProps['class']
  render?: UiToolbarButtonProps['render']
}

export function ToolbarButton(props: ToolbarButtonProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToolbarButton {...rest} class={props.class} render={props.render} />
}

type UiToolbarLinkProps = ComponentProps<typeof UiToolbarLink>

export type ToolbarLinkProps = Omit<UiToolbarLinkProps, 'class' | 'render'> & {
  class?: UiToolbarLinkProps['class']
  render?: UiToolbarLinkProps['render']
}

export function ToolbarLink(props: ToolbarLinkProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToolbarLink {...rest} class={props.class} render={props.render} />
}

type UiToolbarInputProps = ComponentProps<typeof UiToolbarInput>

export type ToolbarInputProps = Omit<
  UiToolbarInputProps,
  'class' | 'render'
> & {
  class?: UiToolbarInputProps['class']
  render?: UiToolbarInputProps['render']
}

export function ToolbarInput(props: ToolbarInputProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToolbarInput {...rest} class={props.class} render={props.render} />
}

type UiToolbarGroupProps = ComponentProps<typeof UiToolbarGroup>

export type ToolbarGroupProps = Omit<
  UiToolbarGroupProps,
  'class' | 'render'
> & {
  class?: UiToolbarGroupProps['class']
  render?: UiToolbarGroupProps['render']
}

export function ToolbarGroup(props: ToolbarGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiToolbarGroup {...rest} class={props.class} render={props.render} />
}

type UiToolbarSeparatorProps = ComponentProps<typeof UiToolbarSeparator>

export type ToolbarSeparatorProps = Omit<
  UiToolbarSeparatorProps,
  'class' | 'render'
> & {
  class?: UiToolbarSeparatorProps['class']
  render?: UiToolbarSeparatorProps['render']
}

export function ToolbarSeparator(props: ToolbarSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiToolbarSeparator {...rest} class={props.class} render={props.render} />
  )
}
