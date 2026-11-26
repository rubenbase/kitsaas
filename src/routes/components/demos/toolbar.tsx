import { createSignal } from 'solid-js'

import { ChevronDownIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '#/components/ui/menu'
import { Toggle, ToggleGroup, ToggleIcon } from '#/components/ui/toggle'
import {
  createToolbarController,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
} from '#/components/ui/toolbar'

import { Group } from '../demo-group'

function BoldSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 3.5h4a2.25 2.25 0 0 1 0 4.5h-4V3.5Zm0 4.5h4.5a2.25 2.25 0 0 1 0 4.5H4.5V8Z" />
    </svg>
  )
}

function ItalicSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M10.5 3.5h-4M9.5 12.5h-4M9 3.5 7 12.5" />
    </svg>
  )
}

function UnderlineSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4.5 3.5V7a3.5 3.5 0 0 0 7 0V3.5M3.5 13h9" />
    </svg>
  )
}

function AlignLeftSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M2.5 8h7.5M2.5 12h9.5" />
    </svg>
  )
}

function AlignCenterSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M4.25 8h7.5M3.25 12h9.5" />
    </svg>
  )
}

function AlignRightSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <path d="M2.5 4h11M6 8h7.5M4 12h9.5" />
    </svg>
  )
}

function CursorSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m3.5 2.5 9.5 4-4.25 1.5L7.25 12.5 3.5 2.5Z" />
    </svg>
  )
}

function PenSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M11.5 2.5a1.5 1.5 0 0 1 2 2l-7.5 7.5-3 .75.75-3 7.75-7.25Z" />
    </svg>
  )
}

function SquareSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="10" height="10" rx="1.5" />
    </svg>
  )
}

function TrashSvg() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.25"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.5 8.5h6l.5-8.5" />
    </svg>
  )
}

export function ToolbarDemo() {
  const [lastAction, setLastAction] = createSignal('None')
  const [tool, setTool] = createSignal<string[]>(['select'])
  const editorToolbar = createToolbarController()

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Editor toolbar">
          <div class="flex flex-col items-start gap-2.5">
            <Toolbar controller={editorToolbar} aria-label="Text formatting">
              <ToggleGroup
                multiple
                defaultValue={['bold']}
                aria-label="Text styles"
                onValueChange={(values) =>
                  setLastAction(
                    values.length ? `Styles: ${values.join(', ')}` : 'Styles: none',
                  )
                }
              >
                <Toggle value="bold" aria-label="Bold">
                  <ToggleIcon>
                    <BoldSvg />
                  </ToggleIcon>
                </Toggle>
                <Toggle value="italic" aria-label="Italic">
                  <ToggleIcon>
                    <ItalicSvg />
                  </ToggleIcon>
                </Toggle>
                <Toggle value="underline" aria-label="Underline">
                  <ToggleIcon>
                    <UnderlineSvg />
                  </ToggleIcon>
                </Toggle>
              </ToggleGroup>

              <ToolbarSeparator />

              <ToggleGroup
                defaultValue={['left']}
                deselectable={false}
                aria-label="Paragraph alignment"
                onValueChange={([value]) => setLastAction(`Align ${value}`)}
              >
                <Toggle value="left" aria-label="Align left">
                  <ToggleIcon>
                    <AlignLeftSvg />
                  </ToggleIcon>
                </Toggle>
                <Toggle value="center" aria-label="Align center">
                  <ToggleIcon>
                    <AlignCenterSvg />
                  </ToggleIcon>
                </Toggle>
                <Toggle value="right" aria-label="Align right">
                  <ToggleIcon>
                    <AlignRightSvg />
                  </ToggleIcon>
                </Toggle>
              </ToggleGroup>

              <ToolbarSeparator />

              <Menu onAction={(value) => setLastAction(`Export as ${value}`)}>
                <ToolbarButton
                  render={(buttonProps) => <MenuTrigger {...buttonProps} />}
                >
                  Export
                  <ChevronDownIcon class="h-3.5 w-3.5 text-muted" />
                </ToolbarButton>
                <MenuContent>
                  <MenuItem value="markdown">Markdown</MenuItem>
                  <MenuItem value="pdf">PDF document</MenuItem>
                  <MenuItem value="html">HTML snippet</MenuItem>
                </MenuContent>
              </Menu>

              <ToolbarSeparator />

              <ToolbarLink
                href="#docs"
                onClick={(event) => {
                  event.preventDefault()
                  setLastAction('Opened shortcuts guide')
                }}
              >
                Shortcuts
              </ToolbarLink>
            </Toolbar>

            <div class="flex items-center gap-3">
              <Button
                size="small"
                variant="outline"
                onClick={() => editorToolbar.focus()}
              >
                Focus toolbar
              </Button>
              <span class="text-[12px] text-muted">
                Last action: {lastAction()}
              </span>
            </div>
          </div>
        </Group>
      </div>

      <Group label="With search input & groups">
        <Toolbar aria-label="Table controls">
          <ToolbarGroup aria-label="Row actions">
            <ToolbarButton onClick={() => setLastAction('Duplicate')}>
              Duplicate
            </ToolbarButton>
            <ToolbarButton disabled onClick={() => setLastAction('Archive')}>
              Archive
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarInput aria-label="Filter rows" placeholder="Filter…" />
        </Toolbar>
      </Group>

      <Group label="Vertical palette">
        <div class="flex items-start gap-3">
          <Toolbar orientation="vertical" aria-label="Canvas tools">
            <ToggleGroup
              orientation="vertical"
              value={tool()}
              onValueChange={setTool}
              deselectable={false}
              aria-label="Drawing tool"
            >
              <Toggle value="select" aria-label="Select">
                <ToggleIcon>
                  <CursorSvg />
                </ToggleIcon>
              </Toggle>
              <Toggle value="pen" aria-label="Pen">
                <ToggleIcon>
                  <PenSvg />
                </ToggleIcon>
              </Toggle>
              <Toggle value="rectangle" aria-label="Rectangle">
                <ToggleIcon>
                  <SquareSvg />
                </ToggleIcon>
              </Toggle>
            </ToggleGroup>
            <ToolbarSeparator />
            <ToolbarButton
              aria-label="Delete selection"
              onClick={() => setLastAction('Deleted selection')}
            >
              <TrashSvg />
            </ToolbarButton>
          </Toolbar>
          <span class="text-[12px] text-muted">Active tool: {tool()[0]}</span>
        </div>
      </Group>
    </div>
  )
}
