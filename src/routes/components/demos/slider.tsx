import { createSignal, For } from 'solid-js'

import { Field, FieldDescription, FieldLabel } from '#/components/ui/field'
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from '#/components/ui/slider'

import { Group } from '../demo-group'

const eqChannels = [
  { label: 'Bass', defaultValue: 65 },
  { label: 'Mid', defaultValue: 45 },
  { label: 'Treble', defaultValue: 75 },
]

const yearMarks = [1990, 2000, 2010, 2020, 2030]

export function SliderDemo() {
  const [volume, setVolume] = createSignal(0.6)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single value">
        <div class="w-full max-w-[320px]">
          <Field>
            <Slider
              value={volume()}
              onValueChange={(next) => setVolume(next)}
              min={0}
              max={1}
              step={0.01}
              format={{ style: 'percent' }}
            >
              <div data-slot="slider-header">
                <FieldLabel>Notification volume</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb />
                </SliderTrack>
              </SliderControl>
            </Slider>
            <FieldDescription>
              Use arrow keys for 1% steps or Shift+Arrow for 10%.
            </FieldDescription>
          </Field>
        </div>
      </Group>

      <Group label="Range (two thumbs)">
        <div class="w-full max-w-[320px]">
          <Field>
            <Slider
              defaultValue={[200, 750]}
              min={0}
              max={1000}
              step={25}
              minStepsBetweenThumbs={4}
              format={{
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0,
              }}
            >
              <div data-slot="slider-header">
                <FieldLabel>Monthly budget</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb index={0} aria-label="Minimum budget" />
                  <SliderThumb index={1} aria-label="Maximum budget" />
                </SliderTrack>
              </SliderControl>
            </Slider>
            <FieldDescription>
              Minimum separation of $100 between bounds.
            </FieldDescription>
          </Field>
        </div>
      </Group>

      <Group label="Steps & marks">
        <div class="flex w-full max-w-[320px] flex-col gap-5">
          <Field>
            <Slider
              defaultValue={2010}
              min={1990}
              max={2030}
              step={5}
              format={{ useGrouping: false }}
            >
              <div data-slot="slider-header">
                <FieldLabel>Release year</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb />
                </SliderTrack>
              </SliderControl>
              <div data-slot="slider-marks" aria-hidden="true">
                <For each={yearMarks}>{(year) => <span>{year}</span>}</For>
              </div>
            </Slider>
          </Field>

          <Field>
            <Slider
              defaultValue={100}
              min={25}
              max={200}
              step={25}
              format={{ style: 'unit', unit: 'percent' }}
            >
              <div data-slot="slider-header">
                <FieldLabel>Canvas zoom</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb />
                </SliderTrack>
              </SliderControl>
              <div data-slot="slider-marks" aria-hidden="true">
                <For each={[25, 75, 125, 175, 200]}>
                  {(pct) => <span>{pct}%</span>}
                </For>
              </div>
            </Slider>
          </Field>
        </div>
      </Group>

      <Group label="Vertical">
        <div class="flex items-end gap-8 py-1">
          <For each={eqChannels}>
            {(channel) => (
              <Field class="w-auto items-center">
                <Slider
                  orientation="vertical"
                  defaultValue={channel.defaultValue}
                  min={0}
                  max={100}
                  step={5}
                  format={{ style: 'unit', unit: 'percent' }}
                >
                  <SliderValue />
                  <SliderControl>
                    <SliderTrack>
                      <SliderIndicator />
                      <SliderThumb />
                    </SliderTrack>
                  </SliderControl>
                </Slider>
                <FieldLabel class="justify-center">{channel.label}</FieldLabel>
              </Field>
            )}
          </For>
        </div>
      </Group>

      <Group label="Disabled & read-only">
        <div class="flex w-full max-w-[320px] flex-col gap-5">
          <Field disabled>
            <Slider defaultValue={50} disabled>
              <div data-slot="slider-header">
                <FieldLabel>Display brightness</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb />
                </SliderTrack>
              </SliderControl>
            </Slider>
            <FieldDescription>Managed by device policy.</FieldDescription>
          </Field>

          <Field>
            <Slider
              defaultValue={75}
              readOnly
              format={{ style: 'unit', unit: 'percent' }}
            >
              <div data-slot="slider-header">
                <FieldLabel>Storage quota</FieldLabel>
                <SliderValue />
              </div>
              <SliderControl>
                <SliderTrack>
                  <SliderIndicator />
                  <SliderThumb />
                </SliderTrack>
              </SliderControl>
            </Slider>
            <FieldDescription>Read-only: focusable but locked.</FieldDescription>
          </Field>
        </div>
      </Group>
    </div>
  )
}
