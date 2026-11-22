import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaCanvas,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSliderThumb,
  ColorPickerSwatch,
  ColorPickerSwatches,
  ColorPickerSwatchItem,
} from '#/components/ui/color-picker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'

import { Group } from '../demo-group'

const presetSwatches = [
  '#3b5cf6',
  '#00abcf',
  '#49c970',
  '#f6c251',
  '#ff8648',
  '#f1484f',
  '#f64aab',
  '#7152f4',
]

export function ColorPickerDemo() {
  const [brandColor, setBrandColor] = createSignal('#3b5cf6')
  const [popoverColor, setPopoverColor] = createSignal('#49c970')
  const [rgbColor, setRgbColor] = createSignal('rgb(59 92 246)')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Saturation & brightness with alpha">
        <div class="flex flex-col gap-2">
          <ColorPicker
            card
            aria-label="Brand color"
            value={brandColor()}
            onValueChange={(next) => setBrandColor(next)}
          >
            <ColorPickerArea>
              <ColorPickerAreaThumb />
            </ColorPickerArea>
            <div data-slot="color-picker-row">
              <ColorPickerSwatch />
              <div data-slot="color-picker-sliders">
                <ColorPickerSlider channel="hue">
                  <ColorPickerSliderThumb />
                </ColorPickerSlider>
                <ColorPickerSlider channel="alpha">
                  <ColorPickerSliderThumb />
                </ColorPickerSlider>
              </div>
            </div>
            <div data-slot="color-picker-row">
              <ColorPickerInput aria-label="Hex color" />
              <ColorPickerEyeDropper aria-label="Pick color from screen" />
            </div>
            <ColorPickerSwatches aria-label="Preset colors">
              <For each={presetSwatches}>
                {(swatch) => <ColorPickerSwatchItem value={swatch} />}
              </For>
            </ColorPickerSwatches>
          </ColorPicker>
          <p class="font-mono text-[12px] text-muted">{brandColor()}</p>
        </div>
      </Group>

      <Group label="RGB channel inputs & presets">
        <div class="flex flex-col gap-2">
          <ColorPicker
            card
            aria-label="Accent color"
            space="srgb"
            value={rgbColor()}
            onValueChange={(next) => setRgbColor(next)}
          >
            <ColorPickerArea>
              <ColorPickerAreaCanvas />
              <ColorPickerAreaThumb />
            </ColorPickerArea>
            <div data-slot="color-picker-sliders">
              <ColorPickerSlider channel="blue">
                <ColorPickerSliderThumb />
              </ColorPickerSlider>
              <ColorPickerSlider channel="alpha">
                <ColorPickerSliderThumb />
              </ColorPickerSlider>
            </div>
            <div data-slot="color-picker-channels">
              <div data-slot="color-picker-channel">
                <ColorPickerChannelInput channel="red" aria-label="Red" />
                <span data-slot="color-picker-channel-label">R</span>
              </div>
              <div data-slot="color-picker-channel">
                <ColorPickerChannelInput channel="green" aria-label="Green" />
                <span data-slot="color-picker-channel-label">G</span>
              </div>
              <div data-slot="color-picker-channel">
                <ColorPickerChannelInput channel="blue" aria-label="Blue" />
                <span data-slot="color-picker-channel-label">B</span>
              </div>
              <div data-slot="color-picker-channel">
                <ColorPickerChannelInput channel="alpha" aria-label="Alpha" />
                <span data-slot="color-picker-channel-label">A</span>
              </div>
            </div>
            <ColorPickerSwatches aria-label="Preset swatches">
              <For each={presetSwatches}>
                {(swatch) => <ColorPickerSwatchItem value={swatch} />}
              </For>
            </ColorPickerSwatches>
          </ColorPicker>
          <p class="font-mono text-[12px] text-muted">{rgbColor()}</p>
        </div>
      </Group>

      <Group label="Popover trigger">
        <ColorPicker
          aria-label="Status badge color"
          value={popoverColor()}
          onValueChange={(next) => setPopoverColor(next)}
        >
          <Popover>
            <PopoverTrigger
              render={(triggerProps) => (
                <Button {...triggerProps} variant="neutral">
                  <ColorPickerSwatch class="h-3.5! w-3.5! rounded-[3px]!" />
                  <span class="font-mono text-[12px]">{popoverColor()}</span>
                </Button>
              )}
            />
            <PopoverContent sideOffset={6} class="w-[248px] max-w-none">
              <div class="flex flex-col gap-2.5">
                <ColorPickerArea>
                  <ColorPickerAreaThumb />
                </ColorPickerArea>
                <div data-slot="color-picker-sliders">
                  <ColorPickerSlider channel="hue">
                    <ColorPickerSliderThumb />
                  </ColorPickerSlider>
                  <ColorPickerSlider channel="alpha">
                    <ColorPickerSliderThumb />
                  </ColorPickerSlider>
                </div>
                <div data-slot="color-picker-row">
                  <ColorPickerSwatch />
                  <ColorPickerInput aria-label="Hex color" />
                </div>
                <ColorPickerSwatches aria-label="Quick swatches">
                  <For each={presetSwatches}>
                    {(swatch) => <ColorPickerSwatchItem value={swatch} />}
                  </For>
                </ColorPickerSwatches>
              </div>
            </PopoverContent>
          </Popover>
        </ColorPicker>
      </Group>

      <Group label="OKLCH & disabled">
        <div class="flex flex-wrap items-start gap-4">
          <ColorPicker
            card
            aria-label="OKLCH accent"
            space="oklch"
            defaultValue="oklch(0.62 0.19 259)"
          >
            <ColorPickerArea>
              <ColorPickerAreaCanvas />
              <ColorPickerAreaThumb />
            </ColorPickerArea>
            <ColorPickerSlider channel="hue">
              <ColorPickerSliderThumb />
            </ColorPickerSlider>
            <div data-slot="color-picker-row">
              <ColorPickerSwatch />
              <ColorPickerInput aria-label="OKLCH value" />
            </div>
          </ColorPicker>

          <ColorPicker
            card
            aria-label="Disabled color"
            defaultValue="#7152f4"
            disabled
          >
            <ColorPickerArea>
              <ColorPickerAreaThumb />
            </ColorPickerArea>
            <ColorPickerSlider channel="hue">
              <ColorPickerSliderThumb />
            </ColorPickerSlider>
            <ColorPickerInput aria-label="Disabled hex" />
          </ColorPicker>
        </div>
      </Group>
    </div>
  )
}
