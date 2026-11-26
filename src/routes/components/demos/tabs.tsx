import { ComponentsIcon, SearchIcon } from '#/components/icons'
import { Tabs, TabsList, TabsPanel, TabsTab } from '#/components/ui/tabs'

import { Group } from '../demo-group'

export function TabsDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Underline">
        <div class="w-full max-w-[420px]">
          <Tabs defaultValue="overview">
            <TabsList aria-label="Project">
              <TabsTab value="overview">Overview</TabsTab>
              <TabsTab value="activity">Activity</TabsTab>
              <TabsTab value="settings">Settings</TabsTab>
            </TabsList>
            <TabsPanel value="overview" class="pt-4 text-[13px] text-secondary">
              The launch is on track for Friday, with 4 of 6 tasks done.
            </TabsPanel>
            <TabsPanel value="activity" class="pt-4 text-[13px] text-secondary">
              Inès Moreau deployed to production and Kofi Mensah left a review.
            </TabsPanel>
            <TabsPanel value="settings" class="pt-4 text-[13px] text-secondary">
              Rename the project, transfer it to another team or archive it.
            </TabsPanel>
          </Tabs>
        </div>
      </Group>

      <Group label="Pill">
        <div class="w-full max-w-[420px]">
          <Tabs defaultValue="day" variant="pill">
            <TabsList aria-label="Range">
              <TabsTab value="day">Day</TabsTab>
              <TabsTab value="week">Week</TabsTab>
              <TabsTab value="month">Month</TabsTab>
            </TabsList>
            <TabsPanel value="day" class="pt-1 text-[13px] text-secondary">
              128 visitors today, up 12% from yesterday.
            </TabsPanel>
            <TabsPanel value="week" class="pt-1 text-[13px] text-secondary">
              1,024 visitors this week, up 8% from last week.
            </TabsPanel>
            <TabsPanel value="month" class="pt-1 text-[13px] text-secondary">
              4,210 visitors this month, down 3% from last month.
            </TabsPanel>
          </Tabs>
        </div>
      </Group>

      <Group label="Vertical">
        <div class="h-[184px] w-full max-w-[420px] rounded-[6px] border border-border-muted">
          <Tabs
            defaultValue="general"
            variant="settings"
            orientation="vertical"
          >
            <TabsList aria-label="Preferences">
              <TabsTab value="general">
                <ComponentsIcon />
                General
              </TabsTab>
              <TabsTab value="security">Security</TabsTab>
              <TabsTab value="integrations">Integrations</TabsTab>
            </TabsList>
            <TabsPanel value="general" class="p-4 text-[13px] text-secondary">
              Choose your language, time zone and the page you start on.
            </TabsPanel>
            <TabsPanel value="security" class="p-4 text-[13px] text-secondary">
              Manage passkeys, signed-in sessions and recovery codes.
            </TabsPanel>
            <TabsPanel
              value="integrations"
              class="p-4 text-[13px] text-secondary"
            >
              Connect your calendar and chat apps to get reminders.
            </TabsPanel>
          </Tabs>
        </div>
      </Group>

      <Group label="Tab with an icon">
        <div class="w-full max-w-[420px]">
          <Tabs defaultValue="inbox">
            <TabsList aria-label="Mail">
              <TabsTab value="inbox">
                <SearchIcon />
                Inbox
              </TabsTab>
              <TabsTab value="replies">Replies</TabsTab>
              <TabsTab value="archive">Archive</TabsTab>
            </TabsList>
            <TabsPanel value="inbox" class="pt-4 text-[13px] text-secondary">
              3 new messages from Inès Moreau and Kofi Mensah.
            </TabsPanel>
            <TabsPanel value="replies" class="pt-4 text-[13px] text-secondary">
              Wren Takahashi replied to your message about the launch.
            </TabsPanel>
            <TabsPanel value="archive" class="pt-4 text-[13px] text-secondary">
              Messages you archived stay here and in search.
            </TabsPanel>
          </Tabs>
        </div>
      </Group>

      <Group label="Disabled tab">
        <div class="w-full max-w-[420px]">
          <Tabs defaultValue="overview">
            <TabsList aria-label="Dashboard">
              <TabsTab value="overview">Overview</TabsTab>
              <TabsTab value="analytics">Analytics</TabsTab>
              <TabsTab value="reports" disabled>
                Reports
              </TabsTab>
            </TabsList>
            <TabsPanel value="overview" class="pt-4 text-[13px] text-secondary">
              Reports stays focusable for the arrow keys, but it never selects.
            </TabsPanel>
            <TabsPanel
              value="analytics"
              class="pt-4 text-[13px] text-secondary"
            >
              Where your visitors come from and the pages they read most.
            </TabsPanel>
            <TabsPanel value="reports" class="pt-4 text-[13px] text-secondary">
              Monthly reports are available on the Pro plan.
            </TabsPanel>
          </Tabs>
        </div>
      </Group>
    </div>
  )
}
