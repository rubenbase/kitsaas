import type { JSX } from '@solidjs/web'
import type { StateOf } from '@ui-sdk/core'
import {
  usePart,
  usePrimitive,
  type PartProps,
  type PrimitiveHandle,
} from '@ui-sdk/solid/primitive'
import {
  createContext,
  createEffect,
  createSignal,
  merge,
  omit,
  onCleanup,
  Show,
  useContext,
} from 'solid-js'

import { Drawer, DrawerBackdrop, DrawerContent, DrawerTitle } from './drawer'
import { Separator, type SeparatorProps } from './separator'
import { Skeleton } from './skeleton'
import {
  createSidebarController,
  matchesShortcut,
  sidebarPrimitive,
  type SidebarApi,
  type SidebarCollapsible,
  type SidebarController,
  type SidebarOpenChangeReason,
  type SidebarOptions,
  type SidebarSide,
  type SidebarState,
  type SidebarVariant,
} from './sidebar-primitive'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

import './sidebar.css'

export { createSidebarController, sidebarPrimitive }
export type {
  SidebarApi,
  SidebarCollapsible,
  SidebarController,
  SidebarOpenChangeReason,
  SidebarOptions,
  SidebarSide,
  SidebarState,
  SidebarVariant,
}

export type SidebarContextValue = {
  /** Reactive state: `'expanded'` or `'collapsed'`. */
  state: () => SidebarState
  /** Reactive desktop open boolean. */
  open: () => boolean
  /** Programmatically update desktop open state. */
  setOpen: (open: boolean) => void
  /** Reactive mobile drawer open boolean. */
  openMobile: () => boolean
  /** Programmatically update mobile drawer open state. */
  setOpenMobile: (open: boolean) => void
  /** Whether the current viewport is below `mobileBreakpoint`. */
  isMobile: () => boolean
  /** Toggles mobile drawer on mobile viewports, or desktop collapse on desktop. */
  toggleSidebar: (event?: Event) => void
  /** Active keyboard shortcut (`"mod+b"` by default, or `null` if disabled). */
  shortcut: () => string | null
  /** Current sidebar collapsible mode (set by `<Sidebar>`). */
  collapsible: () => SidebarCollapsible
  /** Current sidebar side (set by `<Sidebar>`). */
  side: () => SidebarSide
  /** Internal setter used by `<Sidebar>` to publish its collapsible/side config. */
  _setSidebarConfig: (config: {
    collapsible: SidebarCollapsible
    side: SidebarSide
  }) => void
  /** Internal primitive handle so parts work reliably across nested sheets/portals. */
  _handle: PrimitiveHandle<typeof sidebarPrimitive>
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

/** Reads the nearest `SidebarProvider` state and controls. */
export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider.')
  }
  return ctx
}

type ProviderSlotState = StateOf<typeof sidebarPrimitive, 'provider'>
type PanelSlotState = StateOf<typeof sidebarPrimitive, 'panel'>
type TriggerSlotState = StateOf<typeof sidebarPrimitive, 'trigger'>
type RailSlotState = StateOf<typeof sidebarPrimitive, 'rail'>
type InsetSlotState = StateOf<typeof sidebarPrimitive, 'inset'>

export type SidebarProviderProps = SidebarOptions &
  Omit<PartProps<'div', ProviderSlotState>, 'children'> & {
    controller?: SidebarController
    children?: JSX.Element
  }

export function SidebarProvider(props: SidebarProviderProps) {
  const handle = usePrimitive(sidebarPrimitive, () => ({
    open: props.open,
    defaultOpen: props.defaultOpen,
    onOpenChange: props.onOpenChange,
    openMobile: props.openMobile,
    defaultOpenMobile: props.defaultOpenMobile,
    onOpenMobileChange: props.onOpenMobileChange,
    mobileBreakpoint: props.mobileBreakpoint,
    shortcut: props.shortcut,
    storageKey: props.storageKey,
    controller: props.controller,
  }))

  const [open, setOpenSignal] = createSignal(handle.state.open)
  const [openMobile, setOpenMobileSignal] = createSignal(
    handle.state.openMobile,
  )
  const [isMobile, setIsMobileSignal] = createSignal(handle.state.isMobile)
  const [sidebarConfig, setSidebarConfig] = createSignal<{
    collapsible: SidebarCollapsible
    side: SidebarSide
  }>({
    collapsible: 'offcanvas',
    side: 'left',
  })

  const unsubscribe = handle.instance.subscribe(() => {
    const next = handle.state
    setOpenSignal(next.open)
    setOpenMobileSignal(next.openMobile)
    setIsMobileSignal(next.isMobile)
  })
  onCleanup(unsubscribe)

  // Global keyboard shortcut (`mod+b` by default; `null` disables it)
  createEffect(
    () => (props.shortcut === undefined ? 'mod+b' : props.shortcut),
    (shortcut) => {
      if (!shortcut || typeof window === 'undefined') return
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.defaultPrevented) return
        if (!matchesShortcut(event, shortcut)) return
        event.preventDefault()
        handle.api.toggle('shortcut', event)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => window.removeEventListener('keydown', onKeyDown)
    },
  )

  const ctx: SidebarContextValue = {
    state: () => (open() ? 'expanded' : 'collapsed'),
    open,
    setOpen: (next) => {
      handle.api.setOpen(next)
    },
    openMobile,
    setOpenMobile: (next) => {
      handle.api.setOpenMobile(next)
    },
    isMobile,
    toggleSidebar: (event) => {
      handle.api.toggle('press', event)
    },
    shortcut: () => (props.shortcut === undefined ? 'mod+b' : props.shortcut),
    collapsible: () => sidebarConfig().collapsible,
    side: () => sidebarConfig().side,
    _setSidebarConfig: setSidebarConfig,
    _handle: handle,
  }

  const rest = omit(
    props,
    'open',
    'defaultOpen',
    'onOpenChange',
    'openMobile',
    'defaultOpenMobile',
    'onOpenMobileChange',
    'mobileBreakpoint',
    'shortcut',
    'storageKey',
    'controller',
  )

  return (
    <SidebarContext value={ctx}>
      {usePart(handle, 'provider', undefined, rest, 'div')}
    </SidebarContext>
  )
}

export type SidebarProps = Omit<
  PartProps<'aside', PanelSlotState>,
  'children'
> & {
  /** Which edge the sidebar sits on. Defaults to `'left'`. */
  side?: SidebarSide
  /** Visual chrome style: `'sidebar'` (default), `'floating'`, or `'inset'`. */
  variant?: SidebarVariant
  /** Collapse behavior: `'offcanvas'` (default), `'icon'`, or `'none'`. */
  collapsible?: SidebarCollapsible
  /** Accessible label for the mobile drawer sheet. Defaults to `'Sidebar navigation'`. */
  mobileLabel?: string
  children?: JSX.Element
}

export function Sidebar(props: SidebarProps) {
  const sidebar = useSidebar()
  const side = () => props.side ?? 'left'
  const variant = () => props.variant ?? 'sidebar'
  const collapsible = () => props.collapsible ?? 'offcanvas'

  createEffect(
    () => ({ side: side(), collapsible: collapsible() }),
    (config) => {
      sidebar._setSidebarConfig(config)
    },
  )

  const rest = omit(
    props,
    'side',
    'variant',
    'collapsible',
    'mobileLabel',
    'children',
  )

  return (
    <Show
      when={sidebar.isMobile() && collapsible() !== 'none'}
      fallback={usePart(
        sidebar._handle,
        'panel',
        () => ({
          side: side(),
          variant: variant(),
          collapsible: collapsible(),
        }),
        merge(rest, {
          children: () => <div data-slot="sidebar-inner">{props.children}</div>,
        }),
        'aside',
      )}
    >
      <Drawer
        side={side()}
        open={sidebar.openMobile()}
        onOpenChange={(next) => sidebar.setOpenMobile(next)}
      >
        <DrawerBackdrop />
        <DrawerContent
          data-sidebar-mobile=""
          class={typeof props.class === 'function' ? undefined : props.class}
        >
          <DrawerTitle class="sr-only">
            {props.mobileLabel ?? 'Sidebar navigation'}
          </DrawerTitle>
          <div data-slot="sidebar-inner">{props.children}</div>
        </DrawerContent>
      </Drawer>
    </Show>
  )
}

export type SidebarTriggerProps = Omit<
  PartProps<'button', TriggerSlotState>,
  'type'
>

export function SidebarTrigger(props: SidebarTriggerProps) {
  const sidebar = useSidebar()
  const rest = omit(props, 'children')

  return usePart(
    sidebar._handle,
    'trigger',
    () => ({ shortcut: sidebar.shortcut() }),
    merge(
      { 'aria-label': 'Toggle Sidebar' },
      rest,
      {
        children: (state: TriggerSlotState) =>
          typeof props.children === 'function'
            ? props.children(state)
            : (props.children ?? <PanelLeftIcon />),
      },
    ),
    'button',
  )
}

export type SidebarRailProps = Omit<PartProps<'button', RailSlotState>, 'type'>

export function SidebarRail(props: SidebarRailProps) {
  const sidebar = useSidebar()

  return usePart(
    sidebar._handle,
    'rail',
    () => ({
      side: sidebar.side(),
      collapsible: sidebar.collapsible(),
    }),
    props,
    'button',
  )
}

export type SidebarInsetProps = PartProps<'main', InsetSlotState> & {
  /** Renders `<main>` by default for page shells, or `<div>` for embedded previews. */
  as?: 'main' | 'div'
}

export function SidebarInset(props: SidebarInsetProps) {
  const sidebar = useSidebar()
  const rest = omit(props, 'as')
  return usePart(
    sidebar._handle,
    'inset',
    undefined,
    rest,
    props.as ?? 'main',
  )
}

export type SidebarInputProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function SidebarInput(props: SidebarInputProps) {
  return <input data-slot="sidebar-input" {...props} />
}

export type SidebarHeaderProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarHeader(props: SidebarHeaderProps) {
  return <div data-slot="sidebar-header" {...props} />
}

export type SidebarFooterProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarFooter(props: SidebarFooterProps) {
  return <div data-slot="sidebar-footer" {...props} />
}

export type SidebarSeparatorProps = SeparatorProps

export function SidebarSeparator(props: SidebarSeparatorProps) {
  return <Separator data-slot="sidebar-separator" decorative {...props} />
}

export type SidebarContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarContent(props: SidebarContentProps) {
  return <div data-slot="sidebar-content" {...props} />
}

export type SidebarGroupProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarGroup(props: SidebarGroupProps) {
  return <div data-slot="sidebar-group" {...props} />
}

export type SidebarGroupLabelProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Custom element renderer (for example, wrapping a `CollapsibleTrigger`). */
  render?: (props: Record<string, unknown>) => JSX.Element
}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
  const rest = omit(props, 'render')

  if (props.render) {
    return props.render({ 'data-slot': 'sidebar-group-label', ...rest })
  }

  return <div data-slot="sidebar-group-label" {...rest} />
}

export type SidebarGroupActionProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Custom element renderer. */
    render?: (props: Record<string, unknown>) => JSX.Element
  }

export function SidebarGroupAction(props: SidebarGroupActionProps) {
  const rest = omit(props, 'render', 'type')

  if (props.render) {
    return props.render({ 'data-slot': 'sidebar-group-action', ...rest })
  }

  return (
    <button
      type={props.type ?? 'button'}
      data-slot="sidebar-group-action"
      {...rest}
    />
  )
}

export type SidebarGroupContentProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarGroupContent(props: SidebarGroupContentProps) {
  return <div data-slot="sidebar-group-content" {...props} />
}

export type SidebarMenuProps = JSX.HTMLAttributes<HTMLUListElement>

export function SidebarMenu(props: SidebarMenuProps) {
  return <ul data-slot="sidebar-menu" {...props} />
}

export type SidebarMenuItemProps = JSX.LiHTMLAttributes<HTMLLIElement>

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  return <li data-slot="sidebar-menu-item" {...props} />
}

export type SidebarMenuButtonVariant = 'default' | 'outline'
export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg'

export type SidebarMenuButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  /** Marks the item as active. Also matches `[aria-current="page"]` automatically for links. */
  isActive?: boolean
  /** Visual variant: `'default'` or `'outline'`. */
  variant?: SidebarMenuButtonVariant
  /** Row height: `'default'` (28px), `'sm'` (24px), or `'lg'` (40px). */
  size?: SidebarMenuButtonSize
  /** Tooltip shown on hover/focus when the desktop sidebar is collapsed to `icon` mode. */
  tooltip?: string | JSX.Element
  /** Renders an anchor (`<a>`) instead of a `<button>`. */
  href?: string
  target?: string
  rel?: string
  /** Custom element renderer. */
  render?: (props: Record<string, unknown>) => JSX.Element
  type?: 'button' | 'submit' | 'reset'
}

export function SidebarMenuButton(props: SidebarMenuButtonProps) {
  const sidebar = useContext(SidebarContext)
  const rest = omit(
    props,
    'isActive',
    'variant',
    'size',
    'tooltip',
    'href',
    'target',
    'rel',
    'render',
    'type',
    'children',
  )

  const sharedProps = (extra?: Record<string, unknown>) => ({
    ...rest,
    ...extra,
    'data-slot': 'sidebar-menu-button',
    'data-variant': props.variant ?? 'default',
    'data-size': props.size ?? 'default',
    'data-sidebar-active': props.isActive ? '' : undefined,
  })

  const renderControl = (extra?: Record<string, unknown>) => {
    const merged = sharedProps(extra)
    if (props.render) {
      return props.render({ ...merged, children: props.children })
    }
    if (props.href) {
      return (
        <a
          {...(merged as JSX.AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={props.href}
          target={props.target}
          rel={props.rel}
        >
          {props.children}
        </a>
      )
    }
    return (
      <button
        type={props.type ?? 'button'}
        {...(merged as JSX.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {props.children}
      </button>
    )
  }

  const showTooltip = () =>
    Boolean(props.tooltip) &&
    Boolean(sidebar) &&
    !sidebar!.isMobile() &&
    sidebar!.state() === 'collapsed' &&
    sidebar!.collapsible() === 'icon'

  return (
    <Show when={showTooltip()} fallback={renderControl()}>
      <Tooltip>
        <TooltipTrigger
          render={(triggerProps) =>
            renderControl(triggerProps as unknown as Record<string, unknown>)
          }
        />
        <TooltipContent side={sidebar?.side() === 'right' ? 'left' : 'right'}>
          {props.tooltip}
        </TooltipContent>
      </Tooltip>
    </Show>
  )
}

export type SidebarMenuActionProps =
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Reveals the action on parent item hover/focus-within (still visible on touch devices). */
    showOnHover?: boolean
    /** Custom element renderer (for example, wrapping a `MenuTrigger`). */
    render?: (props: Record<string, unknown>) => JSX.Element
  }

export function SidebarMenuAction(props: SidebarMenuActionProps) {
  const rest = omit(props, 'showOnHover', 'render', 'type')

  const attrs = {
    'data-slot': 'sidebar-menu-action',
    'data-show-on-hover': props.showOnHover ? '' : undefined,
    ...rest,
  }

  if (props.render) {
    return props.render(attrs)
  }

  return <button type={props.type ?? 'button'} {...attrs} />
}

export type SidebarMenuBadgeProps = JSX.HTMLAttributes<HTMLDivElement>

export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
  return <div data-slot="sidebar-menu-badge" {...props} />
}

export type SidebarMenuSkeletonProps = JSX.HTMLAttributes<HTMLDivElement> & {
  /** Shows a 16×16 leading icon placeholder. */
  showIcon?: boolean
  /** Width percentage for the label bar (e.g. `"68%"`). Defaults to a deterministic width. */
  width?: string
}

let skeletonSeed = 0
const skeletonWidths = ['62%', '78%', '54%', '84%', '68%', '74%']

export function SidebarMenuSkeleton(props: SidebarMenuSkeletonProps) {
  const rest = omit(props, 'showIcon', 'width', 'style')
  const fallbackWidth = skeletonWidths[skeletonSeed++ % skeletonWidths.length]
  const width = () => props.width ?? fallbackWidth

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      {...rest}
      style={{
        ...(typeof props.style === 'object' ? props.style : undefined),
        '--skeleton-width': width(),
      }}
    >
      <Show when={props.showIcon}>
        <Skeleton data-sidebar-skeleton="icon" />
      </Show>
      <Skeleton data-sidebar-skeleton="text" />
    </div>
  )
}

export type SidebarMenuSubProps = JSX.HTMLAttributes<HTMLUListElement>

export function SidebarMenuSub(props: SidebarMenuSubProps) {
  return <ul data-slot="sidebar-menu-sub" {...props} />
}

export type SidebarMenuSubItemProps = JSX.LiHTMLAttributes<HTMLLIElement>

export function SidebarMenuSubItem(props: SidebarMenuSubItemProps) {
  return <li data-slot="sidebar-menu-sub-item" {...props} />
}

export type SidebarMenuSubButtonSize = 'sm' | 'md'

export type SidebarMenuSubButtonProps = Omit<
  JSX.ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  /** Row size: `'sm'` (24px) or `'md'` (26px, default). */
  size?: SidebarMenuSubButtonSize
  /** Marks the submenu item as active. */
  isActive?: boolean
  /** Renders an anchor (`<a>`) instead of a `<button>`. */
  href?: string
  target?: string
  rel?: string
  /** Custom element renderer. */
  render?: (props: Record<string, unknown>) => JSX.Element
  type?: 'button' | 'submit' | 'reset'
}

export function SidebarMenuSubButton(props: SidebarMenuSubButtonProps) {
  const rest = omit(
    props,
    'size',
    'isActive',
    'href',
    'target',
    'rel',
    'render',
    'type',
    'children',
  )

  const shared = {
    'data-slot': 'sidebar-menu-sub-button',
    'data-size': props.size ?? 'md',
    'data-sidebar-active': props.isActive ? '' : undefined,
    ...rest,
  }

  if (props.render) {
    return props.render({ ...shared, children: props.children })
  }

  if (props.href) {
    return (
      <a
        {...(shared as JSX.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={props.href}
        target={props.target}
        rel={props.rel}
      >
        {props.children}
      </a>
    )
  }

  return (
    <button
      type={props.type ?? 'button'}
      {...(shared as JSX.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {props.children}
    </button>
  )
}

function PanelLeftIcon(): JSX.Element {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <rect x="2.25" y="2.75" width="11.5" height="10.5" rx="2" />
      <path d="M6.25 2.75v10.5" />
    </svg>
  )
}
