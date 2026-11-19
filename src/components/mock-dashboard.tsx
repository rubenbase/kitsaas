import { For } from 'solid-js'

import {
  ArrowUpRightIcon,
  CheckIcon,
  CloseIcon,
  DownloadIcon,
  PlusIcon,
} from '#/components/icons'

/**
 * ---------------------------------------------------------------------------
 * MOCK CONTENT — safe to delete.
 *
 * To remove everything: delete this file and `src/routes/usage.tsx`.
 * The shell (header + tab bar + main) lives in `src/components/app-shell.tsx`.
 * ---------------------------------------------------------------------------
 */

const dailySpend = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42,
]

const requests = [
  { status: 200, model: 'DeepSeek V4.1 Flash', duration: '8.82 s', when: 'just now' },
  { status: 200, model: 'DeepSeek V4.1 Flash', duration: '6.08 s', when: '1m ago' },
  { status: 200, model: 'DeepSeek V4.1 Flash', duration: '1.91 s', when: '1m ago' },
  { status: 200, model: 'GPT-6 Luna', duration: '850 ms', when: '3m ago' },
  { status: 429, model: 'DeepSeek V4.1 Flash', duration: '—', when: '5m ago' },
]

const leaderboard = [
  { rank: 1, name: 'lumen', spend: '$1,284.20' },
  { rank: 2, name: 'nori', spend: '$964.80' },
  { rank: 3, name: 'kaito', spend: '$712.44' },
  { rank: 4, name: 'you', spend: '$0.16', isYou: true },
]

const clientTabs = ['Desktop', 'Terminal', 'Headless / CI', 'SDK']

export function MockDashboard() {
  return (
    <div class="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_400px] xl:gap-2">
      <div class="min-w-0 lg:px-8">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 class="text-[22px] leading-7 tracking-[-0.02em] [font-weight:530]">
              My usage
            </h1>
            <p class="mt-1 text-muted">Your requests, cost and limit</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex h-7 items-center rounded-[6px] border border-border px-2.5 text-[12px] text-muted">
              This month
            </span>
            <button
              type="button"
              class="inline-flex h-7 items-center gap-1 rounded-[6px] border border-border bg-elevated px-2.5 text-[12px] [font-weight:530] transition-colors hover:bg-surface-2"
            >
              Usage details
              <ArrowUpRightIcon class="size-3.5 text-[var(--v2-icon-icon-muted)]" />
            </button>
          </div>
        </div>

        <section class="mt-6 rounded-[10px] border border-border bg-surface p-5">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-muted">Daily personal spend this month</p>
              <p class="mt-1 text-[28px] leading-8 tracking-[-0.02em] [font-weight:530]">
                $0.16
              </p>
            </div>
            <div class="text-right text-[12px] text-muted">
              <p>
                Limit <span class="text-foreground">$20.00</span>
              </p>
              <p class="mt-0.5">19 days tracked</p>
            </div>
          </div>

          <div class="mt-6 flex h-32 items-end gap-1.5">
            <For each={dailySpend}>
              {(value) => (
                <div
                  class="group relative flex-1 rounded-[2px] bg-surface-3 transition-colors hover:bg-surface-4"
                  style={{ height: `${Math.max(value, 2)}%` }}
                >
                  {value > 0 && (
                    <span class="absolute inset-0 rounded-[2px] bg-[var(--v2-background-bg-accent)]" />
                  )}
                </div>
              )}
            </For>
          </div>
          <div class="mt-2 flex justify-between text-[11px] text-faint">
            <span>Nov 1</span>
            <span>Nov 10</span>
            <span>Nov 19</span>
          </div>
        </section>

        <section class="mt-6 rounded-[10px] border border-border bg-surface">
          <div class="flex items-center justify-between border-b border-border-muted px-5 py-4">
            <div>
              <h2 class="[font-weight:530]">Recent requests</h2>
              <p class="mt-0.5 text-[12px] text-muted">Last 40 requests</p>
            </div>
            <button
              type="button"
              class="inline-flex h-7 items-center gap-1 rounded-[6px] border border-border px-2.5 text-[12px] [font-weight:530] transition-colors hover:bg-surface-2"
            >
              Logs details
              <ArrowUpRightIcon class="size-3.5 text-[var(--v2-icon-icon-muted)]" />
            </button>
          </div>

          <ul class="px-5 py-1">
            <For each={requests}>
              {(request) => (
                <li class="grid grid-cols-[52px_minmax(0,1fr)_auto_auto] items-center gap-3 border-b border-border-muted py-2.5 last:border-b-0">
                <span
                  class={
                    request.status === 200
                      ? 'inline-flex h-5 w-fit items-center rounded-[4px] bg-[var(--v2-state-bg-success)] px-1.5 text-[11px] text-[var(--v2-state-fg-success)] [font-weight:530]'
                      : 'inline-flex h-5 w-fit items-center rounded-[4px] bg-[var(--v2-state-bg-danger)] px-1.5 text-[11px] text-[var(--v2-state-fg-danger)] [font-weight:530]'
                  }
                >
                  {request.status}
                </span>
                <span class="truncate">{request.model}</span>
                <span class="text-[12px] text-muted tabular-nums">
                  {request.duration}
                </span>
                <span class="w-16 text-right text-[12px] text-faint">
                  {request.when}
                </span>
              </li>
              )}
            </For>
          </ul>
        </section>

        <section class="mt-6 rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="[font-weight:530]">Get started</h2>
              <p class="mt-1 text-[12px] text-muted">
                Free models work now. For paid models, pick one:
              </p>
            </div>
            <button
              type="button"
              class="inline-flex size-6 shrink-0 items-center justify-center rounded-[5px] text-faint transition-colors hover:bg-surface-2 hover:text-foreground"
              aria-label="Dismiss"
            >
              <CloseIcon class="size-3.5" />
            </button>
          </div>

          <div class="mt-4 grid gap-2 sm:grid-cols-3">
            <For each={['Subscribe to Go', 'Add credits', 'Bring your own provider']}>
              {(label, i) => (
                <button
                  type="button"
                  class={
                    i() === 0
                      ? 'inline-flex h-8 items-center justify-center gap-1.5 rounded-[6px] bg-[var(--v2-background-bg-accent)] px-3 text-[12px] text-white [font-weight:530]'
                      : 'inline-flex h-8 items-center justify-center gap-1.5 rounded-[6px] border border-border bg-elevated px-3 text-[12px] [font-weight:530] transition-colors hover:bg-surface-2'
                  }
                >
                  {label}
                  <ArrowUpRightIcon class="size-3.5 opacity-60" />
                </button>
              )}
            </For>
          </div>
        </section>
      </div>

      <aside class="flex flex-col gap-6 lg:px-6">
        <section class="rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="[font-weight:530]">Connect a client</h2>
              <p class="mt-0.5 text-[12px] text-muted">
                Run OpenCode against this workspace
              </p>
            </div>
            <span class="inline-flex h-5 shrink-0 items-center gap-1 rounded-full bg-[var(--v2-state-bg-success)] px-2 text-[11px] text-[var(--v2-state-fg-success)] [font-weight:530]">
              <span class="size-1.5 rounded-full bg-current" />
              Connected
            </span>
          </div>

          <div class="mt-4 flex gap-0.5 overflow-x-auto border-b border-border-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <For each={clientTabs}>
              {(tab, i) => (
                <button
                  type="button"
                  class={
                    i() === 0
                      ? 'relative h-8 shrink-0 px-2 text-[12px] text-foreground [font-weight:530] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-foreground'
                      : 'h-8 shrink-0 px-2 text-[12px] text-muted transition-colors hover:text-foreground'
                  }
                >
                  {tab}
                </button>
              )}
            </For>
          </div>

          <button
            type="button"
            class="mt-4 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[6px] bg-[var(--v2-background-bg-accent)] px-3 text-[12px] text-white [font-weight:530]"
          >
            <DownloadIcon class="size-4" />
            Download for macOS
          </button>
          <button
            type="button"
            class="mt-2 inline-flex h-8 w-full items-center justify-center rounded-[6px] border border-border text-[12px] [font-weight:530] transition-colors hover:bg-surface-2"
          >
            Other platforms
          </button>
        </section>

        <section class="rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="[font-weight:530]">Leaderboard</h2>
              <p class="mt-0.5 text-[12px] text-muted">Who's spending the most</p>
            </div>
            <ArrowUpRightIcon class="size-4 text-[var(--v2-icon-icon-muted)]" />
          </div>

          <ul class="mt-3">
            <For each={leaderboard}>
              {(entry) => (
                <li class="flex items-center gap-3 border-b border-border-muted py-2 text-[12px] last:border-b-0">
                  <span class="w-4 text-faint tabular-nums">{entry.rank}</span>
                  <span
                    class={
                      entry.isYou
                        ? 'flex-1 truncate text-foreground [font-weight:530]'
                        : 'flex-1 truncate'
                    }
                  >
                    {entry.name}
                  </span>
                  <span class="text-muted tabular-nums">{entry.spend}</span>
                </li>
              )}
            </For>
          </ul>
        </section>

        <section class="rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2 class="[font-weight:530]">Billing</h2>
              <p class="mt-0.5 text-[12px] text-muted">Pay as you go</p>
            </div>
            <span class="text-[12px] text-yellow-500 [font-weight:530]">
              $4.82 left
            </span>
          </div>

          <div class="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
            <div class="h-full w-[24%] rounded-full bg-yellow-500" />
          </div>

          <button
            type="button"
            class="mt-4 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-[6px] border border-border text-[12px] [font-weight:530] transition-colors hover:bg-surface-2"
          >
            <PlusIcon class="size-3.5" />
            Add limit
          </button>
        </section>

        <section class="rounded-[10px] border border-border bg-surface p-5">
          <div class="flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-[var(--v2-state-bg-success)] text-[var(--v2-state-fg-success)]">
              <CheckIcon class="size-3" />
            </span>
            <div>
              <h2 class="text-[12px] [font-weight:530]">Audit</h2>
              <p class="text-[11px] text-faint">1 change this week</p>
            </div>
          </div>
          <p class="mt-3 text-[12px] text-muted">
            Workspace created · 1h ago
          </p>
        </section>
      </aside>
    </div>
  )
}
