import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";

import { Group } from "../demo-group";

export function SpinnerDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Sizes">
        <div class="flex items-center gap-4">
          <Spinner width={12} height={12} />
          <Spinner />
          <Spinner class="size-6" aria-label="Loading invoices" />
        </div>
      </Group>

      <Group label="Colour">
        <div class="flex items-center gap-4">
          <Spinner class="text-foreground" />
          <Spinner class="text-accent" />
          <Spinner class="text-danger" />
        </div>
      </Group>

      <Group label="Button">
        <div class="flex flex-wrap items-center gap-2">
          <Button variant="loading" icon={<Spinner aria-hidden="true" />}>
            Saving
          </Button>
          <Button variant="loading" size="small" icon={<Spinner aria-hidden="true" />}>
            Loading
          </Button>
        </div>
      </Group>

      <Group label="Inline">
        <div role="status" class="flex items-center gap-2 text-[13px] text-secondary">
          <Spinner aria-hidden="true" />
          Loading invoices
        </div>
      </Group>
    </div>
  );
}
