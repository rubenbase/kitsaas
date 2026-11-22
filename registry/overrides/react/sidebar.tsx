'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react'
import type { StateOf } from '@ui-sdk/core'
import { usePart, usePrimitive, type PartProps } from '@ui-sdk/react/primitive'

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
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: (event?: Event) => void
  shortcut: string | null
  collapsible: SidebarCollapsible
  side: SidebarSide
  _setSidebarConfig: (config: {
    collapsible: SidebarCollapsible
    side: SidebarSide
  }) => void
  _handle: ReturnType<typeof usePrimitive<typeof sidebarPrimitive>>
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

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
    children?: ReactNode
  }

export function SidebarProvider({
  open: controlledOpen,
  defaultOpen,
  onOpenChange,
  openMobile: controlledOpenMobile,
  defaultOpenMobile,
  onOpenMobileChange,
  mobileBreakpoint,
  shortcut = 'mod+b',
  storageKey,
  controller,
  children,
  ...rest
}: SidebarProviderProps) {
  const handle = usePrimitive(sidebarPrimitive, {
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
    openMobile: controlledOpenMobile,
    defaultOpenMobile,
    onOpenMobileChange,
    mobileBreakpoint,
    shortcut,
    storageKey,
    controller,
  })

  const [snapshot, setSnapshot] = useState(() => handle.state)
  const [sidebarConfig, setSidebarConfig] = useState<{
    collapsible: SidebarCollapsible
    side: SidebarSide
  }>({ collapsible: 'offcanvas', side: 'left' })

  useEffect(() => {
    setSnapshot(handle.state)
    return handle.instance.subscribe(() => {
      setSnapshot(handle.state)
    })
  }, [handle])

  useEffect(() => {
    if (!shortcut) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return
      if (!matchesShortcut(event, shortcut)) return
      event.preventDefault()
      handle.api.toggle('shortcut', event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handle, shortcut])

  const ctx = useMemo<SidebarContextValue>(
    () => ({
      state: snapshot.open ? 'expanded' : 'collapsed',
      open: snapshot.open,
      setOpen: (next) => {
        handle.api.setOpen(next)
      },
      openMobile: snapshot.openMobile,
      setOpenMobile: (next) => {
        handle.api.setOpenMobile(next)
      },
      isMobile: snapshot.isMobile,
      toggleSidebar: (event) => {
        handle.api.toggle('press', event)
      },
      shortcut,
      collapsible: sidebarConfig.collapsible,
      side: sidebarConfig.side,
      _setSidebarConfig: setSidebarConfig,
      _handle: handle,
    }),
    [handle, shortcut, sidebarConfig, snapshot],
  )

  const element = usePart(handle, 'provider', undefined, { ...rest, children }, 'div')

  return (
    <SidebarContext.Provider value={ctx}>{element}</SidebarContext.Provider>
  )
}

export type SidebarProps = Omit<
  PartProps<'aside', PanelSlotState>,
  'children'
> & {
  side?: SidebarSide
  variant?: SidebarVariant
  collapsible?: SidebarCollapsible
  mobileLabel?: string
  children?: ReactNode
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  mobileLabel = 'Sidebar navigation',
  children,
  className,
  ...rest
}: SidebarProps) {
  const sidebar = useSidebar()

  useEffect(() => {
    sidebar._setSidebarConfig({ side, collapsible })
  }, [side, collapsible])

  if (sidebar.isMobile && collapsible !== 'none') {
    return (
      <Drawer
        side={side}
        open={sidebar.openMobile}
        onOpenChange={(next) => sidebar.setOpenMobile(next)}
      >
        <DrawerBackdrop />
        <DrawerContent
          data-sidebar-mobile=""
          className={typeof className === 'function' ? undefined : className}
        >
          <DrawerTitle className="sr-only">{mobileLabel}</DrawerTitle>
          <div data-slot="sidebar-inner">{children}</div>
        </DrawerContent>
      </Drawer>
    )
  }

  return usePart(
    sidebar._handle,
    'panel',
    { side, variant, collapsible },
    {
      ...rest,
      className,
      children: <div data-slot="sidebar-inner">{children}</div>,
    },
    'aside',
  )
}

export type SidebarTriggerProps = Omit<
  PartProps<'button', TriggerSlotState>,
  'type'
>

export function SidebarTrigger({
  children,
  'aria-label': ariaLabel = 'Toggle Sidebar',
  ...rest
}: SidebarTriggerProps) {
  const sidebar = useSidebar()

  return usePart(
    sidebar._handle,
    'trigger',
    { shortcut: sidebar.shortcut },
    {
      ...rest,
      'aria-label': ariaLabel,
      children: children ?? <PanelLeftIcon />,
    },
    'button',
  )
}

export type SidebarRailProps = Omit<PartProps<'button', RailSlotState>, 'type'>

export function SidebarRail(props: SidebarRailProps) {
  const sidebar = useSidebar()

  return usePart(
    sidebar._handle,
    'rail',
    { side: sidebar.side, collapsible: sidebar.collapsible },
    props,
    'button',
  )
}

export type SidebarInsetProps = PartProps<'main', InsetSlotState> & {
  as?: 'main' | 'div'
}

export function SidebarInset({ as = 'main', ...rest }: SidebarInsetProps) {
  const sidebar = useSidebar()
  return usePart(sidebar._handle, 'inset', undefined, rest, as)
}

export type SidebarInputProps = InputHTMLAttributes<HTMLInputElement>

export function SidebarInput(props: SidebarInputProps) {
  return <input data-slot="sidebar-input" {...props} />
}

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement>

export function SidebarHeader(props: SidebarHeaderProps) {
  return <div data-slot="sidebar-header" {...props} />
}

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>

export function SidebarFooter(props: SidebarFooterProps) {
  return <div data-slot="sidebar-footer" {...props} />
}

export type SidebarSeparatorProps = SeparatorProps

export function SidebarSeparator(props: SidebarSeparatorProps) {
  return <Separator data-slot="sidebar-separator" decorative {...props} />
}

export type SidebarContentProps = HTMLAttributes<HTMLDivElement>

export function SidebarContent(props: SidebarContentProps) {
  return <div data-slot="sidebar-content" {...props} />
}

export type SidebarGroupProps = HTMLAttributes<HTMLDivElement>

export function SidebarGroup(props: SidebarGroupProps) {
  return <div data-slot="sidebar-group" {...props} />
}

export type SidebarGroupLabelProps = HTMLAttributes<HTMLDivElement> & {
  render?: (props: Record<string, unknown>) => ReactNode
}

export function SidebarGroupLabel({ render, ...rest }: SidebarGroupLabelProps) {
  if (render) return render({ 'data-slot': 'sidebar-group-label', ...rest })
  return <div data-slot="sidebar-group-label" {...rest} />
}

export type SidebarGroupActionProps =
  ButtonHTMLAttributes<HTMLButtonElement> & {
    render?: (props: Record<string, unknown>) => ReactNode
  }

export function SidebarGroupAction({
  render,
  type = 'button',
  ...rest
}: SidebarGroupActionProps) {
  if (render) return render({ 'data-slot': 'sidebar-group-action', ...rest })
  return <button type={type} data-slot="sidebar-group-action" {...rest} />
}

export type SidebarGroupContentProps = HTMLAttributes<HTMLDivElement>

export function SidebarGroupContent(props: SidebarGroupContentProps) {
  return <div data-slot="sidebar-group-content" {...props} />
}

export type SidebarMenuProps = HTMLAttributes<HTMLUListElement>

export function SidebarMenu(props: SidebarMenuProps) {
  return <ul data-slot="sidebar-menu" {...props} />
}

export type SidebarMenuItemProps = LiHTMLAttributes<HTMLLIElement>

export function SidebarMenuItem(props: SidebarMenuItemProps) {
  return <li data-slot="sidebar-menu-item" {...props} />
}

export type SidebarMenuButtonVariant = 'default' | 'outline'
export type SidebarMenuButtonSize = 'default' | 'sm' | 'lg'

export type SidebarMenuButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  isActive?: boolean
  variant?: SidebarMenuButtonVariant
  size?: SidebarMenuButtonSize
  tooltip?: ReactNode
  href?: string
  target?: string
  rel?: string
  render?: (props: Record<string, unknown>) => ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export function SidebarMenuButton({
  isActive,
  variant = 'default',
  size = 'default',
  tooltip,
  href,
  target,
  rel,
  render,
  type = 'button',
  children,
  ...rest
}: SidebarMenuButtonProps) {
  const sidebar = useContext(SidebarContext)

  const renderControl = (extra?: Record<string, unknown>) => {
    const merged = {
      ...rest,
      ...extra,
      'data-slot': 'sidebar-menu-button',
      'data-variant': variant,
      'data-size': size,
      'data-sidebar-active': isActive ? '' : undefined,
    }
    if (render) return render({ ...merged, children })
    if (href) {
      return (
        <a
          {...(merged as AnchorHTMLAttributes<HTMLAnchorElement>)}
          href={href}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      )
    }
    return (
      <button
        type={type}
        {...(merged as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  }

  const showTooltip =
    Boolean(tooltip) &&
    Boolean(sidebar) &&
    !sidebar!.isMobile &&
    sidebar!.state === 'collapsed' &&
    sidebar!.collapsible === 'icon'

  if (!showTooltip) return renderControl()

  return (
    <Tooltip>
      <TooltipTrigger
        render={(triggerProps) =>
          renderControl(triggerProps as unknown as Record<string, unknown>)
        }
      />
      <TooltipContent side={sidebar?.side === 'right' ? 'left' : 'right'}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

export type SidebarMenuActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  showOnHover?: boolean
  render?: (props: Record<string, unknown>) => ReactNode
}

export function SidebarMenuAction({
  showOnHover,
  render,
  type = 'button',
  ...rest
}: SidebarMenuActionProps) {
  const attrs = {
    'data-slot': 'sidebar-menu-action',
    'data-show-on-hover': showOnHover ? '' : undefined,
    ...rest,
  }
  if (render) return render(attrs)
  return <button type={type} {...attrs} />
}

export type SidebarMenuBadgeProps = HTMLAttributes<HTMLDivElement>

export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
  return <div data-slot="sidebar-menu-badge" {...props} />
}

export type SidebarMenuSkeletonProps = HTMLAttributes<HTMLDivElement> & {
  showIcon?: boolean
  width?: string
}

let skeletonSeed = 0
const skeletonWidths = ['62%', '78%', '54%', '84%', '68%', '74%']

export function SidebarMenuSkeleton({
  showIcon,
  width,
  style,
  ...rest
}: SidebarMenuSkeletonProps) {
  const [fallbackWidth] = useState(
    () => skeletonWidths[skeletonSeed++ % skeletonWidths.length],
  )
  return (
    <div
      data-slot="sidebar-menu-skeleton"
      {...rest}
      style={{
        ...style,
        ['--skeleton-width' as string]: width ?? fallbackWidth,
      }}
    >
      {showIcon ? (
        <Skeleton data-sidebar-skeleton="icon" />
      ) : null}
      <Skeleton data-sidebar-skeleton="text" />
    </div>
  )
}

export type SidebarMenuSubProps = HTMLAttributes<HTMLUListElement>

export function SidebarMenuSub(props: SidebarMenuSubProps) {
  return <ul data-slot="sidebar-menu-sub" {...props} />
}

export type SidebarMenuSubItemProps = LiHTMLAttributes<HTMLLIElement>

export function SidebarMenuSubItem(props: SidebarMenuSubItemProps) {
  return <li data-slot="sidebar-menu-sub-item" {...props} />
}

export type SidebarMenuSubButtonSize = 'sm' | 'md'

export type SidebarMenuSubButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> & {
  size?: SidebarMenuSubButtonSize
  isActive?: boolean
  href?: string
  target?: string
  rel?: string
  render?: (props: Record<string, unknown>) => ReactNode
  type?: 'button' | 'submit' | 'reset'
}

export function SidebarMenuSubButton({
  size = 'md',
  isActive,
  href,
  target,
  rel,
  render,
  type = 'button',
  children,
  ...rest
}: SidebarMenuSubButtonProps) {
  const shared = {
    'data-slot': 'sidebar-menu-sub-button',
    'data-size': size,
    'data-sidebar-active': isActive ? '' : undefined,
    ...rest,
  }
  if (render) return render({ ...shared, children })
  if (href) {
    return (
      <a
        {...(shared as AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    )
  }
  return (
    <button type={type} {...(shared as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}

function PanelLeftIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2.25" y="2.75" width="11.5" height="10.5" rx="2" />
      <path d="M6.25 2.75v10.5" />
    </svg>
  )
}
