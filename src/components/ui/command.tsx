import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Command as UiCommand,
  CommandEmpty as UiCommandEmpty,
  CommandGroup as UiCommandGroup,
  CommandGroupLabel as UiCommandGroupLabel,
  CommandInput as UiCommandInput,
  CommandItem as UiCommandItem,
  CommandItemIcon as UiCommandItemIcon,
  CommandItems,
  CommandItemText as UiCommandItemText,
  CommandList as UiCommandList,
  CommandPage,
  CommandSeparator as UiCommandSeparator,
  CommandShortcut as UiCommandShortcut,
  CommandStatus as UiCommandStatus,
  createCommandController,
} from '@ui-sdk/solid/command'
import { omit, Show } from 'solid-js'

import { Kbd } from './kbd'

import './command.css'

type UiCommandProps = ComponentProps<typeof UiCommand>

export type CommandProps = Omit<UiCommandProps, 'class' | 'render'> & {
  class?: UiCommandProps['class']
  render?: UiCommandProps['render']
}

export function Command(props: CommandProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommand {...rest} class={props.class} render={props.render} />
}

export type CommandInputWrapperProps = Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  /** Custom leading icon; defaults to a search icon. Pass `null` to hide. */
  icon?: JSX.Element | null
  children?: JSX.Element
}

export function CommandInputWrapper(props: CommandInputWrapperProps) {
  const rest = omit(props, 'icon', 'children')

  return (
    <div {...rest} data-slot="command-input-wrapper">
      <Show when={props.icon !== null}>
        <span data-slot="command-input-icon" aria-hidden="true">
          {props.icon ?? <SearchIconSvg />}
        </span>
      </Show>
      {props.children}
    </div>
  )
}

type UiCommandInputProps = ComponentProps<typeof UiCommandInput>

export type CommandInputProps = Omit<
  UiCommandInputProps,
  'class' | 'render'
> & {
  class?: UiCommandInputProps['class']
  render?: UiCommandInputProps['render']
}

export function CommandInput(props: CommandInputProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandInput {...rest} class={props.class} render={props.render} />
}

type UiCommandListProps = ComponentProps<typeof UiCommandList>

export type CommandListProps = Omit<UiCommandListProps, 'class' | 'render'> & {
  class?: UiCommandListProps['class']
  render?: UiCommandListProps['render']
}

export function CommandList(props: CommandListProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandList {...rest} class={props.class} render={props.render} />
}

type UiCommandItemProps = ComponentProps<typeof UiCommandItem>

export type CommandItemProps = Omit<UiCommandItemProps, 'class' | 'render'> & {
  class?: UiCommandItemProps['class']
  render?: UiCommandItemProps['render']
}

export function CommandItem(props: CommandItemProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandItem {...rest} class={props.class} render={props.render} />
}

type UiCommandItemTextProps = ComponentProps<typeof UiCommandItemText>

export type CommandItemTextProps = Omit<
  UiCommandItemTextProps,
  'class' | 'render'
> & {
  class?: UiCommandItemTextProps['class']
  render?: UiCommandItemTextProps['render']
}

export function CommandItemText(props: CommandItemTextProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCommandItemText {...rest} class={props.class} render={props.render} />
  )
}

type UiCommandItemIconProps = ComponentProps<typeof UiCommandItemIcon>

export type CommandItemIconProps = Omit<
  UiCommandItemIconProps,
  'class' | 'render'
> & {
  class?: UiCommandItemIconProps['class']
  render?: UiCommandItemIconProps['render']
}

export function CommandItemIcon(props: CommandItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCommandItemIcon {...rest} class={props.class} render={props.render} />
  )
}

type UiCommandShortcutProps = ComponentProps<typeof UiCommandShortcut>

export type CommandShortcutProps = Omit<
  UiCommandShortcutProps,
  'class' | 'render'
> & {
  class?: UiCommandShortcutProps['class']
  render?: UiCommandShortcutProps['render']
}

/**
 * The item's shortcut, formatted for the platform by ui-sdk, drawn as a Kbd
 * cap. Pass `render` to draw something else.
 */
export function CommandShortcut(props: CommandShortcutProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCommandShortcut
      {...rest}
      class={props.class}
      render={props.render ?? ((attrs) => <Kbd {...(attrs as object)} />)}
    />
  )
}

type UiCommandGroupProps = ComponentProps<typeof UiCommandGroup>

export type CommandGroupProps = Omit<
  UiCommandGroupProps,
  'class' | 'render'
> & {
  class?: UiCommandGroupProps['class']
  render?: UiCommandGroupProps['render']
}

export function CommandGroup(props: CommandGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandGroup {...rest} class={props.class} render={props.render} />
}

type UiCommandGroupLabelProps = ComponentProps<typeof UiCommandGroupLabel>

export type CommandGroupLabelProps = Omit<
  UiCommandGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiCommandGroupLabelProps['class']
  render?: UiCommandGroupLabelProps['render']
}

export function CommandGroupLabel(props: CommandGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCommandGroupLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiCommandSeparatorProps = ComponentProps<typeof UiCommandSeparator>

export type CommandSeparatorProps = Omit<
  UiCommandSeparatorProps,
  'class' | 'render'
> & {
  class?: UiCommandSeparatorProps['class']
  render?: UiCommandSeparatorProps['render']
}

export function CommandSeparator(props: CommandSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiCommandSeparator {...rest} class={props.class} render={props.render} />
  )
}

type UiCommandEmptyProps = ComponentProps<typeof UiCommandEmpty>

export type CommandEmptyProps = Omit<
  UiCommandEmptyProps,
  'class' | 'render'
> & {
  class?: UiCommandEmptyProps['class']
  render?: UiCommandEmptyProps['render']
}

export function CommandEmpty(props: CommandEmptyProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandEmpty {...rest} class={props.class} render={props.render} />
}

type UiCommandStatusProps = ComponentProps<typeof UiCommandStatus>

export type CommandStatusProps = Omit<
  UiCommandStatusProps,
  'class' | 'render'
> & {
  class?: UiCommandStatusProps['class']
  render?: UiCommandStatusProps['render']
}

export function CommandStatus(props: CommandStatusProps) {
  const rest = omit(props, 'class', 'render')

  return <UiCommandStatus {...rest} class={props.class} render={props.render} />
}

export type CommandFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function CommandFooter(props: CommandFooterProps) {
  return <div {...props} data-slot="command-footer" />
}

export { CommandItems, CommandPage, createCommandController }

function SearchIconSvg(): JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.2 10.2 3 3" />
    </svg>
  )
}
