import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CopyIcon,
  PlusIcon,
  RotateCcwIcon,
  SearchIcon,
} from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from '#/components/ui/button-group'
import { Input, InputGroup } from '#/components/ui/input'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '#/components/ui/menu'

import { Group } from '../demo-group'

export function ButtonGroupDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default">
        <ButtonGroup aria-label="Message actions">
          <Button variant="outline">Archive</Button>
          <Button variant="outline">Report</Button>
          <Button variant="outline">Snooze</Button>
        </ButtonGroup>
      </Group>

      <Group label="Orientation">
        <ButtonGroup orientation="vertical" aria-label="Zoom">
          <Button variant="outline" aria-label="Zoom in">
            <PlusIcon />
          </Button>
          <Button variant="outline" aria-label="Reset zoom">
            <RotateCcwIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical" aria-label="Media controls">
          <Button variant="neutral">Play</Button>
          <ButtonGroupSeparator orientation="horizontal" />
          <Button variant="neutral">Pause</Button>
        </ButtonGroup>
      </Group>

      <Group label="Nested">
        <ButtonGroup>
          <ButtonGroup aria-label="Pages">
            <Button variant="outline" size="small">
              1
            </Button>
            <Button variant="outline" size="small">
              2
            </Button>
            <Button variant="outline" size="small">
              3
            </Button>
          </ButtonGroup>
          <ButtonGroup aria-label="Page navigation">
            <Button variant="outline" size="small" aria-label="Previous page">
              <ArrowLeftIcon />
            </Button>
            <Button variant="outline" size="small" aria-label="Next page">
              <ArrowRightIcon />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Group>

      <Group label="Separator">
        <ButtonGroup aria-label="Clipboard">
          <Button variant="neutral" icon={<CopyIcon />}>
            Copy
          </Button>
          <ButtonGroupSeparator />
          <Button variant="neutral">Paste</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Deploy">
          <Button variant="contrast">Deploy</Button>
          <ButtonGroupSeparator />
          <Button variant="contrast">Preview</Button>
        </ButtonGroup>
      </Group>

      <Group label="Split">
        <ButtonGroup aria-label="Merge pull request">
          <Button variant="neutral">Merge</Button>
          <ButtonGroupSeparator />
          <Menu>
            <MenuTrigger
              render={(triggerProps) => (
                <Button
                  {...triggerProps}
                  variant="neutral"
                  aria-label="More merge options"
                >
                  <ChevronDownIcon />
                </Button>
              )}
            />
            <MenuContent sideOffset={6} align="end">
              <MenuItem value="squash">Squash and merge</MenuItem>
              <MenuItem value="rebase">Rebase and merge</MenuItem>
            </MenuContent>
          </Menu>
        </ButtonGroup>
      </Group>

      <Group label="Input">
        <ButtonGroup aria-label="Search">
          <InputGroup leadingIcon={<SearchIcon />}>
            <Input type="search" placeholder="Search…" aria-label="Search" />
          </InputGroup>
          <Button variant="outline">Search</Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Website">
          <ButtonGroupText>https://</ButtonGroupText>
          <InputGroup>
            <Input placeholder="example.com" aria-label="Website" />
          </InputGroup>
        </ButtonGroup>
      </Group>
    </div>
  )
}
