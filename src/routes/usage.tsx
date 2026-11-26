import type { JSX } from '@solidjs/web'
import { For, Show, createSignal } from 'solid-js'

import { PageContent, PageLayout } from '#/components/app-shell'
import {
  ArrowRightIcon,
  ChartsIcon,
  CloseIcon,
  ComponentsIcon,
  FileCodeIcon,
  TerminalIcon,
} from '#/components/icons'
import { Badge, type BadgeVariant } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { showDevOnly } from '#/env'
import { componentCatalog } from '#/routes/components/registry'
import { catalog, chartGroups } from '#/routes/charts/chart-page'

/**
 * The announcement in the home page's sticky bar. Change `id` with each new
 * announcement so people who dismissed the previous one see it; set it to
 * `null` to hide the slot.
 */
export type Announcement = {
  id: string
  badge: string
  badgeVariant?: BadgeVariant
  text: string
  /** Optional call to action; without it the announcement is plain text. */
  cta?: { label: string; href: string }
  /** Show only in development and preview builds, e.g. while the copy is a draft. */
  devOnly?: boolean
}

export const announcement: Announcement | null = {
  id: 'black-friday-2026',
  badge: 'Black Friday',
  badgeVariant: 'accent',
  text: 'Kitsaas Pro is on sale through Cyber Monday, Nov 30.',
  cta: { label: 'See the deal', href: '/pages' },
  // Draft copy and link: replace both, then remove this to show it on kitsaas.com.
  devOnly: true,
}

const DISMISS_KEY = 'kitsaas:dismissed-announcement'

function readDismissed() {
  try {
    return localStorage.getItem(DISMISS_KEY)
  } catch {
    return null
  }
}

function AnnouncementSlot(props: { announcement: Announcement }) {
  const [dismissed, setDismissed] = createSignal(readDismissed() === props.announcement.id)

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(DISMISS_KEY, props.announcement.id)
    } catch {
      // Storage can be unavailable (private mode); the dismissal then lasts
      // for this visit only.
    }
  }

  return (
    <Show when={!dismissed()}>
      <div
        role="region"
        aria-label="Announcement"
        class="flex min-w-0 items-center gap-2 text-[12px] text-muted"
      >
        <Badge variant={props.announcement.badgeVariant ?? 'accent'} class="shrink-0">
          {props.announcement.badge}
        </Badge>
        <span class="min-w-0 truncate max-sm:hidden">{props.announcement.text}</span>
        <Show when={props.announcement.cta}>
          {(cta) => (
            <Button href={cta().href} variant="ghost" size="small" class="shrink-0">
              {cta().label}
              <ArrowRightIcon class="size-3.5" />
            </Button>
          )}
        </Show>
        <Button
          variant="ghost-muted"
          size="small"
          aria-label="Dismiss announcement"
          icon={<CloseIcon />}
          onClick={dismiss}
        />
      </div>
    </Show>
  )
}

/**
 * The bar that stays at the top of the page card while the page scrolls: the
 * page title on the left, the current announcement on the right.
 */
function StickyPageBar(props: { title: string; children?: JSX.Element }) {
  return (
    <div class="sticky top-0 z-10 border-b border-border-muted bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div class="mx-auto flex h-12 w-[min(calc(100%_-_64px),1432px)] items-center justify-between gap-4 max-md:w-[calc(100%_-_32px)]">
        <h1 class="shrink-0 text-[15px] leading-5 tracking-[-0.01em] text-foreground [font-weight:560]">
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  )
}

const chartTypeCount = chartGroups.reduce((n, group) => n + group.kinds.length, 0)
const chartExampleCount = Object.values(catalog).reduce((n, items) => n + items.length, 0)

const sections: {
  title: string
  description: string
  meta: string
  href: string
  icon: () => JSX.Element
  devOnly?: boolean
}[] = [
  {
    title: 'Components',
    description: 'Styled wrappers over ui-sdk behavior, with live demos, props and styling hooks.',
    meta: `${componentCatalog.length} components`,
    href: '/components',
    icon: () => <ComponentsIcon />,
  },
  {
    title: 'Charts',
    description: 'TanStack Charts examples in the console style, from area charts to Sankey flows.',
    meta: `${chartTypeCount} types · ${chartExampleCount} examples`,
    href: '/charts',
    icon: () => <ChartsIcon />,
  },
  {
    title: 'Blocks',
    description: 'Larger sections assembled from components, ready to drop into a page.',
    meta: 'Coming soon',
    href: '/blocks',
    icon: () => <TerminalIcon />,
    devOnly: true,
  },
  {
    title: 'Pages',
    description: 'Complete console-style pages: settings, billing and activity.',
    meta: 'Coming soon',
    href: '/pages',
    icon: () => <FileCodeIcon />,
    devOnly: true,
  },
].filter((section) => showDevOnly || !section.devOnly)

const liveAnnouncement = announcement && (showDevOnly || !announcement.devOnly) ? announcement : null

export function UsagePage() {
  return (
    <PageLayout>
      <StickyPageBar title="Kitsaas">
        <Show when={liveAnnouncement}>{(a) => <AnnouncementSlot announcement={a()} />}</Show>
      </StickyPageBar>

      <PageContent class="pt-10 max-md:pt-6">
        <p class="max-w-[620px] text-[15px] leading-6 text-muted">
          Like shadcn/ui, but built on ui-sdk instead of Base UI or Radix, and styled like the
          opencode console. Copy components into your app for Solid, React, Vue, Svelte or web
          components.
        </p>

        <ul class={["mt-8 grid gap-2.5 sm:grid-cols-2", sections.length > 2 ? "xl:grid-cols-4" : ""]}>
          <For each={sections}>
            {(section) => (
              <li>
                <a
                  href={section.href}
                  class="group flex h-full flex-col justify-between gap-3 rounded-[10px] border border-border bg-surface p-4 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-border-border-focus)]"
                >
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <span class="flex items-center gap-2 text-[13px] text-foreground [font-weight:530]">
                        <span class="text-faint">{section.icon()}</span>
                        {section.title}
                      </span>
                      <ArrowRightIcon class="size-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
                    </div>
                    <p class="mt-1.5 text-[12px] leading-[17px] text-muted">
                      {section.description}
                    </p>
                  </div>
                  <p class="text-[11px] text-faint tabular-nums">{section.meta}</p>
                </a>
              </li>
            )}
          </For>
        </ul>
      </PageContent>
    </PageLayout>
  )
}
