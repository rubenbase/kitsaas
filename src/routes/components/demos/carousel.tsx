import { createSignal, For } from 'solid-js'

import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselViewport,
} from '#/components/ui/carousel'

import { Group } from '../demo-group'

const releaseSlides = [
  {
    version: 'v2.4',
    title: 'Zero-downtime edge deploys',
    description:
      'Atomic rollouts across 38 regions with instant traffic shifting and automatic rollback.',
    metric: '140ms p95',
    tag: 'Infrastructure',
  },
  {
    version: 'v2.3',
    title: 'Distributed trace waterfall',
    description:
      'Inspect nested RPC spans, SQL queries, and cache misses on a shared millisecond axis.',
    metric: '10k spans',
    tag: 'Observability',
  },
  {
    version: 'v2.2',
    title: 'Fine-grained role policies',
    description:
      'Scope API keys per environment, project, and endpoint with real-time audit trails.',
    metric: 'SOC 2',
    tag: 'Security',
  },
  {
    version: 'v2.1',
    title: 'Native scroll-snap primitives',
    description:
      'Trackpad, touch, and keyboard navigation out of the box with zero layout thrash.',
    metric: '60 fps',
    tag: 'Design System',
  },
]

const regionCards = [
  { code: 'iad1', city: 'Ashburn, US', latency: '11 ms', status: 'Healthy' },
  { code: 'sfo1', city: 'San Francisco, US', latency: '18 ms', status: 'Healthy' },
  { code: 'fra1', city: 'Frankfurt, DE', latency: '24 ms', status: 'Healthy' },
  { code: 'lhr1', city: 'London, UK', latency: '21 ms', status: 'Healthy' },
  { code: 'hnd1', city: 'Tokyo, JP', latency: '39 ms', status: 'Healthy' },
  { code: 'sin1', city: 'Singapore, SG', latency: '44 ms', status: 'Healthy' },
  { code: 'gru1', city: 'São Paulo, BR', latency: '52 ms', status: 'Healthy' },
  { code: 'syd1', city: 'Sydney, AU', latency: '58 ms', status: 'Healthy' },
]

export function CarouselDemo() {
  const [page, setPage] = createSignal(1)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single slide with indicators">
        <div class="w-full">
          <Carousel
            aria-label="Release highlights"
            page={page()}
            onPageChange={setPage}
          >
            <CarouselViewport>
              <CarouselContent>
                <For each={releaseSlides}>
                  {(slide, index) => (
                    <CarouselItem>
                      <div class="flex min-h-[156px] flex-col justify-between rounded-lg border border-border bg-surface p-4">
                        <div class="flex items-center justify-between gap-2">
                          <span class="rounded bg-surface-2 px-1.5 py-0.5 text-[11px] font-medium text-secondary">
                            {slide.tag}
                          </span>
                          <span class="font-mono text-[11px] tabular-nums text-faint">
                            {slide.version} · {index() + 1}/{releaseSlides.length}
                          </span>
                        </div>
                        <div class="mt-3">
                          <h3 class="text-[14px] font-medium text-foreground">
                            {slide.title}
                          </h3>
                          <p class="mt-1 text-[13px] leading-[18px] text-secondary">
                            {slide.description}
                          </p>
                        </div>
                        <div class="mt-3 flex items-center justify-between border-t border-border-muted pt-2.5 text-[11px] text-faint">
                          <span>Production ready</span>
                          <span class="font-mono tabular-nums text-foreground">
                            {slide.metric}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  )}
                </For>
              </CarouselContent>
            </CarouselViewport>

            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-1.5">
                <CarouselPrevious aria-label="Previous highlight" />
                <CarouselNext aria-label="Next highlight" />
              </div>

              <CarouselIndicatorGroup aria-label="Choose a highlight">
                <For each={releaseSlides}>
                  {(slide, index) => (
                    <CarouselIndicator
                      page={index() + 1}
                      aria-label={slide.title}
                    />
                  )}
                </For>
              </CarouselIndicatorGroup>
            </div>
          </Carousel>
        </div>
      </Group>

      <Group label="Looping with scroll progress">
        <div class="w-full">
          <Carousel aria-label="Looping highlights" loop>
            <CarouselViewport>
              <CarouselContent>
                <For each={releaseSlides}>
                  {(slide) => (
                    <CarouselItem>
                      <div class="flex min-h-[156px] flex-col justify-between rounded-lg border border-border bg-background p-4 shadow-raised">
                        <div class="flex items-center justify-between">
                          <span class="text-[11px] font-medium uppercase tracking-[0.06em] text-faint">
                            {slide.tag}
                          </span>
                          <span class="font-mono text-[11px] tabular-nums text-accent">
                            {slide.metric}
                          </span>
                        </div>
                        <div>
                          <h3 class="text-[14px] font-medium text-foreground">
                            {slide.title}
                          </h3>
                          <p class="mt-1 text-[13px] leading-[18px] text-secondary">
                            {slide.description}
                          </p>
                        </div>
                        <div class="text-[11px] text-faint">
                          Swipe, drag, or wrap past the last slide
                        </div>
                      </div>
                    </CarouselItem>
                  )}
                </For>
              </CarouselContent>
            </CarouselViewport>

            <div class="flex items-center gap-3">
              <div class="flex items-center gap-1.5">
                <CarouselPrevious aria-label="Previous slide" />
                <CarouselNext aria-label="Next slide" />
              </div>
              <div data-slot="carousel-progress" aria-hidden="true">
                <div data-slot="carousel-progress-bar" />
              </div>
            </div>
          </Carousel>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Multi-slide paged carousel">
          <div class="w-full">
            <Carousel
              aria-label="Edge regions"
              slidesPerPage={3}
              style={{ '--carousel-slides': '3', '--carousel-gap': '12px' }}
            >
              <div class="flex items-center justify-between gap-3">
                <span class="text-[12px] text-secondary">
                  8 active edge regions · pages 3 slides at a time
                </span>
                <div class="flex items-center gap-1.5">
                  <CarouselPrevious aria-label="Previous page" />
                  <CarouselNext aria-label="Next page" />
                </div>
              </div>

              <CarouselViewport>
                <CarouselContent>
                  <For each={regionCards}>
                    {(region) => (
                      <CarouselItem>
                        <div class="flex flex-col gap-2 rounded-lg border border-border bg-surface p-3.5">
                          <div class="flex items-center justify-between">
                            <span class="font-mono text-[12px] font-medium text-foreground">
                              {region.code}
                            </span>
                            <span class="inline-flex items-center gap-1.5 text-[11px] text-success">
                              <span class="size-1.5 rounded-full bg-current" />
                              {region.status}
                            </span>
                          </div>
                          <span class="text-[13px] text-secondary">
                            {region.city}
                          </span>
                          <span class="font-mono text-[11px] tabular-nums text-faint">
                            Avg latency {region.latency}
                          </span>
                        </div>
                      </CarouselItem>
                    )}
                  </For>
                </CarouselContent>
              </CarouselViewport>

              <div class="flex justify-center">
                <CarouselIndicatorGroup aria-label="Choose a region page">
                  {(state) => (
                    <For
                      each={Array.from(
                        { length: state.pageCount ?? 3 },
                        (_, idx) => idx + 1,
                      )}
                    >
                      {(p) => (
                        <CarouselIndicator page={p} aria-label={`Page ${p}`} />
                      )}
                    </For>
                  )}
                </CarouselIndicatorGroup>
              </div>
            </Carousel>
          </div>
        </Group>
      </div>
    </div>
  )
}
