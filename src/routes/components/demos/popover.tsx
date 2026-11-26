import { CloseIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '#/components/ui/popover'

import { Group } from '../demo-group'

export function PopoverDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Default open">
        <Popover defaultOpen>
          <PopoverTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Open popover
              </Button>
            )}
          />
          <PopoverContent>
            <PopoverTitle render={(titleProps) => <h3 {...titleProps} />}>
              Filters
            </PopoverTitle>
            <PopoverDescription>Optional description</PopoverDescription>
            <p class="mt-3 text-[13px] text-secondary">Popover content</p>
          </PopoverContent>
        </Popover>
      </Group>

      <Group label="With arrow">
        <Popover>
          <PopoverTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Show details
              </Button>
            )}
          />
          <PopoverContent sideOffset={10}>
            <PopoverArrow />
            <PopoverTitle render={(titleProps) => <h3 {...titleProps} />}>
              Keyboard shortcuts
            </PopoverTitle>
            <PopoverDescription>
              Press ? anywhere to see them all.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      </Group>

      <Group label="With title, description and close">
        <Popover>
          <PopoverTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Share
              </Button>
            )}
          />
          <PopoverContent>
            <div data-slot="popover-header">
              <PopoverTitle render={(titleProps) => <h3 {...titleProps} />}>
                Share this document
              </PopoverTitle>
              <PopoverClose
                aria-label="Close"
                render={(closeProps) => (
                  <Button
                    {...closeProps}
                    variant="ghost"
                    size="small"
                    icon={<CloseIcon />}
                  />
                )}
              />
            </div>
            <PopoverDescription>
              Anyone with the link can view it.
            </PopoverDescription>
            <div class="mt-3 flex justify-end gap-2">
              <PopoverClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral" size="small">
                    Cancel
                  </Button>
                )}
              />
              <PopoverClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast" size="small">
                    Copy link
                  </Button>
                )}
              />
            </div>
          </PopoverContent>
        </Popover>
      </Group>

      <Group label="With a form">
        <Popover>
          <PopoverTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Edit profile
              </Button>
            )}
          />
          <PopoverContent>
            <PopoverTitle render={(titleProps) => <h3 {...titleProps} />}>
              Edit profile
            </PopoverTitle>
            <PopoverDescription>
              Your name shows on your posts.
            </PopoverDescription>
            <form class="mt-3" onSubmit={(event) => event.preventDefault()}>
              <Field name="name">
                <FieldLabel>Name</FieldLabel>
                <Input name="name" defaultValue="Hollis Grant" />
              </Field>
              <div class="mt-3 flex justify-end gap-2">
                <PopoverClose
                  render={(closeProps) => (
                    <Button {...closeProps} variant="neutral" size="small">
                      Cancel
                    </Button>
                  )}
                />
                <Button type="submit" variant="contrast" size="small">
                  Save
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </Group>
    </div>
  )
}
