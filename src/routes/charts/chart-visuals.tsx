import type { JSX } from '@solidjs/web'
import {
  areaY,
  barX,
  barY,
  defineChart,
  dot,
  group,
  lineY,
  ruleY,
  stack,
  text,
  type DomChartDefinition,
} from '@tanstack/charts'
import {
  angleGrid,
  pie,
  polar,
  radialArc,
  radialArea,
  radialBarAngle,
  radialDot,
  radialGrid,
  radialLine,
} from '@tanstack/charts/polar'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { For, Show, createMemo, createSignal } from 'solid-js'

import { TrendingUpIcon } from '#/components/icons'
import {
  Chart,
  ChartAxisStrip,
  ChartLegend,
  ChartSparkbar,
  opencodeAreaGradient,
  opencodeCrosshair,
  opencodeTooltip,
} from '#/components/ui/chart'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '#/components/ui/segmented-control'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'

import {
  dailyTraffic,
  modelSeries,
  monthlyTraffic,
  radarAxes,
  radarSeries,
} from './data'

export type ChartKind = 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial'

export type ChartShowcaseItem = {
  id: string
  title: string
  description: string
  fullWidth?: boolean
  render: () => JSX.Element
  code: string
}

/* -------------------------------------------------------------------------- */
/* Shared Card Shell & Datasets                                               */
/* -------------------------------------------------------------------------- */

export function CardShell(props: {
  right?: JSX.Element
  footerTitle?: string
  footerSub?: string
  children: JSX.Element
}) {
  return (
    <div class="flex h-full flex-col justify-between">
      <Show when={props.right}>
        <div class="flex flex-wrap items-center justify-end gap-3 border-b border-border-muted px-5 py-3">
          <div class="shrink-0">{props.right}</div>
        </div>
      </Show>

      <div class="flex flex-1 flex-col justify-center px-5 py-4">
        {props.children}
      </div>

      <Show when={props.footerTitle}>
        <div class="border-t border-border-muted px-5 py-3 text-[12px]">
          <div class="flex items-center gap-1.5 text-foreground [font-weight:500]">
            <span>{props.footerTitle}</span>
            <TrendingUpIcon class="size-3.5 text-success" />
          </div>
          <Show when={props.footerSub}>
            <p class="mt-0.5 text-[11.5px] text-faint">{props.footerSub}</p>
          </Show>
        </div>
      </Show>
    </div>
  )
}

const stackedMonthly = monthlyTraffic.flatMap((m) => [
  { month: m.month, series: 'Desktop', value: m.desktop },
  { month: m.month, series: 'Mobile', value: m.mobile },
])

const forecastData = [
  { day: 'Nov 1', usage: 0.4, forecast: null as number | null },
  { day: 'Nov 5', usage: 0.8, forecast: null },
  { day: 'Nov 10', usage: 1.2, forecast: null },
  { day: 'Nov 15', usage: 2.1, forecast: null },
  { day: 'Nov 18', usage: 4.78, forecast: null },
  { day: 'Nov 21', usage: 4.78, forecast: 4.78 },
  { day: 'Nov 25', usage: null as number | null, forecast: 5.82 },
  { day: 'Nov 30', usage: null, forecast: 6.85 },
]

const radarPointsPrimary = radarAxes.map((axis, i) => ({
  axis,
  value: radarSeries[0].values[i],
  series: radarSeries[0].name,
}))

const radarPointsSecondary = radarAxes.map((axis, i) => ({
  axis,
  value: radarSeries[1].values[i],
  series: radarSeries[1].name,
}))

const modelColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
] as const

const pieModels = modelSeries.map((m, i) => ({
  ...m,
  color: modelColors[i % modelColors.length],
}))

/* -------------------------------------------------------------------------- */
/* AREA CHARTS                                                                */
/* -------------------------------------------------------------------------- */

function AreaInteractiveChart() {
  const [range, setRange] = createSignal<'30d' | '14d' | '7d'>('30d')

  const slice = createMemo(() => {
    const count = range() === '7d' ? 7 : range() === '14d' ? 14 : 30
    return dailyTraffic.slice(-count)
  })

  const definition = createMemo(() =>
    defineChart({
      gradients: [
        opencodeAreaGradient('area-int-desktop', 'var(--chart-1)', 0.24),
        opencodeAreaGradient('area-int-mobile', 'var(--chart-2)', 0.2),
      ],
      marks: [
        areaY(slice(), {
          x: 'date',
          y: 'desktop',
          fill: 'url(#area-int-desktop)',
          stroke: 'none',
        }),
        areaY(slice(), {
          x: 'date',
          y: 'mobile',
          fill: 'url(#area-int-mobile)',
          stroke: 'none',
        }),
        lineY(slice(), {
          x: 'date',
          y: 'desktop',
          stroke: 'var(--chart-1)',
          strokeWidth: 1.75,
        }),
        lineY(slice(), {
          x: 'date',
          y: 'mobile',
          stroke: 'var(--chart-2)',
          strokeWidth: 1.5,
        }),
        opencodeCrosshair(),
      ],
      scales: {
        x: { scale: scalePoint, axis: false },
        y: { scale: scaleLinear, nice: true, axis: { ticks: { count: 4 } } },
      },
      layout: {
        margin: { top: 10, right: 8, bottom: 6, left: 38 },
      },
      tooltip: opencodeTooltip({
        content(points) {
          const d = points[0]?.datum
          if (!d) return { rows: [] }
          return {
            title: d.date,
            rows: [
              {
                label: 'Desktop',
                value: d.desktop.toLocaleString('en-US'),
                color: 'var(--chart-1)',
                active: true,
              },
              {
                label: 'Mobile',
                value: d.mobile.toLocaleString('en-US'),
                color: 'var(--chart-2)',
              },
            ],
          }
        },
      }),
    }),
  )

  const axisLabels = createMemo(() => {
    const list = slice()
    if (list.length === 0) return []
    return [
      list[0].date,
      list[Math.floor(list.length / 2)].date,
      list[list.length - 1].date,
    ]
  })

  return (
    <CardShell
      right={
        <SegmentedControl
          value={range()}
          onValueChange={(v) => {
            if (v === '30d' || v === '14d' || v === '7d') setRange(v)
          }}
        >
          <SegmentedControlIndicator />
          <SegmentedControlItem value="30d">30d</SegmentedControlItem>
          <SegmentedControlItem value="14d">14d</SegmentedControlItem>
          <SegmentedControlItem value="7d">7d</SegmentedControlItem>
        </SegmentedControl>
      }
      footerTitle="Trending up by 12.4% this period"
      footerSub="Hover or focus points to inspect daily buckets"
    >
      <div>
        <Chart
          definition={definition()}
          height={220}
          ariaLabel="Interactive area chart"
        />
        <ChartAxisStrip labels={axisLabels()} />
        <div class="mt-3 flex items-center justify-end">
          <ChartLegend
            items={[
              { label: 'Desktop', color: 'var(--chart-1)' },
              { label: 'Mobile', color: 'var(--chart-2)' },
            ]}
          />
        </div>
      </div>
    </CardShell>
  )
}

function AreaForecastChart() {
  const usagePoints = forecastData.filter((d) => d.usage !== null)
  const forecastPoints = forecastData.filter((d) => d.forecast !== null)

  const definition = defineChart({
    gradients: [
      opencodeAreaGradient('area-usage-grad', 'var(--chart-1)', 0.2),
      opencodeAreaGradient('area-forecast-grad', 'var(--chart-forecast)', 0.18),
    ],
    marks: [
      areaY(usagePoints, {
        x: 'day',
        y: (d) => d.usage ?? 0,
        fill: 'url(#area-usage-grad)',
        stroke: 'none',
      }),
      areaY(forecastPoints, {
        x: 'day',
        y: (d) => d.forecast ?? 0,
        fill: 'url(#area-forecast-grad)',
        stroke: 'none',
      }),
      lineY(usagePoints, {
        x: 'day',
        y: (d) => d.usage ?? 0,
        stroke: 'var(--chart-1)',
        strokeWidth: 1.75,
      }),
      lineY(forecastPoints, {
        x: 'day',
        y: (d) => d.forecast ?? 0,
        stroke: 'var(--chart-forecast)',
        strokeWidth: 1.5,
      }),
      dot([forecastPoints[0]], {
        x: 'day',
        y: (d) => d.forecast ?? 0,
        r: 4,
        fill: 'var(--chart-1)',
        stroke: 'var(--chart-1)',
        strokeWidth: 2,
      }),
      dot([forecastPoints[forecastPoints.length - 1]], {
        x: 'day',
        y: (d) => d.forecast ?? 0,
        r: 4,
        fill: 'var(--chart-forecast)',
        stroke: 'var(--chart-forecast)',
        strokeWidth: 2,
      }),
      opencodeCrosshair(),
    ],
    scales: {
      x: {
        scale: scalePoint().domain(forecastData.map((d) => d.day)),
        axis: false,
      },
      y: {
        scale: scaleLinear().domain([0, 10]),
        nice: true,
        axis: {
          ticks: {
            count: 3,
            format: (v: unknown) => `$${v}`,
          },
        },
      },
    },
    layout: {
      margin: { top: 12, right: 12, bottom: 6, left: 34 },
    },
    tooltip: opencodeTooltip({
      content(points) {
        const d = points[0]?.datum
        if (!d) return { rows: [] }
        const isUsage = d.usage !== null
        const val = d.usage ?? d.forecast ?? 0
        return {
          title: d.day,
          rows: [
            {
              label: isUsage ? 'Usage' : 'Forecast',
              value: `$${val.toFixed(2)}`,
              color: isUsage ? 'var(--chart-1)' : 'var(--chart-forecast)',
              active: true,
            },
          ],
        }
      },
    }),
  })

  return (
    <CardShell footerTitle="On track for $6.85 this month">
      <div>
        <Chart
          definition={definition}
          height={156}
          ariaLabel="Workspace usage and forecast area chart"
        />
        <ChartAxisStrip labels={['Nov 1', 'Nov 10', 'Nov 20', 'Nov 30']} />
        <div class="mt-2.5 flex items-center justify-end">
          <ChartLegend
            items={[
              { label: 'Usage', color: 'var(--chart-1)' },
              { label: 'Forecast', color: 'var(--chart-forecast)' },
            ]}
          />
        </div>
      </div>
    </CardShell>
  )
}

function AreaVariantChart(props: {
  title: string
  mode: 'default' | 'linear' | 'stacked' | 'gradient' | 'axes'
  footerTitle: string
}) {
  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    if (props.mode === 'stacked') {
      return defineChart({
        marks: [
          areaY(stackedMonthly, {
            x: 'month',
            y: 'value',
            z: 'series',
            fill: (d) =>
              d.series === 'Desktop' ? 'var(--chart-1)' : 'var(--chart-2)',
            fillOpacity: 0.22,
            stroke: 'none',
            layout: stack(),
          }),
          lineY(monthlyTraffic, {
            x: 'month',
            y: 'desktop',
            stroke: 'var(--chart-1)',
            strokeWidth: 1.75,
          }),
          lineY(monthlyTraffic, {
            x: 'month',
            y: (d) => d.desktop + d.mobile,
            stroke: 'var(--chart-2)',
            strokeWidth: 1.75,
          }),
          opencodeCrosshair(),
        ],
        scales: {
          x: { scale: scalePoint },
          y: { scale: scaleLinear().domain([0, 620]), axis: false },
        },
        layout: {
          margin: { top: 14, right: 8, bottom: 24, left: 8 },
        },
        tooltip: opencodeTooltip({
          content: (points) => {
            const d = points[0]?.datum
            if (!d) return { rows: [] }
            return {
              title: d.month,
              rows: [
                {
                  label: d.series,
                  value: d.value.toLocaleString('en-US'),
                  color: d.series === 'Desktop' ? 'var(--chart-1)' : 'var(--chart-2)',
                  active: true,
                },
              ],
            }
          },
        }),
      })
    }

    const color =
      props.mode === 'gradient'
        ? 'var(--chart-3)'
        : props.mode === 'axes'
          ? 'var(--chart-4)'
          : 'var(--chart-1)'
    const gradId = `area-var-${props.mode}`

    return defineChart({
      gradients: [
        opencodeAreaGradient(gradId, color, props.mode === 'gradient' ? 0.3 : 0.22),
      ],
      marks: [
        areaY(monthlyTraffic, {
          x: 'month',
          y: 'desktop',
          fill: `url(#${gradId})`,
          stroke: 'none',
        }),
        lineY(monthlyTraffic, {
          x: 'month',
          y: 'desktop',
          stroke: color,
          strokeWidth: 1.75,
        }),
        opencodeCrosshair(),
      ],
      scales: {
        x: { scale: scalePoint },
        y: {
          scale: scaleLinear,
          nice: true,
          axis: props.mode === 'axes' ? { ticks: { count: 4 } } : false,
        },
      },
      layout: {
        margin: {
          top: 8,
          right: 8,
          bottom: 24,
          left: props.mode === 'axes' ? 36 : 8,
        },
      },
      tooltip: opencodeTooltip({
        content: (points) => {
          const d = points[0]?.datum
          if (!d) return { rows: [] }
          return {
            title: d.month,
            rows: [
              {
                label: 'Visits',
                value: d.desktop.toLocaleString('en-US'),
                color,
                active: true,
              },
            ],
          }
        },
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div>
        <Chart definition={definition()} height={164} ariaLabel={props.title} />
        <Show when={props.mode === 'stacked'}>
          <div class="mt-2 flex justify-end">
            <ChartLegend
              items={[
                { label: 'Desktop', color: 'var(--chart-1)' },
                { label: 'Mobile', color: 'var(--chart-2)' },
              ]}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* BAR CHARTS                                                                 */
/* -------------------------------------------------------------------------- */

function BarInteractiveChart() {
  const [metric, setMetric] = createSignal<'desktop' | 'mobile'>('desktop')

  const desktopTotal = dailyTraffic.reduce((acc, d) => acc + d.desktop, 0)
  const mobileTotal = dailyTraffic.reduce((acc, d) => acc + d.mobile, 0)

  const definition = createMemo(() => {
    const key = metric()
    const fill = key === 'desktop' ? 'var(--chart-1)' : 'var(--chart-2)'
    return defineChart({
      marks: [
        barY(dailyTraffic, {
          x: 'date',
          y: key,
          fill,
          radius: { end: 3 },
          inset: 1.5,
          states: [
            { when: { focus: 'primary' }, style: { fillOpacity: 1 } },
            { when: { focus: 'unmatched' }, style: { fillOpacity: 0.42 } },
          ],
        }),
      ],
      scales: {
        x: { scale: () => scaleBand().padding(0.18), axis: false },
        y: { scale: scaleLinear, nice: true, axis: { ticks: { count: 4 } } },
      },
      layout: {
        margin: { top: 10, right: 8, bottom: 6, left: 38 },
      },
      tooltip: opencodeTooltip({
        content(points) {
          const d = points[0]?.datum
          if (!d) return { rows: [] }
          return {
            title: d.date,
            rows: [
              {
                label: key === 'desktop' ? 'Desktop' : 'Mobile',
                value: d[key].toLocaleString('en-US'),
                color: fill,
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
          <button
            type="button"
            onClick={() => setMetric('desktop')}
            class={[
              'flex flex-col items-start px-3 py-1.5 text-left transition-colors',
              metric() === 'desktop'
                ? 'bg-surface-3 text-foreground'
                : 'text-muted hover:text-foreground',
            ]}
          >
            <span class="text-[10.5px] text-faint">Desktop</span>
            <span class="text-[13px] tabular-nums [font-weight:530]">
              {desktopTotal.toLocaleString('en-US')}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMetric('mobile')}
            class={[
              'flex flex-col items-start border-l border-border-muted px-3 py-1.5 text-left transition-colors',
              metric() === 'mobile'
                ? 'bg-surface-3 text-foreground'
                : 'text-muted hover:text-foreground',
            ]}
          >
            <span class="text-[10.5px] text-faint">Mobile</span>
            <span class="text-[13px] tabular-nums [font-weight:530]">
              {mobileTotal.toLocaleString('en-US')}
            </span>
          </button>
        </div>
      }
      footerTitle="Peak throughput reached on Nov 19"
      footerSub="Hover any bar to inspect daily volume"
    >
      <div>
        <Chart
          definition={definition()}
          height={210}
          ariaLabel="Interactive bar chart"
        />
        <ChartAxisStrip labels={['Oct 21', 'Nov 4', 'Nov 19']} />
      </div>
    </CardShell>
  )
}

function BarSparkbarChart() {
  const [hovered, setHovered] = createSignal<string | null>(null)
  const sparkData = dailyTraffic.map((d, i) => ({
    label: d.date,
    value: d.desktop,
    formatted: `${d.desktop} req`,
    tone: (i === 19 ? 'accent' : i > 21 ? 'muted' : 'default') as
      | 'default'
      | 'accent'
      | 'muted',
  }))

  return (
    <CardShell
      footerTitle="2,623 requests · 329.4M tokens"
      footerSub={hovered() ?? 'Hover a slot to inspect daily activity'}
    >
      <div class="flex flex-col gap-3 py-2">
        <ChartSparkbar
          data={sparkData}
          ariaLabel="Last 30 days request sparkbar"
          onHover={(datum) =>
            setHovered(datum ? `${datum.label}: ${datum.formatted}` : null)
          }
        />
        <ChartAxisStrip labels={['Oct 21', 'Nov 4', 'Nov 19']} />
      </div>
    </CardShell>
  )
}

function BarVariantChart(props: {
  title: string
  mode: 'default' | 'horizontal' | 'multiple' | 'stacked' | 'negative'
  footerTitle: string
}) {
  const definition = createMemo<DomChartDefinition<any, any, any>>(() => {
    if (props.mode === 'horizontal') {
      return defineChart({
        marks: [
          barX(monthlyTraffic, {
            x: 'desktop',
            y: 'month',
            fill: 'var(--chart-2)',
            radius: { end: 4 },
            states: [
              { when: { focus: 'primary' }, style: { fillOpacity: 1 } },
              { when: { focus: 'unmatched' }, style: { fillOpacity: 0.45 } },
            ],
          }),
        ],
        scales: {
          x: { scale: scaleLinear, nice: true, axis: false },
          y: { scale: () => scaleBand().padding(0.28) },
        },
        layout: {
          margin: { top: 4, right: 12, bottom: 4, left: 36 },
        },
        tooltip: opencodeTooltip({
          format: (pt) => `${pt.datum.month}: ${pt.datum.desktop}`,
        }),
      })
    }

    if (props.mode === 'multiple') {
      return defineChart({
        marks: [
          barY(stackedMonthly, {
            x: 'month',
            y: 'value',
            z: 'series',
            fill: (d) =>
              d.series === 'Desktop' ? 'var(--chart-1)' : 'var(--chart-2)',
            radius: { end: 3 },
            layout: group({ padding: 0.14 }),
          }),
        ],
        scales: {
          x: { scale: () => scaleBand().padding(0.24) },
          y: { scale: scaleLinear, nice: true, axis: false },
        },
        layout: { margin: { top: 8, right: 8, bottom: 24, left: 8 } },
        tooltip: opencodeTooltip({
          format: (pt) => `${pt.datum.month} · ${pt.datum.series}: ${pt.datum.value}`,
        }),
      })
    }

    if (props.mode === 'stacked') {
      return defineChart({
        marks: [
          barY(stackedMonthly, {
            x: 'month',
            y: 'value',
            z: 'series',
            fill: (d) =>
              d.series === 'Desktop' ? 'var(--chart-1)' : 'var(--chart-3)',
            radius: { end: 4, stack: 'outer' },
            layout: stack(),
          }),
        ],
        scales: {
          x: { scale: () => scaleBand().padding(0.3) },
          y: { scale: scaleLinear, nice: true, axis: false },
        },
        layout: { margin: { top: 8, right: 8, bottom: 24, left: 8 } },
        tooltip: opencodeTooltip({
          format: (pt) => `${pt.datum.month} · ${pt.datum.series}: ${pt.datum.value}`,
        }),
      })
    }

    if (props.mode === 'negative') {
      return defineChart({
        marks: [
          ruleY([0], { stroke: 'var(--v2-border-border-strong)', strokeWidth: 1 }),
          barY(monthlyTraffic, {
            x: 'month',
            y: 'delta',
            fill: (d) => (d.delta >= 0 ? 'var(--chart-1)' : 'var(--chart-5)'),
            radius: { end: 3 },
          }),
        ],
        scales: {
          x: { scale: () => scaleBand().padding(0.32) },
          y: { scale: scaleLinear, nice: true, axis: false },
        },
        layout: { margin: { top: 8, right: 8, bottom: 24, left: 8 } },
        tooltip: opencodeTooltip({
          format: (pt) =>
            `${pt.datum.month}: ${pt.datum.delta >= 0 ? '+' : ''}${pt.datum.delta}%`,
        }),
      })
    }

    return defineChart({
      marks: [
        barY(monthlyTraffic, {
          x: 'month',
          y: 'desktop',
          fill: 'var(--chart-1)',
          radius: { end: 4 },
          states: [
            { when: { focus: 'primary' }, style: { fillOpacity: 1 } },
            { when: { focus: 'unmatched' }, style: { fillOpacity: 0.45 } },
          ],
        }),
      ],
      scales: {
        x: { scale: () => scaleBand().padding(0.3) },
        y: { scale: scaleLinear, nice: true, axis: false },
      },
      layout: { margin: { top: 8, right: 8, bottom: 24, left: 8 } },
      tooltip: opencodeTooltip({
        format: (pt) => `${pt.datum.month}: ${pt.datum.desktop} visits`,
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div>
        <Chart definition={definition()} height={164} ariaLabel={props.title} />
        <Show when={props.mode === 'multiple' || props.mode === 'stacked'}>
          <div class="mt-2 flex justify-end">
            <ChartLegend
              items={[
                { label: 'Desktop', color: 'var(--chart-1)' },
                {
                  label: 'Mobile',
                  color:
                    props.mode === 'stacked' ? 'var(--chart-3)' : 'var(--chart-2)',
                },
              ]}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* LINE CHARTS                                                                */
/* -------------------------------------------------------------------------- */

function LineInteractiveChart() {
  const [series, setSeries] = createSignal<'both' | 'desktop' | 'mobile'>('both')

  const definition = createMemo(() => {
    const mode = series()
    const marks = [
      ...(mode !== 'mobile'
        ? [
            lineY(dailyTraffic, {
              x: 'date',
              y: 'desktop',
              stroke: 'var(--chart-1)',
              strokeWidth: 2,
            }),
          ]
        : []),
      ...(mode !== 'desktop'
        ? [
            lineY(dailyTraffic, {
              x: 'date',
              y: 'mobile',
              stroke: 'var(--chart-3)',
              strokeWidth: 2,
            }),
          ]
        : []),
      opencodeCrosshair(),
    ]

    return defineChart({
      marks,
      scales: {
        x: { scale: scalePoint, axis: false },
        y: { scale: scaleLinear, nice: true, axis: { ticks: { count: 4 } } },
      },
      layout: {
        margin: { top: 10, right: 8, bottom: 6, left: 38 },
      },
      tooltip: opencodeTooltip({
        content(points) {
          const d = points[0]?.datum
          if (!d) return { rows: [] }
          return {
            title: d.date,
            rows: [
              {
                label: 'Desktop',
                value: d.desktop.toLocaleString('en-US'),
                color: 'var(--chart-1)',
                active: true,
              },
              {
                label: 'Mobile',
                value: d.mobile.toLocaleString('en-US'),
                color: 'var(--chart-3)',
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
        <SegmentedControl
          value={series()}
          onValueChange={(v) => {
            if (v === 'both' || v === 'desktop' || v === 'mobile') setSeries(v)
          }}
        >
          <SegmentedControlIndicator />
          <SegmentedControlItem value="both">Both</SegmentedControlItem>
          <SegmentedControlItem value="desktop">Desktop</SegmentedControlItem>
          <SegmentedControlItem value="mobile">Mobile</SegmentedControlItem>
        </SegmentedControl>
      }
      footerTitle="Steady upward trajectory (+18.2%)"
      footerSub="Hover to inspect synchronized crosshair & tooltips"
    >
      <div>
        <Chart
          definition={definition()}
          height={210}
          ariaLabel="Interactive line chart"
        />
        <ChartAxisStrip labels={['Oct 21', 'Nov 4', 'Nov 19']} />
        <div class="mt-3 flex items-center justify-end">
          <ChartLegend
            items={[
              { label: 'Desktop', color: 'var(--chart-1)' },
              { label: 'Mobile', color: 'var(--chart-3)' },
            ]}
          />
        </div>
      </div>
    </CardShell>
  )
}

function LineVariantChart(props: {
  title: string
  mode: 'default' | 'dashed' | 'multiple' | 'dots' | 'label'
  footerTitle: string
}) {
  const definition = createMemo(() => {
    const marks = [
      lineY(monthlyTraffic, {
        x: 'month',
        y: 'desktop',
        stroke: 'var(--chart-1)',
        strokeWidth: 2,
        strokeDasharray: props.mode === 'dashed' ? '4 4' : undefined,
      }),
      ...(props.mode === 'multiple'
        ? [
            lineY(monthlyTraffic, {
              x: 'month',
              y: 'mobile',
              stroke: 'var(--chart-2)',
              strokeWidth: 2,
            }),
          ]
        : []),
      ...(props.mode === 'dots' || props.mode === 'label'
        ? [
            dot(monthlyTraffic, {
              x: 'month',
              y: 'desktop',
              r: 3.5,
              fill: 'var(--chart-1)',
              stroke: 'var(--chart-1)',
              strokeWidth: 2,
            }),
          ]
        : []),
      ...(props.mode === 'label'
        ? [
            text(monthlyTraffic, {
              x: 'month',
              y: 'desktop',
              text: (d) => `${d.desktop}`,
              dy: -10,
              fontSize: 10.5,
              fill: 'var(--v2-text-text-muted)',
            }),
          ]
        : []),
      opencodeCrosshair(),
    ]

    return defineChart({
      marks,
      scales: {
        x: { scale: scalePoint },
        y: { scale: scaleLinear, nice: true, axis: false },
      },
      layout: {
        margin: {
          top: props.mode === 'label' ? 20 : 10,
          right: 12,
          bottom: 24,
          left: 12,
        },
      },
      tooltip: opencodeTooltip({
        format: (pt) => `${pt.datum.month}: ${pt.datum.desktop} visits`,
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div>
        <Chart definition={definition()} height={164} ariaLabel={props.title} />
        <Show when={props.mode === 'multiple'}>
          <div class="mt-2 flex justify-end">
            <ChartLegend
              items={[
                { label: 'Desktop', color: 'var(--chart-1)' },
                { label: 'Mobile', color: 'var(--chart-2)' },
              ]}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* PIE & DONUT CHARTS                                                         */
/* -------------------------------------------------------------------------- */

function PieInteractiveChart() {
  const [selectedName, setSelectedName] = createSignal(pieModels[0].name)
  const selected = createMemo(
    () => pieModels.find((m) => m.name === selectedName()) ?? pieModels[0],
  )
  const slices = pie(pieModels, { value: 'requests', gapAngle: 0.03 })

  const definition = createMemo(() => {
    const active = selectedName()
    return defineChart({
      marks: [
        polar({
          scales: { angle: null, radius: null },
          marks: [
            radialArc(slices, {
              startAngle: 'startAngle',
              endAngle: 'endAngle',
              innerRadius: ({ radius }) => radius * 0.58,
              outerRadius: ({ radius }) => radius * 0.94,
              cornerRadius: 4,
              fill: (d) => d.color,
              fillOpacity: 0.92,
              states: [
                {
                  when: (ctx) => ctx.datum.name === active,
                  style: { fillOpacity: 1 },
                },
                {
                  when: (ctx) => ctx.datum.name !== active,
                  style: { fillOpacity: 0.45 },
                },
              ],
            }),
          ],
        }),
      ],
      scales: { x: null, y: null },
      tooltip: opencodeTooltip({
        anchor: { x: 'plot-center', y: 'plot-top' },
        placement: ['top', 'right', 'left'],
        content: (points) => {
          const d = points[0]?.datum
          if (!d) return { rows: [] }
          return {
            title: d.name,
            rows: [
              {
                label: 'Requests',
                value: d.requests.toLocaleString('en-US'),
                color: d.color,
                active: true,
              },
              { label: 'Share', value: `${d.share}%` },
            ],
          }
        },
      }),
    })
  })

  return (
    <CardShell
      right={
        <Select
          items={pieModels.map((m) => ({ value: m.name, label: m.name }))}
          value={selectedName()}
          onValueChange={(next: unknown) => {
            if (typeof next === 'string') setSelectedName(next)
          }}
        >
          <SelectTrigger appearance="small">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <For each={pieModels}>
              {(m) => <SelectItem value={m.name}>{m.name}</SelectItem>}
            </For>
          </SelectContent>
        </Select>
      }
      footerTitle={`${selected().name} leads with ${selected().share}% share`}
    >
      <div class="relative mx-auto w-full max-w-[260px]">
        <Chart
          definition={definition()}
          height={220}
          ariaLabel="Interactive model share donut chart"
          onSelect={(pt) => {
            if (pt?.datum?.name) setSelectedName(pt.datum.name)
          }}
        />
        <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span class="text-[20px] leading-6 tracking-[-0.02em] text-foreground tabular-nums [font-weight:560]">
            {selected().requests.toLocaleString('en-US')}
          </span>
          <span class="mt-0.5 text-[11px] text-faint">Requests</span>
        </div>
      </div>
    </CardShell>
  )
}

function PieVariantChart(props: {
  title: string
  mode: 'simple' | 'donut' | 'donut-text' | 'legend' | 'stacked' | 'active'
  footerTitle: string
}) {
  const slices = pie(pieModels, { value: 'requests', gapAngle: 0.025 })
  const innerSlices = pie(pieModels, { value: 'share', gapAngle: 0.025 })
  const total = pieModels.reduce((acc, m) => acc + m.requests, 0)

  const definition = createMemo(() => {
    const isDonut = props.mode !== 'simple' && props.mode !== 'stacked'

    const polarMarks =
      props.mode === 'stacked'
        ? [
            radialArc(innerSlices, {
              startAngle: 'startAngle',
              endAngle: 'endAngle',
              innerRadius: ({ radius }) => radius * 0.35,
              outerRadius: ({ radius }) => radius * 0.62,
              cornerRadius: 3,
              fill: (d) => d.color,
              fillOpacity: 0.55,
            }),
            radialArc(slices, {
              startAngle: 'startAngle',
              endAngle: 'endAngle',
              innerRadius: ({ radius }) => radius * 0.68,
              outerRadius: ({ radius }) => radius * 0.95,
              cornerRadius: 3,
              fill: (d) => d.color,
            }),
          ]
        : [
            radialArc(slices, {
              startAngle: 'startAngle',
              endAngle: 'endAngle',
              innerRadius: ({ radius }) => (isDonut ? radius * 0.56 : 0),
              outerRadius: ({ radius }) => radius * 0.94,
              cornerRadius: isDonut ? 4 : 2,
              fill: (d) => d.color,
              states: [
                { when: { focus: 'primary' }, style: { fillOpacity: 1 } },
                { when: { focus: 'unmatched' }, style: { fillOpacity: 0.45 } },
              ],
            }),
          ]

    return defineChart({
      marks: [
        polar({
          scales: { angle: null, radius: null },
          marks: polarMarks,
        }),
      ],
      scales: { x: null, y: null },
      tooltip: opencodeTooltip({
        anchor: { x: 'plot-center', y: 'plot-top' },
        placement: ['top', 'right', 'left'],
        format: (pt) => `${pt.datum.name}: ${pt.datum.share}%`,
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div>
        <div class="relative mx-auto w-full max-w-[200px]">
          <Chart
            definition={definition()}
            height={176}
            ariaLabel={props.title}
          />
          <Show when={props.mode === 'donut-text'}>
            <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <span class="text-[17px] leading-5 text-foreground tabular-nums [font-weight:560]">
                {total.toLocaleString('en-US')}
              </span>
              <span class="mt-0.5 text-[10.5px] text-faint">Total</span>
            </div>
          </Show>
        </div>
        <Show when={props.mode === 'legend'}>
          <div class="mt-3 flex justify-center">
            <ChartLegend
              items={pieModels.map((m) => ({ label: m.name, color: m.color }))}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* RADAR CHARTS                                                               */
/* -------------------------------------------------------------------------- */

function RadarVariantChart(props: {
  title: string
  mode: 'default' | 'dots' | 'multiple' | 'grid-circle' | 'lines-only' | 'legend'
  footerTitle: string
}) {
  const definition = createMemo(() => {
    const showMultiple = props.mode === 'multiple' || props.mode === 'legend'
    const isLinesOnly = props.mode === 'lines-only'
    const shape = props.mode === 'grid-circle' ? 'circle' : 'polygon'

    const closedPrimary = [...radarPointsPrimary, radarPointsPrimary[0]]
    const closedSecondary = [...radarPointsSecondary, radarPointsSecondary[0]]

    const marks = [
      ...(!isLinesOnly
        ? [
            radialArea(closedPrimary, {
              angle: 'axis',
              radius: 'value',
              fill: 'var(--chart-1)',
              fillOpacity: 0.22,
              stroke: 'none',
            }),
          ]
        : []),
      radialLine(closedPrimary, {
        angle: 'axis',
        radius: 'value',
        stroke: 'var(--chart-1)',
        strokeWidth: 1.75,
      }),
      ...(showMultiple
        ? [
            radialArea(closedSecondary, {
              angle: 'axis',
              radius: 'value',
              fill: 'var(--chart-2)',
              fillOpacity: 0.18,
              stroke: 'none',
            }),
            radialLine(closedSecondary, {
              angle: 'axis',
              radius: 'value',
              stroke: 'var(--chart-2)',
              strokeWidth: 1.75,
            }),
          ]
        : []),
      ...(props.mode === 'dots'
        ? [
            radialDot(radarPointsPrimary, {
              angle: 'axis',
              radius: 'value',
              r: 3,
              fill: 'var(--chart-1)',
              stroke: 'var(--chart-1)',
              strokeWidth: 1.75,
            }),
          ]
        : []),
    ]

    return defineChart({
      marks: [
        polar({
          radiusRatio: 0.78,
          scales: {
            angle: { scale: scalePoint },
            radius: { scale: scaleLinear().domain([0, 100]), nice: false },
          },
          guides: [
            radialGrid({
              shape,
              ticks: 4,
              stroke: 'var(--v2-border-border-muted)',
            }),
            angleGrid({
              stroke: 'var(--v2-border-border-muted)',
              labels: true,
              labelFontSize: 10.5,
              labelFill: 'var(--v2-text-text-faint)',
            }),
          ],
          marks,
        }),
      ],
      scales: { x: null, y: null },
      tooltip: opencodeTooltip({
        anchor: { x: 'plot-center', y: 'plot-top' },
        placement: ['top', 'right', 'left'],
        format: (pt) => `${pt.datum.axis}: ${pt.datum.value}`,
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div>
        <Chart definition={definition()} height={196} ariaLabel={props.title} />
        <Show when={props.mode === 'legend' || props.mode === 'multiple'}>
          <div class="mt-2 flex justify-center">
            <ChartLegend
              items={[
                { label: radarSeries[0].name, color: 'var(--chart-1)' },
                { label: radarSeries[1].name, color: 'var(--chart-2)' },
              ]}
            />
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* RADIAL CHARTS                                                              */
/* -------------------------------------------------------------------------- */

function RadialVariantChart(props: {
  title: string
  mode: 'simple' | 'text' | 'stacked' | 'concentric' | 'label' | 'grid'
  footerTitle: string
}) {
  const definition = createMemo(() => {
    const isHalf = props.mode === 'stacked'
    const radialData =
      props.mode === 'concentric' || props.mode === 'label'
        ? pieModels.map((m) => ({ label: m.name, value: m.share, color: m.color }))
        : [{ label: 'Quota', value: 74, color: 'var(--chart-1)' }]

    return defineChart({
      marks: [
        polar({
          startAngle: isHalf ? -Math.PI / 2 : 0,
          endAngle: isHalf ? Math.PI / 2 : Math.PI * 2,
          radiusRatio: 0.9,
          scales: {
            angle: { scale: scaleLinear().domain([0, 100]), nice: false },
            radius: {
              scale: () => scaleBand().padding(0.28),
              range: [({ radius }) => radius * 0.45, ({ radius }) => radius],
            },
          },
          guides:
            props.mode === 'grid'
              ? [
                  radialGrid({
                    shape: 'circle',
                    ticks: 3,
                    stroke: 'var(--v2-border-border-muted)',
                  }),
                ]
              : undefined,
          marks: [
            radialBarAngle(
              radialData.map((d) => ({ ...d, max: 100 })),
              {
                angle1: 0,
                angle2: 'max',
                radius: 'label',
                cornerRadius: 'full',
                fill: 'var(--v2-background-bg-layer-02)',
              },
            ),
            radialBarAngle(radialData, {
              angle1: 0,
              angle2: 'value',
              radius: 'label',
              cornerRadius: 'full',
              fill: (d) => d.color,
            }),
          ],
        }),
      ],
      scales: { x: null, y: null },
      tooltip: opencodeTooltip({
        anchor: { x: 'plot-center', y: 'plot-top' },
        placement: ['top', 'right', 'left'],
        format: (pt) => `${pt.datum.label}: ${pt.datum.value}%`,
      }),
    })
  })

  return (
    <CardShell footerTitle={props.footerTitle}>
      <div class="relative mx-auto w-full max-w-[210px]">
        <Chart definition={definition()} height={180} ariaLabel={props.title} />
        <Show when={props.mode === 'text' || props.mode === 'stacked'}>
          <div class="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span class="text-[20px] leading-6 text-foreground tabular-nums [font-weight:560]">
              74%
            </span>
            <span class="mt-0.5 text-[10.5px] text-faint">Quota used</span>
          </div>
        </Show>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------------------- */
/* Copyable Code Snippets (real @tanstack/charts + Kitsaas Chart)             */
/* -------------------------------------------------------------------------- */

const areaSnippet = `import { areaY, defineChart } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart, opencodeCrosshair } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    areaY(data, {
      x: 'month',
      y: 'desktop',
      fill: 'var(--chart-1)',
      fillOpacity: 0.16,
      stroke: 'var(--chart-1)',
      strokeWidth: 1.75,
    }),
    opencodeCrosshair(),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, nice: true },
  },
  tooltip: { use: tooltip },
})

export function AreaExample() {
  return <Chart definition={definition} height={220} ariaLabel="Area chart" />
}`

const barSnippet = `import { barY, defineChart } from '@tanstack/charts'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    barY(data, {
      x: 'month',
      y: 'desktop',
      fill: 'var(--chart-1)',
      radius: { end: 4 },
      states: [
        { when: { focus: 'primary' }, style: { fillOpacity: 1 } },
        { when: { focus: 'unmatched' }, style: { fillOpacity: 0.42 } },
      ],
    }),
  ],
  scales: {
    x: { scale: () => scaleBand().padding(0.28) },
    y: { scale: scaleLinear, nice: true },
  },
  tooltip: { use: tooltip },
})

export function BarExample() {
  return <Chart definition={definition} height={210} ariaLabel="Bar chart" />
}`

const sparkbarSnippet = `import { ChartSparkbar } from '#/components/ui/chart'

export function ActivitySparkbar() {
  return (
    <ChartSparkbar
      data={dailyTraffic.map((d) => ({
        label: d.date,
        value: d.desktop,
        formatted: \`\${d.desktop} req\`,
      }))}
    />
  )
}`

const lineSnippet = `import { defineChart, lineY } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart, opencodeCrosshair } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    lineY(data, {
      x: 'month',
      y: 'desktop',
      stroke: 'var(--chart-1)',
      strokeWidth: 2,
    }),
    opencodeCrosshair(),
  ],
  scales: {
    x: { scale: scalePoint },
    y: { scale: scaleLinear, nice: true },
  },
  tooltip: { use: tooltip },
})

export function LineExample() {
  return <Chart definition={definition} height={210} ariaLabel="Line chart" />
}`

const pieSnippet = `import { defineChart } from '@tanstack/charts'
import { pie, polar, radialArc } from '@tanstack/charts/polar'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart } from '#/components/ui/chart'

const slices = pie(data, { value: 'requests', gapAngle: 0.03 })

const definition = defineChart({
  marks: [
    polar({
      scales: { angle: null, radius: null },
      marks: [
        radialArc(slices, {
          startAngle: 'startAngle',
          endAngle: 'endAngle',
          innerRadius: ({ radius }) => radius * 0.56,
          outerRadius: ({ radius }) => radius * 0.94,
          cornerRadius: 4,
          fill: (d) => d.color,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: { use: tooltip },
})

export function DonutExample() {
  return <Chart definition={definition} height={200} ariaLabel="Donut chart" />
}`

const radarSnippet = `import { defineChart } from '@tanstack/charts'
import { angleGrid, polar, radialArea, radialGrid } from '@tanstack/charts/polar'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { scalePoint } from '@tanstack/charts/scales/point'
import { tooltip } from '@tanstack/charts/tooltip'
import { Chart } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    polar({
      radiusRatio: 0.78,
      scales: {
        angle: { scale: scalePoint },
        radius: { scale: scaleLinear().domain([0, 100]) },
      },
      guides: [
        radialGrid({ shape: 'polygon', ticks: 4 }),
        angleGrid({ labels: true }),
      ],
      marks: [
        radialArea(points, {
          angle: 'axis',
          radius: 'value',
          fill: 'var(--chart-1)',
          fillOpacity: 0.22,
          stroke: 'var(--chart-1)',
          strokeWidth: 1.75,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  tooltip: { use: tooltip },
})

export function RadarExample() {
  return <Chart definition={definition} height={200} ariaLabel="Radar chart" />
}`

const radialSnippet = `import { defineChart } from '@tanstack/charts'
import { polar, radialBarAngle } from '@tanstack/charts/polar'
import { scaleBand } from '@tanstack/charts/scales/band'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { Chart } from '#/components/ui/chart'

const definition = defineChart({
  marks: [
    polar({
      scales: {
        angle: { scale: scaleLinear().domain([0, 100]) },
        radius: {
          scale: () => scaleBand().padding(0.28),
          range: [({ radius }) => radius * 0.45, ({ radius }) => radius],
        },
      },
      marks: [
        radialBarAngle([{ label: 'Quota', value: 74 }], {
          angle1: 0,
          angle2: 'value',
          radius: 'label',
          cornerRadius: 'full',
          fill: 'var(--chart-1)',
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
})

export function RadialExample() {
  return <Chart definition={definition} height={180} ariaLabel="Radial chart" />
}`

/* -------------------------------------------------------------------------- */
/* Chart Catalog (6 categories, mirroring shadcn/ui + opencode console)       */
/* -------------------------------------------------------------------------- */

export const chartCatalog: Record<ChartKind, ChartShowcaseItem[]> = {
  area: [
    {
      id: 'chart-area-interactive',
      title: 'Area Chart — Interactive',
      description: '30d / 14d / 7d range switcher with crosshair & tooltip.',
      fullWidth: true,
      render: () => <AreaInteractiveChart />,
      code: areaSnippet,
    },
    {
      id: 'chart-area-forecast',
      title: 'Area Chart — Forecast',
      description: 'Opencode console usage & projected spend chart.',
      render: () => <AreaForecastChart />,
      code: areaSnippet,
    },
    {
      id: 'chart-area-default',
      title: 'Area Chart — Default',
      description: 'Single-series area chart with subtle fill and crosshair.',
      render: () => (
        <AreaVariantChart
          title="Area Chart"
          mode="default"
          footerTitle="Trending up by 5.2% this month"
        />
      ),
      code: areaSnippet,
    },
    {
      id: 'chart-area-stacked',
      title: 'Area Chart — Stacked',
      description: 'Multi-series stacked area with hairline legend.',
      render: () => (
        <AreaVariantChart
          title="Area Chart — Stacked"
          mode="stacked"
          footerTitle="Combined volume up 9.1%"
        />
      ),
      code: areaSnippet,
    },
    {
      id: 'chart-area-gradient',
      title: 'Area Chart — Accent',
      description: 'Purple accent fill with hover tooltip.',
      render: () => (
        <AreaVariantChart
          title="Area Chart — Accent"
          mode="gradient"
          footerTitle="Peak 344k tokens in June"
        />
      ),
      code: areaSnippet,
    },
    {
      id: 'chart-area-axes',
      title: 'Area Chart — Axes',
      description: 'Explicit Y-axis gridlines and tabular ticks.',
      render: () => (
        <AreaVariantChart
          title="Area Chart — Axes"
          mode="axes"
          footerTitle="Consistent weekly growth"
        />
      ),
      code: areaSnippet,
    },
  ],

  bar: [
    {
      id: 'chart-bar-interactive',
      title: 'Bar Chart — Interactive',
      description: 'Desktop / Mobile metric toggle with focus dimming.',
      fullWidth: true,
      render: () => <BarInteractiveChart />,
      code: barSnippet,
    },
    {
      id: 'chart-bar-sparkbar',
      title: 'Bar Chart — Sparkbar',
      description: 'Opencode vertical pill-track activity strip.',
      render: () => <BarSparkbarChart />,
      code: sparkbarSnippet,
    },
    {
      id: 'chart-bar-default',
      title: 'Bar Chart — Default',
      description: 'Rounded vertical bars with hover highlight.',
      render: () => (
        <BarVariantChart
          title="Bar Chart"
          mode="default"
          footerTitle="Trending up by 5.2% this month"
        />
      ),
      code: barSnippet,
    },
    {
      id: 'chart-bar-horizontal',
      title: 'Bar Chart — Horizontal',
      description: 'Horizontal categorical comparison via barX.',
      render: () => (
        <BarVariantChart
          title="Bar Chart — Horizontal"
          mode="horizontal"
          footerTitle="June reached highest volume"
        />
      ),
      code: barSnippet,
    },
    {
      id: 'chart-bar-multiple',
      title: 'Bar Chart — Multiple',
      description: 'Grouped side-by-side series with group() layout.',
      render: () => (
        <BarVariantChart
          title="Bar Chart — Multiple"
          mode="multiple"
          footerTitle="Desktop leads by 42%"
        />
      ),
      code: barSnippet,
    },
    {
      id: 'chart-bar-stacked',
      title: 'Bar Chart — Stacked',
      description: 'Stacked bars with outer-only corner radius.',
      render: () => (
        <BarVariantChart
          title="Bar Chart — Stacked"
          mode="stacked"
          footerTitle="558 total requests in June"
        />
      ),
      code: barSnippet,
    },
    {
      id: 'chart-bar-negative',
      title: 'Bar Chart — Negative',
      description: 'Diverging positive/negative delta around zero baseline.',
      render: () => (
        <BarVariantChart
          title="Bar Chart — Negative"
          mode="negative"
          footerTitle="Recovered +54% in June"
        />
      ),
      code: barSnippet,
    },
  ],

  line: [
    {
      id: 'chart-line-interactive',
      title: 'Line Chart — Interactive',
      description: 'Series filter with synchronized crosshair and tooltip.',
      fullWidth: true,
      render: () => <LineInteractiveChart />,
      code: lineSnippet,
    },
    {
      id: 'chart-line-default',
      title: 'Line Chart — Default',
      description: 'Clean single-series line chart.',
      render: () => (
        <LineVariantChart
          title="Line Chart"
          mode="default"
          footerTitle="Trending up by 5.2% this month"
        />
      ),
      code: lineSnippet,
    },
    {
      id: 'chart-line-dashed',
      title: 'Line Chart — Dashed',
      description: 'Dashed projection line style.',
      render: () => (
        <LineVariantChart
          title="Line Chart — Dashed"
          mode="dashed"
          footerTitle="Forecasted steady rise"
        />
      ),
      code: lineSnippet,
    },
    {
      id: 'chart-line-multiple',
      title: 'Line Chart — Multiple',
      description: 'Two series with opencode hairline legend.',
      render: () => (
        <LineVariantChart
          title="Line Chart — Multiple"
          mode="multiple"
          footerTitle="Both channels growing"
        />
      ),
      code: lineSnippet,
    },
    {
      id: 'chart-line-dots',
      title: 'Line Chart — Dots',
      description: 'Hollow ring markers at every datum.',
      render: () => (
        <LineVariantChart
          title="Line Chart — Dots"
          mode="dots"
          footerTitle="6 reporting periods"
        />
      ),
      code: lineSnippet,
    },
    {
      id: 'chart-line-label',
      title: 'Line Chart — Label',
      description: 'Direct value annotations above each point.',
      render: () => (
        <LineVariantChart
          title="Line Chart — Label"
          mode="label"
          footerTitle="Peak 344 in June"
        />
      ),
      code: lineSnippet,
    },
  ],

  pie: [
    {
      id: 'chart-pie-interactive',
      title: 'Pie Chart — Interactive',
      description: 'Select or click a slice to inspect model share.',
      fullWidth: true,
      render: () => <PieInteractiveChart />,
      code: pieSnippet,
    },
    {
      id: 'chart-pie-simple',
      title: 'Pie Chart — Simple',
      description: 'Full proportional pie with hover tooltips.',
      render: () => (
        <PieVariantChart
          title="Pie Chart"
          mode="simple"
          footerTitle="4 active models"
        />
      ),
      code: pieSnippet,
    },
    {
      id: 'chart-pie-donut',
      title: 'Pie Chart — Donut',
      description: 'Clean hollow ring with rounded slice corners.',
      render: () => (
        <PieVariantChart
          title="Pie Chart — Donut"
          mode="donut"
          footerTitle="DeepSeek leads at 48%"
        />
      ),
      code: pieSnippet,
    },
    {
      id: 'chart-pie-donut-text',
      title: 'Pie Chart — Donut with Text',
      description: 'Donut ring with centered KPI total.',
      render: () => (
        <PieVariantChart
          title="Pie Chart — Donut Text"
          mode="donut-text"
          footerTitle="31,684 total requests"
        />
      ),
      code: pieSnippet,
    },
    {
      id: 'chart-pie-legend',
      title: 'Pie Chart — Legend',
      description: 'Donut chart paired with hairline legend.',
      render: () => (
        <PieVariantChart
          title="Pie Chart — Legend"
          mode="legend"
          footerTitle="Top 4 providers shown"
        />
      ),
      code: pieSnippet,
    },
    {
      id: 'chart-pie-stacked',
      title: 'Pie Chart — Stacked',
      description: 'Concentric inner and outer rings.',
      render: () => (
        <PieVariantChart
          title="Pie Chart — Stacked"
          mode="stacked"
          footerTitle="Outer ring shows current share"
        />
      ),
      code: pieSnippet,
    },
  ],

  radar: [
    {
      id: 'chart-radar-default',
      title: 'Radar Chart — Default',
      description: 'Polygon grid with filled capability area.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart"
          mode="default"
          footerTitle="95% uptime score"
        />
      ),
      code: radarSnippet,
    },
    {
      id: 'chart-radar-dots',
      title: 'Radar Chart — Dots',
      description: 'Vertex dot markers on each axis.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart — Dots"
          mode="dots"
          footerTitle="6 evaluated dimensions"
        />
      ),
      code: radarSnippet,
    },
    {
      id: 'chart-radar-multiple',
      title: 'Radar Chart — Multiple',
      description: 'Two overlapping models compared.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart — Multiple"
          mode="multiple"
          footerTitle="Side-by-side benchmark"
        />
      ),
      code: radarSnippet,
    },
    {
      id: 'chart-radar-grid-circle',
      title: 'Radar Chart — Grid Circle',
      description: 'Circular concentric grid rings.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart — Circle Grid"
          mode="grid-circle"
          footerTitle="Balanced throughput & cache"
        />
      ),
      code: radarSnippet,
    },
    {
      id: 'chart-radar-lines-only',
      title: 'Radar Chart — Lines Only',
      description: 'Unfilled outline polygon stroke.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart — Lines Only"
          mode="lines-only"
          footerTitle="Minimalist outline"
        />
      ),
      code: radarSnippet,
    },
    {
      id: 'chart-radar-legend',
      title: 'Radar Chart — Legend',
      description: 'Multi-series radar with hairline legend.',
      render: () => (
        <RadarVariantChart
          title="Radar Chart — Legend"
          mode="legend"
          footerTitle="2 benchmarked models"
        />
      ),
      code: radarSnippet,
    },
  ],

  radial: [
    {
      id: 'chart-radial-simple',
      title: 'Radial Chart — Simple',
      description: 'Single rounded progress arc.',
      render: () => (
        <RadialVariantChart
          title="Radial Chart"
          mode="simple"
          footerTitle="74% of quota consumed"
        />
      ),
      code: radialSnippet,
    },
    {
      id: 'chart-radial-text',
      title: 'Radial Chart — Text',
      description: 'Progress ring with centered KPI value.',
      render: () => (
        <RadialVariantChart
          title="Radial Chart — Text"
          mode="text"
          footerTitle="26% headroom remaining"
        />
      ),
      code: radialSnippet,
    },
    {
      id: 'chart-radial-stacked',
      title: 'Radial Chart — Half Arc',
      description: '180° half-arc gauge meter.',
      render: () => (
        <RadialVariantChart
          title="Radial Chart — Half Arc"
          mode="stacked"
          footerTitle="Within target threshold"
        />
      ),
      code: radialSnippet,
    },
    {
      id: 'chart-radial-concentric',
      title: 'Radial Chart — Concentric',
      description: 'Multi-track concentric rings for 4 models.',
      render: () => (
        <RadialVariantChart
          title="Radial Chart — Concentric"
          mode="concentric"
          footerTitle="4 concentric series"
        />
      ),
      code: radialSnippet,
    },
    {
      id: 'chart-radial-grid',
      title: 'Radial Chart — Grid',
      description: 'Radial bar with circular reference rings.',
      render: () => (
        <RadialVariantChart
          title="Radial Chart — Grid"
          mode="grid"
          footerTitle="Normalized 0–100 scale"
        />
      ),
      code: radialSnippet,
    },
  ],
}
