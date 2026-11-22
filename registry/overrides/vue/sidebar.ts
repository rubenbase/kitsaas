import { createParts } from '@ui-sdk/vue/primitive'
import { defineComponent, h, inject, onMounted, onUnmounted, provide, ref, type InjectionKey } from 'vue'

import { Separator } from './separator'
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

const parts = createParts(sidebarPrimitive, {
  provider: 'div',
  panel: 'aside',
  trigger: 'button',
  rail: 'button',
  inset: 'main',
})

export type SidebarContextValue = {
  controller: SidebarController
  shortcut: string | null
}

const SidebarKey: InjectionKey<SidebarContextValue> = Symbol('kitsaas-sidebar')

export function useSidebar(): SidebarContextValue {
  const ctx = inject(SidebarKey)
  if (!ctx) throw new Error('useSidebar must be used within a SidebarProvider.')
  return ctx
}

export const SidebarProvider = defineComponent({
  name: 'SidebarProvider',
  props: {
    open: { type: Boolean, default: undefined },
    defaultOpen: { type: Boolean, default: true },
    shortcut: { type: [String, Object] as unknown as () => string | null, default: 'mod+b' },
    storageKey: { type: String, default: undefined },
    mobileBreakpoint: { type: Number, default: 768 },
    controller: { type: Object as () => SidebarController, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const controller = props.controller ?? createSidebarController()
    provide(SidebarKey, { controller, shortcut: props.shortcut })

    const onKeyDown = (event: KeyboardEvent) => {
      if (!props.shortcut || event.defaultPrevented) return
      if (!matchesShortcut(event, props.shortcut)) return
      event.preventDefault()
      controller.toggle('shortcut', event)
    }

    onMounted(() => window.addEventListener('keydown', onKeyDown))
    onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

    return () =>
      h(
        parts.Provider,
        {
          ...attrs,
          open: props.open,
          defaultOpen: props.defaultOpen,
          shortcut: props.shortcut,
          storageKey: props.storageKey,
          mobileBreakpoint: props.mobileBreakpoint,
          controller,
        },
        slots,
      )
  },
})

export const Sidebar = defineComponent({
  name: 'Sidebar',
  props: {
    side: { type: String as () => SidebarSide, default: 'left' },
    variant: { type: String as () => SidebarVariant, default: 'sidebar' },
    collapsible: { type: String as () => SidebarCollapsible, default: 'offcanvas' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        parts.Panel,
        { ...attrs, side: props.side, variant: props.variant, collapsible: props.collapsible },
        () => h('div', { 'data-slot': 'sidebar-inner' }, slots.default?.()),
      )
  },
})

export const SidebarTrigger = defineComponent({
  name: 'SidebarTrigger',
  setup(_, { attrs, slots }) {
    return () =>
      h(parts.Trigger, { 'aria-label': 'Toggle Sidebar', ...attrs }, () =>
        slots.default ? slots.default() : h('span', { 'aria-hidden': 'true' }, '☰'),
      )
  },
})

export const SidebarRail = parts.Rail
export const SidebarInset = parts.Inset

function slotDiv(name: string, slotName: string) {
  return defineComponent({
    name,
    setup(_, { attrs, slots }) {
      return () => h('div', { 'data-slot': slotName, ...attrs }, slots.default?.())
    },
  })
}

export const SidebarHeader = slotDiv('SidebarHeader', 'sidebar-header')
export const SidebarFooter = slotDiv('SidebarFooter', 'sidebar-footer')
export const SidebarContent = slotDiv('SidebarContent', 'sidebar-content')
export const SidebarGroup = slotDiv('SidebarGroup', 'sidebar-group')
export const SidebarGroupLabel = slotDiv('SidebarGroupLabel', 'sidebar-group-label')
export const SidebarGroupContent = slotDiv('SidebarGroupContent', 'sidebar-group-content')
export const SidebarMenuBadge = slotDiv('SidebarMenuBadge', 'sidebar-menu-badge')

export const SidebarGroupAction = defineComponent({
  name: 'SidebarGroupAction',
  setup(_, { attrs, slots }) {
    return () => h('button', { type: 'button', 'data-slot': 'sidebar-group-action', ...attrs }, slots.default?.())
  },
})

export const SidebarInput = defineComponent({
  name: 'SidebarInput',
  setup(_, { attrs }) {
    return () => h('input', { 'data-slot': 'sidebar-input', ...attrs })
  },
})

export const SidebarSeparator = defineComponent({
  name: 'SidebarSeparator',
  setup(_, { attrs }) {
    return () => h(Separator, { 'data-slot': 'sidebar-separator', decorative: true, ...attrs })
  },
})

export const SidebarMenu = defineComponent({
  name: 'SidebarMenu',
  setup(_, { attrs, slots }) {
    return () => h('ul', { 'data-slot': 'sidebar-menu', ...attrs }, slots.default?.())
  },
})

export const SidebarMenuItem = defineComponent({
  name: 'SidebarMenuItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { 'data-slot': 'sidebar-menu-item', ...attrs }, slots.default?.())
  },
})

export const SidebarMenuButton = defineComponent({
  name: 'SidebarMenuButton',
  props: {
    isActive: Boolean,
    variant: { type: String as () => 'default' | 'outline', default: 'default' },
    size: { type: String as () => 'default' | 'sm' | 'lg', default: 'default' },
    href: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.href ? 'a' : 'button',
        {
          ...(props.href ? { href: props.href } : { type: 'button' }),
          'data-slot': 'sidebar-menu-button',
          'data-variant': props.variant,
          'data-size': props.size,
          'data-sidebar-active': props.isActive ? '' : undefined,
          ...attrs,
        },
        slots.default?.(),
      )
  },
})

export const SidebarMenuAction = defineComponent({
  name: 'SidebarMenuAction',
  props: { showOnHover: Boolean },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          type: 'button',
          'data-slot': 'sidebar-menu-action',
          'data-show-on-hover': props.showOnHover ? '' : undefined,
          ...attrs,
        },
        slots.default?.(),
      )
  },
})

export const SidebarMenuSkeleton = defineComponent({
  name: 'SidebarMenuSkeleton',
  props: { showIcon: Boolean, width: { type: String, default: '72%' } },
  setup(props, { attrs }) {
    const w = ref(props.width)
    return () =>
      h('div', { 'data-slot': 'sidebar-menu-skeleton', style: { '--skeleton-width': w.value }, ...attrs }, [
        props.showIcon ? h(Skeleton, { 'data-sidebar-skeleton': 'icon' }) : null,
        h(Skeleton, { 'data-sidebar-skeleton': 'text' }),
      ])
  },
})

export const SidebarMenuSub = defineComponent({
  name: 'SidebarMenuSub',
  setup(_, { attrs, slots }) {
    return () => h('ul', { 'data-slot': 'sidebar-menu-sub', ...attrs }, slots.default?.())
  },
})

export const SidebarMenuSubItem = defineComponent({
  name: 'SidebarMenuSubItem',
  setup(_, { attrs, slots }) {
    return () => h('li', { 'data-slot': 'sidebar-menu-sub-item', ...attrs }, slots.default?.())
  },
})

export const SidebarMenuSubButton = defineComponent({
  name: 'SidebarMenuSubButton',
  props: {
    size: { type: String as () => 'sm' | 'md', default: 'md' },
    isActive: Boolean,
    href: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.href ? 'a' : 'button',
        {
          ...(props.href ? { href: props.href } : { type: 'button' }),
          'data-slot': 'sidebar-menu-sub-button',
          'data-size': props.size,
          'data-sidebar-active': props.isActive ? '' : undefined,
          ...attrs,
        },
        slots.default?.(),
      )
  },
})
