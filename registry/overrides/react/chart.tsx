import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import {
  crosshair,
  type ChartPoint,
  type ChartTheme,
  type ChartValue,
  type DomChartDefinition,
} from '@tanstack/charts'
import { Chart as TsChart } from '@tanstack/charts/react'

import './chart.css'

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

export function opencodeCrosshair() {
  return crosshair({
    x: {
      stroke: 'var(--v2-border-border-strong)',
      strokeWidth: 1,
      strokeDasharray: '2 3',
      strokeOpacity: 0.75,
    },
    y: false,
    marker: {
      radius: 4,
      fill: 'var(--v2-background-bg-base)',
      strokeWidth: 2,
    },
  })
}

export type ChartProps<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
> = {
  definition: DomChartDefinition<TDatum, TXValue, TYValue>
  width?: number
  height?: number
  aspectRatio?: number
  ariaLabel?: string
  theme?: Partial<ChartTheme>
  onFocusChange?: (point: ChartPoint<TDatum, TXValue, TYValue> | null) => void
  onSelect?: (point: ChartPoint<TDatum, TXValue, TYValue> | null) => void
  className?: string
  style?: CSSProperties
}

export function Chart<
  TDatum = unknown,
  TXValue extends ChartValue = ChartValue,
  TYValue extends ChartValue = ChartValue,
>({
  definition,
  width,
  height = 240,
  aspectRatio,
  ariaLabel = 'Chart',
  theme,
  onFocusChange,
  onSelect,
  className,
  style,
}: ChartProps<TDatum, TXValue, TYValue>) {
  const themedDefinition = useMemo(() => {
    const existing = (definition as { theme?: Partial<ChartTheme> }).theme
    return {
      ...definition,
      theme: {
        ...kitsaasChartTheme,
        ...existing,
        ...theme,
      },
    }
  }, [definition, theme])

  return (
    <div data-slot="chart" className={className} style={style}>
      <TsChart
        definition={themedDefinition}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        ariaLabel={ariaLabel}
        onFocusChange={onFocusChange}
        onSelect={onSelect}
      />
    </div>
  )
}

export type ChartLegendItem = {
  label: string
  color: string
}

export function ChartLegend({
  items,
  className,
}: {
  items: readonly ChartLegendItem[]
  className?: string
}) {
  return (
    <div data-slot="chart-legend" className={className}>
      {items.map((item) => (
        <span key={item.label} data-slot="chart-legend-item">
          <span
            data-slot="chart-legend-swatch"
            style={{ backgroundColor: item.color }}
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </span>
      ))}
    </div>
  )
}

export function ChartAxisStrip({
  labels,
  className,
}: {
  labels: readonly string[]
  className?: string
}) {
  return (
    <div data-slot="chart-axis-strip" className={className}>
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}

export type ChartSparkbarDatum = {
  label: string
  value: number
  formatted?: string
  tone?: 'default' | 'accent' | 'muted'
}

export function ChartSparkbar({
  data,
  ariaLabel = 'Activity sparkbar',
  onHover,
  className,
}: {
  data: readonly ChartSparkbarDatum[]
  ariaLabel?: string
  onHover?: (datum: ChartSparkbarDatum | null, index: number | null) => void
  className?: string
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const max = useMemo(
    () => Math.max(1, ...data.map((d) => Math.max(0, d.value))),
    [data],
  )

  const setHovered = (index: number | null) => {
    setActiveIndex(index)
    onHover?.(index === null ? null : (data[index] ?? null), index)
  }

  return (
    <div
      data-slot="chart-sparkbar"
      role="group"
      aria-label={ariaLabel}
      className={className}
      onMouseLeave={() => setHovered(null)}
    >
      {data.map((item, idx) => {
        const pct = Math.max(6, Math.round((item.value / max) * 100))
        return (
          <button
            key={`${item.label}-${idx}`}
            type="button"
            data-slot="chart-sparkbar-item"
            data-tone={item.tone ?? 'default'}
            data-active={activeIndex === idx ? 'true' : undefined}
            aria-label={`${item.label}: ${item.formatted ?? item.value}`}
            title={`${item.label}: ${item.formatted ?? item.value}`}
            onMouseEnter={() => setHovered(idx)}
            onFocus={() => setHovered(idx)}
            onBlur={() => setHovered(null)}
          >
            <span
              data-slot="chart-sparkbar-fill"
              style={{ height: `${pct}%` }}
            />
          </button>
        )
      })}
    </div>
  )
}
