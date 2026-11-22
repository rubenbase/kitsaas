import { For } from "solid-js";

import { Card, CardContent, CardHeader } from "#/components/ui/card";
import { Skeleton, SkeletonFade } from "#/components/ui/skeleton";

import { Group } from "../demo-group";

const rows = [72, 56, 64, 48, 60, 52, 68, 44];

export function SkeletonDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Text">
        <div class="grid w-full max-w-[320px] gap-2 text-[13px] leading-5" aria-busy="true">
          <Skeleton class="w-[160px] text-[15px]" />
          <Skeleton class="w-full" />
          <Skeleton class="w-[80%]" />
        </div>
      </Group>

      <Group label="Profile">
        <div class="flex items-center gap-3" aria-busy="true">
          <Skeleton class="size-8 rounded-full" />
          <div class="grid gap-2 text-[13px]">
            <Skeleton class="w-[120px]" />
            <Skeleton class="w-[180px]" />
          </div>
        </div>
      </Group>

      <Group label="Card">
        <Card class="w-full max-w-[360px]" aria-busy="true" aria-label="My usage">
          <CardHeader>
            <Skeleton class="w-[96px] text-[15px]" />
            <Skeleton class="mt-2 w-[180px] text-[13px]" />
          </CardHeader>
          <CardContent>
            <Skeleton class="h-8 w-full" />
          </CardContent>
        </Card>
      </Group>

      <Group label="Faded list">
        <SkeletonFade class="grid h-[240px] w-full max-w-[360px] content-start gap-4 overflow-hidden text-[13px]">
          <For each={rows}>
            {(width) => (
              <div class="flex items-center justify-between gap-4">
                <Skeleton style={{ width: `${width}%` }} />
                <Skeleton class="w-[40px]" />
              </div>
            )}
          </For>
        </SkeletonFade>
      </Group>
    </div>
  );
}
