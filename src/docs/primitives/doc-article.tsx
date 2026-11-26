import type { JSX } from '@solidjs/web'
import {
  For,
  Show,
  createContext,
  createEffect,
  createSignal,
  createUniqueId,
  onSettled,
  useContext,
} from 'solid-js'

import { ArrowLeftIcon, ArrowRightIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'

import { createSlugger, slugify } from '../slug'
import { DocCopyButton } from './doc-copy-button'
import { DocFrame } from './doc-frame'
import { DocToc, type DocTocItem } from './doc-toc'
import '../docs.css'

export type DocNeighbour = {
  label: string
  href: string
}

export type DocArticleProps = {
  title: string
  description?: string
  /** Optional small eyebrow or badge rendered alongside the title. */
  badge?: string
  /** Optional header actions (e.g., package chip, quick links). */
  actions?: JSX.Element
  previous?: DocNeighbour
  next?: DocNeighbour
  /**
   * `docs` centers a 760px reading column + right TOC (Components).
   * `wide` uses a wider 1240px showcase column + right TOC on 2xl (Charts).
   */
  variant?: 'docs' | 'wide'
  /** Set false to omit the automatic right-hand "On this page" sidebar. */
  showToc?: boolean
  /** Reactive key (e.g., component slug or chart kind) to refresh TOC on route change. */
  pageKey?: string
  children: JSX.Element
}

type DocHeadingRegistry = {
  allocateId: (title: string, explicitId?: string) => string
}

const DocHeadingContext = createContext<DocHeadingRegistry | null>(null)

function scanTocItems(root: HTMLElement): DocTocItem[] {
  const nodes = root.querySelectorAll<HTMLElement>('[data-toc-heading][id]')
  const items: DocTocItem[] = []
  nodes.forEach((node) => {
    const title = node.getAttribute('data-toc-heading')?.trim()
    const depthRaw = Number(node.getAttribute('data-toc-depth') ?? '2')
    const depth: 2 | 3 = depthRaw === 3 ? 3 : 2
    if (title && node.id) {
      items.push({ id: node.id, title, depth })
    }
  })
  return items
}

/**
 * Shared documentation article shell used by both Components (with left
 * sidebar) and Charts (no left sidebar, keeping its sticky top category bar).
 *
 * Automatically observes `<DocSection>` elements inside the article and keeps
 * the right-hand `DocToc` sidebar synchronized in exact DOM order.
 */
export function DocArticle(props: DocArticleProps) {
  const [tocItems, setTocItems] = createSignal<DocTocItem[]>([])
  const [articleEl, setArticleEl] = createSignal<HTMLElement | null>(null)

  const slugger = createSlugger()

  const allocateId = (title: string, explicitId?: string) => {
    if (explicitId) return explicitId
    return slugger.slug(title)
  }

  const refreshToc = (el: HTMLElement | null) => {
    if (!el) return
    setTocItems(scanTocItems(el))
  }

  createEffect(
    () => props.pageKey,
    () => {
      slugger.reset()
      queueMicrotask(() => refreshToc(articleEl()))
    },
  )

  onSettled(() => {
    const el = articleEl()
    if (!el) return

    refreshToc(el)

    const observer = new MutationObserver(() => {
      refreshToc(el)
    })
    observer.observe(el, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id', 'data-toc-heading', 'data-toc-depth'],
    })

    return () => observer.disconnect()
  })

  const isWide = () => props.variant === 'wide'
  const showToc = () => props.showToc !== false

  return (
    <DocHeadingContext value={{ allocateId }}>
      <div class="flex min-h-full w-full min-w-0">
        <div class="min-w-0 flex-1">
          <article
            ref={(el) => setArticleEl(el)}
            class={[
              'mx-auto w-full px-8 pb-20 pt-9 max-md:px-4 max-md:py-6',
              isWide() ? 'max-w-[1280px]' : 'max-w-[780px]',
            ]}
          >
            <header class="mb-8">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="min-w-0">
                  <h1 class="text-[26px] leading-8 tracking-[-0.025em] text-foreground [font-weight:530]">
                    {props.title}
                  </h1>
                </div>

                <div class="flex shrink-0 items-center gap-1.5">
                  <Show when={props.badge}>
                    <code class="mr-1 rounded-[5px] border border-border-muted bg-surface px-2 py-1 font-mono text-[11px] text-muted">
                      {props.badge}
                    </code>
                  </Show>
                  {props.actions}

                  <Show when={props.previous || props.next}>
                    {props.previous ? (
                      <Button
                        href={props.previous.href}
                        variant="neutral"
                        size="small"
                        class="!w-7 !px-0"
                        aria-label={`Previous: ${props.previous.label}`}
                      >
                        <ArrowLeftIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="neutral"
                        size="small"
                        disabled
                        class="!w-7 !px-0"
                        aria-label="No previous page"
                      >
                        <ArrowLeftIcon />
                      </Button>
                    )}

                    {props.next ? (
                      <Button
                        href={props.next.href}
                        variant="neutral"
                        size="small"
                        class="!w-7 !px-0"
                        aria-label={`Next: ${props.next.label}`}
                      >
                        <ArrowRightIcon />
                      </Button>
                    ) : (
                      <Button
                        variant="neutral"
                        size="small"
                        disabled
                        class="!w-7 !px-0"
                        aria-label="No next page"
                      >
                        <ArrowRightIcon />
                      </Button>
                    )}
                  </Show>
                </div>
              </div>

              <Show when={props.description}>
                <p class="mt-2.5 max-w-2xl text-[14px] leading-[22px] text-muted">
                  {props.description}
                </p>
              </Show>
            </header>

            <div class="min-w-0">{props.children}</div>

            <Show when={props.previous || props.next}>
              <nav
                aria-label="Page pagination"
                class="mt-14 grid grid-cols-2 gap-4 border-t border-border-muted pt-6"
              >
                <div>
                  <Show when={props.previous}>
                    {(prev) => (
                      <a
                        href={prev().href}
                        class="group inline-flex flex-col gap-0.5 rounded-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-border-border-focus)]"
                      >
                        <span class="text-[11.5px] text-faint">Previous</span>
                        <span class="inline-flex items-center gap-1.5 text-[13px] text-foreground [font-weight:530] group-hover:underline group-hover:underline-offset-4">
                          <ArrowLeftIcon class="size-3.5 text-faint transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                          {prev().label}
                        </span>
                      </a>
                    )}
                  </Show>
                </div>

                <div class="text-right">
                  <Show when={props.next}>
                    {(next) => (
                      <a
                        href={next().href}
                        class="group inline-flex flex-col items-end gap-0.5 rounded-[6px] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-border-border-focus)]"
                      >
                        <span class="text-[11.5px] text-faint">Next</span>
                        <span class="inline-flex items-center gap-1.5 text-[13px] text-foreground [font-weight:530] group-hover:underline group-hover:underline-offset-4">
                          {next().label}
                          <ArrowRightIcon class="size-3.5 text-faint transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                        </span>
                      </a>
                    )}
                  </Show>
                </div>
              </nav>
            </Show>
          </article>
        </div>

        <Show when={showToc() && tocItems().length > 0}>
          <aside
            class={[
              'relative hidden shrink-0 border-l border-border-muted',
              isWide() ? 'w-[216px] 2xl:block' : 'w-[224px] xl:block',
            ]}
          >
            <DocToc items={tocItems()} containerEl={articleEl()} />
          </aside>
        </Show>
      </div>
    </DocHeadingContext>
  )
}

export type DocSectionProps = {
  title: string
  id?: string
  level?: 2 | 3
  description?: string
  class?: string
  children: JSX.Element
}

/**
 * Self-registering documentation section. Automatically emits a unique `id`,
 * `tabindex="-1"`, and `data-toc-heading` so `DocArticle`'s right-hand `DocToc`
 * tracks it with zero manual TOC lists.
 */
export function DocSection(props: DocSectionProps) {
  const registry = useContext(DocHeadingContext)
  const level = () => props.level ?? 2
  const sectionId = registry
    ? registry.allocateId(props.title, props.id)
    : (props.id ?? slugify(props.title))

  const jumpSelf = (event: MouseEvent) => {
    const target = document.getElementById(sectionId)
    if (!target) return
    event.preventDefault()
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({
      behavior: reduce ? 'auto' : 'smooth',
      block: 'start',
    })
    try {
      window.history.replaceState(null, '', `#${sectionId}`)
    } catch {
      // Ignore history restriction errors.
    }
  }

  return (
    <section
      id={sectionId}
      tabindex={-1}
      data-toc-heading={props.title}
      data-toc-depth={level()}
      class={['doc-section min-w-0', props.class]}
    >
      <Show
        when={level() === 2}
        fallback={
          <h3 class="doc-heading-h3">
            <a
              href={`#${sectionId}`}
              class="doc-heading-link"
              onClick={jumpSelf}
            >
              {props.title}
            </a>
          </h3>
        }
      >
        <h2 class="doc-heading-h2">
          <a
            href={`#${sectionId}`}
            class="doc-heading-link"
            onClick={jumpSelf}
          >
            {props.title}
          </a>
        </h2>
      </Show>

      <Show when={props.description}>
        <p class="mb-3.5 text-[13px] leading-[20px] text-muted">
          {props.description}
        </p>
      </Show>

      {props.children}
    </section>
  )
}

export function DocCallout(props: {
  title?: string
  class?: string
  children: JSX.Element
}) {
  return (
    <div
      class={[
        'rounded-[10px] border border-border-muted bg-surface px-4 py-3 text-[12.5px] leading-[19px] text-muted',
        props.class,
      ]}
    >
      <Show when={props.title}>
        <p class="mb-1 text-[11.5px] text-foreground [font-weight:530]">
          {props.title}
        </p>
      </Show>
      {props.children}
    </div>
  )
}

export function DocAnatomy(props: { tree: string; class?: string }) {
  const id = `doc-anatomy-${createUniqueId()}`

  return (
    <DocFrame surface="base" class={['overflow-hidden', props.class]}>
      <div class="doc-copyable">
        <div class="doc-code-scroll min-w-0">
          <pre class="m-0 overflow-x-auto px-4 py-3 pr-11 font-mono text-[12.5px] leading-[20px] text-secondary">
            <code id={id}>{props.tree}</code>
          </pre>
        </div>
        <div class="doc-copy-float">
          <DocCopyButton targetId={id} ariaLabel="Copy composition tree" />
        </div>
      </div>
    </DocFrame>
  )
}

export type DocTableColumn = {
  key: string
  label: string
}

export type DocTableProps = {
  caption: string
  columns: DocTableColumn[]
  rows: Array<{
    key: string
    cells: JSX.Element[]
  }>
  class?: string
}

/**
 * Responsive reference table inside a focusable scroll region with sticky
 * header and container-query card stacking on narrow containers.
 */
export function DocTable(props: DocTableProps) {
  const captionId = `doc-table-${createUniqueId()}`

  return (
    <div
      tabindex={0}
      role="region"
      aria-labelledby={captionId}
      class={['doc-table-wrap', props.class]}
    >
      <table class="doc-table">
        <caption id={captionId} class="sr-only">
          {props.caption}
        </caption>
        <thead>
          <tr>
            <For each={props.columns}>
              {(col) => <th scope="col">{col.label}</th>}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.rows}>
            {(row) => (
              <tr>
                <For each={row.cells}>
                  {(cell, index) => (
                    <td data-label={props.columns[index()]?.label}>
                      {cell}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}
