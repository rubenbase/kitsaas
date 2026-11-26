import { AspectRatio } from "#/components/ui/aspect-ratio";

import { Group } from "../demo-group";

const placeholder =
  "linear-gradient(135deg, var(--v2-background-bg-layer-02), var(--v2-background-bg-layer-03))";

export function AspectRatioDemo() {
  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="16 / 9">
        <div class="w-full max-w-[480px]">
          <AspectRatio
            ratio={16 / 9}
            class="overflow-hidden rounded-[6px] border-[0.5px] border-border"
            style={{ background: placeholder }}
          >
            <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <circle cx="118" cy="30" r="10" fill="var(--v2-icon-icon-muted)" />
              <path
                d="M0 90 L52 42 L84 70 L108 52 L160 90 Z"
                fill="var(--v2-background-bg-layer-01)"
              />
            </svg>
          </AspectRatio>
        </div>
      </Group>

      <Group label="Ratios">
        <div class="grid w-full grid-cols-3 items-start gap-3">
          {[1, 4 / 3, 2].map((ratio) => (
            <AspectRatio
              ratio={ratio}
              class="flex items-center justify-center rounded-[6px] border-[0.5px] border-border text-[13px] text-muted"
              style={{ background: placeholder }}
            >
              {ratio === 1 ? "1 / 1" : ratio === 2 ? "2 / 1" : "4 / 3"}
            </AspectRatio>
          ))}
        </div>
      </Group>
    </div>
  );
}
