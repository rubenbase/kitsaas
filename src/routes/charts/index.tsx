import type { RouteSectionProps } from '@solidjs/router'
import { useNavigate } from '@solidjs/router'

import { PageLayout, type PageTab } from '#/components/app-shell'

/**
 * Page tabs, not in-page panels: each chart type has its own URL. opencode's
 * window chrome uses the same links (`aria-current="page"` + an underline
 * indicator), which is why the tab bar is the right primitive here rather
 * than ui-sdk's Tabs.
 */
const chartTabs: PageTab[] = [
  { label: 'Area Charts', href: '/charts/area' },
  { label: 'Bar Charts', href: '/charts/bar' },
  { label: 'Line Charts', href: '/charts/line' },
  { label: 'Pie Charts', href: '/charts/pie' },
  { label: 'Radar Charts', href: '/charts/radar' },
  { label: 'Radial Charts', href: '/charts/radial' },
  { label: 'Scatter Charts', href: '/charts/scatter' },
  { label: 'Heatmaps', href: '/charts/heatmap' },
  { label: 'Funnel Charts', href: '/charts/funnel' },
  { label: 'Sankey Diagrams', href: '/charts/sankey' },
  { label: 'Gauge Charts', href: '/charts/gauge' },
]

/** /charts is the default: Area Charts. */
export function ChartsIndex() {
  const navigate = useNavigate()
  navigate('/charts/area', { replace: true })
  return null
}

export function ChartsLayout(props: RouteSectionProps) {
  return <PageLayout tabs={chartTabs}>{props.children}</PageLayout>
}
