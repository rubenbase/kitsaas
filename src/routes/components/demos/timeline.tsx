import { For, Match, Switch } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createTimelineController,
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
  type TimelineStatus,
} from '#/components/ui/timeline'

import { Group } from '../demo-group'

const activityEvents = [
  {
    title: 'Deployed production release v2.4.1',
    dateTime: '2026-11-10T14:32',
    time: 'Today · 14:32 UTC',
    description: 'Promoted build #4812 across 38 edge regions in 19 seconds.',
  },
  {
    title: 'All CI checks passed',
    dateTime: '2026-11-10T14:19',
    time: 'Today · 14:19 UTC',
    description: '412 unit tests, typecheck, and bundle size budget verified.',
  },
  {
    title: 'Pull request #618 merged',
    dateTime: '2026-11-10T13:54',
    time: 'Today · 13:54 UTC',
    description: 'Ada merged "Add trace waterfall zoom controls" into main.',
  },
  {
    title: 'Security review approved',
    dateTime: '2026-11-09T17:05',
    time: 'Yesterday · 17:05 UTC',
    description: 'Signed off by Grace with zero findings.',
  },
]

const deploymentSteps: {
  value: string
  title: string
  dateTime: string
  time: string
  description: string
  status: TimelineStatus
}[] = [
  {
    value: 'build',
    title: 'Build container image',
    dateTime: '2026-11-10T14:10',
    time: '14:10 · 42s',
    description: 'Compiled Solid SSR bundle and static assets.',
    status: 'complete',
  },
  {
    value: 'migrate',
    title: 'Run schema migrations',
    dateTime: '2026-11-10T14:11',
    time: '14:11 · 4.2s',
    description: 'Applied 2 additive migrations to primary cluster.',
    status: 'complete',
  },
  {
    value: 'canary',
    title: 'Canary rollout (25% traffic)',
    dateTime: '2026-11-10T14:12',
    time: '14:12 · In progress',
    description: 'Monitoring error rate and p95 latency before full cutover.',
    status: 'current',
  },
  {
    value: 'promote',
    title: 'Promote to 100% traffic',
    dateTime: '2026-11-10T14:20',
    time: 'Pending canary',
    description: 'Automatic promotion once 5-minute health window clears.',
    status: 'upcoming',
  },
]

const roadmapMilestones: {
  title: string
  dateTime: string
  time: string
  status: TimelineStatus
}[] = [
  { title: 'Spec freeze', dateTime: '2026-01', time: 'Q1 2026', status: 'complete' },
  { title: 'Design tokens', dateTime: '2026-04', time: 'Q2 2026', status: 'complete' },
  { title: 'Public beta', dateTime: '2026-07', time: 'Q3 2026', status: 'current' },
  { title: 'GA launch', dateTime: '2026-10', time: 'Q4 2026', status: 'upcoming' },
]

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function PulseIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5" cy="5" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.3" />
      <path
        d="M8 5.25V8L9.75 9.25"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export function TimelineDemo() {
  const statusController = createTimelineController()

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Activity feed (arrow-key navigable)">
        <div class="w-full rounded-lg border border-border bg-surface p-4">
          <Timeline aria-label="Deployment activity">
            <For each={activityEvents}>
              {(event) => (
                <TimelineItem>
                  <TimelineMarker />
                  <TimelineConnector />
                  <TimelineTitle>{event.title}</TimelineTitle>
                  <TimelineTime datetime={event.dateTime}>
                    {event.time}
                  </TimelineTime>
                  <TimelineDescription>{event.description}</TimelineDescription>
                </TimelineItem>
              )}
            </For>
          </Timeline>
        </div>
      </Group>

      <Group label="Status pipeline with icon markers">
        <div class="flex w-full flex-col gap-3">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[12px] text-secondary">
              Tab enters on the current step automatically
            </span>
            <Button
              size="small"
              variant="neutral"
              onClick={() => statusController.focus('canary')}
            >
              Focus current
            </Button>
          </div>

          <div class="w-full rounded-lg border border-border bg-surface p-4">
            <Timeline
              aria-label="Release pipeline"
              controller={statusController}
            >
              <For each={deploymentSteps}>
                {(step) => (
                  <TimelineItem value={step.value} status={step.status}>
                    <TimelineMarker>
                      <Switch>
                        <Match when={step.status === 'complete'}>
                          <CheckIcon />
                        </Match>
                        <Match when={step.status === 'current'}>
                          <PulseIcon />
                        </Match>
                        <Match when={step.status === 'upcoming'}>
                          <ClockIcon />
                        </Match>
                      </Switch>
                    </TimelineMarker>
                    <TimelineConnector />
                    <TimelineTitle>{step.title}</TimelineTitle>
                    <TimelineTime datetime={step.dateTime}>
                      {step.time}
                    </TimelineTime>
                    <TimelineDescription>
                      {step.description}
                    </TimelineDescription>
                  </TimelineItem>
                )}
              </For>
            </Timeline>
          </div>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Horizontal roadmap">
          <div class="w-full rounded-lg border border-border bg-surface p-4">
            <Timeline
              aria-label="Product roadmap"
              orientation="horizontal"
              loop={false}
            >
              <For each={roadmapMilestones}>
                {(milestone) => (
                  <TimelineItem status={milestone.status}>
                    <TimelineMarker />
                    <TimelineConnector />
                    <TimelineTitle>{milestone.title}</TimelineTitle>
                    <TimelineTime datetime={milestone.dateTime}>
                      {milestone.time}
                    </TimelineTime>
                  </TimelineItem>
                )}
              </For>
            </Timeline>
          </div>
        </Group>
      </div>
    </div>
  )
}
