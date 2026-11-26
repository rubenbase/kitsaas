import type { JSX } from '@solidjs/web'
import {
  areaY,
  defineChart,
  lineY,
  ruleX,
  type ChartCurve,
  type DomChartDefinition,
} from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { For, Show, createMemo } from 'solid-js'

import { Chart, ChartLegend, opencodeTooltip } from '#/components/ui/chart'

/**
 * Flow funnel: each stage is a flat plateau joined to the next by an S-curve,
 * drawn as nested, centered layers (one per channel) that darken toward the
 * middle. Hairline markers sit on every plateau with pill labels above and
 * below. Built from `areaY`, `lineY` and `ruleX` plus a small curve, so it
 * needs nothing beyond `@tanstack/charts`.
 */

export const funnelStageNames = ['Visitors', 'Sign-ups', 'Activated', 'Trial', 'Paid'] as const

/** Short stage names for card-sized charts. */
const funnelStageShort = ['Visit', 'Sign-up', 'Active', 'Trial', 'Paid']

export type FunnelChannel = { name: string; values: readonly number[] }

/** Channels from the largest to the smallest; the largest is drawn innermost. */
export const funnelChannels: FunnelChannel[] = [
  { name: 'Organic', values: [6200, 2610, 1640, 790, 360] },
  { name: 'Paid ads', values: [4100, 1380, 760, 330, 120] },
  { name: 'Referral', values: [2100, 830, 560, 290, 140] },
]

/** Last month's totals per stage, for deltas and the Compare example. */
export const funnelPrevious = [11200, 4010, 2330, 1190, 470]

const totals = funnelStageNames.map((_, i) =>
  funnelChannels.reduce((sum, channel) => sum + channel.values[i], 0),
)

/* -------------------------------------------------------------------------- */
/* Geometry                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Horizontal S-curve through every point (a cubic whose control points sit at
 * each segment's horizontal midpoint), for both lines and areas. With two
 * points per plateau this draws flat stages joined by smooth transitions.
 */
const bumpX: ChartCurve = {
  line(points) {
    if (points.length === 0) return ''
    let d = `M${points[0][0]},${points[0][1]}`
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1]
      const [x1, y1] = points[i]
      const mx = (x0 + x1) / 2
      d += `C${mx},${y0} ${mx},${y1} ${x1},${y1}`
    }
    return d
  },
  area(top, bottom) {
    if (top.length === 0) return ''
    const back = [...bottom].reverse()
    return `${bumpX.line(top)}L${back[0][0]},${back[0][1]}${bumpX.line(back).replace(/^M[^C]*/, '')}Z`
  },
}

type FlowPoint = { x: number; stage: number; value: number }

/** Plateau half-width, as a share of one stage's width. */
const PLATEAU = 0.22

/** Two points per stage (plateau start and end), plus the chart's two edges. */
function flowPoints(values: readonly number[]): FlowPoint[] {
  const last = values.length - 1
  return [
    { x: 0, stage: 0, value: values[0] },
    ...values.flatMap((value, stage) => [
      { x: stage + 0.5 - PLATEAU, stage, value },
      { x: stage + 0.5 + PLATEAU, stage, value },
    ]),
    { x: values.length, stage: last, value: values[last] },
  ]
}

/** Cumulative layers: innermost is the largest channel, outermost the total. */
function layers(channels: readonly FunnelChannel[]) {
  return channels.map((_, k) =>
    funnelStageNames.map((__, i) =>
      channels.slice(0, k + 1).reduce((sum, channel) => sum + channel.values[i], 0),
    ),
  )
}

const fmt = (n: number) => n.toLocaleString('en-US')
const pctOf = (part: number, whole: number) => {
  const p = (part / whole) * 100
  return `${p < 10 ? p.toFixed(1) : Math.round(p)}%`
}

/* -------------------------------------------------------------------------- */
/* Chart definition                                                           */
/* -------------------------------------------------------------------------- */

export type FlowHue = 'orange' | 'purple' | 'blue' | 'cyan'

/** The hue's mid tone: markers, tooltip swatch, legend and glow. */
const hueColor = (hue: FlowHue) => `var(--v2-${hue}-600)`

/**
 * Solid tones per layer, innermost first. Translucent layers turn muddy over a
 * dark card, so each layer is opaque: in dark mode the tones darken toward the
 * edges like a fading glow, in light mode they lighten toward pastel.
 */
const layerTones = (hue: FlowHue) => [
  `light-dark(var(--v2-${hue}-600), var(--v2-${hue}-600))`,
  `light-dark(var(--v2-${hue}-400), var(--v2-${hue}-900))`,
  `light-dark(var(--v2-${hue}-200), var(--v2-${hue}-1100))`,
]

type FlowOptions = {
  hue: FlowHue
  /** Vertical room left for the pill labels, as a multiple of the widest stage. */
  headroom?: number
  /** Draw last month's outline as a dashed line. */
  previous?: readonly number[]
  /** Draw one solid layer instead of one per channel. */
  single?: boolean
}

function flowDefinition(opts: FlowOptions): DomChartDefinition<any, any, any> {
  const stack = opts.single ? [totals] : layers(funnelChannels)
  const widest = Math.max(...totals, ...(opts.previous ?? []))
  const half = (widest / 2) * (opts.headroom ?? 1.5)
  const tones = opts.single ? [layerTones(opts.hue)[1]] : layerTones(opts.hue)

  return defineChart({
    marks: [
      ...stack
        .map((values, k) =>
          areaY(flowPoints(values), {
            x: 'x',
            y1: (d) => -d.value / 2,
            y2: (d) => d.value / 2,
            curve: bumpX,
            fill: tones[k],
            // areaY defaults to 0.2; the tones are already the final colors.
            fillOpacity: 1,
            stroke: 'none',
          }),
        )
        .reverse(),
      ...(opts.previous
        ? [
            lineY(flowPoints(opts.previous), {
              x: 'x',
              y: (d) => d.value / 2,
              curve: bumpX,
              stroke: 'var(--v2-text-text-faint)',
              strokeWidth: 1,
              strokeDasharray: '3 3',
            }),
            lineY(flowPoints(opts.previous), {
              x: 'x',
              y: (d) => -d.value / 2,
              curve: bumpX,
              stroke: 'var(--v2-text-text-faint)',
              strokeWidth: 1,
              strokeDasharray: '3 3',
            }),
          ]
        : []),
      ruleX(
        funnelStageNames.map((_, i) => i + 0.5),
        {
          stroke: 'var(--v2-text-text-base)',
          strokeOpacity: 0.55,
          strokeWidth: 1,
        },
      ),
    ],
    scales: {
      x: { scale: scaleLinear().domain([0, funnelStageNames.length]), axis: false },
      y: { scale: scaleLinear().domain([-half, half]), axis: false },
    },
    layout: { margin: 0 },
    tooltip: opencodeTooltip({
      anchor: { x: 'point', y: 'plot-top' },
      placement: ['right', 'left'],
      content(points) {
        const d = points[0]?.datum as FlowPoint | undefined
        if (!d) return { rows: [] }
        const i = d.stage
        return {
          title: funnelStageNames[i],
          rows: [
            ...funnelChannels.map((channel) => ({
              label: channel.name,
              value: fmt(channel.values[i]),
            })),
            {
              label: 'Total',
              value: fmt(totals[i]),
              color: hueColor(opts.hue),
              active: true,
            },
          ],
        }
      },
    }),
  })
}

/* -------------------------------------------------------------------------- */
/* Pieces                                                                     */
/* -------------------------------------------------------------------------- */

function Pill(props: { size?: 'sm' | 'md'; children: JSX.Element }) {
  return (
    <span
      class={[
        'rounded-full border border-border-muted bg-surface-2 font-mono leading-4 text-foreground tabular-nums shadow-raised',
        props.size === 'sm' ? 'px-1.5 text-[9.5px]' : 'px-2 py-0.5 text-[10.5px]',
      ]}
    >
      {props.children}
    </span>
  )
}

/**
 * Pill labels positioned over the markers. The chart has no margins and an
 * x domain of [0, stages], so a stage's marker sits at `(i + 0.5) / n` of the
 * width.
 */
function PillRow(props: {
  labels: readonly string[]
  position: 'top' | 'bottom' | 'center'
  size?: 'sm' | 'md'
}) {
  return (
    <div
      class={[
        'pointer-events-none absolute inset-x-0',
        props.position === 'top' ? 'top-1.5' : '',
        props.position === 'bottom' ? 'bottom-1.5' : '',
        props.position === 'center' ? 'top-1/2 -translate-y-1/2' : '',
      ]}
    >
      <For each={props.labels}>
        {(label, i) => (
          <span
            class="absolute -translate-x-1/2"
            style={{ left: `${((i() + 0.5) / props.labels.length) * 100}%` }}
          >
            <Pill size={props.size}>{label}</Pill>
          </span>
        )}
      </For>
    </div>
  )
}

/** Soft glow at the funnel's wide mouth, in the chart's color. */
function Glow(props: { color: string; children: JSX.Element }) {
  return (
    <div
      class="relative"
      style={{
        'background-image': `radial-gradient(ellipse 38% 70% at 0% 50%, color-mix(in oklab, ${props.color} 22%, transparent), transparent 72%)`,
      }}
    >
      {props.children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Examples                                                                   */
/* -------------------------------------------------------------------------- */

/** Stage names under the markers, one per stage column. */
function StageLabels(props: { labels: readonly string[] }) {
  return (
    <div
      class="grid pt-3 text-center text-[10px] text-faint"
      style={{ 'grid-template-columns': `repeat(${props.labels.length}, 1fr)` }}
    >
      <For each={props.labels}>{(stage) => <span class="whitespace-nowrap">{stage}</span>}</For>
    </div>
  )
}

const stepShare = totals.map((v, i) => (i === 0 ? '100%' : pctOf(v, totals[i - 1])))

/** Full-width flow funnel, one layer per channel. */
export function FunnelFlowChart() {
  const hue: FlowHue = 'orange'
  const definition = createMemo(() => flowDefinition({ hue, headroom: 1.55 }))

  return (
    <div class="py-4">
      <Glow color={hueColor(hue)}>
        <div class="relative">
          <Chart definition={definition()} height={260} ariaLabel="Conversion funnel by channel" />
          <PillRow labels={totals.map(fmt)} position="top" />
          <PillRow labels={stepShare} position="bottom" />
        </div>
      </Glow>
      <StageLabels labels={funnelStageNames} />
    </div>
  )
}

export type FunnelFlowVariant = 'compact' | 'stages' | 'compare'

/** Card-sized flow funnels. */
export function FunnelFlowVariantChart(props: { mode: FunnelFlowVariant; title: string }) {
  const hue: FlowHue = ({ compact: 'purple', stages: 'blue', compare: 'cyan' } as const)[props.mode]

  const definition = createMemo(() =>
    flowDefinition({
      hue,
      headroom: props.mode === 'stages' ? 1.15 : 1.5,
      single: props.mode === 'compare',
      previous: props.mode === 'compare' ? funnelPrevious : undefined,
    }),
  )

  return (
    <div class="flex h-full flex-col justify-center py-4">
      <Glow color={hueColor(hue)}>
        <div class="relative">
          <Chart definition={definition()} height={160} ariaLabel={props.title} />
          <Show when={props.mode === 'compact'}>
            <PillRow
              labels={totals.map((v) => `${(v / 1000).toFixed(1)}k`)}
              position="top"
              size="sm"
            />
          </Show>
          <Show when={props.mode === 'stages'}>
            <PillRow labels={stepShare} position="center" size="sm" />
          </Show>
        </div>
      </Glow>
      <div class="px-4">
        <Show when={props.mode === 'compare'} fallback={<StageLabels labels={funnelStageShort} />}>
          <div class="flex justify-end pt-2">
            <ChartLegend
              items={[
                { label: 'November', color: hueColor(hue) },
                { label: 'October', color: 'var(--v2-text-text-faint)' },
              ]}
            />
          </div>
        </Show>
      </div>
    </div>
  )
}

export const funnelFlowSnippet = `import { areaY, defineChart, ruleX, type ChartCurve } from '@tanstack/charts'
import { scaleLinear } from '@tanstack/charts/scales/linear'
import { Chart } from '#/components/ui/chart'

const stages = [12400, 4820, 2960, 1410, 620]

// Flat plateau per stage, joined by S-curves.
const bumpX: ChartCurve = {
  line(points) {
    let d = \`M\${points[0][0]},\${points[0][1]}\`
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1]
      const [x1, y1] = points[i]
      const mx = (x0 + x1) / 2
      d += \`C\${mx},\${y0} \${mx},\${y1} \${x1},\${y1}\`
    }
    return d
  },
  area(top, bottom) {
    const back = [...bottom].reverse()
    return \`\${bumpX.line(top)}L\${back[0][0]},\${back[0][1]}\${bumpX.line(back).replace(/^M[^C]*/, '')}Z\`
  },
}

const points = [
  { x: 0, value: stages[0] },
  ...stages.flatMap((value, i) => [
    { x: i + 0.28, value },
    { x: i + 0.72, value },
  ]),
  { x: stages.length, value: stages.at(-1)! },
]

const definition = defineChart({
  marks: [
    // Centered on zero: half the stage above the axis, half below.
    areaY(points, {
      x: 'x',
      y1: (d) => -d.value / 2,
      y2: (d) => d.value / 2,
      curve: bumpX,
      fill: 'var(--chart-5)',
      fillOpacity: 0.5,
    }),
    ruleX(stages.map((_, i) => i + 0.5), { stroke: 'var(--v2-text-text-base)', strokeOpacity: 0.55 }),
  ],
  scales: {
    x: { scale: scaleLinear().domain([0, stages.length]), axis: false },
    y: { scale: scaleLinear().domain([-9300, 9300]), axis: false },
  },
  layout: { margin: 0 },
})

export function FunnelExample() {
  return <Chart definition={definition} height={240} ariaLabel="Conversion funnel" />
}`
