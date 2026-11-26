import { createSignal, Show } from "solid-js";

import { PlusIcon, SearchIcon, TerminalIcon } from "#/components/icons";
import { Button } from "#/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "#/components/ui/empty";

import { Group } from "../demo-group";

export function EmptyDemo() {
  const [cleared, setCleared] = createSignal(false);

  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="Icon">
        <Empty class="w-full max-w-[560px]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TerminalIcon />
            </EmptyMedia>
            <EmptyTitle>No API keys yet</EmptyTitle>
            <EmptyDescription>
              Create a key to call the API from your terminal or your app.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="small" variant="contrast" icon={<PlusIcon />}>
              Create key
            </Button>
            <Button size="small" variant="ghost" href="#docs">
              Read the docs
            </Button>
          </EmptyContent>
        </Empty>
      </Group>

      <Group label="Default media">
        <Empty class="w-full max-w-[560px]">
          <EmptyHeader>
            <EmptyMedia>
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>No matching members</EmptyTitle>
            <EmptyDescription>
              Nobody matches “quokka”. Check the spelling or <a href="#invite">invite someone</a>.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Group>

      <Group label="Text only">
        <Empty class="w-full max-w-[560px] min-h-0">
          <EmptyHeader>
            <EmptyTitle>No usage this month</EmptyTitle>
            <EmptyDescription>Requests will show up here once you make one.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Group>

      <Group
        label="Becoming empty"
        description='With role="status", a screen reader reads the empty state when it replaces the list.'
      >
        <div class="w-full max-w-[560px]">
          <Show
            when={cleared()}
            fallback={
              <div class="flex items-center justify-between gap-3">
                <span>3 unread notifications</span>
                <Button size="small" onClick={() => setCleared(true)}>
                  Mark all as read
                </Button>
              </div>
            }
          >
            <Empty role="status">
              <EmptyHeader>
                <EmptyTitle>You're all caught up</EmptyTitle>
                <EmptyDescription>New notifications will appear here.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="small" variant="ghost" onClick={() => setCleared(false)}>
                  Reset demo
                </Button>
              </EmptyContent>
            </Empty>
          </Show>
        </div>
      </Group>
    </div>
  );
}
