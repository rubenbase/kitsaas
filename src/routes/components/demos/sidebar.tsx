import { createSignal, For, Show } from 'solid-js'

import {
  ChartsIcon,
  ChevronDownIcon,
  ComponentsIcon,
  PlusIcon,
} from '#/components/icons'
import { KitsaasMark } from '#/components/logo'
import { Button } from '#/components/ui/button'
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from '#/components/ui/menu'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '#/components/ui/segmented-control'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  type SidebarCollapsible,
  type SidebarSide,
  type SidebarVariant,
} from '#/components/ui/sidebar'

import { Group } from '../demo-group'

function HomeIcon() {
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
      <path d="M2.5 7.25 8 2.75l5.5 4.5v5.5a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-5.5Z" />
      <path d="M6.25 13.75v-4.25h3.5v4.25" />
    </svg>
  )
}

function InboxIcon() {
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
      <path d="M2.5 8.75 4 3.5h8l1.5 5.25v3.75a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V8.75Z" />
      <path d="M2.5 8.75h3.25l.85 1.5h2.8l.85-1.5h3.25" />
    </svg>
  )
}

function FolderIcon() {
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
      <path d="M2.25 4.5a1 1 0 0 1 1-1h3l1.35 1.5h5.15a1 1 0 0 1 1 1v6.25a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1V4.5Z" />
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="4" cy="8" r="1.1" />
      <circle cx="8" cy="8" r="1.1" />
      <circle cx="12" cy="8" r="1.1" />
    </svg>
  )
}

function SidebarStatePill() {
  const sidebar = useSidebar()
  return (
    <span class="rounded-[4px] bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
      {sidebar.state()}
    </span>
  )
}

export function SidebarDemo() {
  const [activeItem, setActiveItem] = createSignal('Overview')
  const [query, setQuery] = createSignal('')
  const [projects, setProjects] = createSignal([
    { id: 'design-system', name: 'Design System', count: 12 },
    { id: 'billing-api', name: 'Billing API', count: 4 },
    { id: 'docs-site', name: 'Docs Site', count: 7 },
  ])

  const [variant, setVariant] = createSignal<SidebarVariant>('floating')
  const [side, setSide] = createSignal<SidebarSide>('left')
  const [collapsible, setCollapsible] =
    createSignal<SidebarCollapsible>('offcanvas')
  const [variantActive, setVariantActive] = createSignal('Dashboard')

  const [loading, setLoading] = createSignal(true)

  const filteredProjects = () => {
    const q = query().trim().toLowerCase()
    if (!q) return projects()
    return projects().filter((p) => p.name.toLowerCase().includes(q))
  }

  const addProject = () => {
    const index = projects().length + 1
    setProjects((prev) => [
      ...prev,
      { id: `project-${index}`, name: `Project ${index}`, count: 1 },
    ])
  }

  const removeProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Full application sidebar (collapsible icon mode, groups, submenus, badges, actions & rail)">
          <div class="h-[460px] w-full overflow-hidden rounded-[10px] border border-border bg-background">
            <SidebarProvider defaultOpen shortcut={null}>
              <Sidebar collapsible="icon">
                <SidebarHeader>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg" tooltip="Kitsaas Workspace">
                        <span
                          data-sidebar-icon=""
                          class="flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-surface-3 text-[11px] text-foreground [font-weight:530]"
                        >
                          <KitsaasMark class="size-3.5" />
                        </span>
                        <span class="flex min-w-0 flex-col leading-tight">
                          <span class="truncate text-[13px] text-foreground [font-weight:530]">
                            Kitsaas UI
                          </span>
                          <span class="truncate text-[11px] text-faint">
                            Enterprise
                          </span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <SidebarInput
                    type="search"
                    placeholder="Filter projects…"
                    aria-label="Filter projects"
                    value={query()}
                    onInput={(event) => setQuery(event.currentTarget.value)}
                  />
                </SidebarHeader>

                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton
                            isActive={activeItem() === 'Overview'}
                            tooltip="Overview"
                            onClick={() => setActiveItem('Overview')}
                          >
                            <HomeIcon />
                            <span>Overview</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                          <SidebarMenuButton
                            isActive={activeItem() === 'Inbox'}
                            tooltip="Inbox"
                            onClick={() => setActiveItem('Inbox')}
                          >
                            <InboxIcon />
                            <span>Inbox</span>
                          </SidebarMenuButton>
                          <SidebarMenuBadge>24</SidebarMenuBadge>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                          <Collapsible defaultOpen class="w-full">
                            <CollapsibleTrigger
                              render={(triggerProps) => (
                                <SidebarMenuButton
                                  {...triggerProps}
                                  tooltip="Components"
                                >
                                  <ComponentsIcon />
                                  <span class="flex-1 truncate">Components</span>
                                  <ChevronDownIcon class="size-3.5 text-faint transition-transform [[data-open]_&]:rotate-180" />
                                </SidebarMenuButton>
                              )}
                            />
                            <CollapsiblePanel>
                              <SidebarMenuSub>
                                <For each={['Buttons', 'Inputs', 'Overlays']}>
                                  {(sub) => (
                                    <SidebarMenuSubItem>
                                      <SidebarMenuSubButton
                                        isActive={activeItem() === sub}
                                        onClick={() => setActiveItem(sub)}
                                      >
                                        <span>{sub}</span>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  )}
                                </For>
                              </SidebarMenuSub>
                            </CollapsiblePanel>
                          </Collapsible>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>

                  <SidebarSeparator />

                  <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarGroupAction
                      aria-label="Add project"
                      title="Add project"
                      onClick={addProject}
                    >
                      <PlusIcon />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <For each={filteredProjects()}>
                          {(project) => (
                            <SidebarMenuItem>
                              <SidebarMenuButton
                                isActive={activeItem() === project.name}
                                tooltip={project.name}
                                onClick={() => setActiveItem(project.name)}
                              >
                                <FolderIcon />
                                <span>{project.name}</span>
                              </SidebarMenuButton>
                              <SidebarMenuBadge>{project.count}</SidebarMenuBadge>
                              <Menu>
                                <MenuTrigger
                                  render={(triggerProps) => (
                                    <SidebarMenuAction
                                      {...triggerProps}
                                      showOnHover
                                      aria-label={`More actions for ${project.name}`}
                                    >
                                      <DotsIcon />
                                    </SidebarMenuAction>
                                  )}
                                />
                                <MenuContent sideOffset={4}>
                                  <MenuItem
                                    value="open"
                                    onClick={() => setActiveItem(project.name)}
                                  >
                                    Open project
                                  </MenuItem>
                                  <MenuSeparator />
                                  <MenuItem
                                    value="delete"
                                    variant="critical"
                                    onClick={() => removeProject(project.id)}
                                  >
                                    Remove
                                  </MenuItem>
                                </MenuContent>
                              </Menu>
                            </SidebarMenuItem>
                          )}
                        </For>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                  <SidebarSeparator class="mx-0 my-0.5" />
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg" tooltip="Ruben Costa">
                        <span
                          data-sidebar-icon=""
                          class="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-3 text-[11px] text-foreground [font-weight:530]"
                        >
                          R
                        </span>
                        <span class="flex min-w-0 flex-col leading-tight">
                          <span class="truncate text-[13px] text-foreground [font-weight:530]">
                            Ruben Costa
                          </span>
                          <span class="truncate text-[11px] text-faint">
                            ruben@kitsaas.dev
                          </span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>

                <SidebarRail />
              </Sidebar>

              <SidebarInset as="div">
                <div class="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border-muted px-3">
                  <div class="flex items-center gap-2">
                    <SidebarTrigger />
                    <span class="h-3.5 w-px bg-border" />
                    <span class="text-[13px] text-foreground [font-weight:530]">
                      {activeItem()}
                    </span>
                  </div>
                  <SidebarStatePill />
                </div>

                <div class="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
                  <p class="text-[13px] text-secondary">
                    Click the toggle button or the sidebar&apos;s edge rail to
                    collapse to icons. Hover collapsed icons to see automatic
                    tooltips, or click <code class="font-mono">+</code> next to
                    Projects.
                  </p>
                  <div class="flex flex-wrap gap-3">
                    <div class="min-w-[130px] flex-1 rounded-[8px] border border-border-muted bg-surface p-3.5">
                      <p class="truncate text-[11px] uppercase tracking-[0.08em] text-faint">
                        Active view
                      </p>
                      <p class="mt-1 truncate text-[15px] text-foreground [font-weight:530]">
                        {activeItem()}
                      </p>
                    </div>
                    <div class="min-w-[130px] flex-1 rounded-[8px] border border-border-muted bg-surface p-3.5">
                      <p class="truncate text-[11px] uppercase tracking-[0.08em] text-faint">
                        Projects
                      </p>
                      <p class="mt-1 text-[15px] tabular-nums text-foreground [font-weight:530]">
                        {projects().length}
                      </p>
                    </div>
                  </div>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </Group>
      </div>

      <div class="lg:col-span-2">
        <Group label="Variants, side & collapsible modes">
          <div class="flex w-full flex-col gap-3">
            <div class="flex flex-wrap items-center gap-3">
              <SegmentedControl
                aria-label="Sidebar variant"
                value={variant()}
                onValueChange={(next) => {
                  if (next) setVariant(next as SidebarVariant)
                }}
              >
                <SegmentedControlIndicator />
                <SegmentedControlItem value="sidebar">
                  Sidebar
                </SegmentedControlItem>
                <SegmentedControlItem value="floating">
                  Floating
                </SegmentedControlItem>
                <SegmentedControlItem value="inset">Inset</SegmentedControlItem>
              </SegmentedControl>

              <SegmentedControl
                aria-label="Sidebar side"
                value={side()}
                onValueChange={(next) => {
                  if (next) setSide(next as SidebarSide)
                }}
              >
                <SegmentedControlIndicator />
                <SegmentedControlItem value="left">Left</SegmentedControlItem>
                <SegmentedControlItem value="right">Right</SegmentedControlItem>
              </SegmentedControl>

              <SegmentedControl
                aria-label="Collapsible mode"
                value={collapsible()}
                onValueChange={(next) => {
                  if (next) setCollapsible(next as SidebarCollapsible)
                }}
              >
                <SegmentedControlIndicator />
                <SegmentedControlItem value="offcanvas">
                  Offcanvas
                </SegmentedControlItem>
                <SegmentedControlItem value="icon">Icon</SegmentedControlItem>
                <SegmentedControlItem value="none">None</SegmentedControlItem>
              </SegmentedControl>
            </div>

            <div class="h-[280px] w-full overflow-hidden rounded-[10px] border border-border bg-bg-deep">
              <SidebarProvider defaultOpen shortcut={null}>
                <Sidebar
                  variant={variant()}
                  side={side()}
                  collapsible={collapsible()}
                >
                  <SidebarHeader>
                    <span class="px-2 py-1 text-[12px] text-foreground [font-weight:530]">
                      {variant()} · {side()}
                    </span>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <For each={['Dashboard', 'Analytics', 'Billing']}>
                            {(label) => (
                              <SidebarMenuItem>
                                <SidebarMenuButton
                                  isActive={variantActive() === label}
                                  tooltip={label}
                                  onClick={() => setVariantActive(label)}
                                >
                                  <ChartsIcon />
                                  <span>{label}</span>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )}
                          </For>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                  <SidebarRail />
                </Sidebar>

                <SidebarInset as="div">
                  <div class="flex h-10 shrink-0 items-center justify-between border-b border-border-muted px-3">
                    <div class="flex items-center gap-2">
                      <SidebarTrigger />
                      <span class="text-[12px] text-muted">
                        {variantActive()}
                      </span>
                    </div>
                    <SidebarStatePill />
                  </div>
                  <div class="p-4 text-[13px] text-muted">
                    Switch between <code class="font-mono">sidebar</code>,{' '}
                    <code class="font-mono">floating</code>, and{' '}
                    <code class="font-mono">inset</code> chrome, move the
                    panel to the right edge, or change collapse behavior.
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </div>
          </div>
        </Group>
      </div>

      <Group label="Loading state (SidebarMenuSkeleton)">
        <div class="flex w-full max-w-[260px] flex-col gap-3 rounded-[8px] border border-border bg-background p-2">
          <div class="flex items-center justify-between px-2 pt-1">
            <span class="text-[11px] text-faint [font-weight:530]">
              Navigation
            </span>
            <Button
              variant="ghost-muted"
              size="small"
              onClick={() => setLoading((v) => !v)}
            >
              {loading() ? 'Show loaded' : 'Show skeleton'}
            </Button>
          </div>
          <SidebarMenu>
            <Show
              when={loading()}
              fallback={
                <For each={['Overview', 'Deployments', 'Logs', 'Settings']}>
                  {(name, i) => (
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive={i() === 0}>
                        <FolderIcon />
                        <span>{name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </For>
              }
            >
              <For each={[0, 1, 2, 3]}>
                {() => (
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                )}
              </For>
            </Show>
          </SidebarMenu>
        </div>
      </Group>

      <Group label="Menu button variants & sizes">
        <div class="w-full max-w-[260px] rounded-[8px] border border-border bg-background p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="sm">
                <HomeIcon />
                <span>Small (24px)</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="default" isActive>
                <InboxIcon />
                <span>Default (28px, active)</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton variant="outline">
                <ComponentsIcon />
                <span>Outline variant</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <span
                  data-sidebar-icon=""
                  class="flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-surface-3 text-[11px] [font-weight:530]"
                >
                  K
                </span>
                <span class="flex min-w-0 flex-col leading-tight">
                  <span class="truncate text-[13px] text-foreground [font-weight:530]">
                    Large (40px)
                  </span>
                  <span class="truncate text-[11px] text-faint">
                    Two-line item
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </Group>
    </div>
  )
}
