import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from '#/components/ui/meter'

import { Group } from '../demo-group'

export function MeterDemo() {
  const [usage, setUsage] = createSignal(42)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Thresholds (lower is better)">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <For
            each={[
              { label: 'Optimum (disk usage)', value: 38 },
              { label: 'Suboptimum (warning)', value: 74 },
              { label: 'Even less good (critical)', value: 94 },
            ]}
          >
            {(item) => (
              <Meter value={item.value} low={60} high={85} optimum={20}>
                <div data-slot="meter-header">
                  <MeterLabel>{item.label}</MeterLabel>
                  <MeterValue />
                </div>
                <MeterTrack>
                  <MeterIndicator />
                </MeterTrack>
              </Meter>
            )}
          </For>
        </div>
      </Group>

      <Group label="Thresholds (higher is better)">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <For
            each={[
              { label: 'Battery healthy', value: 86 },
              { label: 'Battery moderate', value: 48 },
              { label: 'Battery critical', value: 14 },
            ]}
          >
            {(item) => (
              <Meter value={item.value} low={25} high={70} optimum={95}>
                <div data-slot="meter-header">
                  <MeterLabel>{item.label}</MeterLabel>
                  <MeterValue />
                </div>
                <MeterTrack>
                  <MeterIndicator />
                </MeterTrack>
              </Meter>
            )}
          </For>
        </div>
      </Group>

      <Group label="Formats & custom bounds">
        <div class="flex w-[280px] max-w-full flex-col gap-4">
          <Meter
            value={120}
            max={250}
            format={{ style: 'unit', unit: 'gigabyte' }}
          >
            <div data-slot="meter-header">
              <MeterLabel>Storage</MeterLabel>
              <MeterValue />
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>

          <Meter
            value={1840}
            max={2500}
            low={1500}
            high={2200}
            optimum={500}
            format={{
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }}
          >
            <div data-slot="meter-header">
              <MeterLabel>Monthly spend</MeterLabel>
              <MeterValue />
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>

          <Meter
            value={740}
            min={300}
            max={850}
            low={580}
            high={700}
            optimum={820}
            format={{ style: 'decimal' }}
            getValueLabel={(value, details) =>
              `Credit score ${value} out of ${details.max}`
            }
          >
            <div data-slot="meter-header">
              <MeterLabel>Credit score</MeterLabel>
              <MeterValue />
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </div>
      </Group>

      <Group label="Interactive reading">
        <div class="flex w-[280px] max-w-full flex-col gap-3">
          <Meter
            value={usage()}
            low={60}
            high={85}
            optimum={20}
            getValueLabel={(value, details) =>
              `${value} of ${details.max} GB used (${details.formatted})`
            }
          >
            <div data-slot="meter-header">
              <MeterLabel>Cluster memory</MeterLabel>
              <MeterValue>{usage()} / 100 GB</MeterValue>
            </div>
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>

          <div class="flex items-center gap-1.5">
            <Button
              size="small"
              variant="outline"
              onClick={() => setUsage((v) => Math.max(0, v - 15))}
            >
              −15%
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => setUsage((v) => Math.min(100, v + 15))}
            >
              +15%
            </Button>
            <Button
              size="small"
              variant="ghost"
              onClick={() => setUsage(42)}
            >
              Reset
            </Button>
          </div>
        </div>
      </Group>
    </div>
  )
}
