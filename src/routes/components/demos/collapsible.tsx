import { ChevronDownIcon } from '#/components/icons'
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'

import { Group } from '../demo-group'

export function CollapsibleDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Closed">
        <Collapsible class="w-full">
          <CollapsibleTrigger>
            <span class="flex items-center gap-2">
              <span>Order #4189</span>
              <span data-slot="collapsible-arrow">
                <span data-slot="collapsible-arrow-icon">
                  <ChevronDownIcon />
                </span>
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pt-2 text-[12px] text-muted">
              Three items, $84.00. The panel is unmounted while closed.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </Group>

      <Group label="Open">
        <Collapsible defaultOpen class="w-full">
          <CollapsibleTrigger>
            <span class="flex items-center gap-2">
              <span>Order #4189</span>
              <span data-slot="collapsible-arrow">
                <span data-slot="collapsible-arrow-icon">
                  <ChevronDownIcon />
                </span>
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pt-2 text-[12px] text-muted">
              Linen shirt $48.00, canvas tote $18.00, wool socks $18.00.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </Group>

      <Group label="Normal">
        <Collapsible variant="normal" defaultOpen class="w-full">
          <CollapsibleTrigger>
            <span class="flex items-center gap-2">
              <span>Delivery note</span>
              <span data-slot="collapsible-arrow">
                <span data-slot="collapsible-arrow-icon">
                  <ChevronDownIcon />
                </span>
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pt-2 text-[12px] text-muted">
              Leave it with the front desk if nobody is in.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </Group>

      <Group label="Ghost">
        <Collapsible variant="ghost" defaultOpen class="w-full">
          <CollapsibleTrigger>
            <span class="flex items-center gap-2">
              <span>Release notes</span>
              <span data-slot="collapsible-arrow">
                <span data-slot="collapsible-arrow-icon">
                  <ChevronDownIcon />
                </span>
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pt-2 text-[12px] text-muted">
              Version 2.4: search matches file contents, uploads resume after a
              dropped connection.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </Group>

      <Group label="Disabled">
        <Collapsible disabled class="w-full">
          <CollapsibleTrigger>
            <span class="flex items-center gap-2">
              <span>Gift options</span>
              <span data-slot="collapsible-arrow">
                <span data-slot="collapsible-arrow-icon">
                  <ChevronDownIcon />
                </span>
              </span>
            </span>
          </CollapsibleTrigger>
          <CollapsiblePanel>
            <div class="pt-2 text-[12px] text-muted">
              Add a gift message and wrapping. Stays focusable, ignores presses.
            </div>
          </CollapsiblePanel>
        </Collapsible>
      </Group>
    </div>
  )
}
