import { For } from 'solid-js'

import { PageContent } from '#/components/app-shell'
import { ArrowUpRightIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'

import { ChartVisual, type ChartKind } from './chart-visuals'
import { days, modelSeries, stats } from './data'

const range = '30d'

const chartMeta: Record<
  ChartKind,
  { title: string; subtitle: (range: string) => string; total: string }
> = {
  area: {
    title: 'Spend over time',
    subtitle: (range) => `Daily spend, last ${range}`,
    total: '$4.82 total',
  },
  line: {
    title: 'Spend over time',
    subtitle: (range) => `Daily spend, last ${range}`,
    total: '$4.82 total',
  },
  bar: {
    title: 'Spend per day',
    subtitle: (range) => `Daily spend, last ${range}`,
    total: '$4.82 total',
  },
  pie: {
    title: 'Traffic share',
    subtitle: (range) => `Requests by model, last ${range}`,
    total: '18,204 requests',
  },
  radar: {
    title: 'Model profile',
    subtitle: (range) => `Relative strengths, last ${range}`,
    total: '18,204 requests',
  },
  radial: {
    title: 'Spend by model',
    subtitle: (range) => `Cost share, last ${range}`,
    total: '$4.82 total',
  },
}

export function ChartPage(props: { kind: ChartKind }) {
  const meta = () => chartMeta[props.kind]

  return (
    <PageContent class="pt-5">
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <For each={stats}>
          {(stat) => (
            <div class="rounded-[10px] border border-border bg-surface p-4">
              <p class="text-[11px] uppercase tracking-[0.08em] text-faint">
                {stat.label}
              </p>
              <p class="mt-1 text-[20px] leading-6 tracking-[-0.02em] tabular-nums [font-weight:530]">
                {stat.value}
              </p>
              <p class="mt-0.5 text-[11px] text-muted">{stat.hint}</p>
            </div>
          )}
        </For>
      </div>

      <div class="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section class="rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="[font-weight:530]">{meta().title}</h2>
              <p class="mt-0.5 text-[12px] text-muted">
                {meta().subtitle(range)}
              </p>
            </div>
            <span class="text-[12px] text-muted tabular-nums">
              {meta().total}
            </span>
          </div>

          <ChartVisual kind={props.kind} />
        </section>

        <section class="rounded-[10px] border border-border bg-surface p-5">
          <h2 class="[font-weight:530]">Requests by model</h2>
          <p class="mt-0.5 text-[12px] text-muted">
            Share of the {range} window
          </p>

          <ul class="mt-4 space-y-3">
            <For each={modelSeries}>
              {(model) => (
                <li>
                  <div class="flex items-center justify-between gap-3 text-[12px]">
                    <span class="truncate">{model.name}</span>
                    <span class="text-muted tabular-nums">
                      {model.requests.toLocaleString('en-US')}
                    </span>
                  </div>
                  <div class="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <div
                      class="h-full rounded-full"
                      style={{
                        width: `${model.share}%`,
                        background: model.color,
                      }}
                    />
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
      </div>

      <section class="mt-4 rounded-[10px] border border-border bg-surface">
        <div class="flex items-center justify-between border-b border-border-muted px-5 py-4">
          <div>
            <h2 class="[font-weight:530]">Daily breakdown</h2>
            <p class="mt-0.5 text-[12px] text-muted">Last 8 days</p>
          </div>
          <Button size="small" variant="ghost">
            View all
            <ArrowUpRightIcon />
          </Button>
        </div>

        <table class="w-full text-[12px]">
          <thead>
            <tr class="border-b border-border-muted text-left text-[11px] uppercase tracking-[0.06em] text-faint">
              <th class="px-5 py-2 [font-weight:inherit]">Date</th>
              <th class="px-5 py-2 text-right [font-weight:inherit]">
                Requests
              </th>
              <th class="px-5 py-2 text-right [font-weight:inherit]">Tokens</th>
              <th class="px-5 py-2 text-right [font-weight:inherit]">Cost</th>
            </tr>
          </thead>
          <tbody>
            <For each={days}>
              {(day) => (
                <tr class="border-b border-border-muted last:border-b-0">
                  <td class="px-5 py-2.5">{day.date}</td>
                  <td class="px-5 py-2.5 text-right tabular-nums">
                    {day.requests.toLocaleString('en-US')}
                  </td>
                  <td class="px-5 py-2.5 text-right text-muted tabular-nums">
                    {day.tokens}
                  </td>
                  <td class="px-5 py-2.5 text-right tabular-nums">
                    {day.cost}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </section>
    </PageContent>
  )
}

export function AreaChartsPage() {
  return <ChartPage kind="area" />
}

export function BarChartsPage() {
  return <ChartPage kind="bar" />
}

export function LineChartsPage() {
  return <ChartPage kind="line" />
}

export function PieChartsPage() {
  return <ChartPage kind="pie" />
}

export function RadarChartsPage() {
  return <ChartPage kind="radar" />
}

export function RadialChartsPage() {
  return <ChartPage kind="radial" />
}
