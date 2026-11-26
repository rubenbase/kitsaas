import { For } from 'solid-js'

import { CloseIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'

import { Group } from '../demo-group'

export function DialogDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Sizes">
        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Normal
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent>
            <div data-slot="dialog-header">
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Normal
                </DialogTitle>
                <DialogDescription>Normal size</DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <p class="px-4 pb-4 text-[13px] text-secondary">
                Normal dialog content.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Large
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent size="large">
            <div data-slot="dialog-header">
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Large
                </DialogTitle>
                <DialogDescription>Large size</DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <p class="px-4 pb-4 text-[13px] text-secondary">
                Large dialog content.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                X-large
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent size="x-large">
            <div data-slot="dialog-header">
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Extra large
                </DialogTitle>
                <DialogDescription>X-large size</DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <p class="px-4 pb-4 text-[13px] text-secondary">
                X-large dialog content.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </Group>

      <Group label="Header and footer">
        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Save changes
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent fit>
            <div data-slot="dialog-header">
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Save changes
                </DialogTitle>
                <DialogDescription>
                  Your changes will be lost if you don&apos;t save them.
                </DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <p class="px-4 pb-4 text-[13px] text-secondary">
                Three files changed.
              </p>
            </div>
            <div data-slot="dialog-footer">
              <DialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Cancel
                  </Button>
                )}
              />
              <DialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Save
                  </Button>
                )}
              />
            </div>
          </DialogContent>
        </Dialog>
      </Group>

      <Group label="Scrollable content">
        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Terms of service
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent initialFocus="content">
            <div data-slot="dialog-header" data-hide-close>
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Terms of service
                </DialogTitle>
                <DialogDescription>
                  Please read before you continue.
                </DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <div class="h-full overflow-y-auto px-4 pb-4 text-[13px] leading-5 text-secondary">
                <For
                  each={[
                    'These terms govern your use of the service. By creating an account, you agree to them and to the privacy policy that explains how we handle your data.',
                    "You're responsible for the content you upload and for keeping your password safe. Tell us right away if you think someone else has used your account.",
                    "We may change the service, and these terms, as the product grows. When a change affects you, we'll let you know by email at least 30 days before it takes effect.",
                    'You can stop using the service at any time. We keep your data for 30 days after you close your account, so you can export it, and then delete it.',
                  ]}
                >
                  {(paragraph) => <p class="mt-2 first:mt-0">{paragraph}</p>}
                </For>
              </div>
            </div>
            <div data-slot="dialog-footer">
              <DialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Decline
                  </Button>
                )}
              />
              <DialogClose
                value="accept"
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Accept
                  </Button>
                )}
              />
            </div>
          </DialogContent>
        </Dialog>
      </Group>

      <Group label="Opened from a trigger">
        <Dialog>
          <DialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Choose model
              </Button>
            )}
          />
          <DialogBackdrop />
          <DialogContent fit>
            <div data-slot="dialog-header">
              <div data-slot="dialog-title-group">
                <DialogTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Choose model
                </DialogTitle>
                <DialogDescription>Pick Alpha or Beta</DialogDescription>
              </div>
              <DialogClose aria-label="Close">
                <CloseIcon />
              </DialogClose>
            </div>
            <div data-slot="dialog-body">
              <p class="px-4 pb-4 text-[13px] text-secondary">
                Alpha and Beta are available.
              </p>
            </div>
            <div data-slot="dialog-footer">
              <DialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Done
                  </Button>
                )}
              />
            </div>
          </DialogContent>
        </Dialog>
      </Group>
    </div>
  )
}
