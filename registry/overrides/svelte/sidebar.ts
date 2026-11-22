import { createParts } from '@ui-sdk/svelte/primitive'

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
 * Svelte 5 bindings for Kitsaas's custom `@ui-sdk/core` Sidebar primitive.
 *
 * Uses `createParts(sidebarPrimitive, ...)` for the stateful slots (`SidebarProvider`,
 * `Sidebar`, `SidebarTrigger`, `SidebarRail`, `SidebarInset`). Presentational slots
 * (`sidebar-header`, `sidebar-footer`, `sidebar-content`, `sidebar-group`,
 * `sidebar-group-label`, `sidebar-group-action`, `sidebar-group-content`,
 * `sidebar-menu`, `sidebar-menu-item`, `sidebar-menu-button`, `sidebar-menu-action`,
 * `sidebar-menu-badge`, `sidebar-menu-skeleton`, `sidebar-menu-sub`,
 * `sidebar-menu-sub-item`, `sidebar-menu-sub-button`, `sidebar-input`,
 * `sidebar-separator`) are styled directly by `sidebar.css` via `data-slot`.
 */
const {
  Provider: SidebarProvider,
  Panel: Sidebar,
  Trigger: SidebarTrigger,
  Rail: SidebarRail,
  Inset: SidebarInset,
} = createParts(sidebarPrimitive, {
  provider: 'div',
  panel: 'aside',
  trigger: 'button',
  rail: 'button',
  inset: 'main',
})

export {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
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
