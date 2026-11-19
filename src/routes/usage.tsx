import { PageContent, PageLayout } from '#/components/app-shell'
import { MockDashboard } from '#/components/mock-dashboard'

export function UsagePage() {
  return (
    <PageLayout tabs>
      <PageContent class="pt-16 max-md:pt-8">
        <MockDashboard />
      </PageContent>
    </PageLayout>
  )
}
