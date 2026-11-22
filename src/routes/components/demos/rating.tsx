import { createSignal } from 'solid-js'

import { Button } from '#/components/ui/button'
import { Rating, RatingItem } from '#/components/ui/rating'

import { Group } from '../demo-group'

export function RatingDemo() {
  const [score, setScore] = createSignal<number | null>(4)
  const [halfScore, setHalfScore] = createSignal<number | null>(3.5)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Whole stars (deselectable)">
        <div class="flex flex-wrap items-center gap-3">
          <Rating
            aria-label="Overall experience"
            value={score()}
            onValueChange={setScore}
            deselectable
          >
            <RatingItem />
          </Rating>
          <span class="font-mono text-[12px] tabular-nums text-secondary">
            {score() === null ? 'Not rated' : `${score()} / 5`}
          </span>
          <Button
            size="small"
            variant="ghost-muted"
            disabled={score() === null}
            onClick={() => setScore(null)}
          >
            Clear
          </Button>
        </div>
      </Group>

      <Group label="Half-star precision">
        <div class="flex flex-wrap items-center gap-3">
          <Rating
            aria-label="Half-star rating"
            step={0.5}
            value={halfScore()}
            onValueChange={setHalfScore}
          >
            <RatingItem />
          </Rating>
          <span class="font-mono text-[12px] tabular-nums text-secondary">
            {halfScore() === null ? '—' : `${halfScore()?.toFixed(1)} / 5.0`}
          </span>
        </div>
      </Group>

      <Group label="Sizes & monochrome tone">
        <div class="flex flex-col gap-2.5">
          <div class="flex items-center gap-3">
            <Rating aria-label="Small rating" size="small" defaultValue={4} />
            <span class="text-[11px] text-faint">Small (16px)</span>
          </div>
          <div class="flex items-center gap-3">
            <Rating aria-label="Normal rating" size="normal" defaultValue={4} />
            <span class="text-[11px] text-faint">Normal (20px)</span>
          </div>
          <div class="flex items-center gap-3">
            <Rating aria-label="Large rating" size="large" defaultValue={4} />
            <span class="text-[11px] text-faint">Large (24px)</span>
          </div>
          <div class="flex items-center gap-3">
            <Rating
              aria-label="Monochrome rating"
              tone="neutral"
              step={0.5}
              defaultValue={4.5}
            />
            <span class="text-[11px] text-faint">Neutral tone</span>
          </div>
        </div>
      </Group>

      <Group label="Read-only averages">
        <div class="flex flex-col gap-2.5">
          <div class="flex items-center gap-2.5">
            <Rating
              value={4.7}
              readOnly
              size="small"
              getValueLabel={(v, max) => `Rated ${v} out of ${max}`}
            />
            <span class="font-mono text-[12px] font-medium tabular-nums text-foreground">
              4.7
            </span>
            <span class="text-[12px] tabular-nums text-faint">
              (1,284 reviews)
            </span>
          </div>
          <div class="flex items-center gap-2.5">
            <Rating
              value={4.2}
              readOnly
              size="small"
              getValueLabel={(v, max) => `Rated ${v} out of ${max}`}
            />
            <span class="font-mono text-[12px] font-medium tabular-nums text-foreground">
              4.2
            </span>
            <span class="text-[12px] tabular-nums text-faint">
              (342 reviews)
            </span>
          </div>
          <div class="flex items-center gap-2.5">
            <Rating
              value={2.8}
              readOnly
              size="small"
              getValueLabel={(v, max) => `Rated ${v} out of ${max}`}
            />
            <span class="font-mono text-[12px] font-medium tabular-nums text-foreground">
              2.8
            </span>
            <span class="text-[12px] tabular-nums text-faint">(19 reviews)</span>
          </div>
        </div>
      </Group>

      <Group label="Disabled">
        <div class="flex flex-wrap items-center gap-5">
          <div class="flex items-center gap-2">
            <Rating aria-label="Disabled empty rating" disabled />
            <span class="text-[12px] text-faint">Unrated</span>
          </div>
          <div class="flex items-center gap-2">
            <Rating
              aria-label="Disabled filled rating"
              defaultValue={3}
              disabled
            />
            <span class="text-[12px] text-faint">Locked at 3</span>
          </div>
        </div>
      </Group>
    </div>
  )
}
