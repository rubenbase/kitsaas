import { CloseIcon } from '#/components/icons'
import { Button } from '#/components/ui/button'
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRegion,
  ToastTitle,
  toast,
} from '#/components/ui/toast'

import { Group } from '../demo-group'

export function ToastDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Types">
        <Button
          variant="outline"
          onClick={() =>
            toast.success('Changes saved', {
              description: 'Your edits are live.',
            })
          }
        >
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.error("Couldn't save changes", {
              description: 'Check your connection and try again.',
            })
          }
        >
          Error
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.info('A new version is available', {
              description: 'Reload to get the latest build.',
            })
          }
        >
          Info
        </Button>
      </Group>

      <Group label="Action and cancel">
        <Button
          variant="outline"
          onClick={() =>
            toast('Message archived', {
              description: 'Hollis Grant · Q3 report',
              action: { label: 'Undo' },
              cancel: { label: 'Dismiss' },
            })
          }
        >
          Archive message
        </Button>
      </Group>

      <Group label="Stacking">
        <Button
          variant="outline"
          onClick={() => {
            for (const title of [
              'Download started',
              'Changes saved',
              'Upload complete',
              'Ready to sync',
            ]) {
              toast(title)
            }
          }}
        >
          Add four toasts
        </Button>
      </Group>

      <Group label="Promise">
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              () => new Promise<void>((resolve) => setTimeout(resolve, 1500)),
              {
                loading: 'Saving changes…',
                success: 'Changes saved',
                error: "Couldn't save changes",
              },
            )
          }
        >
          Save changes
        </Button>
      </Group>

      <ToastRegion>
        {(item) => (
          <Toast>
            {item.type === 'default' ? undefined : (
              <span
                data-icon
                class={
                  item.type === 'success'
                    ? 'text-success'
                    : item.type === 'error'
                      ? 'text-danger'
                      : 'text-info'
                }
              >
                {item.type === 'success' ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="5.75" />
                    <path d="m5.25 8.25 1.9 1.9 3.6-4.3" />
                  </svg>
                ) : item.type === 'error' ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="5.75" />
                    <path d="m6 6 4 4M10 6l-4 4" />
                  </svg>
                ) : item.type === 'loading' ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M13.25 8a5.25 5.25 0 1 1-3.6-4.98" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="8" cy="8" r="5.75" />
                    <path d="M8 7.25v3.5M8 5.25h.01" />
                  </svg>
                )}
              </span>
            )}
            <div data-slot="toast-content">
              <ToastTitle render={(titleProps) => <h3 {...titleProps} />} />
              <ToastDescription />
            </div>
            <ToastClose
              aria-label="Dismiss"
              render={(closeProps) => (
                <Button
                  {...closeProps}
                  variant="ghost-muted"
                  size="small"
                  icon={<CloseIcon />}
                />
              )}
            />
            {item.action || item.cancel ? (
              <div data-slot="toast-actions">
                <ToastAction
                  render={(actionProps) => (
                    <Button {...actionProps} variant="neutral" size="small" />
                  )}
                />
                {item.cancel ? (
                  <ToastClose
                    action={item.cancel.onCancel}
                    render={(cancelProps) => (
                      <Button {...cancelProps} variant="ghost" size="small">
                        {item.cancel?.label}
                      </Button>
                    )}
                  />
                ) : undefined}
              </div>
            ) : undefined}
          </Toast>
        )}
      </ToastRegion>
    </div>
  )
}
