import {
  crosshair,
  mountChart,
  type ChartHost,
  type ChartTheme,
  type DomChartDefinition,
} from '@tanstack/charts'

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

export function mountKitsaasChart<
  TDefinition extends DomChartDefinition<any, any, any>,
>(
  container: HTMLElement,
  options: {
    definition: TDefinition
    width?: number
    height?: number
    ariaLabel?: string
    theme?: Partial<ChartTheme>
  },
): ChartHost<any, any, any> {
  container.setAttribute('data-slot', 'chart')
  const existing = (options.definition as { theme?: Partial<ChartTheme> }).theme
  return mountChart(container, {
    definition: {
      ...options.definition,
      theme: {
        ...kitsaasChartTheme,
        ...existing,
        ...options.theme,
      },
    },
    width: options.width,
    height: options.height ?? 240,
    ariaLabel: options.ariaLabel ?? 'Chart',
  })
}
