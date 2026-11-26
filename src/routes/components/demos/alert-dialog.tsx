import { createSignal, For, Show } from 'solid-js'

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  createConfirm,
} from '#/components/ui/alert-dialog'
import { Button } from '#/components/ui/button'

import { Group } from '../demo-group'

const INITIAL_KEYS = ['Production API', 'Staging Webhook', 'CI Deploy Token']

export function AlertDialogDemo() {
  const [discardOpen, setDiscardOpen] = createSignal(false)
  const [lastOutcome, setLastOutcome] = createSignal<string>('None yet')
  const [nestedOuterOpen, setNestedOuterOpen] = createSignal(false)
  const [keys, setKeys] = createSignal<string[]>(INITIAL_KEYS)
  const confirmDelete = createConfirm<{ name: string }>()
  let asyncAttempts = 0

  async function runDeleteAction() {
    await new Promise((resolve) => setTimeout(resolve, 900))
    if (asyncAttempts++ === 0) {
      throw new Error('Could not reach the server. Try deleting again.')
    }
    setLastOutcome('Deleted deployment history')
  }

  async function handleRevoke(name: string) {
    const confirmed = await confirmDelete({ name })
    if (!confirmed) return
    setKeys((list) => list.filter((item) => item !== name))
  }

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Destructive confirmation">
        <AlertDialog
          onOpenChange={(open, details) => {
            if (!open) {
              setLastOutcome(
                details.returnValue === 'confirm'
                  ? 'Deleted project'
                  : 'Canceled',
              )
            }
          }}
        >
          <AlertDialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="danger">
                Delete project
              </Button>
            )}
          />
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <div data-slot="alert-dialog-header">
              <AlertDialogTitle
                render={(titleProps) => <h3 {...titleProps} />}
              >
                Delete this project?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the project, its source files, and all
                deployment logs for everyone on your team.
              </AlertDialogDescription>
            </div>
            <div data-slot="alert-dialog-footer">
              <AlertDialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Cancel
                  </Button>
                )}
              />
              <AlertDialogClose
                value="confirm"
                render={(closeProps) => (
                  <Button {...closeProps} variant="danger">
                    Delete project
                  </Button>
                )}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <span class="text-[12px] text-muted">Outcome: {lastOutcome()}</span>
      </Group>

      <Group label="Controlled">
        <AlertDialog
          open={discardOpen()}
          onOpenChange={(open, details) => {
            setDiscardOpen(open)
            if (!open && details.returnValue === 'confirm') {
              setLastOutcome('Discarded draft')
            }
          }}
        >
          <AlertDialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Discard draft
              </Button>
            )}
          />
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <div data-slot="alert-dialog-header">
              <AlertDialogTitle
                render={(titleProps) => <h3 {...titleProps} />}
              >
                Discard unsaved changes?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Your edits to the billing webhook configuration will be lost if
                you leave without saving.
              </AlertDialogDescription>
            </div>
            <div data-slot="alert-dialog-footer">
              <AlertDialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Keep editing
                  </Button>
                )}
              />
              <AlertDialogClose
                value="confirm"
                render={(closeProps) => (
                  <Button {...closeProps} variant="contrast">
                    Discard
                  </Button>
                )}
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </Group>

      <Group label="Async action with retry">
        <AlertDialog pendingAnnouncement="Deleting deployment history">
          <AlertDialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Clear deployments
              </Button>
            )}
          />
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <div data-slot="alert-dialog-header">
              <AlertDialogTitle
                render={(titleProps) => <h3 {...titleProps} />}
              >
                Clear deployment history?
              </AlertDialogTitle>
              <AlertDialogDescription>
                First attempt simulates a network error so you can test the
                pending and retry states.
              </AlertDialogDescription>
            </div>
            <AlertDialogClose
              value="confirm"
              action={runDeleteAction}
              render={(closeProps, state) => (
                <div class="w-full">
                  <Show when={state.error instanceof Error}>
                    <div data-slot="alert-dialog-body">
                      <p
                        role="alert"
                        class="m-0 text-[12px] leading-4 text-danger"
                      >
                        {state.error instanceof Error
                          ? state.error.message
                          : ''}
                      </p>
                    </div>
                  </Show>
                  <div data-slot="alert-dialog-footer">
                    <AlertDialogClose
                      render={(cancelProps) => (
                        <Button {...cancelProps} variant="neutral">
                          Cancel
                        </Button>
                      )}
                    />
                    <Button
                      {...closeProps}
                      variant={state.pending ? 'loading' : 'danger'}
                    >
                      {state.pending
                        ? 'Deleting…'
                        : state.error
                          ? 'Try again'
                          : 'Clear history'}
                    </Button>
                  </div>
                </div>
              )}
            />
          </AlertDialogContent>
        </AlertDialog>
      </Group>

      <Group label="Nested confirmation">
        <AlertDialog
          open={nestedOuterOpen()}
          onOpenChange={setNestedOuterOpen}
        >
          <AlertDialogTrigger
            render={(triggerProps) => (
              <Button {...triggerProps} variant="outline">
                Delete workspace
              </Button>
            )}
          />
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <div data-slot="alert-dialog-header">
              <AlertDialogTitle
                render={(titleProps) => <h3 {...titleProps} />}
              >
                Delete this workspace?
              </AlertDialogTitle>
              <AlertDialogDescription>
                All 12 projects and active API tokens will be removed for every
                member.
              </AlertDialogDescription>
            </div>
            <div data-slot="alert-dialog-footer">
              <AlertDialogClose
                render={(closeProps) => (
                  <Button {...closeProps} variant="neutral">
                    Cancel
                  </Button>
                )}
              />
              <AlertDialog
                onOpenChange={(nestedOpen, details) => {
                  if (!nestedOpen && details.returnValue === 'confirm') {
                    setNestedOuterOpen(false)
                    setLastOutcome('Deleted workspace')
                  }
                }}
              >
                <AlertDialogTrigger
                  render={(triggerProps) => (
                    <Button {...triggerProps} variant="danger">
                      Continue
                    </Button>
                  )}
                />
                <AlertDialogBackdrop />
                <AlertDialogContent>
                  <div data-slot="alert-dialog-header">
                    <AlertDialogTitle
                      render={(titleProps) => <h3 {...titleProps} />}
                    >
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone once confirmed.
                    </AlertDialogDescription>
                  </div>
                  <div data-slot="alert-dialog-footer">
                    <AlertDialogClose
                      render={(closeProps) => (
                        <Button {...closeProps} variant="neutral">
                          Go back
                        </Button>
                      )}
                    />
                    <AlertDialogClose
                      value="confirm"
                      render={(closeProps) => (
                        <Button {...closeProps} variant="danger">
                          Delete workspace
                        </Button>
                      )}
                    />
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Imperative createConfirm">
          <div class="flex w-full max-w-[420px] flex-col gap-2">
            <div class="flex flex-col divide-y divide-border-muted rounded-lg border border-border bg-surface">
              <For
                each={keys()}
                fallback={
                  <div class="flex items-center justify-between px-3 py-2.5 text-[13px] text-muted">
                    <span>All API keys revoked.</span>
                    <Button
                      size="small"
                      variant="outline"
                      onClick={() => setKeys(INITIAL_KEYS)}
                    >
                      Restore keys
                    </Button>
                  </div>
                }
              >
                {(keyName) => (
                  <div class="flex items-center justify-between gap-3 px-3 py-2">
                    <span class="text-[13px] font-medium text-foreground">
                      {keyName}
                    </span>
                    <Button
                      size="small"
                      variant="ghost-danger"
                      onClick={() => handleRevoke(keyName)}
                    >
                      Revoke
                    </Button>
                  </div>
                )}
              </For>
            </div>

            <AlertDialog controller={confirmDelete.controller}>
              <AlertDialogBackdrop />
              <AlertDialogContent<{ name: string }>>
                {(state) => (
                  <>
                    <div data-slot="alert-dialog-header">
                      <AlertDialogTitle
                        render={(titleProps) => <h3 {...titleProps} />}
                      >
                        Revoke {state.payload?.name}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Any service authenticating with this key will
                        immediately stop working.
                      </AlertDialogDescription>
                    </div>
                    <div data-slot="alert-dialog-footer">
                      <AlertDialogClose
                        render={(closeProps) => (
                          <Button {...closeProps} variant="neutral">
                            Cancel
                          </Button>
                        )}
                      />
                      <AlertDialogClose
                        value="confirm"
                        render={(closeProps) => (
                          <Button {...closeProps} variant="danger">
                            Revoke key
                          </Button>
                        )}
                      />
                    </div>
                  </>
                )}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Group>
      </div>
    </div>
  )
}
