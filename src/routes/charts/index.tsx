import type { RouteSectionProps } from '@solidjs/router'
import { useLocation } from '@solidjs/router'
import { For } from 'solid-js'

import { ArrowRightIcon } from '#/components/icons'
import { SidebarLayout, type SidebarSection } from '#/components/sidebar-layout'
import { DocArticle, DocInstallTerminal, DocSection } from '#/docs'

import { catalog, categoryMeta, chartGroups, type ChartKind } from './chart-page'

/**
 * Charts use the same left sidebar as Components, grouped by `chartGroups`, so
 * new categories only need an entry there.
 */
const chartSections: SidebarSection[] = [
  { title: 'Introduction', items: [{ label: 'Overview', href: '/charts' }] },
  ...chartGroups.map((group) => ({
    title: group.title,
    items: group.kinds.map((kind) => ({
      label: categoryMeta[kind].title,
      href: `/charts/${kind}`,
      icon: categoryMeta[kind].icon,
    })),
  })),
]

export function ChartsLayout(props: RouteSectionProps) {
  const location = useLocation()

  const currentLabel = () => {
    const kind = location.pathname.match(/^\/charts\/([^/]+)\/?$/)?.[1] as ChartKind | undefined
    return kind && kind in categoryMeta ? categoryMeta[kind].title : 'Overview'
  }

  return (
    <SidebarLayout label="Charts" sections={chartSections} currentLabel={currentLabel()}>
      {props.children}
    </SidebarLayout>
  )
}

const chartTypeCount = chartGroups.reduce((n, group) => n + group.kinds.length, 0)
const exampleCount = Object.values(catalog).reduce((n, items) => n + items.length, 0)

export function ChartsIndex() {
  const first = chartGroups[0]?.kinds[0]

  return (
    <DocArticle
      title="Charts"
      description="Chart examples built on TanStack Charts and styled with Kitsaas tokens. The same Chart wrapper ships for Solid, React, Vue, Svelte and web components."
      next={first ? { label: categoryMeta[first].title, href: `/charts/${first}` } : undefined}
      pageKey="charts-overview"
    >
      <DocSection
        title="Installation"
        description="Install TanStack Charts; the registry's chart item adds the Kitsaas wrapper, theme and tooltip presets."
      >
        <DocInstallTerminal packages="@tanstack/charts" />
      </DocSection>

      <For each={chartGroups}>
        {(group) => (
          <DocSection
            title={group.title}
            description={
              group === chartGroups[0]
                ? `${chartTypeCount} chart types and ${exampleCount} examples, each with copyable code.`
                : undefined
            }
          >
            <ul class="grid gap-2.5 sm:grid-cols-2">
              <For each={group.kinds}>
                {(kind) => {
                  const meta = categoryMeta[kind]
                  return (
                    <li>
                      <a
                        href={`/charts/${kind}`}
                        class="group flex h-full flex-col justify-between gap-2 rounded-[10px] border border-border bg-surface p-4 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-border-border-focus)]"
                      >
                        <div>
                          <div class="flex items-center justify-between gap-2">
                            <span class="flex items-center gap-2 text-[13px] text-foreground [font-weight:530]">
                              <span class="text-faint">{meta.icon()}</span>
                              {meta.title}
                            </span>
                            <ArrowRightIcon class="size-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
                          </div>
                          <p class="mt-1.5 line-clamp-2 text-[12px] leading-[17px] text-muted">
                            {meta.description}
                          </p>
                          <p class="mt-2 text-[11px] text-faint tabular-nums">
                            {catalog[kind].length} examples
                          </p>
                        </div>
                      </a>
                    </li>
                  )
                }}
              </For>
            </ul>
          </DocSection>
        )}
      </For>
    </DocArticle>
  )
}
