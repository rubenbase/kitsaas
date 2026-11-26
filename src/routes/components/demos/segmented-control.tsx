import { ChartsIcon, ComponentsIcon } from '#/components/icons'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '#/components/ui/segmented-control'

import { Group } from '../demo-group'

export function SegmentedControlDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default with indicator">
        <SegmentedControl aria-label="View" defaultValue="list">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="list">List</SegmentedControlItem>
          <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
          <SegmentedControlItem value="board">Board</SegmentedControlItem>
        </SegmentedControl>
      </Group>

      <Group label="With icons">
        <SegmentedControl aria-label="Layout" defaultValue="grid">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="grid">
            <ComponentsIcon />
            Grid
          </SegmentedControlItem>
          <SegmentedControlItem value="charts">
            <ChartsIcon />
            Charts
          </SegmentedControlItem>
        </SegmentedControl>
      </Group>

      <Group label="Disabled">
        <SegmentedControl aria-label="Theme" defaultValue="system" disabled>
          <SegmentedControlIndicator />
          <SegmentedControlItem value="light">Light</SegmentedControlItem>
          <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
          <SegmentedControlItem value="system">System</SegmentedControlItem>
        </SegmentedControl>

        <SegmentedControl aria-label="Billing period" defaultValue="monthly">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
          <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
          <SegmentedControlItem value="lifetime" disabled>
            Lifetime
          </SegmentedControlItem>
        </SegmentedControl>
      </Group>

      <Group label="Nothing checked">
        <SegmentedControl aria-label="Density">
          <SegmentedControlIndicator />
          <SegmentedControlItem value="compact">Compact</SegmentedControlItem>
          <SegmentedControlItem value="comfortable">
            Comfortable
          </SegmentedControlItem>
        </SegmentedControl>
      </Group>
    </div>
  )
}
