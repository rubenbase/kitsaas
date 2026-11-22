import { createRouter, defineRoutes } from '@solidjs/router'

import { ChartsIndex, ChartsLayout } from '#/routes/charts'
import {
  AreaChartsPage,
  BarChartsPage,
  LineChartsPage,
  PieChartsPage,
  RadarChartsPage,
  RadialChartsPage,
} from '#/routes/charts/chart-page'
import {
  componentChildRoutes,
  ComponentNotFound,
  ComponentsIndex,
  ComponentsLayout,
} from '#/routes/components'
import { NotFoundPage } from '#/routes/not-found'
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
  { path: '*404', component: NotFoundPage },
])

export const Router = createRouter({ routes })
