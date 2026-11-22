import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  ImageCropper,
  ImageCropperFlip,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperImage,
  ImageCropperRotate,
  ImageCropperSelection,
  ImageCropperViewport,
  ImageCropperZoom,
  type ImageCrop,
  type ImageCropperHandlePosition,
} from '#/components/ui/image-cropper'

import { Group } from '../demo-group'

const landscapeSvg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c3d4fd"/>
        <stop offset="55%" stop-color="#ecf1fe"/>
        <stop offset="100%" stop-color="#fcefd0"/>
      </linearGradient>
      <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3250df"/>
        <stop offset="100%" stop-color="#22388f"/>
      </linearGradient>
      <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#3a3a3a"/>
        <stop offset="100%" stop-color="#161616"/>
      </linearGradient>
    </defs>
    <rect width="800" height="500" fill="url(#sky)"/>
    <circle cx="590" cy="145" r="54" fill="#f6c251" opacity="0.95"/>
    <circle cx="590" cy="145" r="82" fill="#f6c251" opacity="0.22"/>
    <path d="M0 325 L145 195 L270 295 L415 160 L565 285 L685 215 L800 290 L800 500 L0 500 Z" fill="url(#mtn1)" opacity="0.72"/>
    <path d="M0 375 L190 265 L350 350 L525 255 L700 345 L800 310 L800 500 L0 500 Z" fill="url(#mtn2)"/>
    <path d="M0 435 Q200 405 400 430 T800 422 L800 500 L0 500 Z" fill="#080808"/>
  </svg>`,
)}`

const portraitSvg = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="620" viewBox="0 0 520 620">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ebecfe"/>
        <stop offset="50%" stop-color="#c4edf4"/>
        <stop offset="100%" stop-color="#ecf1fe"/>
      </linearGradient>
    </defs>
    <rect width="520" height="620" fill="url(#bg)"/>
    <circle cx="110" cy="110" r="90" fill="#7698fd" opacity="0.18"/>
    <circle cx="420" cy="480" r="120" fill="#00abcf" opacity="0.16"/>
    <circle cx="260" cy="230" r="82" fill="#2e2e2e"/>
    <path d="M120 510 C120 395 182 345 260 345 C338 345 400 395 400 510 Z" fill="#242424"/>
    <circle cx="235" cy="218" r="7" fill="#fafafa" opacity="0.7"/>
    <circle cx="285" cy="218" r="7" fill="#fafafa" opacity="0.7"/>
    <path d="M236 254 Q260 272 284 254" stroke="#fafafa" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.7"/>
  </svg>`,
)}`

const handles: ImageCropperHandlePosition[] = [
  'nw',
  'n',
  'ne',
  'e',
  'se',
  's',
  'sw',
  'w',
]

const aspectRatios: { label: string; value: number | undefined }[] = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
]

export function ImageCropperDemo() {
  const [ratio, setRatio] = createSignal<number | undefined>(16 / 9)
  const [boxCrop, setBoxCrop] = createSignal<Required<ImageCrop> | null>(null)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Box cropper with aspect ratio">
        <div class="flex w-full flex-col gap-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5">
              <For each={aspectRatios}>
                {(option) => (
                  <Button
                    size="small"
                    variant={ratio() === option.value ? 'contrast' : 'neutral'}
                    aria-pressed={ratio() === option.value ? 'true' : 'false'}
                    onClick={() => setRatio(option.value)}
                  >
                    {option.label}
                  </Button>
                )}
              </For>
            </div>
            <span class="font-mono text-[11px] tabular-nums text-faint">
              {boxCrop()
                ? `${Math.round(boxCrop()!.width)}×${Math.round(boxCrop()!.height)} px`
                : 'Loading…'}
            </span>
          </div>

          <ImageCropper
            aria-label="Cover landscape cropper"
            src={landscapeSvg}
            aspectRatio={ratio()}
            minWidth={80}
            minHeight={60}
            maxZoom={3}
            onCropChange={(next) => setBoxCrop(next)}
          >
            {(state) => (
              <>
                <ImageCropperViewport>
                  <ImageCropperImage alt="Geometric mountain horizon" />
                  <ImageCropperSelection>
                    <ImageCropperGrid />
                  </ImageCropperSelection>
                  <For each={handles}>
                    {(pos) => <ImageCropperHandle position={pos} />}
                  </For>
                </ImageCropperViewport>

                <div class="flex flex-wrap items-center gap-2">
                  <span class="text-[11px] text-faint">Zoom</span>
                  <ImageCropperZoom aria-label="Zoom cover photo" />
                  <span class="w-10 text-right font-mono text-[11px] tabular-nums text-secondary">
                    {Math.round(state.zoom * 100)}%
                  </span>
                </div>

                <div class="flex flex-wrap items-center gap-1.5">
                  <ImageCropperRotate>Rotate 90°</ImageCropperRotate>
                  <ImageCropperFlip>Flip H</ImageCropperFlip>
                  <ImageCropperFlip direction="vertical">
                    Flip V
                  </ImageCropperFlip>
                </div>
              </>
            )}
          </ImageCropper>
        </div>
      </Group>

      <Group label="Avatar frame mode (pan & zoom)">
        <div class="flex w-full flex-col gap-3">
          <ImageCropper
            aria-label="Avatar cropper"
            src={portraitSvg}
            mode="frame"
            shape="circle"
            aspectRatio={1}
            maxZoom={4}
          >
            {(state) => (
              <>
                <div class="flex items-center justify-between text-[12px] text-secondary">
                  <span>Drag image or scroll wheel to zoom</span>
                  <span class="font-mono text-[11px] tabular-nums text-faint">
                    {Math.round(state.zoom * 100)}%
                  </span>
                </div>

                <ImageCropperViewport>
                  <ImageCropperImage alt="Portrait illustration" />
                  <ImageCropperSelection>
                    <ImageCropperGrid />
                  </ImageCropperSelection>
                </ImageCropperViewport>

                <div class="flex items-center gap-2">
                  <ImageCropperZoom aria-label="Zoom avatar" />
                  <ImageCropperRotate>Rotate</ImageCropperRotate>
                  <ImageCropperFlip>Flip</ImageCropperFlip>
                </div>
              </>
            )}
          </ImageCropper>
        </div>
      </Group>
    </div>
  )
}
