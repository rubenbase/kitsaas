import { For, Show, createEffect, createSignal } from 'solid-js'

import { ArrowUpIcon } from '#/components/icons'

import '../docs.css'

export type DocTocItem = {
  id: string
  title: string
  depth: 2 | 3
}

export type DocTocProps = {
  items: DocTocItem[]
  /** Element whose enclosing `<main>` serves as the scroll container. */
  containerEl?: HTMLElement | null
  class?: string
}

function findScrollContainer(el: HTMLElement | null | undefined): HTMLElement | null {
  if (!el) return null
  const main = el.closest('main')
  if (main instanceof HTMLElement) return main
  return document.documentElement
}

const supportsNativeScrollTargetGroup =
  typeof window !== 'undefined' &&
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('scroll-target-group: auto')

/**
 * Right-hand sticky "On this page" table of contents.
 *
 * Uses native CSS `scroll-target-group: auto` + `:target-current` where
 * supported (never setting the fallback `.target-current` class so the browser
 * moves the visual highlight instantaneously without waiting for `scrollend`,
 * and mirroring `aria-current="location"` on `scrollend`), with an
 * `IntersectionObserver` fallback rooted on the enclosing `<main>` scroller.
 */
export function DocToc(props: DocTocProps) {
  const [activeId, setActiveId] = createSignal<string>('')
  let navRef!: HTMLElement

  createEffect(
    () => ({
      items: props.items,
      root: props.containerEl,
    }),
    ({ items, root }) => {
      if (!items.length || typeof window === 'undefined') {
        setActiveId('')
        return
      }

      const scrollContainer = findScrollContainer(root ?? navRef)

      setActiveId(items[0].id)

      if (supportsNativeScrollTargetGroup) {
        const syncFromNative = () => {
          const current = navRef?.querySelector<HTMLAnchorElement>(
            'a.doc-toc-link:target-current',
          )
          const href = current?.getAttribute('href')
          if (href?.startsWith('#')) {
            setActiveId(href.slice(1))
          }
        }

        syncFromNative()
        const target = scrollContainer ?? document
        target.addEventListener('scrollend', syncFromNative, { passive: true })
        return () => {
          target.removeEventListener('scrollend', syncFromNative)
        }
      }

      // Fallback: IntersectionObserver rooted on the actual scroll container.
      const observerRoot =
        scrollContainer && scrollContainer !== document.documentElement
          ? scrollContainer
          : null

      const sections = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null)

      if (!sections.length) return

      const visible = new Set<string>()
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visible.add(entry.target.id)
            } else {
              visible.delete(entry.target.id)
            }
          }

          // Pick the topmost visible heading in document order.
          const firstVisible = items.find((item) => visible.has(item.id))
          if (firstVisible) {
            setActiveId(firstVisible.id)
            return
          }

          // Otherwise choose the last section scrolled past the top fold.
          const rootTop = observerRoot
            ? observerRoot.getBoundingClientRect().top
            : 0
          let fallback = items[0].id
          for (const section of sections) {
            if (section.getBoundingClientRect().top - rootTop <= 120) {
              fallback = section.id
            }
          }
          setActiveId(fallback)
        },
        {
          root: observerRoot,
          rootMargin: '-8% 0px -65% 0px',
          threshold: 0,
        },
      )

      sections.forEach((section) => observer.observe(section))

      return () => {
        observer.disconnect()
      }
    },
  )

  const handleJump = (event: MouseEvent, id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
    target.focus({ preventScroll: true })
    setActiveId(id)
    try {
      window.history.replaceState(null, '', `#${id}`)
    } catch {
      // Ignore history restriction errors.
    }
  }

  const scrollToTop = () => {
    const scrollContainer = findScrollContainer(props.containerEl ?? navRef)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'
    if (scrollContainer && scrollContainer !== document.documentElement) {
      scrollContainer.scrollTo({ top: 0, behavior })
    } else {
      window.scrollTo({ top: 0, behavior })
    }
  }

  return (
    <Show when={props.items.length > 0}>
      <nav
        ref={navRef}
        aria-label="On this page"
        class={[
          'sticky top-0 max-h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain py-10 pl-5 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          props.class,
        ]}
      >
        <p class="mb-2.5 font-mono text-[10.5px] uppercase tracking-[0.07em] text-faint">
          On this page
        </p>

        <ul class="doc-toc-list">
          <For each={props.items}>
            {(item) => {
              const isCurrent = () => activeId() === item.id
              return (
                <li>
                  <a
                    href={`#${item.id}`}
                    data-depth={item.depth}
                    aria-current={isCurrent() ? 'location' : undefined}
                    class={[
                      'doc-toc-link',
                      !supportsNativeScrollTargetGroup && isCurrent()
                        ? 'target-current'
                        : '',
                    ]}
                    onClick={(event) => handleJump(event, item.id)}
                  >
                    {item.title}
                  </a>
                </li>
              )
            }}
          </For>
        </ul>

        <div class="my-4 h-px bg-border-muted" />

        <button
          type="button"
          onClick={scrollToTop}
          class="inline-flex items-center gap-1.5 rounded-[5px] py-1 text-[12px] text-faint transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-[var(--v2-border-border-focus)]"
        >
          <ArrowUpIcon class="size-3.5" />
          <span>Scroll to top</span>
        </button>
      </nav>
    </Show>
  )
}
