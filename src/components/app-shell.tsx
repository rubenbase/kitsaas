import type { JSX } from '@solidjs/web'
import { useLocation } from '@solidjs/router'
import { For, createEffect, createSignal, onSettled } from 'solid-js'

import {
  ChartsIcon,
  ChevronDownIcon,
  CoinIcon,
  ComponentsIcon,
  SearchIcon,
} from '#/components/icons'
import { Button } from '#/components/ui/button'

/**
 * Layout primitives measured from opencode.ai/console:
 *
 *   AppShell     h-dvh flex column, px 8 / pb 8, bg #080808 + sticky header
 *   header       sticky, 44px tall (py 8 + 28px row)
 *   PageLayout   window card: optional 49px tab bar + scrolling main
 *   PageContent  centered column shared by every page
 */
export function AppShell(props: { children: JSX.Element }) {
  return (
    <div class="flex h-dvh flex-col overflow-hidden bg-bg-deep px-2 pb-2 text-[13px] leading-[16.25px] text-foreground [font-weight:440] max-md:px-1 max-md:pb-1">
      <Header />

      <div class="flex min-h-0 min-w-0 w-full flex-1 flex-col overflow-hidden rounded-t-[10px] rounded-b-[14px] bg-background shadow-raised supports-[font:-apple-system-body]:rounded-b-[18px]">
        {props.children}
      </div>
    </div>
  )
}

/**
 * A page inside the window card. Console pages keep the tab bar; pages such as
 * Components render without it.
 *
 * `tabs` is either a plain `true` for an empty strip, or the page tabs to show
 * in the window chrome (Area Charts, Bar Charts, …).
 */
export function PageLayout(props: {
  tabs?: boolean | PageTab[]
  children: JSX.Element
}) {
  const tabs = () => (Array.isArray(props.tabs) ? props.tabs : [])

  return (
    <>
      {props.tabs && <TabBar items={tabs()} />}

      <main class="m-0 min-h-0 min-w-0 w-full max-w-none flex-1 self-stretch overflow-y-auto outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {props.children}
      </main>
    </>
  )
}

export type PageTab = {
  label: string
  href: string
  /** `exact` (default) or `prefix` matching for the active tab. */
  match?: 'exact' | 'prefix'
}

/** Centered content column shared by pages, matching the console's width. */
export function PageContent(props: { class?: string; children: JSX.Element }) {
  return (
    <div
      class={[
        'mx-auto w-[min(calc(100%_-_64px),1432px)] pb-8 text-[13px] leading-5 max-md:w-[calc(100%_-_32px)]',
        props.class,
      ]}
    >
      {props.children}
    </div>
  )
}

function Header() {
  return (
    <header class="sticky top-0 z-20 shrink-0 py-2 max-md:py-1">
      <div class="flex h-7 w-full items-center gap-1 px-2">
        <a
          href="/"
          class="relative flex shrink-0 items-center gap-3 text-foreground"
        >
          <span class="flex h-4 items-center justify-center rounded-[4px] bg-grey-800 px-1 text-[9px] leading-none tracking-[0.01em] text-grey-500 [font-weight:530]">
            kitsaas
          </span>
        </a>

        <span class="mx-1 h-3 w-px shrink-0 bg-[var(--v2-border-border-strong)]" />

        <div class="min-w-0 text-[0.8125rem]">
          <button
            type="button"
            class="flex h-7 max-w-full items-center gap-2 rounded-[6px] py-1 pl-1.5 pr-2 text-[0.8125rem] text-muted transition-colors hover:bg-[var(--console-nav-hover)] hover:text-foreground"
          >
            <span class="flex shrink-0 items-center">
              <span class="flex size-4 items-center justify-center rounded-[4px] bg-grey-800 text-[11px] leading-none text-grey-500 [font-weight:530]">
                D
              </span>
            </span>
            <span class="truncate [font-weight:530]">Default</span>
            <ChevronDownIcon class="size-4 text-[var(--v2-icon-icon-muted)]" />
          </button>
        </div>

        <span class="mx-1 h-3 w-px shrink-0 bg-[var(--v2-border-border-strong)] max-md:hidden" />

        <nav
          aria-label="Main"
          class="hidden min-w-0 items-center gap-0.5 md:flex"
        >
          <Button href="/components" variant="nav" icon={<ComponentsIcon />}>
            <span class="truncate">Components</span>
          </Button>
          <Button href="/charts" variant="nav" icon={<ChartsIcon />}>
            <span class="truncate">Charts</span>
          </Button>
        </nav>

        <div class="ml-auto flex items-center">
          <span class="flex h-7 items-center gap-1.5 rounded-[6px] py-1 pl-2 pr-[11px] text-[0.8125rem] text-yellow-500 [font-weight:530]">
            <CoinIcon class="size-4" />
            <span class="leading-5">$4.82 left</span>
          </span>

          <button
            type="button"
            class="inline-flex h-7 shrink-0 items-center gap-[3px] rounded-[6px] px-2 text-[0.8125rem] leading-none tracking-[-0.04px] text-faint transition-colors hover:bg-[var(--console-nav-hover)] hover:text-foreground [font-weight:530]"
          >
            <SearchIcon class="size-4 text-[var(--v2-icon-icon-muted)]" />
            <kbd class="px-[3px] font-[inherit] max-md:hidden">⌘K</kbd>
          </button>

          <button
            type="button"
            class="inline-flex size-7 items-center justify-center rounded-[6px] transition-colors hover:bg-[var(--console-nav-hover)]"
          >
            <span class="flex size-[18px] items-center justify-center rounded-full bg-grey-800 text-[11px] leading-none text-grey-500 [font-weight:530]">
              R
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

function TabBar(props: { items?: PageTab[] }) {
  const location = useLocation()
  const [indicator, setIndicator] = createSignal<JSX.CSSProperties>({
    opacity: '0',
  })
  const [animated, setAnimated] = createSignal(false)

  let strip!: HTMLDivElement
  let firstMeasure = true
  const labels = new Map<string, HTMLSpanElement>()

  const isActive = (tab: PageTab, pathname: string) => {
    if (tab.match === 'prefix') {
      return pathname === tab.href || pathname.startsWith(`${tab.href}/`)
    }
    return pathname === tab.href
  }

  type State = { pathname: string; items: PageTab[] }
  const snapshot = (): State => ({
    pathname: location.pathname,
    items: props.items ?? [],
  })
  let latest = snapshot()

  /**
   * opencode marks the current page tab with an underline that is a 1px,
   * `scaleX`ed span under the label, transitioned between tabs. It measures
   * the label rather than the button, so the line spans the text only.
   *
   * Reads no reactive values: callers pass a snapshot, so this can run from an
   * effect, a resize observer or the font-ready callback without warnings.
   */
  const measure = (state: State) => {
    const active = state.items.find((tab) => isActive(tab, state.pathname))
    const label = active ? labels.get(active.href) : undefined

    if (!strip || !label) {
      setIndicator({ opacity: '0' })
      return
    }

    const stripRect = strip.getBoundingClientRect()
    const labelRect = label.getBoundingClientRect()
    const x = labelRect.left - stripRect.left + strip.scrollLeft

    setIndicator({
      opacity: '1',
      transform: `translateX(${x}px) scaleX(${labelRect.width})`,
    })

    if (firstMeasure) {
      firstMeasure = false
      requestAnimationFrame(() => setAnimated(true))
    }

    label.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  createEffect(snapshot, (state) => {
    latest = state
    measure(state)
  })

  onSettled(() => {
    const handle = () => measure(latest)
    handle()

    window.addEventListener('resize', handle)
    const observer = new ResizeObserver(handle)
    if (strip) observer.observe(strip)
    void document.fonts?.ready.then(handle)

    return () => {
      window.removeEventListener('resize', handle)
      observer.disconnect()
    }
  })

  return (
    <div class="relative flex h-[49px] w-full shrink-0 select-none items-end gap-4 self-stretch bg-background pl-2 pr-6 after:absolute after:inset-x-0 after:bottom-[0.25px] after:h-[0.5px] after:bg-[var(--v2-border-border-strong)] after:content-[''] max-md:pl-0 max-md:pr-4">
      <div
        ref={strip}
        class="relative flex h-12 min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-[5px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <For each={props.items ?? []}>
          {(item) => {
            const active = () => isActive(item, location.pathname)

            return (
              <Button
                href={item.href}
                variant={active() ? 'ghost' : 'ghost-muted'}
                class={
                  active()
                    ? 'shrink-0'
                    : 'shrink-0 text-faint hover:text-foreground [font-weight:530]'
                }
              >
                <span
                  ref={(el) => labels.set(item.href, el)}
                  class="whitespace-nowrap"
                >
                  {item.label}
                </span>
              </Button>
            )
          }}
        </For>

        <span
          aria-hidden="true"
          class={[
            'pointer-events-none absolute bottom-0 left-0 z-[1] h-px w-px origin-left bg-[var(--v2-border-border-inverse)]',
            animated()
              ? 'transition-transform duration-[220ms] ease-[cubic-bezier(0.77,0,0.175,1)] motion-reduce:transition-none'
              : '',
          ]}
          style={indicator()}
        />
      </div>

      {/* Tab bar actions (new tab, split, etc). */}
      <div class="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-1 pb-2.5" />
    </div>
  )
}
