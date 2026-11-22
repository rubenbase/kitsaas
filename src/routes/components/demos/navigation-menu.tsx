import { createSignal, For } from 'solid-js'

import { ArrowUpRightIcon, CheckIcon, SearchIcon } from '#/components/icons'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkIcon,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '#/components/ui/navigation-menu'

import { Group } from '../demo-group'

const guides = [
  {
    href: '#introduction',
    title: 'Introduction',
    description: 'Design tokens, layering, and accessible ui-sdk primitives.',
  },
  {
    href: '#installation',
    title: 'Installation',
    description: 'Configure Solid 2.0, Tailwind v4, and the ui-sdk layer.',
  },
  {
    href: '#theming',
    title: 'Theming',
    description: 'Light and dark schemes driven by semantic --v2-* tokens.',
  },
]

const components = [
  {
    href: '#dialog',
    title: 'Dialog',
    description: 'Modal surfaces rendered directly in the browser top layer.',
  },
  {
    href: '#menubar',
    title: 'Menubar',
    description: 'Single-tab-stop application menus with arrow navigation.',
  },
  {
    href: '#resizable',
    title: 'Resizable',
    description: 'Drag and keyboard split panes with collapsible panels.',
  },
  {
    href: '#scroll-area',
    title: 'Scroll Area',
    description: 'Native scrolling paired with minimal styled scrollbars.',
  },
]

const resources = [
  { href: '#search', label: 'Search reference', icon: SearchIcon },
  { href: '#status', label: 'Release status', icon: CheckIcon },
  {
    href: '#changelog',
    label: 'Changelog',
    icon: ArrowUpRightIcon,
    mirror: true,
  },
]

export function NavigationMenuDemo() {
  const [activeRoute, setActiveRoute] = createSignal('#introduction')

  const handleLinkClick = (href: string, event: MouseEvent) => {
    event.preventDefault()
    setActiveRoute(href)
  }

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <div class="lg:col-span-2">
        <Group label="Horizontal navigation with viewport & indicator">
          <div class="flex w-full flex-col gap-3">
            <div class="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <NavigationMenu aria-label="Main navigation">
                <NavigationMenuList>
                  <NavigationMenuItem value="getting-started">
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul class="grid w-[460px] max-w-[calc(100vw-32px)] grid-cols-[170px_1fr] gap-1.5">
                        <li class="row-span-3">
                          <NavigationMenuLink
                            href="#kitsaas"
                            data-variant="featured"
                            current={activeRoute() === '#kitsaas'}
                            onClick={(e) => handleLinkClick('#kitsaas', e)}
                          >
                            <span class="text-[13px] font-medium text-foreground">
                              Kitsaas UI
                            </span>
                            <span class="text-[12px] font-normal leading-4 text-muted">
                              Crisp Solid 2.0 components styled with semantic
                              tokens.
                            </span>
                          </NavigationMenuLink>
                        </li>
                        <For each={guides}>
                          {(guide) => (
                            <li>
                              <NavigationMenuLink
                                href={guide.href}
                                current={activeRoute() === guide.href}
                                onClick={(e) => handleLinkClick(guide.href, e)}
                              >
                                <span>{guide.title}</span>
                                <span class="text-[12px] font-normal leading-4 text-muted">
                                  {guide.description}
                                </span>
                              </NavigationMenuLink>
                            </li>
                          )}
                        </For>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem value="components">
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul class="grid w-[460px] max-w-[calc(100vw-32px)] grid-cols-2 gap-1.5">
                        <For each={components}>
                          {(item) => (
                            <li>
                              <NavigationMenuLink
                                href={item.href}
                                current={activeRoute() === item.href}
                                onClick={(e) => handleLinkClick(item.href, e)}
                              >
                                <span>{item.title}</span>
                                <span class="text-[12px] font-normal leading-4 text-muted">
                                  {item.description}
                                </span>
                              </NavigationMenuLink>
                            </li>
                          )}
                        </For>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem value="resources">
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul class="flex w-[200px] flex-col gap-0.5">
                        <For each={resources}>
                          {(resource) => (
                            <li>
                              <NavigationMenuLink
                                href={resource.href}
                                current={activeRoute() === resource.href}
                                onClick={(e) =>
                                  handleLinkClick(resource.href, e)
                                }
                              >
                                <NavigationMenuLinkIcon
                                  mirror={resource.mirror}
                                >
                                  <resource.icon />
                                </NavigationMenuLinkIcon>
                                <span>{resource.label}</span>
                              </NavigationMenuLink>
                            </li>
                          )}
                        </For>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#pricing"
                      current={activeRoute() === '#pricing'}
                      onClick={(e) => handleLinkClick('#pricing', e)}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuIndicator />
                <NavigationMenuViewport sideOffset={8} />
              </NavigationMenu>

              <span class="hidden text-[12px] text-faint sm:inline tabular-nums">
                Active: <span class="text-foreground">{activeRoute()}</span>
              </span>
            </div>
          </div>
        </Group>
      </div>

      <Group label="Click-only navigation">
        <NavigationMenu aria-label="Click only" openOnHover={false}>
          <NavigationMenuList>
            <NavigationMenuItem value="workspace">
              <NavigationMenuTrigger>Workspace</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="flex w-[240px] flex-col gap-1">
                  <li>
                    <NavigationMenuLink
                      href="#overview"
                      onClick={(e) => handleLinkClick('#overview', e)}
                    >
                      <span>Overview</span>
                      <span class="text-[12px] font-normal text-muted">
                        Usage metrics and recent activity.
                      </span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="#members"
                      onClick={(e) => handleLinkClick('#members', e)}
                    >
                      <span>Members</span>
                      <span class="text-[12px] font-normal text-muted">
                        Roles, invitations, and SSO rules.
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="api">
              <NavigationMenuTrigger>API</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul class="flex w-[220px] flex-col gap-1">
                  <li>
                    <NavigationMenuLink
                      href="#keys"
                      onClick={(e) => handleLinkClick('#keys', e)}
                    >
                      <span>API Keys</span>
                      <span class="text-[12px] font-normal text-muted">
                        Create and revoke scoped tokens.
                      </span>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink
                      href="#webhooks"
                      onClick={(e) => handleLinkClick('#webhooks', e)}
                    >
                      <span>Webhooks</span>
                      <span class="text-[12px] font-normal text-muted">
                        Delivery logs and signing secrets.
                      </span>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem value="enterprise">
              <NavigationMenuTrigger disabled>Enterprise</NavigationMenuTrigger>
              <NavigationMenuContent>
                <p class="p-2 text-[12px] text-muted">Coming soon.</p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuViewport sideOffset={8} />
        </NavigationMenu>
      </Group>

      <Group label="Vertical sidebar navigation">
        <div class="rounded-lg border border-border bg-surface p-2">
          <NavigationMenu aria-label="Sidebar" orientation="vertical">
            <NavigationMenuList>
              <NavigationMenuItem value="guides">
                <NavigationMenuTrigger>Guides</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="flex w-[250px] flex-col gap-1">
                    <For each={guides}>
                      {(guide) => (
                        <li>
                          <NavigationMenuLink
                            href={guide.href}
                            current={activeRoute() === guide.href}
                            onClick={(e) => handleLinkClick(guide.href, e)}
                          >
                            <span>{guide.title}</span>
                            <span class="text-[12px] font-normal text-muted">
                              {guide.description}
                            </span>
                          </NavigationMenuLink>
                        </li>
                      )}
                    </For>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="components">
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul class="flex w-[250px] flex-col gap-1">
                    <For each={components}>
                      {(item) => (
                        <li>
                          <NavigationMenuLink
                            href={item.href}
                            current={activeRoute() === item.href}
                            onClick={(e) => handleLinkClick(item.href, e)}
                          >
                            <span>{item.title}</span>
                            <span class="text-[12px] font-normal text-muted">
                              {item.description}
                            </span>
                          </NavigationMenuLink>
                        </li>
                      )}
                    </For>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#changelog"
                  current={activeRoute() === '#changelog'}
                  onClick={(e) => handleLinkClick('#changelog', e)}
                >
                  Changelog
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport sideOffset={10} />
          </NavigationMenu>
        </div>
      </Group>
    </div>
  )
}
