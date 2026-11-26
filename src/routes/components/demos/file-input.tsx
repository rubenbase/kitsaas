import { createSignal, For, Show } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import {
  FileInput,
  FileInputDropzone,
  FileInputItem,
  FileInputItemRemove,
  FileInputList,
  FileInputTrigger,
  formatFileSize,
  type FileRejection,
} from '#/components/ui/file-input'

import { Group } from '../demo-group'

function UploadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={1.75}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m17 8-5-5-5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={1.75}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    </svg>
  )
}

function makeSampleFile(name: string, bytes: number, type: string) {
  return new File([new Uint8Array(bytes)], name, { type })
}

export function FileInputDemo() {
  const sampleFiles = [
    makeSampleFile('architecture-spec.pdf', 248_320, 'application/pdf'),
    makeSampleFile('tokens-preview.png', 84_110, 'image/png'),
  ]

  const [rejections, setRejections] = createSignal<FileRejection[]>([])
  const [submitted, setSubmitted] = createSignal<string | null>(null)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Dropzone with files">
        <FileInput multiple defaultValue={sampleFiles}>
          <FileInputDropzone>
            <UploadIcon />
            <p>Drop files here or paste from clipboard</p>
            <p data-slot="hint">PNG, JPG, PDF, or Markdown up to 10 MB</p>
            <FileInputTrigger>Browse files</FileInputTrigger>
          </FileInputDropzone>
          <FileInputList aria-label="Selected files">
            <FileInputItem>
              {({ file }) => (
                <>
                  <DocumentIcon />
                  <span>{file.name}</span>
                  <span data-slot="hint">{formatFileSize(file.size)}</span>
                  <FileInputItemRemove />
                </>
              )}
            </FileInputItem>
          </FileInputList>
        </FileInput>
      </Group>

      <Group label="Accepted types & limits">
        <div class="flex w-full max-w-[380px] flex-col gap-2">
          <FileInput
            multiple
            accept={['image/*', '.pdf']}
            maxFiles={3}
            maxSize={2_000_000}
            onValueChange={() => setRejections([])}
            onReject={(rejected) => setRejections(rejected)}
          >
            <FileInputDropzone>
              {(state) => (
                <>
                  <UploadIcon />
                  <p>
                    {state.dragReject
                      ? 'Only images or PDFs (max 3 files)'
                      : state.dragAccept
                        ? 'Release to attach files'
                        : 'Drop images or PDFs'}
                  </p>
                  <p data-slot="hint">Up to 3 files, 2 MB each</p>
                  <FileInputTrigger>Choose files</FileInputTrigger>
                </>
              )}
            </FileInputDropzone>
            <FileInputList aria-label="Accepted files">
              <FileInputItem>
                {({ file }) => (
                  <>
                    <DocumentIcon />
                    <span>{file.name}</span>
                    <span data-slot="hint">{formatFileSize(file.size)}</span>
                    <FileInputItemRemove />
                  </>
                )}
              </FileInputItem>
            </FileInputList>
          </FileInput>
          <Show when={rejections().length > 0}>
            <ul class="m-0 flex list-none flex-col gap-1 p-0 text-[12px] text-danger">
              <For each={rejections()}>
                {(entry) => (
                  <li>
                    {entry.file.name}: {entry.reasons.join(', ')}
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
      </Group>

      <Group label="Compact trigger">
        <div class="flex w-full max-w-[380px] flex-col gap-3">
          <FileInput accept=".pdf,.docx">
            {(state) => (
              <div class="flex items-center gap-2.5">
                <FileInputTrigger>
                  {state.value.length > 0 ? 'Replace resume' : 'Upload resume'}
                </FileInputTrigger>
                <span class="truncate text-[13px] text-secondary">
                  {state.value[0]?.name ?? 'No file chosen'}
                </span>
              </div>
            )}
          </FileInput>
          <FileInput accept="image/*">
            {(state) => (
              <div class="flex items-center gap-2.5">
                <FileInputTrigger variant="outline" size="small">
                  Choose avatar
                </FileInputTrigger>
                <span class="truncate text-[12px] text-faint">
                  {state.value[0]
                    ? `${state.value[0].name} (${formatFileSize(state.value[0].size)})`
                    : 'PNG or WebP'}
                </span>
              </div>
            )}
          </FileInput>
        </div>
      </Group>

      <Group label="Validation & error">
        <form
          class="flex w-full max-w-[380px] flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const file = data.get('proof')
            if (file instanceof File && file.name) {
              setSubmitted(`Attached ${file.name}`)
            }
          }}
        >
          <Field>
            <FieldLabel>Proof of address</FieldLabel>
            <FileInput name="proof" required accept={['image/*', '.pdf']}>
              <FileInputDropzone>
                <p>Drop a PDF or image scan</p>
                <p data-slot="hint">Required before submitting</p>
                <FileInputTrigger size="small">Select file</FileInputTrigger>
              </FileInputDropzone>
              <FileInputList aria-label="Proof of address">
                <FileInputItem>
                  {({ file }) => (
                    <>
                      <DocumentIcon />
                      <span>{file.name}</span>
                      <span data-slot="hint">{formatFileSize(file.size)}</span>
                      <FileInputItemRemove />
                    </>
                  )}
                </FileInputItem>
              </FileInputList>
            </FileInput>
            <FieldDescription>
              Utility bill or statement issued in the last 90 days.
            </FieldDescription>
            <FieldError match="valueMissing">
              Attach a document before continuing.
            </FieldError>
          </Field>
          <div class="flex items-center gap-2">
            <Button type="submit" variant="contrast" size="small">
              Submit
            </Button>
            <Show when={submitted()}>
              {(msg) => <span class="text-[12px] text-secondary">{msg()}</span>}
            </Show>
          </div>
        </form>
      </Group>

      <Group label="Invalid state">
        <div class="flex w-full max-w-[380px] flex-col gap-1.5">
          <FileInput invalid>
            <FileInputDropzone>
              <UploadIcon />
              <p>Upload failed</p>
              <p data-slot="hint">Unsupported file type or corrupted archive</p>
              <FileInputTrigger size="small">Try again</FileInputTrigger>
            </FileInputDropzone>
          </FileInput>
        </div>
      </Group>

      <Group label="Disabled">
        <FileInput
          disabled
          defaultValue={[makeSampleFile('signed-dpa.pdf', 142_080, 'application/pdf')]}
        >
          <FileInputDropzone>
            <UploadIcon />
            <p>Uploads locked</p>
            <p data-slot="hint">Contact an owner to replace compliance files</p>
            <FileInputTrigger>Browse files</FileInputTrigger>
          </FileInputDropzone>
          <FileInputList aria-label="Locked files">
            <FileInputItem>
              {({ file }) => (
                <>
                  <DocumentIcon />
                  <span>{file.name}</span>
                  <span data-slot="hint">{formatFileSize(file.size)}</span>
                  <FileInputItemRemove />
                </>
              )}
            </FileInputItem>
          </FileInputList>
        </FileInput>
      </Group>
    </div>
  )
}
