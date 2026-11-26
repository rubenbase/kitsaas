import { AlertTriangleIcon, CheckIcon } from "#/components/icons";
import { Badge } from "#/components/ui/badge";

import { Group } from "../demo-group";

export function BadgeDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Variants">
        <div class="flex flex-wrap items-center gap-2">
          <Badge>Neutral</Badge>
          <Badge variant="accent">New</Badge>
          <Badge variant="subtle">12</Badge>
          <Badge variant="danger">Failed</Badge>
          <Badge variant="info">Beta</Badge>
          <Badge variant="success">Paid</Badge>
          <Badge variant="warning">Low</Badge>
        </div>
      </Group>

      <Group label="Appearances">
        <div class="flex flex-wrap items-center gap-2">
          <Badge appearance="standard">Standard</Badge>
          <Badge>Compact</Badge>
          <Badge data-high-contrast="">High contrast</Badge>
        </div>
      </Group>

      <Group label="Model list">
        <div class="flex items-center gap-2 text-[13px]">
          Claude Opus 5.5
          <Badge class="shrink-0">Free</Badge>
          <Badge class="shrink-0">Latest</Badge>
        </div>
      </Group>

      <Group label="Icon">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="success">
            <CheckIcon />
            Paid
          </Badge>
          <Badge variant="warning">
            <AlertTriangleIcon />
            Low balance
          </Badge>
        </div>
      </Group>
    </div>
  );
}
