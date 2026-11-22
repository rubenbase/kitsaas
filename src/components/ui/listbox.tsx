import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createListboxController,
  Listbox as UiListbox,
  ListboxGroup as UiListboxGroup,
  ListboxGroupLabel as UiListboxGroupLabel,
  ListboxItem as UiListboxItem,
  ListboxItemIcon as UiListboxItemIcon,
  ListboxItemIndicator as UiListboxItemIndicator,
  ListboxItems,
  ListboxSeparator as UiListboxSeparator,
  type ListboxProps as UiListboxProps,
} from '@ui-sdk/solid/listbox'
import { omit } from 'solid-js'

import './listbox.css'

export type ListboxSurface = 'base' | 'layer-1'

export type ListboxProps<
  T = string,
  Multiple extends boolean | undefined = false,
> = UiListboxProps<T, Multiple> & {
  /** Background surface fill. Defaults to `base`. */
  surface?: ListboxSurface
  /** Marks the container outline red. */
  invalid?: boolean
}

export function Listbox<
  T = string,
  Multiple extends boolean | undefined = false,
>(props: ListboxProps<T, Multiple>) {
  const rest = omit(
    props as Record<string, unknown>,
    'surface',
    'invalid',
  ) as UiListboxProps<T, Multiple>

  return (
    <UiListbox<T, Multiple>
      {...rest}
      data-surface={props.surface ?? 'base'}
      data-invalid={props.invalid ? '' : undefined}
    />
  )
}

type BaseListboxItemProps = ComponentProps<typeof UiListboxItem>

export type ListboxItemProps<T = string> = Omit<
  BaseListboxItemProps,
  'value' | 'class' | 'render'
> & {
  value: T
  class?: BaseListboxItemProps['class']
  render?: BaseListboxItemProps['render']
}

export function ListboxItem<T = string>(props: ListboxItemProps<T>) {
  const rest = omit(props, 'value', 'class', 'render')

  return (
    <UiListboxItem<T>
      {...rest}
      value={props.value}
      class={props.class}
      render={props.render}
    />
  )
}

type UiListboxItemIndicatorProps = ComponentProps<typeof UiListboxItemIndicator>

export type ListboxItemIndicatorProps = Omit<
  UiListboxItemIndicatorProps,
  'class' | 'render' | 'children'
> & {
  class?: UiListboxItemIndicatorProps['class']
  render?: UiListboxItemIndicatorProps['render']
  children?: UiListboxItemIndicatorProps['children']
}

export function ListboxItemIndicator(props: ListboxItemIndicatorProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiListboxItemIndicator
      {...rest}
      class={props.class}
      render={props.render}
    >
      {(state) =>
        typeof props.children === 'function'
          ? props.children(state)
          : (props.children ?? <CheckMark />)
      }
    </UiListboxItemIndicator>
  )
}

type UiListboxItemIconProps = ComponentProps<typeof UiListboxItemIcon>

export type ListboxItemIconProps = Omit<
  UiListboxItemIconProps,
  'class' | 'render'
> & {
  class?: UiListboxItemIconProps['class']
  render?: UiListboxItemIconProps['render']
}

export function ListboxItemIcon(props: ListboxItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiListboxItemIcon {...rest} class={props.class} render={props.render} />
  )
}

type UiListboxGroupProps = ComponentProps<typeof UiListboxGroup>

export type ListboxGroupProps = Omit<
  UiListboxGroupProps,
  'class' | 'render'
> & {
  class?: UiListboxGroupProps['class']
  render?: UiListboxGroupProps['render']
}

export function ListboxGroup(props: ListboxGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiListboxGroup {...rest} class={props.class} render={props.render} />
}

type UiListboxGroupLabelProps = ComponentProps<typeof UiListboxGroupLabel>

export type ListboxGroupLabelProps = Omit<
  UiListboxGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiListboxGroupLabelProps['class']
  render?: UiListboxGroupLabelProps['render']
}

export function ListboxGroupLabel(props: ListboxGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiListboxGroupLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiListboxSeparatorProps = ComponentProps<typeof UiListboxSeparator>

export type ListboxSeparatorProps = Omit<
  UiListboxSeparatorProps,
  'class' | 'render'
> & {
  class?: UiListboxSeparatorProps['class']
  render?: UiListboxSeparatorProps['render']
}

export function ListboxSeparator(props: ListboxSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiListboxSeparator {...rest} class={props.class} render={props.render} />
  )
}

export { createListboxController, ListboxItems }

function CheckMark(): JSX.Element {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.53564 8.17857L6.39279 11.75L12.4642 4.25"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
