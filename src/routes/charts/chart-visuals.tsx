import { For } from 'solid-js'

import { modelSeries, spendSeries } from './data'

const W = 640
const H = 220

const maxSpend = Math.max(...spendSeries)

function spendPoints() {
  const max = Math.max(...spendSeries)
  const min = Math.min(...spendSeries)
  const span = max - min || 1
  const step = W / (spendSeries.length - 1)
  return spendSeries.map((value, index) => {
    const x = index * step
    const y = H - 8 - ((value - min) / span) * (H - 16)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
}

function TimeAxis() {
  return (
    <div class="mt-2 flex justify-between text-[11px] text-faint">
      <span>Oct 21</span>
      <span>Nov 4</span>
      <span>Nov 19</span>
    </div>
  )
}

function Grid() {
  return (
    <For each={[0, 55, 110, 165, 219]}>
      {(y) => (
        <line
          x1="0"
          y1={y}
          x2={W}
          y2={y}
          stroke="var(--v2-border-border-muted)"
          stroke-width="0.5"
        />
      )}
    </For>
  )
}

function AreaChart() {
  const points = () => spendPoints()
  const line = () => points().join(' ')
  const area = () => `M0,${H} L${points().join(' L')} L${W},${H} Z`

  return (
    <div class="mt-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        class="h-56 w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="chart-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stop-color="var(--v2-background-bg-accent)"
              stop-opacity="0.3"
            />
            <stop
              offset="100%"
              stop-color="var(--v2-background-bg-accent)"
              stop-opacity="0"
            />
          </linearGradient>
        </defs>
        <Grid />
        <path d={area()} fill="url(#chart-area-fill)" />
        <polyline
          points={line()}
          fill="none"
          stroke="var(--v2-background-bg-accent)"
          stroke-width="1.5"
          stroke-linejoin="round"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <TimeAxis />
    </div>
  )
}

function LineChart() {
  return (
    <div class="mt-5">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        class="h-56 w-full"
        aria-hidden="true"
      >
        <Grid />
        <polyline
          points={spendPoints().join(' ')}
          fill="none"
          stroke="var(--v2-background-bg-accent)"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
          vector-effect="non-scaling-stroke"
        />
      </svg>
      <TimeAxis />
    </div>
  )
}

function BarChart() {
  return (
    <div class="mt-5">
      <div class="flex h-56 items-end gap-[3px]">
        <For each={spendSeries}>
          {(value) => (
            <div
              class="min-w-px flex-1 rounded-t-[2px] bg-[var(--v2-background-bg-accent)]"
              style={{ height: `${Math.max((value / maxSpend) * 100, 2)}%` }}
            />
          )}
        </For>
      </div>
      <TimeAxis />
    </div>
  )
}

const pieRadius = 80
const pieCircumference = 2 * Math.PI * pieRadius
let pieStart = 0
const pieSegments = modelSeries.map((model) => {
  const length = (model.share / 100) * pieCircumference
  const segment = { ...model, length, offset: pieStart }
  pieStart += length
  return segment
})

function PieChart() {
  return (
    <div class="mt-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <svg
        viewBox="0 0 220 220"
        class="h-56 w-56 shrink-0"
        role="img"
        aria-label="Requests by model"
      >
        <circle
          cx="110"
          cy="110"
          r={pieRadius}
          fill="none"
          stroke="var(--v2-background-bg-layer-03)"
          stroke-width="24"
        />
        <For each={pieSegments}>
          {(segment) => (
            <circle
              cx="110"
              cy="110"
              r={pieRadius}
              fill="none"
              stroke={segment.color}
              stroke-width="24"
              stroke-dasharray={`${segment.length} ${pieCircumference}`}
              stroke-dashoffset={-segment.offset}
              transform="rotate(-90 110 110)"
            />
          )}
        </For>
        <text
          x="110"
          y="108"
          text-anchor="middle"
          fill="var(--v2-text-text-base)"
          font-size="18"
          font-weight="530"
        >
          18,204
        </text>
        <text
          x="110"
          y="126"
          text-anchor="middle"
          fill="var(--v2-text-text-faint)"
          font-size="10"
        >
          requests
        </text>
      </svg>

      <ul class="grid w-full max-w-xs gap-2">
        <For each={modelSeries}>
          {(model) => (
            <li class="flex items-center gap-2 text-[12px]">
              <span
                class="size-2 shrink-0 rounded-[2px]"
                style={{ background: model.color }}
              />
              <span class="flex-1 truncate">{model.name}</span>
              <span class="text-muted tabular-nums">{model.share}%</span>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

const radarAxes = ['Requests', 'Tokens', 'Spend', 'Latency', 'Providers']
const radarSeries = [
  {
    name: 'DeepSeek V4.1 Flash',
    values: [100, 92, 84, 58, 30],
    color: 'var(--v2-background-bg-accent)',
  },
  {
    name: 'GPT-6 Luna',
    values: [34, 48, 40, 22, 12],
    color: 'var(--v2-purple-500)',
  },
]
const radarCx = 130
const radarCy = 118
const radarRadius = 82

function radarPoint(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / radarAxes.length - Math.PI / 2
  const radius = (value / 100) * radarRadius
  return `${(radarCx + Math.cos(angle) * radius).toFixed(1)},${(
    radarCy +
    Math.sin(angle) * radius
  ).toFixed(1)}`
}

function radarRing(level: number) {
  return radarAxes
    .map((_, index) => radarPoint(index, level))
    .join(' ')
}

const radarAxisGeometry = radarAxes.map((axis, index) => {
  const angle = (Math.PI * 2 * index) / radarAxes.length - Math.PI / 2
  return {
    axis,
    x1: radarCx,
    y1: radarCy,
    x2: radarCx + Math.cos(angle) * radarRadius,
    y2: radarCy + Math.sin(angle) * radarRadius,
    labelX: radarCx + Math.cos(angle) * (radarRadius + 18),
    labelY: radarCy + Math.sin(angle) * (radarRadius + 18),
  }
})

const radarDotSeries = radarSeries.map((series) => ({
  ...series,
  dots: series.values.map((value, index) => {
    const [x, y] = radarPoint(index, value).split(',')
    return { x, y }
  }),
}))

const radialSegments = modelSeries.map((model, index) => {
  const radius = 34 + index * 20
  const circumference = 2 * Math.PI * radius
  return {
    ...model,
    radius,
    circumference,
    length: (model.share / 100) * circumference,
  }
})

function RadarChart() {
  return (
    <div class="mt-5 flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 260 240"
        class="h-60 w-full max-w-[320px]"
        role="img"
        aria-label="Model profile"
      >
        <For each={[25, 50, 75, 100]}>
          {(level) => (
            <polygon
              points={radarRing(level)}
              fill="none"
              stroke="var(--v2-border-border-muted)"
              stroke-width="0.75"
            />
          )}
        </For>

        <For each={radarAxisGeometry}>
          {(axis) => (
            <line
              x1={axis.x1}
              y1={axis.y1}
              x2={axis.x2}
              y2={axis.y2}
              stroke="var(--v2-border-border-muted)"
              stroke-width="0.75"
            />
          )}
        </For>

        <For each={radarDotSeries}>
          {(series) => (
            <>
              <polygon
                points={series.values
                  .map((value, index) => radarPoint(index, value))
                  .join(' ')}
                fill={series.color}
                fill-opacity="0.18"
                stroke={series.color}
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <For each={series.dots}>
                {(dot) => (
                  <circle cx={dot.x} cy={dot.y} r="2.5" fill={series.color} />
                )}
              </For>
            </>
          )}
        </For>

        <For each={radarAxisGeometry}>
          {(axis) => (
            <text
              x={axis.labelX}
              y={axis.labelY}
              text-anchor="middle"
              dominant-baseline="middle"
              fill="var(--v2-text-text-faint)"
              font-size="9"
            >
              {axis.axis}
            </text>
          )}
        </For>
      </svg>

      <ul class="flex flex-wrap items-center justify-center gap-4">
        <For each={radarSeries}>
          {(series) => (
            <li class="flex items-center gap-2 text-[12px]">
              <span
                class="size-2 rounded-full"
                style={{ background: series.color }}
              />
              {series.name}
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

function RadialChart() {
  return (
    <div class="mt-5 flex flex-col items-center justify-center gap-6 sm:flex-row">
      <svg
        viewBox="0 0 220 220"
        class="h-56 w-56 shrink-0"
        role="img"
        aria-label="Spend by model"
      >
        <For each={radialSegments}>
          {(segment) => (
            <>
              <circle
                cx="110"
                cy="110"
                r={segment.radius}
                fill="none"
                stroke="var(--v2-background-bg-layer-03)"
                stroke-width="10"
              />
              <circle
                cx="110"
                cy="110"
                r={segment.radius}
                fill="none"
                stroke={segment.color}
                stroke-width="10"
                stroke-linecap="round"
                stroke-dasharray={`${segment.length} ${segment.circumference}`}
                transform="rotate(-90 110 110)"
              />
            </>
          )}
        </For>
      </svg>

      <ul class="grid w-full max-w-xs gap-2">
        <For each={modelSeries}>
          {(model) => (
            <li class="flex items-center gap-2 text-[12px]">
              <span
                class="size-2 shrink-0 rounded-[2px]"
                style={{ background: model.color }}
              />
              <span class="flex-1 truncate">{model.name}</span>
              <span class="text-muted tabular-nums">{model.share}%</span>
            </li>
          )}
        </For>
      </ul>
    </div>
  )
}

export type ChartKind = 'area' | 'bar' | 'line' | 'pie' | 'radar' | 'radial'

export function ChartVisual(props: { kind: ChartKind }) {
  switch (props.kind) {
    case 'area':
      return <AreaChart />
    case 'bar':
      return <BarChart />
    case 'line':
      return <LineChart />
    case 'pie':
      return <PieChart />
    case 'radar':
      return <RadarChart />
    case 'radial':
      return <RadialChart />
  }
}
