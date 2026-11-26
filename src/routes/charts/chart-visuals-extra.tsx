import type { JSX } from '@solidjs/web'
import {
  barX,
  cell,
  defineChart,
  dot,
  link,
  rect,
  ruleY,
  text,
  type ChartCurve,
  type DomChartDefinition,
} from '@tanstack/charts'
import { sankeyDiagram } from '@tanstack/charts/network/sankey'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { linearRegressionY } from '@tanstack/charts/regression'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { For, Show, createMemo, createSignal } from 'solid-js'

import { Chart, ChartLegend, opencodeTooltip } from '#/components/ui/chart'

import { FunnelFlowChart, FunnelFlowVariantChart, funnelFlowSnippet } from './chart-funnel'
import { CardShell, type ChartShowcaseItem } from './chart-visuals'

/**
 * Scatter, heatmap, funnel, Sankey and gauge examples. They use the same
 * `Chart` wrapper, `CardShell` and `--chart-*` tokens as the six original
 * chart pages; only the TanStack marks differ.
 */
export type ExtraChartKind = 'scatter' | 'heatmap' | 'funnel' | 'sankey' | 'gauge'

const focusDim = [
  { when: { focus: 'primary' as const }, style: { fillOpacity: 1 } },
  { when: { focus: 'unmatched' as const }, style: { fillOpacity: 0.4 } },
]

/** Five-step ramp of one chart color, for heatmap levels. */
function ramp(color: string) {
  return [
    'var(--v2-background-bg-weak, var(--v2-border-border-muted))',
    `color-mix(in oklab, ${color} 28%, transparent)`,
    `color-mix(in oklab, ${color} 50%, transparent)`,
    `color-mix(in oklab, ${color} 74%, transparent)`,
    color,
  ]
}

/** Deterministic pseudo-random numbers so the demos render the same every time. */
function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* -------------------------------------------------------------------------- */
/* SCATTER CHARTS                                                             */
/* -------------------------------------------------------------------------- */

type Provider = 'Anthropic' | 'OpenAI' | 'Google'

const providerColor: Record<Provider, string> = {
  Anthropic: 'var(--chart-1)',
  OpenAI: 'var(--chart-2)',
  Google: 'var(--chart-3)',
}

type ModelPoint = {
  model: string
  provider: Provider
  /** Median latency to first token, ms. */
  latency: number
  /** Blended cost, $ per million tokens. */
  cost: number
  /** Daily requests, thousands. */
  volume: number
}

const modelPoints: ModelPoint[] = (() => {
  const rand = seeded(7)
  const providers: Provider[] = ['Anthropic', 'OpenAI', 'Google']
  return Array.from({ length: 42 }, (_, i) => {
    const provider = providers[i % 3]
    const latency = Math.round(180 + rand() * 900)
    const cost = +(0.4 + latency / 95 + (rand() - 0.5) * 4).toFixed(2)
    return {
      model: `${provider.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(2, '0')}`,
      provider,
      latency,
      cost: Math.max(0.25, cost),
      volume: Math.round(6 + rand() * 60),
    }
  })
})()

const scatterTooltip = opencodeTooltip({
  anchor: { x: 'point', y: 'point' },
  placement: ['top', 'right', 'left'],
  content(points) {
    const d = points[0]?.datum as ModelPoint | { x: number; y: number } | undefined
    if (!d) return { rows: [] }
    // The regression line is focusable too; its rows are fitted samples.
    if (!('model' in d)) {
      return {
        title: 'Linear fit',
        rows: [
          { label: `At ${Math.round(d.x)} ms`, value: `$${d.y.toFixed(2)} / M`, active: true },
        ],
      }
    }
    return {
      title: d.model,
      rows: [
        {
          label: 'Latency',
          value: `${d.latency} ms`,
          color: providerColor[d.provider],
          active: true,
        },
        { label: 'Cost', value: `$${d.cost.toFixed(2)} / M` },
        { label: 'Requests', value: `${d.volume}k / day` },
      ],
    }
  },
})

/** Axis-free scales for the compact example cards. */
const scatterScales = {
  x: { scale: scaleLinear, nice: true, axis: false as const },
  y: { scale: scaleLinear, nice: true, grid: true, axis: false as const },
}

function ScatterInteractiveChart() {
  const [provider, setProvider] = createSignal<Provider | 'All'>('All')

  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    const active = provider()
    // Filtering removes the other providers rather than dimming them, so a
    // hidden point can never take focus or the tooltip. The domains are
    // pinned so the remaining points keep their positions.
    const shown = (['Anthropic', 'OpenAI', 'Google'] as Provider[]).filter(
      (p) => active === 'All' || active === p,
    )
    return defineChart({
      marks: shown.map((p) =>
        dot(
          modelPoints.filter((d) => d.provider === p),
          {
            x: 'latency',
            y: 'cost',
            key: 'model',
            r: 4.5,
            fill: providerColor[p],
            fillOpacity: 0.9,
            stroke: 'var(--v2-background-bg-base)',
            strokeWidth: 1,
          },
        ),
      ),
      scales: {
        x: { scale: scaleLinear().domain([0, 1200]), grid: true, axis: { ticks: { count: 5 } } },
        y: { scale: scaleLinear().domain([0, 15]), grid: true, axis: { ticks: { count: 4 } } },
      },
      layout: { margin: { top: 10, right: 12, bottom: 26, left: 40 } },
      tooltip: scatterTooltip,
    })
  })

  const options: (Provider | 'All')[] = ['All', 'Anthropic', 'OpenAI', 'Google']

  return (
    <CardShell
      right={
        <div class="flex overflow-hidden rounded-[8px] border border-border-muted bg-surface">
          <For each={options}>
            {(option, i) => (
              <button
                type="button"
                aria-pressed={provider() === option ? 'true' : 'false'}
                onClick={() => setProvider(option)}
                class={[
                  'px-3 py-1.5 text-[12px] transition-colors',
                  i() > 0 ? 'border-l border-border-muted' : '',
                  provider() === option
                    ? 'bg-surface-3 text-foreground'
                    : 'text-muted hover:text-foreground',
                ]}
              >
                {option}
              </button>
            )}
          </For>
        </div>
      }
    >
      <Chart
        definition={definition()}
        height={240}
        ariaLabel="Interactive scatter chart of model latency and cost"
      />
    </CardShell>
  )
}

function ScatterVariantChart(props: {
  title: string
  mode: 'default' | 'multiple' | 'bubble' | 'regression'
}) {
  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    if (props.mode === 'multiple') {
      return defineChart({
        marks: (['Anthropic', 'OpenAI', 'Google'] as Provider[]).map((p) =>
          dot(
            modelPoints.filter((d) => d.provider === p),
            {
              x: 'latency',
              y: 'cost',
              key: 'model',
              r: 3.5,
              fill: providerColor[p],
              fillOpacity: 0.85,
            },
          ),
        ),
        scales: scatterScales,
        layout: { margin: { top: 8, right: 8, bottom: 8, left: 8 } },
        tooltip: scatterTooltip,
      })
    }

    if (props.mode === 'bubble') {
      return defineChart({
        marks: [
          dot(modelPoints, {
            x: 'latency',
            y: 'cost',
            key: 'model',
            r: (d) => 1.5 + Math.sqrt(d.volume) * 0.7,
            fill: 'var(--chart-4)',
            fillOpacity: 0.3,
          }),
        ],
        scales: scatterScales,
        layout: { margin: { top: 12, right: 12, bottom: 12, left: 12 } },
        tooltip: scatterTooltip,
      })
    }

    if (props.mode === 'regression') {
      return defineChart({
        marks: [
          linearRegressionY(modelPoints, {
            x: 'latency',
            y: 'cost',
            ci: 0.95,
            stroke: 'var(--chart-5)',
            strokeWidth: 2,
            fill: 'var(--chart-5)',
            fillOpacity: 0.16,
          }),
          dot(modelPoints, {
            x: 'latency',
            y: 'cost',
            key: 'model',
            r: 3,
            fill: 'var(--v2-text-text-faint)',
            fillOpacity: 0.8,
          }),
        ],
        scales: scatterScales,
        layout: { margin: { top: 8, right: 8, bottom: 8, left: 8 } },
        tooltip: scatterTooltip,
      })
    }

    const avgCost = modelPoints.reduce((a, d) => a + d.cost, 0) / modelPoints.length
    return defineChart({
      marks: [
        ruleY([avgCost], {
          stroke: 'var(--v2-border-border-strong)',
          strokeWidth: 1,
          strokeDasharray: '2 3',
        }),
        dot(modelPoints, {
          x: 'latency',
          y: 'cost',
          key: 'model',
          r: 3.5,
          fill: 'var(--chart-1)',
          fillOpacity: 0.85,
        }),
      ],
      scales: scatterScales,
      layout: { margin: { top: 8, right: 8, bottom: 8, left: 8 } },
      tooltip: scatterTooltip,
    })
  })

  return (
    <CardShell>
      <div>
        <Chart definition={definition()} height={176} ariaLabel={props.title} />
        <Show when={props.mode === 'multiple'}>
          <div class="mt-2 flex justify-end">
            <ChartLegend
              items={(Object.keys(providerColor) as Provider[]).map((p) => ({
                label: p,
                color: providerColor[p],
              }))}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* HEATMAPS                                                                   */
/* -------------------------------------------------------------------------- */

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type CalendarCell = {
  week: number
  day: string
  date: string
  requests: number
  tokens: number
}

const calendarCells: CalendarCell[] = (() => {
  const rand = seeded(19)
  const start = Date.UTC(2026, 5, 1) // Monday 1 June 2026
  const cells: CalendarCell[] = []
  for (let week = 0; week < 26; week++) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(start + (week * 7 + d) * 86_400_000)
      const weekend = d >= 5
      const trend = 0.45 + week / 40
      const base = weekend ? 0.25 : 1
      const r = rand()
      const requests = Math.round(base * trend * (r < 0.08 ? 0 : 40 + r * 360))
      cells.push({
        week,
        day: weekdays[d],
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
        requests,
        tokens: Math.round(requests * (1.8 + rand() * 2.4)),
      })
    }
  }
  return cells
})()

function level(value: number, max: number) {
  if (value <= 0) return 0
  return Math.min(4, 1 + Math.floor((value / max) * 4))
}

function HeatmapInteractiveChart() {
  const [metric, setMetric] = createSignal<'requests' | 'tokens'>('requests')
  const color = () => (metric() === 'requests' ? 'var(--chart-1)' : 'var(--chart-2)')

  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    const key = metric()
    const max = Math.max(...calendarCells.map((c) => c[key]))
    return defineChart({
      marks: [
        cell(calendarCells, {
          x: 'week',
          y: 'day',
          key: (c) => `${c.week}-${c.day}`,
          color: (c) => level(c[key], max),
          inset: 1.5,
          radius: 2.5,
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<number>().padding(0), axis: false },
        y: {
          scale: () => scaleBand<string>().domain(weekdays).padding(0),
          axis: { ticks: { values: ['Mon', 'Wed', 'Fri'] } },
        },
      },
      color: { domain: [0, 1, 2, 3, 4], range: ramp(color()) },
      layout: { margin: { top: 4, right: 4, bottom: 4, left: 34 } },
      tooltip: opencodeTooltip({
        anchor: { x: 'point', y: 'point' },
        placement: ['top', 'right', 'left'],
        content(points) {
          const d = points[0]?.datum as CalendarCell | undefined
          if (!d) return { rows: [] }
          return {
            title: `${d.day}, ${d.date}`,
            rows: [
              {
                label: key === 'requests' ? 'Requests' : 'Tokens (k)',
                value: d[key].toLocaleString('en-US'),
                color: color(),
                active: true,
              },
            ],
          }
        },
      }),
    })
  })

  return (
    <CardShell
      right={
        <div class="flex overflow-hidden rounded-[8px] border border-border-muted bg-surface">
          <For each={['requests', 'tokens'] as const}>
            {(option, i) => (
              <button
                type="button"
                aria-pressed={metric() === option ? 'true' : 'false'}
                onClick={() => setMetric(option)}
                class={[
                  'px-3 py-1.5 text-[12px] capitalize transition-colors',
                  i() > 0 ? 'border-l border-border-muted' : '',
                  metric() === option
                    ? 'bg-surface-3 text-foreground'
                    : 'text-muted hover:text-foreground',
                ]}
              >
                {option}
              </button>
            )}
          </For>
        </div>
      }
    >
      <div>
        <Chart definition={definition()} height={176} ariaLabel="Daily usage calendar heatmap" />
        <div class="mt-2 flex items-center justify-end gap-1.5 text-[11px] text-faint">
          <span>Less</span>
          <For each={ramp(color())}>
            {(swatch) => (
              <span class="size-2.5 rounded-[2px]" style={{ 'background-color': swatch }} />
            )}
          </For>
          <span>More</span>
        </div>
      </div>
    </CardShell>
  )
}

const hourBlocks = ['00–04', '04–08', '08–12', '12–16', '16–20', '20–24']

const hourMatrix = (() => {
  const rand = seeded(31)
  return weekdays.flatMap((day, d) =>
    hourBlocks.map((block, h) => {
      const office = h >= 2 && h <= 4 ? 1 : 0.35
      const weekend = d >= 5 ? 0.4 : 1
      return { day, block, value: Math.round(office * weekend * (30 + rand() * 70)) }
    }),
  )
})()

const models = ['Opus', 'Sonnet', 'Haiku', 'Fable']
const tasks = ['Code', 'Chat', 'Extract', 'Agents']
const evalMatrix = (() => {
  const rand = seeded(43)
  return models.flatMap((model, m) =>
    tasks.map((task) => ({ model, task, score: Math.round(92 - m * 6 + (rand() - 0.5) * 14) })),
  )
})()

const uptimeDays = (() => {
  const rand = seeded(5)
  return Array.from({ length: 45 }, (_, i) => {
    const r = rand()
    return {
      day: i + 1,
      row: 'Uptime',
      status: r < 0.06 ? 'outage' : r < 0.14 ? 'degraded' : 'operational',
    }
  })
})()

function HeatmapVariantChart(props: {
  title: string
  mode: 'matrix' | 'labeled' | 'status'
}) {
  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    if (props.mode === 'labeled') {
      return defineChart({
        marks: [
          cell(evalMatrix, {
            x: 'task',
            y: 'model',
            key: (c) => `${c.model}-${c.task}`,
            color: (c) => level(c.score - 60, 40),
            inset: 1.5,
            radius: 3,
          }),
          text(evalMatrix, {
            x: 'task',
            y: 'model',
            key: (c) => `${c.model}-${c.task}`,
            text: 'score',
            fill: (c) =>
              c.score >= 85 ? 'var(--v2-background-bg-base)' : 'var(--v2-text-text-base)',
            fontSize: 11,
            fontWeight: 560,
          }),
        ],
        scales: {
          x: { scale: () => scaleBand<string>().domain(tasks).padding(0) },
          y: { scale: () => scaleBand<string>().domain(models).padding(0) },
        },
        color: { domain: [0, 1, 2, 3, 4], range: ramp('var(--chart-3)') },
        layout: { margin: { top: 4, right: 4, bottom: 22, left: 48 } },
        tooltip: opencodeTooltip({
          anchor: { x: 'point', y: 'point' },
          placement: ['top', 'right', 'left'],
          format: (pt) => `${pt.datum.model} · ${pt.datum.task}: ${pt.datum.score}`,
        }),
      })
    }

    if (props.mode === 'status') {
      return defineChart({
        marks: [
          cell(uptimeDays, {
            x: 'day',
            y: 'row',
            key: 'day',
            color: 'status',
            inset: 1.25,
            radius: 2,
          }),
        ],
        scales: {
          x: { scale: () => scaleBand<number>().padding(0), axis: false },
          y: { scale: () => scaleBand<string>().padding(0), axis: false },
        },
        color: {
          domain: ['operational', 'degraded', 'outage'],
          range: [
            'var(--v2-green-600)',
            'var(--v2-orange-600)',
            'var(--v2-red-600, var(--chart-5))',
          ],
        },
        layout: { margin: 0 },
        tooltip: opencodeTooltip({
          anchor: { x: 'point', y: 'plot-top' },
          placement: ['top'],
          format: (pt) => `Day ${pt.datum.day}: ${pt.datum.status}`,
        }),
      })
    }

    const max = Math.max(...hourMatrix.map((c) => c.value))
    return defineChart({
      marks: [
        cell(hourMatrix, {
          x: 'block',
          y: 'day',
          key: (c) => `${c.day}-${c.block}`,
          color: (c) => level(c.value, max),
          inset: 1.5,
          radius: 3,
        }),
      ],
      scales: {
        x: { scale: () => scaleBand<string>().domain(hourBlocks).padding(0) },
        y: { scale: () => scaleBand<string>().domain(weekdays).padding(0) },
      },
      color: { domain: [0, 1, 2, 3, 4], range: ramp('var(--chart-1)') },
      layout: { margin: { top: 4, right: 4, bottom: 22, left: 34 } },
      tooltip: opencodeTooltip({
        anchor: { x: 'point', y: 'point' },
        placement: ['top', 'right', 'left'],
        format: (pt) => `${pt.datum.day} ${pt.datum.block}: ${pt.datum.value} req/min`,
      }),
    })
  })

  return (
    <CardShell>
      <div>
        <Chart
          definition={definition()}
          height={props.mode === 'status' ? 36 : 176}
          ariaLabel={props.title}
        />
        <Show when={props.mode === 'status'}>
          <div class="mt-2 flex justify-between text-[11px] text-faint">
            <span>45 days ago</span>
            <span>Today</span>
          </div>
          <div class="mt-3 flex justify-end">
            <ChartLegend
              items={[
                { label: 'Operational', color: 'var(--v2-green-600)' },
                { label: 'Degraded', color: 'var(--v2-orange-600)' },
                { label: 'Outage', color: 'var(--v2-red-600, var(--chart-5))' },
              ]}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* FUNNEL CHARTS                                                              */
/* -------------------------------------------------------------------------- */

const funnelStages = [
  { stage: 'Visitors', value: 12_400, previous: 11_200 },
  { stage: 'Sign-ups', value: 4_820, previous: 4_010 },
  { stage: 'Activated', value: 2_960, previous: 2_330 },
  { stage: 'Trial', value: 1_410, previous: 1_190 },
  { stage: 'Paid', value: 620, previous: 470 },
]
const funnelOrder = funnelStages.map((s) => s.stage)
const funnelTop = funnelStages[0].value
const pct = (v: number) => `${((v / funnelTop) * 100).toFixed(v / funnelTop < 0.1 ? 1 : 0)}%`

const funnelTooltip = opencodeTooltip({
  anchor: { x: 'point', y: 'point' },
  placement: ['right', 'left', 'top'],
  content(points) {
    const d = points[0]?.datum
    if (!d) return { rows: [] }
    const i = funnelOrder.indexOf(d.stage)
    const prev = funnelStages[i - 1]
    return {
      title: d.stage,
      rows: [
        {
          label: 'Users',
          value: d.value.toLocaleString('en-US'),
          color: 'var(--chart-1)',
          active: true,
        },
        { label: 'Of visitors', value: pct(d.value) },
        ...(prev
          ? [{ label: 'From previous', value: `${Math.round((d.value / prev.value) * 100)}%` }]
          : []),
      ],
    }
  },
})

/**
 * Stages on a shared baseline. The flow funnel (chart-funnel.tsx) shows the
 * shape; this one is for reading exact differences between stages.
 */
function FunnelBarsChart(props: { title: string }) {
  const definition = createMemo<DomChartDefinition<any, any, any>>(() =>
    defineChart({
      marks: [
        barX(funnelStages, {
          x: 'value',
          y: 'stage',
          fill: 'var(--chart-2)',
          radius: { end: 4 },
          states: focusDim,
        }),
        text(funnelStages, {
          x: 'value',
          y: 'stage',
          text: (d) => pct(d.value),
          anchor: 'start',
          dx: 6,
          fill: 'var(--v2-text-text-weak, var(--v2-text-text-base))',
          fontSize: 11,
        }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, funnelTop * 1.18]), axis: false },
        y: { scale: () => scaleBand<string>().domain(funnelOrder).padding(0.12) },
      },
      layout: { margin: { top: 4, right: 4, bottom: 4, left: 62 } },
      tooltip: funnelTooltip,
    }),
  )

  return (
    <CardShell>
      <Chart definition={definition()} height={184} ariaLabel={props.title} />
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* SANKEY DIAGRAMS                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal S-curve for Sankey links, written against TanStack's two-method
 * `ChartCurve` contract so the demo needs no `d3-shape` dependency.
 */
const bumpX: ChartCurve = {
  line(points) {
    const [a, b] = [points[0], points[points.length - 1]]
    if (!a || !b) return ''
    const mx = (a[0] + b[0]) / 2
    return `M${a[0]},${a[1]}C${mx},${a[1]} ${mx},${b[1]} ${b[0]},${b[1]}`
  },
  area: () => '',
}

type FlowNode = { id: string; label: string; color: string }
type FlowLink = { source: string; target: string; value: number }

const routingNodes: FlowNode[] = [
  { id: 'api', label: 'API', color: 'var(--chart-1)' },
  { id: 'console', label: 'Console', color: 'var(--chart-2)' },
  { id: 'cli', label: 'CLI', color: 'var(--chart-3)' },
  { id: 'cache', label: 'Cache hit', color: 'var(--chart-4)' },
  { id: 'router', label: 'Router', color: 'var(--v2-text-text-faint)' },
  { id: 'opus', label: 'Opus', color: 'var(--chart-1)' },
  { id: 'sonnet', label: 'Sonnet', color: 'var(--chart-2)' },
  { id: 'haiku', label: 'Haiku', color: 'var(--chart-3)' },
]

const routingLinks: FlowLink[] = [
  { source: 'api', target: 'router', value: 410 },
  { source: 'api', target: 'cache', value: 160 },
  { source: 'console', target: 'router', value: 180 },
  { source: 'console', target: 'cache', value: 40 },
  { source: 'cli', target: 'router', value: 150 },
  { source: 'cli', target: 'cache', value: 20 },
  { source: 'router', target: 'opus', value: 140 },
  { source: 'router', target: 'sonnet', value: 420 },
  { source: 'router', target: 'haiku', value: 180 },
]

const spendNodes: FlowNode[] = [
  { id: 'revenue', label: 'Revenue', color: 'var(--chart-1)' },
  { id: 'gross', label: 'Gross profit', color: 'var(--v2-green-600)' },
  { id: 'cogs', label: 'Inference', color: 'var(--chart-5)' },
  { id: 'opex', label: 'Opex', color: 'var(--chart-5)' },
  { id: 'net', label: 'Net', color: 'var(--v2-green-600)' },
  { id: 'rd', label: 'R&D', color: 'var(--chart-2)' },
  { id: 'gtm', label: 'Sales', color: 'var(--chart-3)' },
]

const spendLinks: FlowLink[] = [
  { source: 'revenue', target: 'gross', value: 64 },
  { source: 'revenue', target: 'cogs', value: 36 },
  { source: 'gross', target: 'opex', value: 44 },
  { source: 'gross', target: 'net', value: 20 },
  { source: 'opex', target: 'rd', value: 28 },
  { source: 'opex', target: 'gtm', value: 16 },
]

function sankeyDefinition(
  nodes: FlowNode[],
  links: FlowLink[],
  opts: { labels: boolean; unit: string; nodeWidth: number; align: 'left' | 'justify' },
): DomChartDefinition<any, any, any> {
  const byId = new Map(nodes.map((n) => [n.id, n]))
  return defineChart({
    marks: [
      sankeyDiagram({
        nodes,
        links,
        nodeKey: 'id',
        source: 'source',
        target: 'target',
        value: 'value',
        // `left` keeps an early exit (Cache hit) beside the router instead of
        // pushing it to the last column across the flow; `justify` lines all
        // outcomes up on the right, which suits a statement like the budget.
        align: opts.align,
        nodeWidth: opts.nodeWidth,
        nodePadding: ({ height }) => Math.max(8, height * 0.05),
        inset: opts.labels ? { left: 4, right: 4, top: 18, bottom: 6 } : 2,
        marks: ({ nodes: layoutNodes, links: layoutLinks }) =>
          [
            link(layoutLinks, {
              x1: 'x1',
              y1: 'y1',
              x2: 'x2',
              y2: 'y2',
              key: 'key',
              curve: bumpX,
              // Flows leaving a source take its color; flows leaving a
              // middle node (Router, Gross profit) take their destination's.
              stroke: (flow) =>
                byId.get(
                  String(
                    flow.sourceNode.incomingLinks.length > 0 ? flow.targetKey : flow.sourceKey,
                  ),
                )?.color ?? 'var(--chart-1)',
              strokeOpacity: 0.34,
              strokeWidth: (flow) => Math.max(1, flow.width),
              lineCap: 'butt',
            }),
            rect(layoutNodes, {
              x1: 'x0',
              x2: 'x1',
              y1: 'y0',
              y2: 'y1',
              key: 'key',
              inset: 0,
              radius: 2,
              fill: 'var(--v2-text-text-base)',
            }),
            ...(opts.labels
              ? [
                  // Sources label to the right, sinks to the left, and middle
                  // nodes above, so no label sits on top of a flow.
                  text(layoutNodes, {
                    x: (n) =>
                      n.incomingLinks.length === 0
                        ? n.x1
                        : n.outgoingLinks.length === 0
                          ? n.x0
                          : n.x,
                    y: (n) =>
                      n.incomingLinks.length > 0 && n.outgoingLinks.length > 0 ? n.y0 - 8 : n.y,
                    key: 'key',
                    text: (n) => `${n.data.label}  ${n.value}${opts.unit}`,
                    anchor: (n) =>
                      n.incomingLinks.length === 0
                        ? 'start'
                        : n.outgoingLinks.length === 0
                          ? 'end'
                          : 'middle',
                    dx: (n) =>
                      n.incomingLinks.length === 0 ? 6 : n.outgoingLinks.length === 0 ? -6 : 0,
                    fill: 'var(--v2-text-text-base)',
                    fontSize: 11,
                    fontWeight: 540,
                  }),
                ]
              : []),
          ] as const,
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
    layout: { margin: 0 },
  })
}

function SankeyInteractiveChart() {
  const [unit, setUnit] = createSignal<'requests' | 'percent'>('requests')
  const total = routingLinks
    .filter((l) => ['api', 'console', 'cli'].includes(l.source))
    .reduce((a, l) => a + l.value, 0)

  const definition = createMemo(() =>
    sankeyDefinition(
      routingNodes,
      unit() === 'requests'
        ? routingLinks
        : routingLinks.map((l) => ({ ...l, value: Math.round((l.value / total) * 1000) / 10 })),
      { labels: true, unit: unit() === 'requests' ? 'k' : '%', nodeWidth: 10, align: 'left' },
    ),
  )

  return (
    <CardShell
      right={
        <div class="flex overflow-hidden rounded-[8px] border border-border-muted bg-surface">
          <For each={['requests', 'percent'] as const}>
            {(option, i) => (
              <button
                type="button"
                aria-pressed={unit() === option ? 'true' : 'false'}
                onClick={() => setUnit(option)}
                class={[
                  'px-3 py-1.5 text-[12px] capitalize transition-colors',
                  i() > 0 ? 'border-l border-border-muted' : '',
                  unit() === option
                    ? 'bg-surface-3 text-foreground'
                    : 'text-muted hover:text-foreground',
                ]}
              >
                {option}
              </button>
            )}
          </For>
        </div>
      }
    >
      <Chart definition={definition()} height={260} ariaLabel="Request routing Sankey diagram" />
    </CardShell>
  )
}

function SankeyVariantChart(props: {
  title: string
  mode: 'budget' | 'compact'
}) {
  const definition = createMemo(() =>
    props.mode === 'budget'
      ? sankeyDefinition(spendNodes, spendLinks, {
          labels: true,
          unit: '%',
          nodeWidth: 8,
          align: 'justify',
        })
      : sankeyDefinition(routingNodes, routingLinks, {
          labels: false,
          unit: '',
          nodeWidth: 6,
          align: 'left',
        }),
  )
  return (
    <CardShell>
      <Chart definition={definition()} height={184} ariaLabel={props.title} />
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* GAUGE CHARTS                                                               */
/* -------------------------------------------------------------------------- */

function gaugeDefinition(opts: {
  value: number
  color: string
  sweep: number
  thickness?: number
  bands?: { to: number; color: string }[]
}): DomChartDefinition<any, any, any> {
  const value = Math.max(0, Math.min(100, opts.value))
  const half = (opts.sweep / 360) * Math.PI
  const angles = { startAngle: -half, endAngle: half }
  // With threshold bands, the bands take a thin outer ring and the reading
  // moves inward so the bands stay visible beside it.
  const outer = opts.bands ? 0.84 : 1
  const inner = outer - (opts.thickness ?? 0.16)

  const track = pie([{ id: 'track', value: 1, color: 'var(--v2-border-border-muted)' }], {
    value: 'value',
    ...angles,
  })

  const bands = opts.bands
    ? pie(
        opts.bands.map((b, i) => ({
          id: `band-${i}`,
          value: b.to - (opts.bands![i - 1]?.to ?? 0),
          color: b.color,
        })),
        { value: 'value', ...angles, gapAngle: 0.03 },
      )
    : null

  const reading = pie(
    [
      { id: 'value', value, color: opts.color },
      { id: 'rest', value: 100 - value, color: 'transparent' },
    ],
    { value: 'value', ...angles },
  )

  return defineChart({
    marks: [
      polar({
        scales: { angle: null, radius: null },
        marks: [
          ...(bands
            ? [
                radialArc(bands, {
                  startAngle: 'startAngle',
                  endAngle: 'endAngle',
                  innerRadius: ({ radius }) => radius * 0.92,
                  outerRadius: ({ radius }) => radius,
                  cornerRadius: 999,
                  fill: (d) => d.color,
                }),
              ]
            : []),
          radialArc(track, {
            startAngle: 'startAngle',
            endAngle: 'endAngle',
            innerRadius: ({ radius }) => radius * inner,
            outerRadius: ({ radius }) => radius * outer,
            cornerRadius: 999,
            fill: (d) => d.color,
          }),
          radialArc(reading, {
            startAngle: 'startAngle',
            endAngle: 'endAngle',
            innerRadius: ({ radius }) => radius * inner,
            outerRadius: ({ radius }) => radius * outer,
            cornerRadius: 999,
            fill: (d) => d.color,
          }),
        ],
      }),
    ],
    scales: { x: null, y: null },
    guides: false,
  })
}

function GaugeReadout(props: {
  value: string
  label: string
  /** Shift the readout down for gauges whose arc opens at the bottom. */
  offset?: string
  size?: 'sm' | 'md'
}) {
  return (
    <div
      class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
      style={{ 'padding-top': props.offset }}
    >
      <span
        class={[
          'leading-6 tracking-[-0.02em] text-foreground tabular-nums [font-weight:560]',
          props.size === 'sm' ? 'text-[14px]' : 'text-[20px]',
        ]}
      >
        {props.value}
      </span>
      <span class="mt-0.5 text-[10.5px] text-faint">{props.label}</span>
    </div>
  )
}

function GaugeVariantChart(props: {
  title: string
  mode: 'default' | 'semi' | 'bands' | 'trio'
}) {
  if (props.mode === 'trio') {
    const gauges = [
      { label: 'CPU', value: 62, color: 'var(--chart-1)' },
      { label: 'Memory', value: 81, color: 'var(--chart-2)' },
      { label: 'GPU', value: 47, color: 'var(--chart-3)' },
    ]
    return (
      <CardShell>
        <div class="grid grid-cols-3 gap-2">
          <For each={gauges}>
            {(g) => (
              <div class="relative">
                <Chart
                  definition={gaugeDefinition({
                    value: g.value,
                    color: g.color,
                    sweep: 270,
                    thickness: 0.2,
                  })}
                  height={96}
                  ariaLabel={`${g.label} ${g.value}%`}
                />
                <GaugeReadout value={`${g.value}%`} label={g.label} size="sm" offset="6px" />
              </div>
            )}
          </For>
        </div>
      </CardShell>
    )
  }

  const config: Record<
    'default' | 'semi' | 'bands',
    { value: number; label: string; node: () => JSX.Element }
  > = {
    default: {
      value: 72,
      label: 'Quota used',
      node: () => (
        <Chart
          definition={gaugeDefinition({ value: 72, color: 'var(--chart-1)', sweep: 270 })}
          height={176}
          ariaLabel={props.title}
        />
      ),
    },
    semi: {
      value: 58,
      label: 'Cache hit rate',
      node: () => (
        <Chart
          definition={gaugeDefinition({
            value: 58,
            color: 'var(--chart-2)',
            sweep: 180,
            thickness: 0.22,
          })}
          height={176}
          ariaLabel={props.title}
        />
      ),
    },
    bands: {
      value: 84,
      label: 'Error budget burned',
      node: () => (
        <Chart
          definition={gaugeDefinition({
            value: 84,
            color: 'var(--v2-orange-600)',
            sweep: 240,
            thickness: 0.14,
            bands: [
              { to: 60, color: 'var(--v2-green-600)' },
              { to: 85, color: 'var(--v2-orange-600)' },
              { to: 100, color: 'var(--v2-red-600, var(--chart-5))' },
            ],
          })}
          height={176}
          ariaLabel={props.title}
        />
      ),
    },
  }
  const c = config[props.mode]

  return (
    <CardShell>
      <div class="relative mx-auto w-full max-w-[220px]">
        {c.node()}
        <GaugeReadout
          value={`${c.value}%`}
          label={c.label}
          offset={props.mode === 'semi' ? '0' : '10px'}
        />
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Code snippets                                                              */
/* -------------------------------------------------------------------------- */

const scatterSnippet = `import { defineChart, dot } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { Chart, opencodeTooltip } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    dot(models, { x: 'latency', y: 'cost', r: 3.5, fill: 'var(--chart-1)' }),
  ],
  scales: {
    x: { scale: scaleLinear, nice: true },
    y: { scale: scaleLinear, nice: true, grid: true },
  },
  tooltip: opencodeTooltip({ format: (pt) => \`\${pt.datum.model}: \${pt.datum.latency} ms\` }),
})

export function ScatterExample() {
  return <Chart definition={definition} height={240} ariaLabel="Latency vs cost" />
}`

const heatmapSnippet = `import { cell, defineChart } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { Chart } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    cell(days, { x: 'week', y: 'day', color: 'level', inset: 1.5, radius: 2.5 }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0), axis: false },
    y: { scale: () => scaleBand().domain(weekdays).padding(0) },
  },
  color: {
    domain: [0, 1, 2, 3, 4],
    range: [
      'var(--v2-border-border-muted)',
      'color-mix(in oklab, var(--chart-1) 28%, transparent)',
      'color-mix(in oklab, var(--chart-1) 50%, transparent)',
      'color-mix(in oklab, var(--chart-1) 74%, transparent)',
      'var(--chart-1)',
    ],
  },
})

export function HeatmapExample() {
  return <Chart definition={definition} height={176} ariaLabel="Usage calendar" />
}`

const funnelSnippet = `import { barX, defineChart } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { Chart } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    barX(stages, { x: 'value', y: 'stage', fill: 'var(--chart-2)', radius: { end: 4 } }),
  ],
  scales: {
    x: { scale: scaleLinear, nice: true, axis: false },
    y: { scale: () => scaleBand().padding(0.12) },
  },
})

export function FunnelBarsExample() {
  return <Chart definition={definition} height={184} ariaLabel="Conversion funnel" />
}`

const sankeySnippet = `import { defineChart, link, rect, text, type ChartCurve } from '@tanstack/charts'
import { sankeyDiagram } from '@tanstack/charts/network/sankey'
import { Chart } from '#/components/ui/chart'

const bumpX: ChartCurve = {
  line: ([a, b]) => {
    const mx = (a[0] + b[0]) / 2
    return \`M\${a[0]},\${a[1]}C\${mx},\${a[1]} \${mx},\${b[1]} \${b[0]},\${b[1]}\`
  },
  area: () => '',
}

const definition = defineChart({
  marks: [
    sankeyDiagram({
      nodes,
      links,
      nodeKey: 'id',
      source: 'source',
      target: 'target',
      value: 'value',
      nodeWidth: 10,
      marks: ({ nodes, links }) => [
        link(links, {
          x1: 'x1', y1: 'y1', x2: 'x2', y2: 'y2', key: 'key',
          curve: bumpX,
          stroke: 'var(--chart-1)',
          strokeOpacity: 0.28,
          strokeWidth: (flow) => flow.width,
          lineCap: 'butt',
        }),
        rect(nodes, { x1: 'x0', x2: 'x1', y1: 'y0', y2: 'y1', key: 'key', fill: 'var(--v2-text-text-base)' }),
        text(nodes, { x: 'x1', y: 'y', dx: 6, anchor: 'start', text: (n) => n.data.label, key: 'key' }),
      ] as const,
    }),
  ],
  scales: { x: null, y: null },
  guides: false,
})

export function SankeyExample() {
  return <Chart definition={definition} height={260} ariaLabel="Request routing" />
}`

const gaugeSnippet = `import { defineChart } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { Chart } from '#/components/ui/chart'

const value = 72
const angles = { startAngle: -Math.PI * 0.75, endAngle: Math.PI * 0.75 }
const track = pie([{ value: 1 }], { value: 'value', ...angles })
const reading = pie(
  [{ id: 'value', value }, { id: 'rest', value: 100 - value }],
  { value: 'value', ...angles },
)

const definition = defineChart({
  marks: [
    polar({
      scales: { angle: null, radius: null },
      marks: [
        radialArc(track, {
          startAngle: 'startAngle', endAngle: 'endAngle',
          innerRadius: ({ radius }) => radius * 0.84,
          cornerRadius: 999,
          fill: 'var(--v2-border-border-muted)',
        }),
        radialArc(reading, {
          startAngle: 'startAngle', endAngle: 'endAngle',
          innerRadius: ({ radius }) => radius * 0.84,
          cornerRadius: 999,
          fill: (d) => (d.id === 'value' ? 'var(--chart-1)' : 'transparent'),
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  guides: false,
})

export function GaugeExample() {
  return <Chart definition={definition} height={176} ariaLabel="Quota used: 72%" />
}`

/* -------------------------------------------------------------------------- */
/* Catalog                                                                    */
/* -------------------------------------------------------------------------- */

export const extraChartCatalog: Record<ExtraChartKind, ChartShowcaseItem[]> = {
  scatter: [
    {
      id: 'chart-scatter-interactive',
      title: 'Scatter Chart — Interactive',
      description: 'Provider filter that dims the other series, with point tooltips.',
      fullWidth: true,
      render: () => <ScatterInteractiveChart />,
      code: scatterSnippet,
    },
    {
      id: 'chart-scatter-default',
      title: 'Scatter Chart — Default',
      description: 'Single series with a dashed average reference line.',
      render: () => (
        <ScatterVariantChart
          title="Scatter Chart"
          mode="default"
        />
      ),
      code: scatterSnippet,
    },
    {
      id: 'chart-scatter-multiple',
      title: 'Scatter Chart — Multiple',
      description: 'Three series colored by provider, with a hairline legend.',
      render: () => (
        <ScatterVariantChart
          title="Scatter Chart — Multiple"
          mode="multiple"
        />
      ),
      code: scatterSnippet,
    },
    {
      id: 'chart-scatter-bubble',
      title: 'Scatter Chart — Bubble',
      description: 'Radius encodes daily request volume.',
      render: () => (
        <ScatterVariantChart
          title="Scatter Chart — Bubble"
          mode="bubble"
        />
      ),
      code: scatterSnippet,
    },
    {
      id: 'chart-scatter-regression',
      title: 'Scatter Chart — Regression',
      description: 'Least-squares fit with a 95% confidence band.',
      render: () => (
        <ScatterVariantChart
          title="Scatter Chart — Regression"
          mode="regression"
        />
      ),
      code: scatterSnippet,
    },
  ],

  heatmap: [
    {
      id: 'chart-heatmap-interactive',
      title: 'Heatmap — Calendar',
      description: 'Six months of daily usage with a requests / tokens toggle.',
      fullWidth: true,
      render: () => <HeatmapInteractiveChart />,
      code: heatmapSnippet,
    },
    {
      id: 'chart-heatmap-matrix',
      title: 'Heatmap — Matrix',
      description: 'Weekday by time-of-day load.',
      render: () => (
        <HeatmapVariantChart
          title="Heatmap — Matrix"
          mode="matrix"
        />
      ),
      code: heatmapSnippet,
    },
    {
      id: 'chart-heatmap-labeled',
      title: 'Heatmap — Labeled',
      description: 'Eval scores with values printed in each cell.',
      render: () => (
        <HeatmapVariantChart
          title="Heatmap — Labeled"
          mode="labeled"
        />
      ),
      code: heatmapSnippet,
    },
    {
      id: 'chart-heatmap-status',
      title: 'Heatmap — Status',
      description: 'Single-row uptime strip with categorical colors.',
      render: () => (
        <HeatmapVariantChart
          title="Heatmap — Status"
          mode="status"
        />
      ),
      code: heatmapSnippet,
    },
  ],

  funnel: [
    {
      id: 'chart-funnel-flow',
      title: 'Funnel Chart — Flow',
      description: 'One layer per channel, with stage totals and step conversion on the markers.',
      fullWidth: true,
      render: () => <FunnelFlowChart />,
      code: funnelFlowSnippet,
    },
    {
      id: 'chart-funnel-compact',
      title: 'Funnel Chart — Compact',
      description: 'Stage totals on the markers, sized for a card.',
      render: () => <FunnelFlowVariantChart mode="compact" title="Funnel Chart — Compact" />,
      code: funnelFlowSnippet,
    },
    {
      id: 'chart-funnel-stages',
      title: 'Funnel Chart — Stages',
      description: 'Step-to-step conversion on each marker, stage names below.',
      render: () => <FunnelFlowVariantChart mode="stages" title="Funnel Chart — Stages" />,
      code: funnelFlowSnippet,
    },
    {
      id: 'chart-funnel-compare',
      title: 'Funnel Chart — Compare',
      description: 'This month filled, last month as a dashed outline.',
      render: () => <FunnelFlowVariantChart mode="compare" title="Funnel Chart — Compare" />,
      code: funnelFlowSnippet,
    },
    {
      id: 'chart-funnel-bars',
      title: 'Funnel Chart — Bars',
      description: 'Stages on a shared baseline for precise reading.',
      render: () => <FunnelBarsChart title="Funnel Chart — Bars" />,
      code: funnelSnippet,
    },
  ],

  sankey: [
    {
      id: 'chart-sankey-interactive',
      title: 'Sankey — Interactive',
      description: 'Request routing from client to model, in requests or percent.',
      fullWidth: true,
      render: () => <SankeyInteractiveChart />,
      code: sankeySnippet,
    },
    {
      id: 'chart-sankey-budget',
      title: 'Sankey — Budget',
      description: 'Revenue split into costs and net margin.',
      render: () => (
        <SankeyVariantChart title="Sankey — Budget" mode="budget" />
      ),
      code: sankeySnippet,
    },
    {
      id: 'chart-sankey-compact',
      title: 'Sankey — Compact',
      description: 'Label-free flow for small cards.',
      render: () => (
        <SankeyVariantChart
          title="Sankey — Compact"
          mode="compact"
        />
      ),
      code: sankeySnippet,
    },
  ],

  gauge: [
    {
      id: 'chart-gauge-default',
      title: 'Gauge — Default',
      description: '270° gauge with a centered reading.',
      render: () => (
        <GaugeVariantChart title="Gauge" mode="default" />
      ),
      code: gaugeSnippet,
    },
    {
      id: 'chart-gauge-semi',
      title: 'Gauge — Semicircle',
      description: '180° meter with a thicker arc.',
      render: () => (
        <GaugeVariantChart
          title="Gauge — Semicircle"
          mode="semi"
        />
      ),
      code: gaugeSnippet,
    },
    {
      id: 'chart-gauge-bands',
      title: 'Gauge — Thresholds',
      description: 'Green, amber and red bands behind the reading.',
      render: () => (
        <GaugeVariantChart
          title="Gauge — Thresholds"
          mode="bands"
        />
      ),
      code: gaugeSnippet,
    },
    {
      id: 'chart-gauge-trio',
      title: 'Gauge — Group',
      description: 'Three compact gauges in one card.',
      render: () => (
        <GaugeVariantChart
          title="Gauge — Group"
          mode="trio"
        />
      ),
      code: gaugeSnippet,
    },
  ],
}
