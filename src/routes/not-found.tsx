import { PageContent, PageLayout } from '#/components/app-shell'
import { Button } from '#/components/ui/button'

export function NotFoundPage() {
  return (
    <PageLayout>
      <PageContent class="pt-16 max-md:pt-8">
        <p class="text-[11px] uppercase tracking-[0.08em] text-faint">404</p>
        <h1 class="mt-1 text-[22px] leading-7 tracking-[-0.02em] [font-weight:530]">
          Page not found
        </h1>
        <p class="mt-2 text-muted">
          The page you were looking for doesn&apos;t exist.
        </p>
        <Button href="/" variant="neutral" class="mt-5">
          Back to usage
        </Button>
      </PageContent>
    </PageLayout>
  )
}
