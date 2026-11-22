import { createSignal, For, Show } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createTreeController,
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemCheckbox,
  TreeItemIndicator,
  TreeItemLabel,
  type TreeItemData,
} from '#/components/ui/tree'

import { Group } from '../demo-group'

const workspaceFiles: TreeItemData[] = [
  {
    value: 'src',
    label: 'src',
    children: [
      {
        value: 'src/components',
        label: 'components',
        children: [
          { value: 'src/components/button.tsx', label: 'button.tsx' },
          { value: 'src/components/tree.tsx', label: 'tree.tsx' },
          { value: 'src/components/waterfall.tsx', label: 'waterfall.tsx' },
        ],
      },
      {
        value: 'src/routes',
        label: 'routes',
        children: [
          { value: 'src/routes/index.tsx', label: 'index.tsx' },
          { value: 'src/routes/settings.tsx', label: 'settings.tsx' },
        ],
      },
      { value: 'src/theme.css', label: 'theme.css' },
    ],
  },
  {
    value: 'packages',
    label: 'packages',
    children: [
      { value: 'packages/sdk.ts', label: 'sdk.ts' },
      { value: 'packages/cli.ts', label: 'cli.ts' },
    ],
  },
  { value: 'package.json', label: 'package.json' },
  { value: 'tsconfig.json', label: 'tsconfig.json' },
  { value: 'README.md', label: 'README.md' },
]

const assetTree: TreeItemData[] = [
  {
    value: 'design',
    label: 'Design tokens',
    children: [
      { value: 'design/colors', label: 'colors.css' },
      { value: 'design/typography', label: 'typography.css' },
      { value: 'design/elevation', label: 'elevation.css' },
    ],
  },
  {
    value: 'icons',
    label: 'Icons',
    children: [
      { value: 'icons/arrows', label: 'arrows.svg' },
      { value: 'icons/status', label: 'status.svg' },
    ],
  },
  { value: 'manifest', label: 'manifest.json' },
  { value: 'changelog', label: 'CHANGELOG.md' },
]

const permissionTree: TreeItemData[] = [
  {
    value: 'deployments',
    label: 'Deployments',
    children: [
      { value: 'deployments:read', label: 'Read deployments' },
      { value: 'deployments:create', label: 'Trigger builds' },
      { value: 'deployments:rollback', label: 'Rollback releases' },
    ],
  },
  {
    value: 'secrets',
    label: 'Environment secrets',
    children: [
      { value: 'secrets:preview', label: 'Preview scope' },
      { value: 'secrets:production', label: 'Production scope' },
    ],
  },
  { value: 'audit:export', label: 'Export audit logs' },
]

function FolderIcon(props: { open?: boolean }) {
  return (
    <Show
      when={props.open}
      fallback={
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.25 4.25C2.25 3.69772 2.69772 3.25 3.25 3.25H6.17157C6.43679 3.25 6.69114 3.35536 6.87868 3.54289L7.62132 4.28553C7.80886 4.47307 8.06321 4.57843 8.32843 4.57843H12.75C13.3023 4.57843 13.75 5.02614 13.75 5.57843V11.75C13.75 12.3023 13.3023 12.75 12.75 12.75H3.25C2.69772 12.75 2.25 12.3023 2.25 11.75V4.25Z"
            stroke="currentColor"
            stroke-width="1.2"
            stroke-linejoin="round"
          />
        </svg>
      }
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.25 11.75V4.25C2.25 3.69772 2.69772 3.25 3.25 3.25H6.17157C6.43679 3.25 6.69114 3.35536 6.87868 3.54289L7.62132 4.28553C7.80886 4.47307 8.06321 4.57843 8.32843 4.57843H12.25C12.8023 4.57843 13.25 5.02614 13.25 5.57843V6.75M2.25 11.75L3.65 7.45C3.78 7.03 4.17 6.75 4.6 6.75H13.15C13.79 6.75 14.25 7.36 14.08 7.98L12.95 12.02C12.83 12.45 12.44 12.75 11.99 12.75H3.25C2.69772 12.75 2.25 12.3023 2.25 11.75Z"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linejoin="round"
        />
      </svg>
    </Show>
  )
}

function FileIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.25 2.25H9.25L12.25 5.25V12.75C12.25 13.3023 11.8023 13.75 11.25 13.75H4.25C3.69772 13.75 3.25 13.3023 3.25 12.75V3.25C3.25 2.69772 3.69772 2.25 4.25 2.25Z"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
      <path
        d="M9 2.5V5.5H12"
        stroke="currentColor"
        stroke-width="1.2"
        stroke-linejoin="round"
      />
    </svg>
  )
}

function FileBranch(props: { items: TreeItemData[] }) {
  return (
    <For each={props.items}>
      {(item) => (
        <TreeItem value={item.value} branch={item.children !== undefined}>
          <TreeItemLabel>
            {(state) => (
              <>
                <Show when={item.children}>
                  <TreeItemIndicator />
                </Show>
                <Show when={item.children} fallback={<FileIcon />}>
                  <FolderIcon open={state.expanded} />
                </Show>
                <span>{item.label}</span>
              </>
            )}
          </TreeItemLabel>
          <Show when={item.children}>
            {(children) => (
              <TreeGroup>
                <FileBranch items={children()} />
              </TreeGroup>
            )}
          </Show>
        </TreeItem>
      )}
    </For>
  )
}

function CheckableBranch(props: { items: TreeItemData[] }) {
  return (
    <For each={props.items}>
      {(item) => (
        <TreeItem value={item.value} branch={item.children !== undefined}>
          <TreeItemLabel>
            <Show when={item.children}>
              <TreeItemIndicator />
            </Show>
            <TreeItemCheckbox />
            <span>{item.label}</span>
          </TreeItemLabel>
          <Show when={item.children}>
            {(children) => (
              <TreeGroup>
                <CheckableBranch items={children()} />
              </TreeGroup>
            )}
          </Show>
        </TreeItem>
      )}
    </For>
  )
}

export function TreeDemo() {
  const explorer = createTreeController()
  const [selectedFile, setSelectedFile] = createSignal<string | null>(
    'src/components/tree.tsx',
  )
  const [selectedAssets, setSelectedAssets] = createSignal<string[]>([
    'design/colors',
    'icons/status',
  ])
  const [checkedScopes, setCheckedScopes] = createSignal<string[]>([
    'deployments:read',
    'secrets',
  ])

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="File explorer (single select)">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="truncate font-mono text-[11px] text-faint">
              {selectedFile() ?? 'No file selected'}
            </span>
            <div class="flex items-center gap-1.5">
              <Button
                size="small"
                variant="ghost-muted"
                onClick={() => explorer.expandAll()}
              >
                Expand all
              </Button>
              <Button
                size="small"
                variant="ghost-muted"
                onClick={() => explorer.collapseAll()}
              >
                Collapse
              </Button>
            </div>
          </div>

          <div class="w-full rounded-lg border border-border bg-surface p-1.5">
            <Tree
              aria-label="Workspace files"
              items={workspaceFiles}
              controller={explorer}
              defaultExpanded={['src', 'src/components']}
              value={selectedFile()}
              onValueChange={setSelectedFile}
            >
              <FileBranch items={workspaceFiles} />
            </Tree>
          </div>
        </div>
      </Group>

      <Group label="Multi-select (Cmd/Ctrl or Shift)">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 text-[11px] text-faint">
            <span class="tabular-nums">
              {selectedAssets().length} selected
            </span>
            <span class="truncate font-mono">
              {selectedAssets().join(', ') || 'None'}
            </span>
          </div>

          <div class="w-full rounded-lg border border-border bg-surface p-1.5">
            <Tree
              aria-label="Project assets"
              items={assetTree}
              mode="multiple"
              expandOnPress={false}
              defaultExpanded={['design', 'icons']}
              value={selectedAssets()}
              onValueChange={setSelectedAssets}
            >
              <FileBranch items={assetTree} />
            </Tree>
          </div>
        </div>
      </Group>

      <Group label="Tri-state checkboxes">
        <div class="flex w-full flex-col gap-2.5">
          <div class="flex items-center justify-between gap-2 text-[11px] text-faint">
            <span>Trunk strategy · Space toggles</span>
            <span class="truncate font-mono">
              {checkedScopes().join(', ') || 'None'}
            </span>
          </div>

          <div class="w-full rounded-lg border border-border bg-surface p-1.5">
            <Tree
              aria-label="API key permissions"
              items={permissionTree}
              mode="none"
              checkable
              checkStrategy="trunk"
              defaultExpanded={['deployments', 'secrets']}
              checked={checkedScopes()}
              onCheckedChange={setCheckedScopes}
            >
              <CheckableBranch items={permissionTree} />
            </Tree>
          </div>
        </div>
      </Group>
    </div>
  )
}
