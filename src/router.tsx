import { createRouter, defineRoutes } from '@solidjs/router'

import { ChartsIndex, ChartsLayout } from '#/routes/charts'
import {
  AreaChartsPage,
  BarChartsPage,
  FunnelChartsPage,
  GaugeChartsPage,
  HeatmapChartsPage,
  LineChartsPage,
  PieChartsPage,
  RadarChartsPage,
  RadialChartsPage,
  SankeyChartsPage,
  ScatterChartsPage,
} from '#/routes/charts/chart-page'
import {
  componentChildRoutes,
  ComponentNotFound,
  ComponentsIndex,
  ComponentsLayout,
} from '#/routes/components'
import { showDevOnly } from '#/env'
import { BlocksPage } from '#/routes/blocks'
import { NotFoundPage } from '#/routes/not-found'
import { PagesPage } from '#/routes/pages'
import { UsagePage } from '#/routes/usage'

const routes = defineRoutes([
  { path: '/', component: UsagePage },
  {
    path: '/charts',
    component: ChartsLayout,
    children: [
      { path: '/', component: ChartsIndex },
      { path: '/area', component: AreaChartsPage },
      { path: '/bar', component: BarChartsPage },
      { path: '/line', component: LineChartsPage },
      { path: '/pie', component: PieChartsPage },
      { path: '/radar', component: RadarChartsPage },
      { path: '/radial', component: RadialChartsPage },
      { path: '/scatter', component: ScatterChartsPage },
      { path: '/heatmap', component: HeatmapChartsPage },
      { path: '/funnel', component: FunnelChartsPage },
      { path: '/sankey', component: SankeyChartsPage },
      { path: '/gauge', component: GaugeChartsPage },
    ],
  },
  {
    path: '/components',
    component: ComponentsLayout,
    children: [
      { path: '/', component: ComponentsIndex },
      ...componentChildRoutes,
      { path: '*404', component: ComponentNotFound },
    ],
  },
  // Development-only sections; production builds leave them out (see env.ts).
  ...(showDevOnly
    ? [
        { path: '/pages', component: PagesPage },
        { path: '/blocks', component: BlocksPage },
      ]
    : []),
  { path: '*404', component: NotFoundPage },
])

export const Router = createRouter({ routes })
