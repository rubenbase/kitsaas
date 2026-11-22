import type { JSX } from '@solidjs/web'
import {
  crosshair,
  type ChartLinearGradient,
  type ChartPoint,
  type ChartTheme,
  type ChartTooltipOptions,
  type ChartValue,
  type DomChartDefinition,
  type RenderChartSvgOptions,
} from '@tanstack/charts'
import { createChartRendererAdapter } from '@tanstack/charts/adapter/renderer'
import { renderChartSvg } from '@tanstack/charts/svg'
import { createSvgChartRenderer } from '@tanstack/charts/svg/renderer'
import { tooltip } from '@tanstack/charts/tooltip'
import {
  For,
  createEffect,
  createMemo,
  createSignal,
  createUniqueId,
  onCleanup,
  onSettled,
} from 'solid-js'

import './chart.css'

/**
 * Opencode-inspired Kitsaas theme for `@tanstack/charts`.
 * Resolves live CSS custom properties (`--v2-*` and `--chart-*`) so light and
 * dark color schemes switch automatically without re-rendering chart logic.
 */
export const kitsaasChartTheme: ChartTheme = {
  foreground: 'var(--v2-text-text-base)',
  muted: 'var(--v2-text-text-faint)',
  grid: 'var(--v2-border-border-muted)',
  background: 'var(--v2-background-bg-base)',
  palette: [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ],
  focusRing: {
    radius: 4.5,
    fill: 'var(--v2-background-bg-base)',
    strokeWidth: 2,
  },
}

/**
 * Pre-configured opencode vertical hairline crosshair.
 * Point markers are handled by `kitsaasChartTheme.focusRing` so each series
 * keeps its own glowing stroke color without a duplicate dark dot on top.
 */
export function opencodeCrosshair() {
  return crosshair({
    x: {
      stroke: 'var(--v2-border-border-strong)',
      strokeWidth: 1,
      strokeOpacity: 0.55,
    },
    y: false,
    marker: false,
  })
}

/**
 * Stable opencode tooltip preset: locked vertically to `plot-top` so it never
 * jumps up/down while hovering, smoothly gliding left/right of the crosshair.
 */
export function opencodeTooltip<
  TDatum = any,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(options?: ChartTooltipOptions<TDatum, TXValue, TYValue>) {
  return {
    use: tooltip,
    anchor: { x: 'point' as const, y: 'plot-top' as const },
    placement: ['left', 'right'] as const,
    offset: 14,
    ...options,
  }
}

/**
 * Soft opencode vertical fade-to-transparent linear gradient for area fills.
 */
export function opencodeAreaGradient(
  id: string,
  color: string,
  topOpacity = 0.22,
): ChartLinearGradient {
  return {
    id,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 1,
    stops: [
      { offset: 0, color, opacity: topOpacity },
      { offset: 0.72, color, opacity: topOpacity * 0.25 },
      { offset: 1, color, opacity: 0 },
    ],
  }
}

export type ChartProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = {
  /** TanStack Charts definition created via `defineChart(...)`. */
  definition: DomChartDefinition<TDatum, TXValue, TYValue>
  /** Fixed pixel width; omit for responsive 100% container width. */
  width?: number
  /** Pixel height (defaults to 240 when neither `height` nor `aspectRatio` is set). */
  height?: number
  /** Optional width/height ratio when `height` is omitted. */
  aspectRatio?: number
  /** Accessible label announced for the chart region. */
  ariaLabel?: string
  /** Optional custom theme (defaults to `kitsaasChartTheme`). */
  theme?: Partial<ChartTheme>
  /** Optional custom SVG renderer override. */
  renderSvg?: (scene: any, options?: RenderChartSvgOptions) => string
  /** Called when pointer/keyboard focus moves to a datum. */
  onFocusChange?: (point: ChartPoint<TDatum, TXValue, TYValue> | null) => void
  /** Called when a datum is selected (click / Enter). */
  onSelect?: (point: ChartPoint<TDatum, TXValue, TYValue> | null) => void
  class?: string
  style?: JSX.CSSProperties
}

/**
 * Kitsaas Chart — Solid 2 wrapper over `@tanstack/charts` using its
 * framework-agnostic `createChartRendererAdapter` + SVG renderer, styled with
 * opencode's matte dark/light tokens, dashed crosshairs, and popover tooltips.
 */
export function Chart<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>(props: ChartProps<TDatum, TXValue, TYValue>) {
  const uid = `ks-chart-${createUniqueId().replaceAll(/[^a-zA-Z0-9_-]/g, '')}`
  let surfaceRef!: HTMLDivElement

  const renderer = createMemo(() =>
    createSvgChartRenderer<TDatum, TXValue, TYValue>(
      props.renderSvg ?? renderChartSvg,
    ),
  )

  const themedDefinition = createMemo<DomChartDefinition<TDatum, TXValue, TYValue>>(
    () => {
      const existing = (
        props.definition as { theme?: Partial<ChartTheme> }
      ).theme
      return {
        ...props.definition,
        theme: {
          ...kitsaasChartTheme,
          ...existing,
          ...props.theme,
        },
      }
    },
  )

  const hostOptions = () => ({
    definition: themedDefinition(),
    width: props.width,
    height: props.height,
    aspectRatio: props.aspectRatio,
    ariaLabel: props.ariaLabel ?? 'Chart',
    idPrefix: uid,
    renderer: renderer(),
    onFocusChange: props.onFocusChange,
    onSelect: props.onSelect,
  })

  const adapter = createChartRendererAdapter(hostOptions())
  const initialMarkup = adapter.prerender()

  onSettled(() => {
    if (surfaceRef) {
      adapter.mount(surfaceRef)
    }
  })

  createEffect(
    () => hostOptions(),
    (opts) => {
      adapter.update(opts)
    },
  )

  onCleanup(() => {
    adapter.destroy()
  })

  const validAspect = () =>
    typeof props.aspectRatio === 'number' &&
    Number.isFinite(props.aspectRatio) &&
    props.aspectRatio > 0
      ? props.aspectRatio
      : undefined

  const hostStyle = createMemo<JSX.CSSProperties>(() => ({
    width: props.width === undefined ? '100%' : `${props.width}px`,
    height:
      props.height === undefined
        ? validAspect() === undefined
          ? '240px'
          : undefined
        : `${props.height}px`,
    'aspect-ratio':
      props.height === undefined ? validAspect()?.toString() : undefined,
    ...props.style,
  }))

  return (
    <div
      data-slot="chart"
      class={['ts-chart-host', props.class].filter(Boolean).join(' ')}
      style={hostStyle()}
    >
      <div
        ref={surfaceRef}
        class="ts-chart-surface"
        innerHTML={initialMarkup}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Opencode Console Companion Primitives                                      */
/* -------------------------------------------------------------------------- */

export type ChartLegendItem = {
  label: string
  color: string
}

export type ChartLegendProps = {
  items: readonly ChartLegendItem[]
  class?: string
}

/**
 * Minimalist opencode console hairline legend (`| Usage   | Forecast`).
 */
export function ChartLegend(props: ChartLegendProps) {
  return (
    <div data-slot="chart-legend" class={props.class}>
      <For each={props.items}>
        {(item) => (
          <span data-slot="chart-legend-item">
            <span
              data-slot="chart-legend-swatch"
              style={{ 'background-color': item.color }}
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </span>
        )}
      </For>
    </div>
  )
}

export type ChartAxisStripProps = {
  labels: readonly string[]
  class?: string
}

/**
 * Opencode console rounded pill X-axis strip (`NOV 1  NOV 10  NOV 20  NOV 30`).
 */
export function ChartAxisStrip(props: ChartAxisStripProps) {
  return (
    <div data-slot="chart-axis-strip" class={props.class}>
      <For each={props.labels}>{(label) => <span>{label}</span>}</For>
    </div>
  )
}

export type ChartSparkbarDatum = {
  label: string
  value: number
  formatted?: string
  tone?: 'default' | 'accent' | 'muted'
}

export type ChartSparkbarProps = {
  data: readonly ChartSparkbarDatum[]
  ariaLabel?: string
  onHover?: (datum: ChartSparkbarDatum | null, index: number | null) => void
  class?: string
}

/**
 * Opencode console vertical pill-track sparkbar (e.g. `Logs` / `My usage`),
 * with hover & focus feedback and accessible per-bar labels.
 */
export function ChartSparkbar(props: ChartSparkbarProps) {
  const [activeIndex, setActiveIndex] = createSignal<number | null>(null)
  const max = createMemo(() =>
    Math.max(1, ...props.data.map((d) => Math.max(0, d.value))),
  )

  const setHovered = (index: number | null) => {
    setActiveIndex(index)
    props.onHover?.(index === null ? null : (props.data[index] ?? null), index)
  }

  return (
    <div
      data-slot="chart-sparkbar"
      role="group"
      aria-label={props.ariaLabel ?? 'Activity sparkbar'}
      class={props.class}
      onMouseLeave={() => setHovered(null)}
    >
      <For each={props.data}>
        {(item, idx) => {
          const pct = () => Math.max(6, Math.round((item.value / max()) * 100))
          return (
            <button
              type="button"
              data-slot="chart-sparkbar-item"
              data-tone={item.tone ?? 'default'}
              data-active={activeIndex() === idx() ? 'true' : undefined}
              aria-label={`${item.label}: ${item.formatted ?? item.value}`}
              title={`${item.label}: ${item.formatted ?? item.value}`}
              onMouseEnter={() => setHovered(idx())}
              onFocus={() => setHovered(idx())}
              onBlur={() => setHovered(null)}
            >
              <span
                data-slot="chart-sparkbar-fill"
                style={{ height: `${pct()}%` }}
              />
            </button>
          )
        }}
      </For>
    </div>
  )
}
