import { For } from "solid-js";

import { ChevronRightIcon, CoinIcon, PlusIcon, TerminalIcon } from "#/components/icons";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "#/components/ui/item";

import { Group } from "../demo-group";

const members = [
  { initial: "A", name: "Ada", role: "Owner", spent: "$7.90" },
  { initial: "G", name: "Grace", role: "Admin", spent: "$4.50" },
  { initial: "L", name: "Linus", role: "Member", spent: "$1.20" },
];

const requests = [
  { status: "200", variant: "neutral", model: "sonnet-mini", time: "2m ago" },
  { status: "429", variant: "warning", model: "flash-large", time: "6m ago" },
  { status: "500", variant: "danger", model: "sonnet-mini", time: "14m ago" },
] as const;

export function ItemDemo() {
  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="Billing">
        <ItemGroup class="w-full max-w-[560px]">
          <Item variant="outline">
            <ItemMedia variant="icon">
              <CoinIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>One-time credits</ItemTitle>
              <ItemDescription>Purchase additional workspace credits</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="small" icon={<PlusIcon />}>
                Add credits
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <TerminalIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                Auto reload <Badge variant="success">On</Badge>
              </ItemTitle>
              <ItemDescription>Reload $20 when the balance drops below $5</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="small" variant="ghost">
                Edit
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </Group>

      <Group
        label="Variants"
        description="`default` has no fill, `outline` is the console's control row and `muted` its inset."
      >
        <div class="grid w-full max-w-[560px] gap-3">
          <Item>
            <ItemContent>
              <ItemTitle>Default</ItemTitle>
              <ItemDescription>Sits on the page with no border</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Outline</ItemTitle>
              <ItemDescription>A raised row with a hairline</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Muted</ItemTitle>
              <ItemDescription>An inset row, one layer up</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </Group>

      <Group
        label="Links with arrow keys"
        description="`roving` makes the link rows one Tab stop. Up, Down, Home and End move between them."
      >
        <ItemGroup roving aria-label="Members" class="w-full max-w-[560px]">
          <For each={members}>
            {(member) => (
              <Item variant="outline" href={`#member-${member.name.toLowerCase()}`}>
                <ItemMedia>
                  <Avatar size="normal">
                    <AvatarFallback>{member.initial}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{member.name}</ItemTitle>
                  <ItemDescription>
                    {member.role} · {member.spent} this month
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <ChevronRightIcon />
                </ItemActions>
              </Item>
            )}
          </For>
        </ItemGroup>
      </Group>

      <Group label="Separated" description="ItemSeparators join the rows with hairlines.">
        <ItemGroup class="w-full max-w-[560px]">
          <Item>
            <ItemContent>
              <ItemTitle>Spend limit</ItemTitle>
              <ItemDescription>Requests stop at $100 a month</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="small" variant="outline">
                Change
              </Button>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item>
            <ItemContent>
              <ItemTitle>Billing email</ItemTitle>
              <ItemDescription>Invoices go to billing@example.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button size="small" variant="outline">
                Change
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>
      </Group>

      <Group label="Small" description={'`size="sm"` is the console\'s request log row.'}>
        <ItemGroup aria-label="Recent requests" class="w-full max-w-[560px]">
          <For each={requests}>
            {(request) => (
              <Item size="sm">
                <ItemMedia>
                  <Badge variant={request.variant}>{request.status}</Badge>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{request.model}</ItemTitle>
                </ItemContent>
                <ItemActions class="text-muted">{request.time}</ItemActions>
              </Item>
            )}
          </For>
        </ItemGroup>
      </Group>

      <Group label="Header and footer">
        <Item variant="outline" class="w-full max-w-[360px]">
          <ItemHeader>
            <span class="text-muted">Workspace</span>
            <Badge>Free</Badge>
          </ItemHeader>
          <ItemContent>
            <ItemTitle>Acme Labs</ItemTitle>
            <ItemDescription>3 members · 12 API keys</ItemDescription>
          </ItemContent>
          <ItemFooter>
            <span class="text-muted">Renews Dec 1</span>
            <Button size="small" variant="ghost">
              Manage
            </Button>
          </ItemFooter>
        </Item>
      </Group>
    </div>
  );
}
