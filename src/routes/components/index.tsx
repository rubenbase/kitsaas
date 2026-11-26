import type { RouteSectionProps } from '@solidjs/router'
import { useLocation } from '@solidjs/router'
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from 'solid-js'

import { ArrowRightIcon } from '#/components/icons'
import { SidebarLayout, type SidebarSection } from '#/components/sidebar-layout'
import { Button } from '#/components/ui/button'
import { Tabs, TabsList, TabsPanel, TabsTab } from '#/components/ui/tabs'
import {
  DocAnatomy,
  DocArticle,
  DocCallout,
  DocCodeBlock,
  DocCodeTabs,
  DocFrameworkSelect,
  DocInstallTerminal,
  DocSection,
  DocTable,
  extractComponentMeta,
  getFrameworkMeta,
  loadComponentSources,
  loadRegistryItem,
  useTargetFramework,
  type CodeLanguage,
  type ComponentSources,
  type DocCodeFile,
  type RegistryItemJson,
} from '#/docs'

import './components-layout.css'
import { ComponentDocContext } from './demo-group'
import {
  componentBySlug,
  componentCatalog,
  type ComponentEntry,
} from './registry'

const componentSections: SidebarSection[] = [
  { title: 'Introduction', items: [{ label: 'Overview', href: '/components' }] },
  {
    title: 'Components',
    items: componentCatalog.map((item) => ({
      label: item.name,
      href: `/components/${item.slug}`,
    })),
  },
]

export function ComponentsLayout(props: RouteSectionProps) {
  const location = useLocation()

  const currentLabel = () => {
    const match = location.pathname.match(/^\/components\/([^/]+)\/?$/)
    const slug = match?.[1]
    if (!slug) return 'Overview'
    return componentBySlug.get(slug)?.entry.name ?? 'Components'
  }

  return (
    <SidebarLayout
      label="Components"
      sections={componentSections}
      currentLabel={currentLabel()}
    >
      {props.children}
    </SidebarLayout>
  )
}

export function ComponentsIndex() {
  const first = componentCatalog[0]

  return (
    <DocArticle
      title="Components"
      description="Styled with CSS, powered by ui-sdk behaviors. No Base UI, no Radix — every control runs on the framework-agnostic core."
      next={
        first ? { label: first.name, href: `/components/${first.slug}` } : undefined
      }
      pageKey="components-overview"
    >
      <DocSection
        title="Installation"
        description="Install @ui-sdk/solid and @ui-sdk/core to power keyboard navigation, focus management, top-layer overlays, and ARIA wiring."
      >
        <DocInstallTerminal packages={['@ui-sdk/solid', '@ui-sdk/core']} />
      </DocSection>

      <DocSection
        title="Catalog"
        description={`${componentCatalog.length} components with live previews, copyable snippets, source code, and styling attribute tables.`}
      >
        <ul class="grid gap-2.5 sm:grid-cols-2">
          <For each={componentCatalog}>
            {(item) => (
              <li>
                <a
                  href={`/components/${item.slug}`}
                  class="group flex h-full flex-col justify-between gap-2 rounded-[10px] border border-border bg-surface p-4 transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v2-border-border-focus)]"
                >
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <span class="text-[13px] text-foreground [font-weight:530]">
                        {item.name}
                      </span>
                      <ArrowRightIcon class="size-3.5 shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none" />
                    </div>
                    <p class="components-card-desc mt-1.5 text-[12px] leading-[17px] text-muted">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            )}
          </For>
        </ul>
      </DocSection>

      <DocSection
        title="How it works"
        description="ui-sdk owns behavior: focus, keyboard, ARIA state, pending presses, and disabled handling. Kitsaas owns the styling via data-slot and state attributes."
      >
        <DocCodeBlock
          title="nav-button.tsx"
          lang="tsx"
          code={`import { ChartsIcon } from '#/components/icons'\nimport { Button } from '#/components/ui/button'\n\nexport function ChartsLink() {\n  return (\n    <Button href="/charts" variant="nav" icon={<ChartsIcon />}>\n      Charts\n    </Button>\n  )\n}`}
        />
      </DocSection>
    </DocArticle>
  )
}

export function ComponentDetailPage(props: { entry: ComponentEntry }) {
  const [framework, setFramework] = useTargetFramework()
  const [sources, setSources] = createSignal<ComponentSources | null>(null)
  const [registryItem, setRegistryItem] = createSignal<RegistryItemJson | null>(
    null,
  )

  const fwMeta = createMemo(() => getFrameworkMeta(framework()))

  createEffect(
    () => props.entry.slug,
    (slug) => {
      let cancelled = false
      void loadComponentSources(slug).then((loaded) => {
        if (!cancelled) setSources(loaded)
      })
      return () => {
        cancelled = true
      }
    },
  )

  createEffect(
    () => ({ fw: framework(), slug: props.entry.slug }),
    ({ fw, slug }) => {
      let cancelled = false
      void loadRegistryItem(fw, slug).then((item) => {
        if (!cancelled) setRegistryItem(item)
      })
      return () => {
        cancelled = true
      }
    },
  )

  const position = () => componentBySlug.get(props.entry.slug)?.index ?? -1
  const previous = () => {
    const index = position()
    if (index <= 0) return { label: 'Overview', href: '/components' }
    const prev = componentCatalog[index - 1]
    return { label: prev.name, href: `/components/${prev.slug}` }
  }
  const next = () => {
    const index = position()
    if (index < 0 || index >= componentCatalog.length - 1) return undefined
    const nxt = componentCatalog[index + 1]
    return { label: nxt.name, href: `/components/${nxt.slug}` }
  }

  const meta = createMemo(() => {
    const loaded = sources()
    if (!loaded || loaded.slug !== props.entry.slug) return null
    const extracted = extractComponentMeta(
      loaded.uiTsx,
      loaded.uiCss,
      props.entry.slug,
      loaded.demoTsx,
    )
    return props.entry.anatomy
      ? { ...extracted, anatomy: props.entry.anatomy }
      : extracted
  })

  const langForFile = (fileName: string): CodeLanguage => {
    if (fileName.endsWith('.css')) return 'css'
    if (fileName.endsWith('.ts') || fileName.endsWith('.json')) return 'ts'
    return 'tsx'
  }

  const sourceFiles = createMemo<DocCodeFile[]>(() => {
    const item = registryItem()
    if (item && item.name === props.entry.slug && item.files.length > 0) {
      return item.files.map((file) => {
        const displayName = (file.target ?? file.path).split('/').pop() ?? file.path
        return {
          name: displayName,
          lang: langForFile(displayName),
          code: file.content,
        }
      })
    }

    const loaded = sources()
    if (!loaded || loaded.slug !== props.entry.slug) return []
    const files: DocCodeFile[] = []
    if (loaded.uiTsx) {
      files.push({
        name: `${props.entry.slug}.tsx`,
        lang: 'tsx',
        code: loaded.uiTsx,
      })
    }
    if (loaded.uiCss) {
      files.push({
        name: `${props.entry.slug}.css`,
        lang: 'css',
        code: loaded.uiCss,
      })
    }
    return files
  })

  const customPropsRows = createMemo(() => {
    const m = meta()
    if (!m) return []
    return m.parts.flatMap((part) =>
      part.props.map((prop) => ({
        key: `${part.name}.${prop.name}`,
        cells: [
          <code class="font-mono text-[12px] text-foreground">
            {part.name}
          </code>,
          <code class="font-mono text-[12px] text-foreground">
            {prop.name}
          </code>,
          <code class="rounded-[4px] bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-secondary">
            {prop.type}
          </code>,
          <span>{prop.description || '—'}</span>,
        ],
      })),
    )
  })

  const dataAttrRows = createMemo(() => {
    const m = meta()
    if (!m) return []
    return m.dataAttributes.map((attr) => ({
      key: attr.attribute,
      cells: [
        <code class="whitespace-nowrap font-mono text-[12px] text-foreground">
          {attr.attribute}
        </code>,
        <div class="flex flex-col gap-1.5">
          <Show when={attr.values.length > 0}>
            <div class="flex flex-wrap gap-1">
              <For each={attr.values}>
                {(value) => (
                  <code class="rounded-[4px] bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                    {value}
                  </code>
                )}
              </For>
            </div>
          </Show>
          <span>{attr.description}</span>
        </div>,
      ],
    }))
  })

  return (
    <DocArticle
      title={props.entry.name}
      description={props.entry.description}
      previous={previous()}
      next={next()}
      pageKey={props.entry.slug}
    >
      <Show when={props.entry.note}>
        <DocCallout title="Implementation note" class="mb-6">
          {props.entry.note}
        </DocCallout>
      </Show>

      <DocSection title="Installation">
        <Tabs defaultValue="registry" variant="normal">
          <TabsList aria-label="Installation method" class="!px-0">
            <TabsTab value="registry">Registry</TabsTab>
            <TabsTab value="package">Package</TabsTab>
          </TabsList>

          <TabsPanel value="registry" class="pt-3">
            <DocInstallTerminal
              leading={
                <DocFrameworkSelect
                  value={framework()}
                  onChange={setFramework}
                />
              }
              exec={`shadcn@latest add https://kitsaas.dev/r/${framework()}/${props.entry.slug}.json`}
            />
          </TabsPanel>

          <TabsPanel value="package" class="pt-3">
            <DocInstallTerminal
              leading={
                <DocFrameworkSelect
                  value={framework()}
                  onChange={setFramework}
                />
              }
              packages={[fwMeta().uiSdkPkg, '@ui-sdk/core']}
            />
          </TabsPanel>
        </Tabs>
      </DocSection>

      <Show when={meta() && meta()!.parts.length > 0}>
        <DocSection title="Usage">
          <div class="flex flex-col gap-3">
            <DocCodeBlock code={meta()!.importSnippet} lang="tsx" />
            <Show when={meta()!.usageSnippet}>
              <DocCodeBlock code={meta()!.usageSnippet} lang="tsx" />
            </Show>
          </div>
        </DocSection>
      </Show>

      <Show when={meta() && meta()!.parts.length > 1 && meta()!.anatomy}>
        <DocSection title="Composition">
          <DocAnatomy tree={meta()!.anatomy} />
        </DocSection>
      </Show>

      <DocSection
        title="Examples"
        description="Interactive previews with live code inspection, reset controls, and event console output."
      >
        <ComponentDocContext
          value={{
            slug: () => props.entry.slug,
            demoSource: () => {
              const loaded = sources()
              return loaded && loaded.slug === props.entry.slug
                ? loaded.demoTsx
                : null
            },
          }}
        >
          <div class="doc-examples-stack">
            <props.entry.Demo />
          </div>
        </ComponentDocContext>
      </DocSection>

      <Show when={sourceFiles().length > 0}>
        <DocSection title="Source">
          <DocCodeTabs files={sourceFiles()} collapsible />
        </DocSection>
      </Show>

      <Show when={customPropsRows().length > 0}>
        <DocSection title="Props">
          <DocTable
            caption={`${props.entry.name} props`}
            columns={[
              { key: 'part', label: 'Part' },
              { key: 'prop', label: 'Prop' },
              { key: 'type', label: 'Type' },
              { key: 'description', label: 'Description' },
            ]}
            rows={customPropsRows()}
          />
        </DocSection>
      </Show>

      <Show
        when={
          (meta()?.slots.length ?? 0) > 0 ||
          dataAttrRows().length > 0 ||
          (meta()?.cssVariables.length ?? 0) > 0
        }
      >
        <DocSection title="Styling">
          <div class="flex flex-col gap-6">
            <Show when={(meta()?.slots.length ?? 0) > 0}>
              <div>
                <p class="mb-2 text-[12px] text-muted [font-weight:530]">
                  Slots
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <For each={meta()!.slots}>
                    {(slot) => (
                      <code class="rounded-[5px] border border-border-muted bg-surface px-2 py-0.5 font-mono text-[11.5px] text-foreground">
                        [data-slot=&quot;{slot}&quot;]
                      </code>
                    )}
                  </For>
                </div>
              </div>
            </Show>

            <Show when={dataAttrRows().length > 0}>
              <div>
                <p class="mb-2 text-[12px] text-muted [font-weight:530]">
                  Data attributes
                </p>
                <DocTable
                  caption={`${props.entry.name} data attributes`}
                  columns={[
                    { key: 'attribute', label: 'Attribute' },
                    { key: 'details', label: 'Description' },
                  ]}
                  rows={dataAttrRows()}
                />
              </div>
            </Show>

            <Show when={(meta()?.cssVariables.length ?? 0) > 0}>
              <div>
                <p class="mb-2 text-[12px] text-muted [font-weight:530]">
                  CSS variables
                </p>
                <div class="flex flex-wrap gap-1.5">
                  <For each={meta()!.cssVariables}>
                    {(variable) => (
                      <code class="rounded-[5px] border border-border-muted bg-surface px-2 py-0.5 font-mono text-[11.5px] text-secondary">
                        {variable}
                      </code>
                    )}
                  </For>
                </div>
              </div>
            </Show>
          </div>
        </DocSection>
      </Show>
    </DocArticle>
  )
}

export function ComponentNotFound() {
  return (
    <div class="mx-auto w-full max-w-[780px] px-8 py-10 max-md:px-4 max-md:py-6">
      <p class="text-[11px] uppercase tracking-[0.08em] text-faint">404</p>
      <h1 class="mt-1 text-[22px] leading-7 tracking-[-0.02em] [font-weight:530]">
        Component not found
      </h1>
      <p class="mt-2 text-muted">
        Pick a component from the sidebar or head back to the overview.
      </p>
      <Button href="/components" variant="neutral" class="mt-5">
        All components
      </Button>
    </div>
  )
}

export const componentChildRoutes = componentCatalog.map((entry) => ({
  path: `/${entry.slug}`,
  component: () => <ComponentDetailPage entry={entry} />,
}))
