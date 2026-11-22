import type { JSX } from '@solidjs/web'
import { For, Show, createMemo } from 'solid-js'

import {
  AreaChartIcon,
  ChartsIcon,
  LineChartIcon,
  PieChartIcon,
  RadarChartIcon,
  RadialChartIcon,
} from '#/components/icons'
import { Tabs, TabsList, TabsPanel, TabsTab } from '#/components/ui/tabs'
import {
  DocArticle,
  DocChartCard,
  DocFrameworkSelect,
  DocInstallTerminal,
  DocSection,
  useTargetFramework,
} from '#/docs'

import { chartCatalog, type ChartKind } from './chart-visuals'

const categoryMeta: Record<
  ChartKind,
  {
    title: string
    description: string
    icon: () => JSX.Element
  }
> = {
  area: {
    title: 'Area Charts',
    description: 'Linear, monotone, stepped, stacked, and gradient area charts.',
    icon: () => <AreaChartIcon />,
  },
  bar: {
    title: 'Bar Charts',
    description: 'Vertical, horizontal, grouped, stacked, and diverging bar charts.',
    icon: () => <ChartsIcon />,
  },
  line: {
    title: 'Line Charts',
    description: 'Monotone, linear, stepped, multi-series, and annotated line charts.',
    icon: () => <LineChartIcon />,
  },
  pie: {
    title: 'Pie Charts',
    description: 'Proportional pies, donuts, stacked rings, and interactive slices.',
    icon: () => <PieChartIcon />,
  },
  radar: {
    title: 'Radar Charts',
    description: 'Multi-axis profiles with polygon or circular grids and series comparisons.',
    icon: () => <RadarChartIcon />,
  },
  radial: {
    title: 'Radial Charts',
    description: 'Progress rings, KPI gauges, half-arc meters, and concentric tracks.',
    icon: () => <RadialChartIcon />,
  },
}

const chartOrder: ChartKind[] = ['area', 'bar', 'line', 'pie', 'radar', 'radial']

export function ChartPage(props: { kind: ChartKind }) {
  const [framework, setFramework] = useTargetFramework()
  const meta = () => categoryMeta[props.kind]
  const items = createMemo(() => chartCatalog[props.kind])
  const hero = createMemo(() => items().find((item) => item.fullWidth))
  const gridItems = createMemo(() => items().filter((item) => !item.fullWidth))

  const pos = () => chartOrder.indexOf(props.kind)
  const previous = () => {
    const idx = pos()
    if (idx <= 0) return undefined
    const k = chartOrder[idx - 1]
    return { label: categoryMeta[k].title, href: `/charts/${k}` }
  }
  const next = () => {
    const idx = pos()
    if (idx < 0 || idx >= chartOrder.length - 1) return undefined
    const k = chartOrder[idx + 1]
    return { label: categoryMeta[k].title, href: `/charts/${k}` }
  }

  return (
    <DocArticle
      variant="wide"
      title={meta().title}
      description={meta().description}
      previous={previous()}
      next={next()}
      pageKey={`charts-${props.kind}`}
    >
      <Show when={hero()}>
        {(item) => (
          <DocSection title="Interactive">
            <DocChartCard
              id={item().id}
              title={item().title}
              description={item().description}
              icon={meta().icon()}
              code={item().code}
              fullWidth
            >
              {item().render()}
            </DocChartCard>
          </DocSection>
        )}
      </Show>

      <DocSection title="Examples">
        <div class="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          <For each={gridItems()}>
            {(chart) => (
              <DocChartCard
                id={chart.id}
                title={chart.title}
                description={chart.description}
                icon={meta().icon()}
                code={chart.code}
              >
                {chart.render()}
              </DocChartCard>
            )}
          </For>
        </div>
      </DocSection>

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
              exec={`shadcn@latest add https://kitsaas.dev/r/${framework()}/chart.json`}
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
              packages="@tanstack/charts"
            />
          </TabsPanel>
        </Tabs>
      </DocSection>
    </DocArticle>
  )
}

export function AreaChartsPage() {
  return <ChartPage kind="area" />
}

export function BarChartsPage() {
  return <ChartPage kind="bar" />
}

export function LineChartsPage() {
  return <ChartPage kind="line" />
}

export function PieChartsPage() {
  return <ChartPage kind="pie" />
}

export function RadarChartsPage() {
  return <ChartPage kind="radar" />
}

export function RadialChartsPage() {
  return <ChartPage kind="radial" />
}
