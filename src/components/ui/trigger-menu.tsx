import type { ComponentProps } from '@solidjs/web'
import {
  createTriggerMenuController,
  textFieldAdapter,
  TriggerMenu as UiTriggerMenu,
  TriggerMenuContent as UiTriggerMenuContent,
  TriggerMenuEmpty as UiTriggerMenuEmpty,
  TriggerMenuGroup as UiTriggerMenuGroup,
  TriggerMenuGroupLabel as UiTriggerMenuGroupLabel,
  TriggerMenuHint as UiTriggerMenuHint,
  TriggerMenuInput as UiTriggerMenuInput,
  TriggerMenuItem as UiTriggerMenuItem,
  TriggerMenuItemIcon as UiTriggerMenuItemIcon,
  TriggerMenuItems,
  TriggerMenuList as UiTriggerMenuList,
  TriggerMenuSeparator as UiTriggerMenuSeparator,
  TriggerMenuStatus as UiTriggerMenuStatus,
  type TriggerMenuProps as UiTriggerMenuProps,
} from '@ui-sdk/solid/trigger-menu'
import { omit } from 'solid-js'

import './trigger-menu.css'

export type TriggerMenuInputSurface = 'base' | 'layer-1'

export type TriggerMenuProps<T = string> = UiTriggerMenuProps<T>

export function TriggerMenu<T = string>(props: TriggerMenuProps<T>) {
  return <UiTriggerMenu<T> {...props} />
}

type UiTriggerMenuInputProps = ComponentProps<typeof UiTriggerMenuInput>

export type TriggerMenuInputProps = Omit<
  UiTriggerMenuInputProps,
  'class' | 'render'
> & {
  /** Background surface fill. Defaults to `base`. */
  surface?: TriggerMenuInputSurface
  /** Marks the outline and text red. */
  invalid?: boolean
  class?: UiTriggerMenuInputProps['class']
  render?: UiTriggerMenuInputProps['render']
}

export function TriggerMenuInput(props: TriggerMenuInputProps) {
  const rest = omit(props, 'surface', 'invalid', 'class', 'render')

  return (
    <UiTriggerMenuInput
      {...rest}
      class={props.class}
      render={props.render}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
      aria-invalid={props.invalid ? 'true' : undefined}
    />
  )
}

type UiTriggerMenuContentProps = ComponentProps<typeof UiTriggerMenuContent>

export type TriggerMenuContentProps = Omit<
  UiTriggerMenuContentProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuContentProps['class']
  render?: UiTriggerMenuContentProps['render']
}

export function TriggerMenuContent(props: TriggerMenuContentProps) {
  const rest = omit(props, 'class', 'render', 'sideOffset')

  return (
    <UiTriggerMenuContent
      {...rest}
      sideOffset={props.sideOffset ?? 4}
      class={props.class}
      render={props.render}
    />
  )
}

type UiTriggerMenuListProps = ComponentProps<typeof UiTriggerMenuList>

export type TriggerMenuListProps = Omit<
  UiTriggerMenuListProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuListProps['class']
  render?: UiTriggerMenuListProps['render']
}

export function TriggerMenuList(props: TriggerMenuListProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuList {...rest} class={props.class} render={props.render} />
  )
}

type BaseTriggerMenuItemProps = ComponentProps<typeof UiTriggerMenuItem>

export type TriggerMenuItemProps<T = string> = Omit<
  BaseTriggerMenuItemProps,
  'value' | 'class' | 'render'
> & {
  value: T
  class?: BaseTriggerMenuItemProps['class']
  render?: BaseTriggerMenuItemProps['render']
}

export function TriggerMenuItem<T = string>(props: TriggerMenuItemProps<T>) {
  const rest = omit(props, 'value', 'class', 'render')

  return (
    <UiTriggerMenuItem<T>
      {...rest}
      value={props.value}
      class={props.class}
      render={props.render}
    />
  )
}

type UiTriggerMenuItemIconProps = ComponentProps<typeof UiTriggerMenuItemIcon>

export type TriggerMenuItemIconProps = Omit<
  UiTriggerMenuItemIconProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuItemIconProps['class']
  render?: UiTriggerMenuItemIconProps['render']
}

export function TriggerMenuItemIcon(props: TriggerMenuItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuItemIcon
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiTriggerMenuGroupProps = ComponentProps<typeof UiTriggerMenuGroup>

export type TriggerMenuGroupProps = Omit<
  UiTriggerMenuGroupProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuGroupProps['class']
  render?: UiTriggerMenuGroupProps['render']
}

export function TriggerMenuGroup(props: TriggerMenuGroupProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuGroup {...rest} class={props.class} render={props.render} />
  )
}

type UiTriggerMenuGroupLabelProps = ComponentProps<
  typeof UiTriggerMenuGroupLabel
>

export type TriggerMenuGroupLabelProps = Omit<
  UiTriggerMenuGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuGroupLabelProps['class']
  render?: UiTriggerMenuGroupLabelProps['render']
}

export function TriggerMenuGroupLabel(props: TriggerMenuGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuGroupLabel
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiTriggerMenuSeparatorProps = ComponentProps<typeof UiTriggerMenuSeparator>

export type TriggerMenuSeparatorProps = Omit<
  UiTriggerMenuSeparatorProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuSeparatorProps['class']
  render?: UiTriggerMenuSeparatorProps['render']
}

export function TriggerMenuSeparator(props: TriggerMenuSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuSeparator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiTriggerMenuEmptyProps = ComponentProps<typeof UiTriggerMenuEmpty>

export type TriggerMenuEmptyProps = Omit<
  UiTriggerMenuEmptyProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuEmptyProps['class']
  render?: UiTriggerMenuEmptyProps['render']
}

export function TriggerMenuEmpty(props: TriggerMenuEmptyProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuEmpty {...rest} class={props.class} render={props.render} />
  )
}

type UiTriggerMenuStatusProps = ComponentProps<typeof UiTriggerMenuStatus>

export type TriggerMenuStatusProps = Omit<
  UiTriggerMenuStatusProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuStatusProps['class']
  render?: UiTriggerMenuStatusProps['render']
}

export function TriggerMenuStatus(props: TriggerMenuStatusProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuStatus {...rest} class={props.class} render={props.render} />
  )
}

type UiTriggerMenuHintProps = ComponentProps<typeof UiTriggerMenuHint>

export type TriggerMenuHintProps = Omit<
  UiTriggerMenuHintProps,
  'class' | 'render'
> & {
  class?: UiTriggerMenuHintProps['class']
  render?: UiTriggerMenuHintProps['render']
}

export function TriggerMenuHint(props: TriggerMenuHintProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiTriggerMenuHint {...rest} class={props.class} render={props.render} />
  )
}

export { createTriggerMenuController, textFieldAdapter, TriggerMenuItems }
export type {
  TriggerDefinition,
  TriggerMenuData,
  TriggerMenuDataItem,
} from '@ui-sdk/solid/trigger-menu'
