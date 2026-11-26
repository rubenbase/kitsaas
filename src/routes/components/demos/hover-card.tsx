import { ArrowUpRightIcon } from '#/components/icons'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '#/components/ui/hover-card'

import { Group } from '../demo-group'

export function HoverCardDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default content">
        <div class="w-40 pt-6 pb-24">
          <HoverCard defaultOpen>
            <HoverCardTrigger
              class="text-[13px] text-secondary underline underline-offset-2"
              href="https://example.com/people/hollis"
            >
              @hollis
            </HoverCardTrigger>
            <HoverCardContent>
              <p class="[font-weight:530]">Hollis Grant</p>
              <p class="mt-1 text-[12px] text-muted">
                Design engineer on the payments team.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
      </Group>

      <Group label="Placement">
        <div class="flex w-full flex-wrap items-start gap-8 py-6">
          <div class="w-40">
            <HoverCard>
              <HoverCardTrigger
                class="text-[13px] text-secondary underline underline-offset-2"
                href="https://example.com/people/ines"
              >
                Side right
              </HoverCardTrigger>
              <HoverCardContent side="right" align="start" sideOffset={10}>
                <HoverCardArrow />
                <p class="[font-weight:530]">Inès Moreau</p>
                <p class="mt-1 text-[12px] text-muted">
                  Product designer. Leads the checkout redesign.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>

          <div class="w-40">
            <HoverCard>
              <HoverCardTrigger
                class="text-[13px] text-secondary underline underline-offset-2"
                href="https://example.com/people/kai"
              >
                Side top
              </HoverCardTrigger>
              <HoverCardContent side="top" align="center" sideOffset={10}>
                <HoverCardArrow />
                <p class="[font-weight:530]">Kai Ito</p>
                <p class="mt-1 text-[12px] text-muted">
                  Works on the editor and the command palette.
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
      </Group>

      <Group label="Rich content with a link">
        <div class="w-40 py-6">
          <HoverCard>
            <HoverCardTrigger
              class="text-[13px] text-secondary underline underline-offset-2"
              href="https://example.com/people/rowan"
            >
              @rowan
            </HoverCardTrigger>
            <HoverCardContent sideOffset={8}>
              <div class="flex items-start gap-3">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-[11px] [font-weight:530]">
                  RB
                </span>
                <div class="min-w-0">
                  <p class="[font-weight:530]">Rowan Bell</p>
                  <p class="mt-1 text-[12px] text-muted">
                    Design engineer on the payments team. Writes about forms and
                    motion.
                  </p>
                  <a
                    class="mt-2 inline-flex items-center gap-1 text-[12px] text-secondary underline underline-offset-2"
                    href="https://example.com/people/rowan"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View profile
                    <ArrowUpRightIcon />
                  </a>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </Group>
    </div>
  )
}
