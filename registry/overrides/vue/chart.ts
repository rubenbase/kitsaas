import { computed, defineComponent, h, type PropType } from 'vue'
import {
  crosshair,
  type ChartTheme,
  type DomChartDefinition,
} from '@tanstack/charts'
import { Chart as TsChart } from '@tanstack/charts/vue'

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

export const Chart = defineComponent({
  name: 'KitsaasChart',
  props: {
    definition: {
      type: Object as PropType<DomChartDefinition<any, any, any>>,
      required: true,
    },
    width: { type: Number, default: undefined },
    height: { type: Number, default: 240 },
    aspectRatio: { type: Number, default: undefined },
    ariaLabel: { type: String, default: 'Chart' },
    theme: { type: Object as PropType<Partial<ChartTheme>>, default: undefined },
  },
  setup(props, { attrs }) {
    const themedDefinition = computed(() => {
      const existing = (props.definition as { theme?: Partial<ChartTheme> }).theme
      return {
        ...props.definition,
        theme: {
          ...kitsaasChartTheme,
          ...existing,
          ...props.theme,
        },
      }
    })

    return () =>
      h('div', { ...attrs, 'data-slot': 'chart' }, [
        h(TsChart, {
          definition: themedDefinition.value,
          width: props.width,
          height: props.height,
          aspectRatio: props.aspectRatio,
          ariaLabel: props.ariaLabel,
        }),
      ])
  },
})

export const ChartLegend = defineComponent({
  name: 'KitsaasChartLegend',
  props: {
    items: {
      type: Array as PropType<readonly { label: string; color: string }[]>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        'div',
        { ...attrs, 'data-slot': 'chart-legend' },
        props.items.map((item) =>
          h('span', { key: item.label, 'data-slot': 'chart-legend-item' }, [
            h('span', {
              'data-slot': 'chart-legend-swatch',
              style: { backgroundColor: item.color },
              'aria-hidden': 'true',
            }),
            h('span', item.label),
          ]),
        ),
      )
  },
})
