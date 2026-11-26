import type { ComponentProps, JSX } from '@solidjs/web'
import {
  Menu as UiMenu,
  MenuCheckboxItem as UiMenuCheckboxItem,
  MenuContent as UiMenuContent,
  MenuGroup as UiMenuGroup,
  MenuGroupLabel as UiMenuGroupLabel,
  MenuItem as UiMenuItem,
  MenuItemIcon as UiMenuItemIcon,
  MenuItemIndicator as UiMenuItemIndicator,
  MenuRadioGroup as UiMenuRadioGroup,
  MenuRadioItem as UiMenuRadioItem,
  MenuSeparator as UiMenuSeparator,
  MenuSub as UiMenuSub,
  MenuSubContent as UiMenuSubContent,
  MenuSubTrigger as UiMenuSubTrigger,
  MenuTrigger as UiMenuTrigger,
} from '@ui-sdk/solid/menu'
import { createContext, omit, useContext } from 'solid-js'

import './menu.css'

/**
 * Menu, a 1:1 port of opencode's Menu (`@opencode/ui`, MIT):
 * `packages/ui/src/navigation/menu` (`menu-v2`), on top of ui-sdk's headless
 * Menu.
 *
 * Styling lives in `menu.css` as attribute rules (`data-appearance`,
 * `data-variant`, `data-highlighted`, `data-checked`, `data-open`,
 * `data-disabled`), so rest, highlight, checked, expanded, disabled and the
 * submenu chevron match upstream. Behaviour (focus, arrow keys, typeahead,
 * dismissal, submenu timing, ARIA wiring) comes from `@ui-sdk/solid`.
 *
 * Upstream's `appearance="standard"` reads opencode app-level tokens this repo
 * does not ship, so only the default `compact` look is ported. The item's
 * `badge` prop is not ported either: it is markup ui-sdk's item owns.
 */

export type MenuAppearance = 'compact'

export type MenuItemVariant = 'critical'

const MenuAppearanceContext = createContext<MenuAppearance>()

type UiMenuProps = ComponentProps<typeof UiMenu>

export type MenuProps = Omit<UiMenuProps, 'class' | 'render'> & {
  /** Defaults to `compact`, upstream's default. */
  appearance?: MenuAppearance
}

export function Menu(props: MenuProps) {
  const rest = omit(props, 'appearance')

  return (
    <MenuAppearanceContext value={props.appearance ?? 'compact'}>
      <UiMenu {...rest} />
    </MenuAppearanceContext>
  )
}

type UiMenuTriggerProps = ComponentProps<typeof UiMenuTrigger>

export type MenuTriggerProps = Omit<UiMenuTriggerProps, 'class' | 'render'> & {
  class?: UiMenuTriggerProps['class']
  render?: UiMenuTriggerProps['render']
}

export function MenuTrigger(props: MenuTriggerProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMenuTrigger {...rest} class={props.class} render={props.render} />
}

type UiMenuContentProps = ComponentProps<typeof UiMenuContent>

export type MenuContentProps = Omit<UiMenuContentProps, 'class' | 'render'> & {
  class?: UiMenuContentProps['class']
  render?: UiMenuContentProps['render']
}

export function MenuContent(props: MenuContentProps) {
  const appearance = useContext(MenuAppearanceContext) ?? 'compact'
  const rest = omit(props, 'class', 'render')

  return (
    <UiMenuContent
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={appearance}
    />
  )
}

/** The submenu's popup, styled and marked exactly like the root content. */
export function MenuSubContent(props: MenuContentProps) {
  const appearance = useContext(MenuAppearanceContext) ?? 'compact'
  const rest = omit(props, 'class', 'render')

  return (
    <UiMenuSubContent
      {...rest}
      class={props.class}
      render={props.render}
      data-appearance={appearance}
    />
  )
}

type UiMenuItemProps = ComponentProps<typeof UiMenuItem>

export type MenuItemProps = Omit<
  UiMenuItemProps,
  'class' | 'render' | 'children'
> & {
  /** Upstream's `data-variant="critical"`, a destructive action. */
  variant?: MenuItemVariant
  class?: UiMenuItemProps['class']
  render?: UiMenuItemProps['render']
  children?: UiMenuItemProps['children']
}

export function MenuItem(props: MenuItemProps) {
  const rest = omit(props, 'class', 'render', 'variant', 'children')

  return (
    <UiMenuItem
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant ?? (props.destructive ? 'critical' : undefined)}
    >
      {(state) => (
        <span data-slot="menu-item-content">
          {typeof props.children === 'function'
            ? props.children(state)
            : props.children}
        </span>
      )}
    </UiMenuItem>
  )
}

type UiMenuCheckboxItemProps = ComponentProps<typeof UiMenuCheckboxItem>

export type MenuCheckboxItemProps = Omit<
  UiMenuCheckboxItemProps,
  'class' | 'render' | 'children'
> & {
  variant?: MenuItemVariant
  class?: UiMenuCheckboxItemProps['class']
  render?: UiMenuCheckboxItemProps['render']
  children?: UiMenuCheckboxItemProps['children']
}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
  const rest = omit(props, 'class', 'render', 'variant', 'children')

  return (
    <UiMenuCheckboxItem
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant}
    >
      {(state) => (
        <>
          <span data-slot="menu-item-content">
            {typeof props.children === 'function'
              ? props.children(state)
              : props.children}
          </span>
          <UiMenuItemIndicator keepMounted>
            <CheckMark />
          </UiMenuItemIndicator>
        </>
      )}
    </UiMenuCheckboxItem>
  )
}

type UiMenuRadioGroupProps = ComponentProps<typeof UiMenuRadioGroup>

export type MenuRadioGroupProps = Omit<
  UiMenuRadioGroupProps,
  'class' | 'render'
> & {
  class?: UiMenuRadioGroupProps['class']
  render?: UiMenuRadioGroupProps['render']
}

export function MenuRadioGroup(props: MenuRadioGroupProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiMenuRadioGroup {...rest} class={props.class} render={props.render} />
  )
}

type UiMenuRadioItemProps = ComponentProps<typeof UiMenuRadioItem>

export type MenuRadioItemProps = Omit<
  UiMenuRadioItemProps,
  'class' | 'render' | 'children'
> & {
  variant?: MenuItemVariant
  class?: UiMenuRadioItemProps['class']
  render?: UiMenuRadioItemProps['render']
  children?: UiMenuRadioItemProps['children']
}

export function MenuRadioItem(props: MenuRadioItemProps) {
  const rest = omit(props, 'class', 'render', 'variant', 'children')

  return (
    <UiMenuRadioItem
      {...rest}
      class={props.class}
      render={props.render}
      data-variant={props.variant}
    >
      {(state) => (
        <>
          <span data-slot="menu-item-content">
            {typeof props.children === 'function'
              ? props.children(state)
              : props.children}
          </span>
          <UiMenuItemIndicator keepMounted>
            <CheckMark />
          </UiMenuItemIndicator>
        </>
      )}
    </UiMenuRadioItem>
  )
}

type UiMenuGroupProps = ComponentProps<typeof UiMenuGroup>

export type MenuGroupProps = Omit<UiMenuGroupProps, 'class' | 'render'> & {
  class?: UiMenuGroupProps['class']
  render?: UiMenuGroupProps['render']
}

export function MenuGroup(props: MenuGroupProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMenuGroup {...rest} class={props.class} render={props.render} />
}

type UiMenuGroupLabelProps = ComponentProps<typeof UiMenuGroupLabel>

export type MenuGroupLabelProps = Omit<
  UiMenuGroupLabelProps,
  'class' | 'render'
> & {
  class?: UiMenuGroupLabelProps['class']
  render?: UiMenuGroupLabelProps['render']
}

export function MenuGroupLabel(props: MenuGroupLabelProps) {
  const rest = omit(props, 'class', 'render')

  return (
    <UiMenuGroupLabel {...rest} class={props.class} render={props.render} />
  )
}

type UiMenuSeparatorProps = ComponentProps<typeof UiMenuSeparator>

export type MenuSeparatorProps = Omit<
  UiMenuSeparatorProps,
  'class' | 'render'
> & {
  class?: UiMenuSeparatorProps['class']
  render?: UiMenuSeparatorProps['render']
}

export function MenuSeparator(props: MenuSeparatorProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMenuSeparator {...rest} class={props.class} render={props.render} />
}

type UiMenuItemIconProps = ComponentProps<typeof UiMenuItemIcon>

export type MenuItemIconProps = Omit<UiMenuItemIconProps, 'class' | 'render'> & {
  class?: UiMenuItemIconProps['class']
  render?: UiMenuItemIconProps['render']
}

export function MenuItemIcon(props: MenuItemIconProps) {
  const rest = omit(props, 'class', 'render')

  return <UiMenuItemIcon {...rest} class={props.class} render={props.render} />
}

type UiMenuSubProps = ComponentProps<typeof UiMenuSub>

export type MenuSubProps = UiMenuSubProps

export function MenuSub(props: MenuSubProps) {
  return <UiMenuSub {...props} />
}

type UiMenuSubTriggerProps = ComponentProps<typeof UiMenuSubTrigger>

export type MenuSubTriggerProps = Omit<
  UiMenuSubTriggerProps,
  'class' | 'render' | 'children'
> & {
  class?: UiMenuSubTriggerProps['class']
  render?: UiMenuSubTriggerProps['render']
  children?: UiMenuSubTriggerProps['children']
}

export function MenuSubTrigger(props: MenuSubTriggerProps) {
  const rest = omit(props, 'class', 'render', 'children')

  return (
    <UiMenuSubTrigger {...rest} class={props.class} render={props.render}>
      {(state) => (
        <>
          <span data-slot="menu-item-content">
            {typeof props.children === 'function'
              ? props.children(state)
              : props.children}
          </span>
          <ChevronRight />
        </>
      )}
    </UiMenuSubTrigger>
  )
}

/** Upstream's trailing chevron for a submenu trigger. */
function ChevronRight() {
  return (
    <svg
      data-slot="menu-item-chevron"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 4L10 8L6 12V4Z" fill="currentColor" />
    </svg>
  )
}

/** Upstream's check mark inside a checkbox or radio item. */
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
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}
