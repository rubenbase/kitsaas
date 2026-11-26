import { createSignal, For } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  createPaginationController,
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination'

import { Group } from '../demo-group'

const pageSizes = [10, 20, 50] as const

export function PaginationDemo() {
  const [basicPage, setBasicPage] = createSignal(1)
  const [tablePage, setTablePage] = createSignal(2)
  const [pageSize, setPageSize] = createSignal(20)
  const totalItems = 95
  const controller = createPaginationController()

  const rangeStart = () => (tablePage() - 1) * pageSize() + 1
  const rangeEnd = () => Math.min(tablePage() * pageSize(), totalItems)

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Basic pagination">
        <div class="flex flex-col gap-2.5">
          <Pagination
            aria-label="Basic pagination"
            pageCount={10}
            page={basicPage()}
            onPageChange={setBasicPage}
          >
            <PaginationList>
              {({ items }) => (
                <>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <For each={items}>
                    {(item) => (
                      <PaginationItem>
                        {typeof item === 'number' ? (
                          <PaginationLink page={item} />
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    )}
                  </For>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </>
              )}
            </PaginationList>
          </Pagination>
          <p class="text-[12px] text-muted tabular-nums">
            Page <span class="text-foreground">{basicPage()}</span> of 10
          </p>
        </div>
      </Group>

      <Group label="Contrast active & pill shape">
        <div class="flex flex-col gap-3">
          <Pagination
            aria-label="Contrast pagination"
            pageCount={12}
            defaultPage={4}
            variant="contrast"
          >
            <PaginationList>
              {({ items }) => (
                <>
                  <PaginationItem>
                    <PaginationFirst />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <For each={items}>
                    {(item) => (
                      <PaginationItem>
                        {typeof item === 'number' ? (
                          <PaginationLink page={item} />
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    )}
                  </For>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLast />
                  </PaginationItem>
                </>
              )}
            </PaginationList>
          </Pagination>

          <Pagination
            aria-label="Pill pagination"
            pageCount={8}
            defaultPage={3}
            shape="pill"
            size="small"
          >
            <PaginationList>
              {({ items }) => (
                <>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <For each={items}>
                    {(item) => (
                      <PaginationItem>
                        {typeof item === 'number' ? (
                          <PaginationLink page={item} />
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    )}
                  </For>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </>
              )}
            </PaginationList>
          </Pagination>
        </div>
      </Group>

      <div class="lg:col-span-2">
        <Group label="Total count & page size">
          <div class="flex w-full flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3">
            <div class="flex items-center gap-3">
              <span class="text-[13px] text-muted tabular-nums">
                Showing{' '}
                <span class="font-medium text-foreground">
                  {rangeStart()}–{rangeEnd()}
                </span>{' '}
                of <span class="font-medium text-foreground">{totalItems}</span>{' '}
                results
              </span>

              <div class="flex items-center gap-1">
                <For each={pageSizes}>
                  {(size) => (
                    <Button
                      size="small"
                      variant={pageSize() === size ? 'outline' : 'ghost-muted'}
                      aria-pressed={pageSize() === size ? 'true' : 'false'}
                      onClick={() => {
                        setPageSize(size)
                        setTablePage(1)
                      }}
                    >
                      {size} / page
                    </Button>
                  )}
                </For>
              </div>
            </div>

            <Pagination
              aria-label="Results pagination"
              total={totalItems}
              pageSize={pageSize()}
              page={tablePage()}
              onPageChange={setTablePage}
            >
              <PaginationList>
                {({ items }) => (
                  <>
                    <PaginationItem>
                      <PaginationPrevious />
                    </PaginationItem>
                    <For each={items}>
                      {(item) => (
                        <PaginationItem>
                          {typeof item === 'number' ? (
                            <PaginationLink page={item} />
                          ) : (
                            <PaginationEllipsis />
                          )}
                        </PaginationItem>
                      )}
                    </For>
                    <PaginationItem>
                      <PaginationNext />
                    </PaginationItem>
                  </>
                )}
              </PaginationList>
            </Pagination>
          </div>
        </Group>
      </div>

      <Group label="Controller & wider siblings">
        <div class="flex flex-col gap-3">
          <Pagination
            aria-label="Controlled range pagination"
            pageCount={24}
            defaultPage={12}
            siblings={2}
            boundaries={1}
            controller={controller}
          >
            <PaginationList>
              {({ items }) => (
                <>
                  <PaginationItem>
                    <PaginationPrevious />
                  </PaginationItem>
                  <For each={items}>
                    {(item) => (
                      <PaginationItem>
                        {typeof item === 'number' ? (
                          <PaginationLink page={item} />
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    )}
                  </For>
                  <PaginationItem>
                    <PaginationNext />
                  </PaginationItem>
                </>
              )}
            </PaginationList>
          </Pagination>

          <div class="flex items-center gap-2">
            <Button
              size="small"
              variant="outline"
              onClick={() => controller.first()}
            >
              First
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => controller.previous()}
            >
              Prev
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => controller.next()}
            >
              Next
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={() => controller.last()}
            >
              Last
            </Button>
          </div>
        </div>
      </Group>

      <Group label="Disabled state">
        <Pagination aria-label="Disabled pagination" pageCount={6} defaultPage={2} disabled>
          <PaginationList>
            {({ items }) => (
              <>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                <For each={items}>
                  {(item) => (
                    <PaginationItem>
                      {typeof item === 'number' ? (
                        <PaginationLink page={item} />
                      ) : (
                        <PaginationEllipsis />
                      )}
                    </PaginationItem>
                  )}
                </For>
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </>
            )}
          </PaginationList>
        </Pagination>
      </Group>
    </div>
  )
}
