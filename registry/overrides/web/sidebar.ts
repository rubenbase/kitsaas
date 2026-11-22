import { createParts, wrappedButton } from '@ui-sdk/web'

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

/**
 * Registers custom elements for Kitsaas's `@ui-sdk/core` Sidebar primitive:
 * - `<kitsaas-sidebar-provider>`
 * - `<kitsaas-sidebar-panel>`
 * - `<kitsaas-sidebar-trigger>`
 * - `<kitsaas-sidebar-rail>`
 * - `<kitsaas-sidebar-inset>`
 *
 * Presentational children use `data-slot="sidebar-header"`, `data-slot="sidebar-content"`,
 * `data-slot="sidebar-group"`, `data-slot="sidebar-menu-button"`, etc., styled automatically
 * by `sidebar.css`.
 */
createParts(sidebarPrimitive, {
  provider: 'kitsaas-sidebar-provider',
  panel: 'kitsaas-sidebar-panel',
  trigger: { tag: 'kitsaas-sidebar-trigger', target: wrappedButton },
  rail: { tag: 'kitsaas-sidebar-rail', target: wrappedButton },
  inset: 'kitsaas-sidebar-inset',
})

export {
  createSidebarController,
  matchesShortcut,
  sidebarPrimitive,
}

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
