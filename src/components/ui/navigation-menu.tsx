import type { ComponentProps, JSX } from '@solidjs/web'
import {
  createNavigationMenuController,
  NavigationMenu as UiNavigationMenu,
  NavigationMenuContent as UiNavigationMenuContent,
  NavigationMenuIndicator as UiNavigationMenuIndicator,
  NavigationMenuItem as UiNavigationMenuItem,
  NavigationMenuLink as UiNavigationMenuLink,
  NavigationMenuLinkIcon as UiNavigationMenuLinkIcon,
  NavigationMenuList as UiNavigationMenuList,
  NavigationMenuTrigger as UiNavigationMenuTrigger,
  NavigationMenuViewport as UiNavigationMenuViewport,
  type NavigationMenuApi,
  type NavigationMenuChangeOptions,
  type NavigationMenuContentProps as UiNavigationMenuContentOptions,
  type NavigationMenuContentState,
  type NavigationMenuController,
  type NavigationMenuIndicatorState,
  type NavigationMenuItemProps as UiNavigationMenuItemOptions,
  type NavigationMenuItemState,
  type NavigationMenuLinkIconProps as UiNavigationMenuLinkIconOptions,
  type NavigationMenuLinkIconState,
  type NavigationMenuLinkProps as UiNavigationMenuLinkOptions,
  type NavigationMenuLinkState,
  type NavigationMenuListState,
  type NavigationMenuMotion,
  type NavigationMenuOptions,
  type NavigationMenuOrientation,
  type NavigationMenuPrimitive,
  type NavigationMenuProps as UiNavigationMenuProps,
  type NavigationMenuState,
  type NavigationMenuTriggerProps as UiNavigationMenuTriggerOptions,
  type NavigationMenuTriggerState,
  type NavigationMenuValueChangeReason,
  type NavigationMenuViewportProps as UiNavigationMenuViewportOptions,
  type NavigationMenuViewportState,
} from '@ui-sdk/solid/navigation-menu'
import { omit } from 'solid-js'

import './navigation-menu.css'

export type NavigationMenuProps<T extends string = string> = Omit<
  UiNavigationMenuProps<T>,
  'class' | 'render'
> & {
  class?: UiNavigationMenuProps<T>['class']
  render?: UiNavigationMenuProps<T>['render']
}

export function NavigationMenu<T extends string = string>(
  props: NavigationMenuProps<T>,
) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenu {...rest} class={props.class} render={props.render} />
  )
}

type UiListProps = ComponentProps<typeof UiNavigationMenuList>

export type NavigationMenuListProps = Omit<UiListProps, 'class' | 'render'> & {
  class?: UiListProps['class']
  render?: UiListProps['render']
}

export function NavigationMenuList(props: NavigationMenuListProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuList {...rest} class={props.class} render={props.render} />
  )
}

type UiItemProps = ComponentProps<typeof UiNavigationMenuItem>

export type NavigationMenuItemProps = Omit<UiItemProps, 'class' | 'render'> & {
  class?: UiItemProps['class']
  render?: UiItemProps['render']
}

export function NavigationMenuItem(props: NavigationMenuItemProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuItem {...rest} class={props.class} render={props.render} />
  )
}

type UiTriggerProps = ComponentProps<typeof UiNavigationMenuTrigger>

export type NavigationMenuTriggerProps = Omit<
  UiTriggerProps,
  'class' | 'render' | 'children'
> & {
  /** Renders the trailing chevron indicator. Defaults to `true`. */
  chevron?: boolean
  class?: UiTriggerProps['class']
  render?: UiTriggerProps['render']
  children?: UiTriggerProps['children']
}

export function NavigationMenuTrigger(props: NavigationMenuTriggerProps) {
  const rest = omit(props, 'chevron', 'class', 'render', 'children')

  return (
    <UiNavigationMenuTrigger
      {...rest}
      class={props.class}
      render={props.render}
    >
      {props.children === undefined
        ? undefined
        : (state) => (
            <>
              {typeof props.children === 'function'
                ? props.children(state)
                : props.children}
              {props.chevron !== false && (
                <span
                  data-slot="navigation-menu-trigger-chevron"
                  aria-hidden="true"
                >
                  <ChevronDown />
                </span>
              )}
            </>
          )}
    </UiNavigationMenuTrigger>
  )
}

type UiContentProps = ComponentProps<typeof UiNavigationMenuContent>

export type NavigationMenuContentProps = Omit<
  UiContentProps,
  'class' | 'render'
> & {
  class?: UiContentProps['class']
  render?: UiContentProps['render']
}

export function NavigationMenuContent(props: NavigationMenuContentProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuContent
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiLinkProps = ComponentProps<typeof UiNavigationMenuLink>

export type NavigationMenuLinkProps = Omit<UiLinkProps, 'class' | 'render'> & {
  class?: UiLinkProps['class']
  render?: UiLinkProps['render']
}

export function NavigationMenuLink(props: NavigationMenuLinkProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuLink {...rest} class={props.class} render={props.render} />
  )
}

type UiLinkIconProps = ComponentProps<typeof UiNavigationMenuLinkIcon>

export type NavigationMenuLinkIconProps = Omit<
  UiLinkIconProps,
  'class' | 'render'
> & {
  class?: UiLinkIconProps['class']
  render?: UiLinkIconProps['render']
}

export function NavigationMenuLinkIcon(props: NavigationMenuLinkIconProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuLinkIcon
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiViewportProps = ComponentProps<typeof UiNavigationMenuViewport>

export type NavigationMenuViewportProps = Omit<
  UiViewportProps,
  'class' | 'render'
> & {
  class?: UiViewportProps['class']
  render?: UiViewportProps['render']
}

export function NavigationMenuViewport(props: NavigationMenuViewportProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuViewport
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

type UiIndicatorProps = ComponentProps<typeof UiNavigationMenuIndicator>

export type NavigationMenuIndicatorProps = Omit<
  UiIndicatorProps,
  'class' | 'render'
> & {
  class?: UiIndicatorProps['class']
  render?: UiIndicatorProps['render']
}

export function NavigationMenuIndicator(props: NavigationMenuIndicatorProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiNavigationMenuIndicator
      {...rest}
      class={props.class}
      render={props.render}
    />
  )
}

function ChevronDown(): JSX.Element {
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
        d="M4.5 6.25L8 9.75L11.5 6.25"
        stroke="currentColor"
        stroke-width="1.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export { createNavigationMenuController }
export type {
  NavigationMenuApi,
  NavigationMenuChangeOptions,
  NavigationMenuContentState,
  NavigationMenuController,
  NavigationMenuIndicatorState,
  NavigationMenuItemState,
  NavigationMenuLinkIconState,
  NavigationMenuLinkState,
  NavigationMenuListState,
  NavigationMenuMotion,
  NavigationMenuOptions,
  NavigationMenuOrientation,
  NavigationMenuPrimitive,
  NavigationMenuState,
  NavigationMenuTriggerState,
  NavigationMenuValueChangeReason,
  NavigationMenuViewportState,
  UiNavigationMenuContentOptions,
  UiNavigationMenuItemOptions,
  UiNavigationMenuLinkIconOptions,
  UiNavigationMenuLinkOptions,
  UiNavigationMenuTriggerOptions,
  UiNavigationMenuViewportOptions,
}
