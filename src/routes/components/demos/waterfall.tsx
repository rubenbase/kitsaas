import { createMemo, createSignal, For, Show } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createWaterfallController,
  visibleWaterfallRows,
  Waterfall,
  WaterfallAxis,
  WaterfallBar,
  WaterfallCell,
  WaterfallColumnHeader,
  WaterfallHeaderRow,
  WaterfallIndicator,
  WaterfallMark,
  WaterfallRow,
  WaterfallRowHeader,
  type WaterfallBarTone,
  type WaterfallData,
} from '#/components/ui/waterfall'

import { Group } from '../demo-group'

const checkoutTrace: WaterfallData = [
  {
    value: 'checkout',
    label: 'POST /api/checkout',
    start: 0,
    duration: 840,
    children: [
      { value: 'edge-auth', label: 'edge.verifyToken', start: 8, duration: 42 },
      {
        value: 'cart',
        label: 'cart.resolve',
        start: 56,
        duration: 248,
        children: [
          { value: 'redis', label: 'redis.get cart:92a', start: 64, duration: 18 },
          {
            value: 'pg-cart',
            label: 'pg.query line_items',
            start: 88,
            duration: 124,
          },
          {
            value: 'tax',
            label: 'tax.calculate',
            start: 218,
            duration: 82,
          },
        ],
      },
      {
        value: 'payment',
        label: 'payments.authorize',
        start: 312,
        duration: 468,
        children: [
          {
            value: 'fraud',
            label: 'risk.scoreTransaction',
            start: 320,
            duration: 95,
          },
          {
            value: 'stripe-1',
            label: 'stripe.charge (timeout)',
            start: 422,
            duration: 138,
          },
          {
            value: 'stripe-2',
            label: 'stripe.charge (retry #1)',
            start: 568,
            duration: 204,
          },
        ],
      },
      { value: 'webhook', label: 'queue.emit order.paid', start: 786, duration: 48 },
    ],
  },
]

type SpanMeta = {
  service: string
  status: 'OK' | 'Retry' | 'Error'
  tone: WaterfallBarTone
  detail: string
}

const spanMeta: Record<string, SpanMeta> = {
  checkout: {
    service: 'api-gateway',
    status: 'OK',
    tone: 'blue',
    detail: 'HTTP 200 · region=iad1 · trace_id=7f81c2b9',
  },
  'edge-auth': {
    service: 'auth',
    status: 'OK',
    tone: 'cyan',
    detail: 'JWT Ed25519 signature verified from edge JWKS cache',
  },
  cart: {
    service: 'cart-svc',
    status: 'OK',
    tone: 'purple',
    detail: '3 items · currency=USD · subtotal=$148.00',
  },
  redis: {
    service: 'redis',
    status: 'OK',
    tone: 'green',
    detail: 'MISS cart:92a (0.4ms network RTT)',
  },
  'pg-cart': {
    service: 'postgres',
    status: 'OK',
    tone: 'purple',
    detail: 'SELECT * FROM line_items WHERE cart_id = $1 (3 rows)',
  },
  tax: {
    service: 'tax-engine',
    status: 'OK',
    tone: 'cyan',
    detail: 'Jurisdiction US-CA · rate 8.625%',
  },
  payment: {
    service: 'payments',
    status: 'OK',
    tone: 'orange',
    detail: 'Authorized $160.76 after 1 automatic retry',
  },
  fraud: {
    service: 'risk',
    status: 'OK',
    tone: 'green',
    detail: 'Score 0.04 (allow) · ruleset v19',
  },
  'stripe-1': {
    service: 'stripe',
    status: 'Error',
    tone: 'danger',
    detail: 'Upstream 504 gateway timeout — scheduled exponential retry',
  },
  'stripe-2': {
    service: 'stripe',
    status: 'Retry',
    tone: 'orange',
    detail: 'HTTP 200 · idempotency_key=chk_92a_01 · ch_3Qx7L',
  },
  webhook: {
    service: 'events',
    status: 'OK',
    tone: 'green',
    detail: 'Published to topic billing.orders (partition 4)',
  },
}

const flatSpanIndex = new Map<
  string,
  { label: string; start: number; duration: number }
>()
function indexSpans(items: WaterfallData) {
  for (const item of items) {
    flatSpanIndex.set(item.value, {
      label: item.label,
      start: item.start,
      duration: item.duration,
    })
    if (item.children) {
      indexSpans(item.children)
    }
  }
}
indexSpans(checkoutTrace)

const fullRange: [number, number] = [0, 840]

function zoomRange([start, end]: [number, number], factor: number) {
  const center = (start + end) / 2
  const half = Math.min(Math.max(((end - start) * factor) / 2, 40), fullRange[1] / 2)
  const from = Math.min(Math.max(fullRange[0], center - half), fullRange[1] - half * 2)
  return [Math.round(from), Math.round(from + half * 2)] as [number, number]
}

const networkRequests: (WaterfallData[number] & {
  size: string
  tone: WaterfallBarTone
})[] = [
  { value: 'doc', label: '/dashboard', start: 0, duration: 142, size: '14 kB', tone: 'blue' },
  { value: 'css', label: 'theme.css', start: 148, duration: 76, size: '9.4 kB', tone: 'purple' },
  { value: 'js', label: 'entry.client.js', start: 152, duration: 294, size: '84 kB', tone: 'orange' },
  { value: 'font', label: 'inter-var.woff2', start: 224, duration: 168, size: '46 kB', tone: 'cyan' },
  { value: 'me', label: 'api/v1/session', start: 446, duration: 112, size: '1.2 kB', tone: 'green' },
  { value: 'metrics', label: 'api/v1/metrics', start: 452, duration: 218, size: '18 kB', tone: 'green' },
]

export function WaterfallDemo() {
  const controller = createWaterfallController()
  const [expanded, setExpanded] = createSignal<string[]>(['checkout', 'payment'])
  const [selected, setSelected] = createSignal<string | null>('stripe-1')
  const [range, setRange] = createSignal<[number, number]>(fullRange)

  const rows = createMemo(() => visibleWaterfallRows(checkoutTrace, expanded()))

  const selectedSpan = createMemo(() => {
    const id = selected()
    if (!id) return null
    const span = flatSpanIndex.get(id)
    const meta = spanMeta[id]
    if (!span || !meta) return null
    return { id, ...span, ...meta }
  })

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Distributed trace waterfall">
          <div class="flex w-full flex-col gap-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex flex-wrap items-center gap-1.5">
                <Button
                  size="small"
                  variant="neutral"
                  onClick={() => controller.expandAll()}
                >
                  Expand all
                </Button>
                <Button
                  size="small"
                  variant="neutral"
                  onClick={() => controller.collapseAll()}
                >
                  Collapse all
                </Button>
              </div>
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="font-mono text-[11px] tabular-nums text-faint">
                  {range()[0]}–{range()[1]} ms
                </span>
                <Button
                  size="small"
                  variant="neutral"
                  onClick={() => setRange(zoomRange(range(), 0.5))}
                >
                  Zoom in
                </Button>
                <Button
                  size="small"
                  variant="neutral"
                  onClick={() => setRange(zoomRange(range(), 2))}
                >
                  Zoom out
                </Button>
                <Button
                  size="small"
                  variant="ghost-muted"
                  onClick={() => setRange(fullRange)}
                >
                  Reset
                </Button>
              </div>
            </div>

            <Waterfall
              aria-label="Checkout request trace"
              items={checkoutTrace}
              controller={controller}
              range={range()}
              expanded={expanded()}
              onExpandedChange={setExpanded}
              value={selected()}
              onValueChange={setSelected}
              format={{
                style: 'unit',
                unit: 'millisecond',
                unitDisplay: 'narrow',
              }}
              style={{
                '--waterfall-columns':
                  'minmax(190px, 240px) 72px minmax(0, 1fr)',
              }}
            >
              <WaterfallHeaderRow>
                <WaterfallColumnHeader>Span</WaterfallColumnHeader>
                <WaterfallColumnHeader class="justify-end">
                  Duration
                </WaterfallColumnHeader>
                <WaterfallColumnHeader aria-label="Timeline">
                  <WaterfallAxis maxTicks={6} />
                </WaterfallColumnHeader>
              </WaterfallHeaderRow>

              <For each={rows()} keyed={(row) => row.item.value}>
                {(row) => {
                  const meta = () => spanMeta[row().item.value]
                  return (
                    <WaterfallRow value={row().item.value}>
                      <WaterfallRowHeader>
                        <Show when={row().item.children}>
                          <WaterfallIndicator />
                        </Show>
                        <span class="truncate">{row().item.label}</span>
                      </WaterfallRowHeader>
                      <WaterfallCell>{row().item.duration} ms</WaterfallCell>
                      <WaterfallBar tone={meta()?.tone ?? 'blue'} />
                    </WaterfallRow>
                  )
                }}
              </For>
            </Waterfall>

            <Show when={selectedSpan()}>
              {(span) => (
                <div class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3.5 py-2.5 text-[12px]">
                  <div class="flex min-w-0 flex-wrap items-center gap-2">
                    <span class="font-mono font-medium text-foreground">
                      {span().label}
                    </span>
                    <span class="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-secondary">
                      {span().service}
                    </span>
                    <span
                      class={
                        span().status === 'Error'
                          ? 'text-[11px] font-medium text-danger'
                          : span().status === 'Retry'
                            ? 'text-[11px] font-medium text-warning'
                            : 'text-[11px] font-medium text-success'
                      }
                    >
                      {span().status}
                    </span>
                    <span class="truncate text-secondary">
                      {span().detail}
                    </span>
                  </div>
                  <span class="font-mono text-[11px] tabular-nums text-faint">
                    +{span().start} ms · {span().duration} ms
                  </span>
                </div>
              )}
            </Show>
          </div>
        </Group>
      </div>

      <div class="lg:col-span-2">
        <Group label="Network requests with milestone mark">
          <div class="w-full">
            <Waterfall
              aria-label="Page load network requests"
              items={networkRequests}
              defaultValue="js"
              format={{
                style: 'unit',
                unit: 'millisecond',
                unitDisplay: 'narrow',
              }}
              style={{
                '--waterfall-columns':
                  'minmax(160px, 210px) 72px minmax(0, 1fr)',
              }}
            >
              <WaterfallHeaderRow>
                <WaterfallColumnHeader>Resource</WaterfallColumnHeader>
                <WaterfallColumnHeader class="justify-end">
                  Size
                </WaterfallColumnHeader>
                <WaterfallColumnHeader aria-label="Timeline">
                  <WaterfallAxis maxTicks={5} />
                  <WaterfallMark time={445}>DCL</WaterfallMark>
                </WaterfallColumnHeader>
              </WaterfallHeaderRow>

              <For each={networkRequests}>
                {(req) => (
                  <WaterfallRow value={req.value}>
                    <WaterfallRowHeader>
                      <span class="truncate font-mono text-[12px]">
                        {req.label}
                      </span>
                    </WaterfallRowHeader>
                    <WaterfallCell>{req.size}</WaterfallCell>
                    <WaterfallBar tone={req.tone} />
                  </WaterfallRow>
                )}
              </For>
            </Waterfall>
          </div>
        </Group>
      </div>
    </div>
  )
}
