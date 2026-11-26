import type { JSX } from '@solidjs/web'
import { useLocation } from '@solidjs/router'
import { For, createEffect, createSignal } from 'solid-js'

import { CloseIcon, MenuIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'

import './sidebar-layout.css'

export type SidebarItem = {
  label: string
  href: string
  icon?: () => JSX.Element
}

export type SidebarSection = {
  title: string
  items: readonly SidebarItem[]
}

export type SidebarLayoutProps = {
  /** Accessible name for the navigation and the mobile drawer, e.g. "Components". */
  label: string
  sections: readonly SidebarSection[]
  /** Label of the current page, shown on the mobile menu button. */
  currentLabel: string
  children: JSX.Element
}

function SidebarNav(props: {
  label: string
  sections: readonly SidebarSection[]
  onNavigate?: () => void
}) {
  return (
    <nav aria-label={props.label} class="flex flex-col">
      <For each={props.sections}>
        {(section, i) => (
          <>
            <p class={['px-2.5 text-[11px] text-faint [font-weight:530]', i() > 0 ? 'mt-5' : '']}>
              {section.title}
            </p>
            <ul class="mt-1.5 flex flex-col gap-0.5">
              <For each={section.items}>
                {(item) => (
                  <li>
                    <Button
                      href={item.href}
                      variant="nav"
                      icon={item.icon?.()}
                      class="sidebar-layout-link w-full px-2.5"
                      onClick={() => props.onNavigate?.()}
                    >
                      <span class="truncate">{item.label}</span>
                    </Button>
                  </li>
                )}
              </For>
            </ul>
          </>
        )}
      </For>
    </nav>
  )
}

/**
 * A section of the site with a persistent left sidebar: Components, Charts and
 * any later catalog. Below `md` the sidebar becomes a native modal drawer
 * opened from a strip that names the current page.
 */
export function SidebarLayout(props: SidebarLayoutProps) {
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = createSignal(false)
  const drawerId = () => `${props.label.toLowerCase().replaceAll(/\s+/g, '-')}-drawer`

  let mainRef!: HTMLElement
  let drawerRef!: HTMLDialogElement

  const openDrawer = () => {
    if (!drawerRef || drawerRef.open) return
    drawerRef.showModal()
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    if (!drawerRef?.open) return
    drawerRef.close()
    setDrawerOpen(false)
  }

  createEffect(
    () => location.pathname,
    () => {
      if (mainRef) mainRef.scrollTop = 0
      closeDrawer()
    },
  )

  return (
    <div class="flex min-h-0 min-w-0 w-full flex-1 overflow-hidden max-md:flex-col">
      {/* Mobile navigation strip + native modal drawer */}
      <div class="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border-muted px-3 md:hidden">
        <Button
          variant="ghost"
          size="small"
          icon={<MenuIcon />}
          aria-expanded={drawerOpen() ? 'true' : 'false'}
          aria-controls={drawerId()}
          onClick={openDrawer}
        >
          <span>{props.currentLabel}</span>
        </Button>
      </div>

      <dialog
        ref={drawerRef}
        id={drawerId()}
        class="sidebar-layout-drawer"
        aria-label={`${props.label} navigation`}
        onClose={() => setDrawerOpen(false)}
        onClick={(event) => {
          if (event.target === drawerRef) closeDrawer()
        }}
      >
        <div class="sidebar-layout-drawer-sheet">
          <div class="flex items-center justify-between border-b border-border-muted px-3.5 py-2.5">
            <span class="text-[12px] text-muted [font-weight:530]">{props.label}</span>
            <Button
              variant="ghost-muted"
              size="small"
              aria-label="Close navigation"
              icon={<CloseIcon />}
              autofocus
              onClick={closeDrawer}
            />
          </div>
          <div class="overflow-y-auto overscroll-contain px-3 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <SidebarNav label={props.label} sections={props.sections} onNavigate={closeDrawer} />
          </div>
        </div>
      </dialog>

      {/* Desktop persistent sidebar */}
      <aside class="hidden w-[228px] shrink-0 overflow-y-auto overscroll-contain border-r border-border-muted px-3 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:block">
        <SidebarNav label={props.label} sections={props.sections} />
      </aside>

      {/*
       * `main` is the content scroller and stays `relative` on purpose:
       * ui-sdk renders hidden native inputs (checkbox, radio, switch) as
       * `position: absolute` siblings, so a positioned ancestor keeps them
       * inside this scroll container.
       */}
      <main
        ref={mainRef}
        class="relative m-0 min-h-0 min-w-0 w-full max-w-none flex-1 self-stretch overflow-y-auto overflow-x-hidden overscroll-contain outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {props.children}
      </main>
    </div>
  )
}
