import {
  crosshair,
  type ChartTheme,
  type DomChartDefinition,
} from '@tanstack/charts'
export { Chart } from '@tanstack/charts/svelte'

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

export function withKitsaasTheme<T extends DomChartDefinition<any, any, any>>(
  definition: T,
  overrides?: Partial<ChartTheme>,
): T {
  const existing = (definition as { theme?: Partial<ChartTheme> }).theme
  return {
    ...definition,
    theme: {
      ...kitsaasChartTheme,
      ...existing,
      ...overrides,
    },
  }
}
