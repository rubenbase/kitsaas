import { createSignal, For } from 'solid-js'

import { CloseIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Drawer,
  DrawerBackdrop,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHandle,
  DrawerTitle,
  DrawerTrigger,
  type SnapPoint,
} from '#/components/ui/drawer'
import { Field, FieldLabel } from '#/components/ui/field'
import { Input, InputGroup } from '#/components/ui/input'

import { Group } from '../demo-group'

const SIDES = [
  {
    side: 'right',
    label: 'Right',
    title: 'Inspector',
    description: 'Configure deployment settings and environment variables.',
  },
  {
    side: 'left',
    label: 'Left',
    title: 'Navigation',
    description: 'Jump between workspaces, projects, and billing.',
  },
  {
    side: 'bottom',
    label: 'Bottom',
    title: 'Share project',
    description: 'Invite collaborators or copy a read-only link.',
  },
  {
    side: 'top',
    label: 'Top',
    title: 'Notifications',
    description: 'Recent build alerts and team mentions.',
  },
] as const

const DEPLOYMENTS = [
  { id: 'dpl_9f2a', env: 'Production', branch: 'main', time: '2m ago' },
  { id: 'dpl_8c4e', env: 'Preview', branch: 'feat/drawer', time: '14m ago' },
  { id: 'dpl_7a1b', env: 'Preview', branch: 'fix/tokens', time: '1h ago' },
  { id: 'dpl_6e3d', env: 'Production', branch: 'main', time: '3h ago' },
  { id: 'dpl_5b8c', env: 'Preview', branch: 'chore/deps', time: '5h ago' },
  { id: 'dpl_4a9f', env: 'Production', branch: 'main', time: '1d ago' },
  { id: 'dpl_3d2e', env: 'Preview', branch: 'feat/toolbar', time: '1d ago' },
  { id: 'dpl_2c1a', env: 'Production', branch: 'main', time: '2d ago' },
]

export function DrawerDemo() {
  const [snapPoint, setSnapPoint] = createSignal<SnapPoint>(0.5)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Edges">
        <For each={SIDES}>
          {(item) => (
            <Drawer
              side={item.side}
              preventEdgeSwipe={item.side === 'left' || item.side === 'right'}
            >
              <DrawerTrigger
                render={(triggerProps) => (
                  <Button {...triggerProps} variant="outline">
                    {item.label}
                  </Button>
                )}
              />
              <DrawerBackdrop />
              <DrawerContent>
                {item.side === 'bottom' && (
                  <div data-slot="drawer-grip" aria-hidden="true" />
                )}
                <div data-slot="drawer-header">
                  <div data-slot="drawer-title-group">
                    <DrawerTitle
                      render={(titleProps) => <h3 {...titleProps} />}
                    >
                      {item.title}
                    </DrawerTitle>
                    <DrawerDescription>{item.description}</DrawerDescription>
                  </div>
                  <DrawerClose aria-label="Close">
                    <CloseIcon />
                  </DrawerClose>
                </div>
                <div data-slot="drawer-body">
                  <p class="m-0 text-[13px] text-secondary">
                    Drag toward the {item.side} edge, press Escape, or click the
                    backdrop to dismiss.
                  </p>
                </div>
                <div data-slot="drawer-footer">
                  <DrawerClose
                    render={(closeProps) => (
                      <Button {...closeProps} variant="neutral">
                        Close
                      </Button>
                    )}
                  />
                </div>
                {item.side === 'top' && (
                  <div data-slot="drawer-grip" aria-hidden="true" />
                )}
              </DrawerContent>
            </Drawer>
          )}
        </For>
      </Group>

      <Group label="Snap points & resize handle">
        <Drawer
          snapPoints={[0.3, 0.5, 1]}
          snapPoint={snapPoint()}
          onSnapPointChange={setSnapPoint}
          expandOnScroll
        >
          <DrawerTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Deployments ({String(snapPoint())})
              </Button>
            )}
          />
          <DrawerBackdrop />
          <DrawerContent fullHeight>
            <DrawerHandle aria-label="Resize deployments sheet" />
            <div data-slot="drawer-header">
              <div data-slot="drawer-title-group">
                <DrawerTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Recent deployments
                </DrawerTitle>
                <DrawerDescription>
                  Drag the sheet or press the handle pill (Up, Down, Home, End)
                  to snap between 30%, 50%, and full height.
                </DrawerDescription>
              </div>
              <DrawerClose aria-label="Close">
                <CloseIcon />
              </DrawerClose>
            </div>
            <div data-slot="drawer-body">
              <ul class="m-0 flex list-none flex-col divide-y divide-border-muted p-0">
                <For each={DEPLOYMENTS}>
                  {(dep) => (
                    <li class="flex items-center justify-between py-2.5 text-[13px]">
                      <div class="flex flex-col">
                        <span class="font-medium text-foreground">
                          {dep.branch}
                        </span>
                        <span class="font-mono text-[11px] text-muted">
                          {dep.id} · {dep.env}
                        </span>
                      </div>
                      <span class="text-[12px] text-faint tabular-nums">
                        {dep.time}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
      </Group>

      <Group label="Form sheet">
        <Drawer side="right">
          <DrawerTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Edit project
              </Button>
            )}
          />
          <DrawerBackdrop />
          <DrawerContent>
            <div data-slot="drawer-header">
              <div data-slot="drawer-title-group">
                <DrawerTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Project settings
                </DrawerTitle>
                <DrawerDescription>
                  Update the display name and production domain.
                </DrawerDescription>
              </div>
              <DrawerClose aria-label="Close">
                <CloseIcon />
              </DrawerClose>
            </div>
            <div data-slot="drawer-body">
              <div class="flex flex-col gap-4">
                <Field name="project-name">
                  <FieldLabel>Project name</FieldLabel>
                  <InputGroup class="w-full">
                    <Input defaultValue="Kitsaas Console" />
                  </InputGroup>
                </Field>
                <Field name="project-domain">
                  <FieldLabel>Domain</FieldLabel>
                  <InputGroup class="w-full">
                    <Input defaultValue="console.kitsaas.dev" />
                  </InputGroup>
                </Field>
              </div>
            </div>
            <div data-slot="drawer-footer">
              <DrawerClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Cancel
                  </Button>
                )}
              />
              <DrawerClose
                value="save"
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Save changes
                  </Button>
                )}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </Group>

      <Group label="Nested sheets">
        <Drawer>
          <DrawerTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Account
              </Button>
            )}
          />
          <DrawerBackdrop />
          <DrawerContent>
            <div data-slot="drawer-grip" aria-hidden="true" />
            <div data-slot="drawer-header">
              <div data-slot="drawer-title-group">
                <DrawerTitle render={(titleProps) => <h3 {...titleProps} />}>
                  Account security
                </DrawerTitle>
                <DrawerDescription>
                  Manage authentication and recovery keys.
                </DrawerDescription>
              </div>
              <DrawerClose aria-label="Close">
                <CloseIcon />
              </DrawerClose>
            </div>
            <div data-slot="drawer-body">
              <dl class="m-0 flex flex-col gap-2 text-[13px]">
                <div class="flex justify-between">
                  <dt class="text-muted">Email</dt>
                  <dd class="m-0 text-foreground">hollis@kitsaas.dev</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-muted">Two-factor</dt>
                  <dd class="m-0 text-foreground">Enabled</dd>
                </div>
              </dl>
            </div>
            <div data-slot="drawer-footer">
              <Drawer>
                <DrawerTrigger
                  render={(triggerProps) => (
                    <Button {...triggerProps} variant="neutral">
                      Rotate key
                    </Button>
                  )}
                />
                <DrawerBackdrop />
                <DrawerContent size="small">
                  <div data-slot="drawer-grip" aria-hidden="true" />
                  <div data-slot="drawer-header">
                    <div data-slot="drawer-title-group">
                      <DrawerTitle
                        render={(titleProps) => <h3 {...titleProps} />}
                      >
                        Rotate recovery key
                      </DrawerTitle>
                      <DrawerDescription>
                        A new key replaces the previous one immediately.
                      </DrawerDescription>
                    </div>
                  </div>
                  <div data-slot="drawer-footer">
                    <DrawerClose
                      render={(closeProps) => (
                        <Button {...closeProps} variant="neutral">
                          Cancel
                        </Button>
                      )}
                    />
                    <DrawerClose
                      render={(closeProps) => (
                        <Button {...closeProps} variant="contrast">
                          Generate key
                        </Button>
                      )}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
              <DrawerClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Done
                  </Button>
                )}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </Group>
    </div>
  )
}
