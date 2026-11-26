import {
  ariaKeyshortcuts,
  createChange,
  createController,
  createLocalStorage,
  definePrimitive,
  matchesShortcut,
  openAttrs,
  type ChangeDetails,
  type ChangeOptions,
} from '@ui-sdk/core'

export type SidebarState = 'expanded' | 'collapsed'
export type SidebarSide = 'left' | 'right'
export type SidebarVariant = 'sidebar' | 'floating' | 'inset'
export type SidebarCollapsible = 'offcanvas' | 'icon' | 'none'

export type SidebarOpenChangeReason =
  | 'press'
  | 'shortcut'
  | 'rail'
  | 'programmatic'
  | 'dismiss'

export type SidebarApi = {
  setOpen: (
    next: boolean,
    options?: ChangeOptions<SidebarOpenChangeReason>,
  ) => boolean
  setOpenMobile: (
    next: boolean,
    options?: ChangeOptions<SidebarOpenChangeReason>,
  ) => boolean
  toggle: (reason?: SidebarOpenChangeReason, event?: Event) => boolean
  setIsMobile: (isMobile: boolean) => void
  isOpen: () => boolean
  isOpenMobile: () => boolean
  isMobile: () => boolean
  mobileBreakpoint: () => number
  state: () => SidebarState
}

export type SidebarController = SidebarApi

export function createSidebarController(): SidebarController {
  return createController<SidebarApi>()
}

export type SidebarOptions = {
  /** Controlled desktop open state. */
  open?: boolean
  /** Initial desktop open state when uncontrolled. Defaults to `true`. */
  defaultOpen?: boolean
  /** Called when the desktop open state requests a change. */
  onOpenChange?: (
    open: boolean,
    details: ChangeDetails<SidebarOpenChangeReason>,
  ) => void
  /** Controlled mobile drawer open state. */
  openMobile?: boolean
  /** Initial mobile drawer open state when uncontrolled. Defaults to `false`. */
  defaultOpenMobile?: boolean
  /** Called when the mobile drawer open state requests a change. */
  onOpenMobileChange?: (
    open: boolean,
    details: ChangeDetails<SidebarOpenChangeReason>,
  ) => void
  /** Viewport width (px) below which the sidebar switches to mobile sheet mode. Defaults to `768`. */
  mobileBreakpoint?: number
  /** Global keyboard shortcut that toggles the sidebar. Defaults to `"mod+b"`. Pass `null` to disable. */
  shortcut?: string | null
  /** Optional localStorage key to persist desktop open/collapsed state across reloads. */
  storageKey?: string
  /** Optional imperative controller created via `createSidebarController()`. */
  controller?: SidebarController
}

type InternalSidebarState = {
  open: boolean
  openMobile: boolean
  isMobile: boolean
}

function readStoredOpen(storageKey: string | undefined): boolean | undefined {
  if (!storageKey || typeof window === 'undefined') return undefined
  const value = createLocalStorage(storageKey).get()
  if (value === 'open') return true
  if (value === 'closed') return false
  return undefined
}

function writeStoredOpen(storageKey: string | undefined, open: boolean): void {
  if (!storageKey || typeof window === 'undefined') return
  createLocalStorage(storageKey).set(open ? 'open' : 'closed')
}

/**
 * Headless Sidebar primitive built on `@ui-sdk/core` so its state, controlled/uncontrolled
 * lifecycle, storage persistence, mobile breakpoint tracking, and `mod+b` keyboard shortcut
 * stay framework-agnostic and reusable across adapters.
 */
export const sidebarPrimitive = definePrimitive({
  name: 'sidebar',
  options: {
    open: 'boolean',
    defaultOpen: 'boolean',
    onOpenChange: 'callback',
    openMobile: 'boolean',
    defaultOpenMobile: 'boolean',
    onOpenMobileChange: 'callback',
    mobileBreakpoint: 'number',
    shortcut: 'value',
    storageKey: 'string',
    controller: 'value',
  },
  controlled: ['open', 'openMobile'],
  state: (options: SidebarOptions): InternalSidebarState => {
    const stored =
      options.open === undefined
        ? readStoredOpen(options.storageKey)
        : undefined
    return {
      open: options.open ?? stored ?? options.defaultOpen ?? true,
      openMobile: options.openMobile ?? options.defaultOpenMobile ?? false,
      isMobile: false,
    }
  },
  sync: (options: SidebarOptions) => {
    const patch: Partial<InternalSidebarState> = {}
    if (options.open !== undefined) patch.open = options.open
    if (options.openMobile !== undefined) patch.openMobile = options.openMobile
    return patch
  },
  api: (context) => {
    const change = createChange(context)

    const setOpen = (
      next: boolean,
      options?: ChangeOptions<SidebarOpenChangeReason>,
    ) => {
      const changed = change('open', next, {
        reason: options?.reason ?? 'programmatic',
        event: options?.event,
      })
      if (changed) {
        writeStoredOpen(context.options().storageKey, next)
      }
      return changed
    }

    const setOpenMobile = (
      next: boolean,
      options?: ChangeOptions<SidebarOpenChangeReason>,
    ) =>
      change('openMobile', next, {
        reason: options?.reason ?? 'programmatic',
        event: options?.event,
      })

    const toggle = (
      reason: SidebarOpenChangeReason = 'press',
      event?: Event,
    ) => {
      const current = context.store.get()
      if (current.isMobile) {
        return setOpenMobile(!current.openMobile, { reason, event })
      }
      return setOpen(!current.open, { reason, event })
    }

    const setIsMobile = (isMobile: boolean) => {
      if (context.store.get().isMobile === isMobile) return
      context.store.set({ isMobile })
    }

    return {
      setOpen,
      setOpenMobile,
      toggle,
      setIsMobile,
      isOpen: () => context.store.get().open,
      isOpenMobile: () => context.store.get().openMobile,
      isMobile: () => context.store.get().isMobile,
      mobileBreakpoint: () => context.options().mobileBreakpoint ?? 768,
      state: (): SidebarState =>
        context.store.get().open ? 'expanded' : 'collapsed',
    }
  },
  slots: (slot) => ({
    provider: slot<
      {},
      { open: boolean; openMobile: boolean; isMobile: boolean; state: SidebarState }
    >({
      state: (state) => ({
        open: state.open,
        openMobile: state.openMobile,
        isMobile: state.isMobile,
        state: state.open ? 'expanded' : 'collapsed',
      }),
      attrs: (state) => ({
        'data-state': state.open ? 'expanded' : 'collapsed',
        'data-mobile': state.isMobile ? '' : undefined,
      }),
      bind: (_el, part) => {
        if (typeof window === 'undefined') return

        const bp = part.api.mobileBreakpoint()
        const media = window.matchMedia(`(max-width: ${bp - 1}px)`)
        const updateMobile = () => part.api.setIsMobile(media.matches)
        updateMobile()
        media.addEventListener('change', updateMobile)

        return () => {
          media.removeEventListener('change', updateMobile)
        }
      },
    }),

    panel: slot<
      {
        side?: SidebarSide
        variant?: SidebarVariant
        collapsible?: SidebarCollapsible
      },
      { open: boolean; state: SidebarState }
    >({
      props: {
        side: 'string',
        variant: 'string',
        collapsible: 'string',
      },
      state: (state) => ({
        open: state.open,
        state: state.open ? 'expanded' : 'collapsed',
      }),
      attrs: (state, part) => {
        const collapsible = part.props.collapsible ?? 'offcanvas'
        const effectiveOpen = collapsible === 'none' ? true : state.open
        return {
          id: `${part.id}-panel`,
          ...openAttrs(effectiveOpen),
          'data-state': effectiveOpen ? 'expanded' : 'collapsed',
          'data-collapsible': effectiveOpen ? '' : collapsible,
          'data-variant': part.props.variant ?? 'sidebar',
          'data-side': part.props.side ?? 'left',
        }
      },
    }),

    trigger: slot<
      { shortcut?: string | null },
      { open: boolean; openMobile: boolean; isMobile: boolean }
    >({
      props: { shortcut: 'value' },
      state: (state) => ({
        open: state.open,
        openMobile: state.openMobile,
        isMobile: state.isMobile,
      }),
      attrs: (state, part) => {
        const expanded = state.isMobile ? state.openMobile : state.open
        return {
          type: 'button',
          'aria-expanded': String(expanded),
          'aria-controls': `${part.id}-panel`,
          'data-state': expanded ? 'expanded' : 'collapsed',
        }
      },
      press: ({ api }, event) => {
        api.toggle('press', event)
      },
      bind: (el, part) => {
        const shortcut =
          part.props.shortcut === undefined ? 'mod+b' : part.props.shortcut
        if (!shortcut) return
        el.setAttribute('aria-keyshortcuts', ariaKeyshortcuts(shortcut))
        return () => {
          el.removeAttribute('aria-keyshortcuts')
        }
      },
    }),

    rail: slot<
      { side?: SidebarSide; collapsible?: SidebarCollapsible },
      { open: boolean; state: SidebarState }
    >({
      props: { side: 'string', collapsible: 'string' },
      state: (state) => ({
        open: state.open,
        state: state.open ? 'expanded' : 'collapsed',
      }),
      attrs: (state, part) => ({
        type: 'button',
        tabindex: '-1',
        title: 'Toggle Sidebar',
        'aria-label': 'Toggle Sidebar',
        'data-state': state.open ? 'expanded' : 'collapsed',
        'data-side': part.props.side ?? 'left',
        'data-collapsible': state.open ? '' : (part.props.collapsible ?? 'offcanvas'),
      }),
      press: ({ api }, event) => {
        api.toggle('rail', event)
      },
    }),

    inset: slot<{}, { open: boolean; state: SidebarState }>({
      state: (state) => ({
        open: state.open,
        state: state.open ? 'expanded' : 'collapsed',
      }),
      attrs: (state) => ({
        'data-state': state.open ? 'expanded' : 'collapsed',
      }),
    }),
  }),
  agent: { actions: ['setOpen', 'setOpenMobile', 'toggle'] },
})

export { matchesShortcut }
