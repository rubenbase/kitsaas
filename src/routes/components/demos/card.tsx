import { For } from "solid-js";

import { ChevronRightIcon, TrendingUpIcon } from "#/components/icons";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFact,
  CardFacts,
  CardFooter,
  CardHeader,
  CardInset,
  CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input, InputGroup } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import { Switch, SwitchThumb } from "#/components/ui/switch";

import { Group } from "../demo-group";

const days = Array.from({ length: 30 }, (_, i) => i);

const frameworks = [
  { value: "solid", label: "Solid" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
];

const notifications = [
  { title: "Your call has been confirmed.", time: "1 hour ago" },
  { title: "You have a new message.", time: "1 hour ago" },
  { title: "Your subscription is expiring soon.", time: "2 hours ago" },
];

export function CardDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group
        label="Usage"
        description="The console's My usage card: a linked title, a spend figure, daily bars and facts pinned to the bottom."
      >
        <Card class="min-h-[320px] w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>
              <a href="#my-usage">My usage</a>
            </CardTitle>
            <CardDescription>Your requests, cost and limit</CardDescription>
            <CardAction>
              <ChevronRightIcon />
            </CardAction>
          </CardHeader>
          <CardContent>
            <div class="flex items-baseline gap-2">
              <span class="text-[24px] leading-[32px] [font-weight:530]">$12.40</span>
              <span class="text-muted">+8% vs last month</span>
            </div>
            <div class="mt-4 flex h-8 items-end gap-[3px]">
              <For each={days}>
                {(day) => (
                  <span
                    class="flex-1 rounded-[1px]"
                    style={{
                      height: `${30 + ((day * 37) % 70)}%`,
                      background:
                        day === 21
                          ? "var(--v2-state-fg-success)"
                          : "var(--v2-background-bg-layer-03)",
                    }}
                  />
                )}
              </For>
            </div>
          </CardContent>
          <CardFooter>
            <CardFacts>
              <CardFact label="Requests">2,624</CardFact>
              <CardFact label="Tokens">329.6M</CardFact>
              <CardFact label="Personal limit">None</CardFact>
            </CardFacts>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Leaderboard"
        description="The console's Leaderboard card: ranked facts with avatars and an inset tile in the footer."
      >
        <Card class="min-h-[320px] w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>
              <a href="#leaderboard">Leaderboard</a>
            </CardTitle>
            <CardDescription>Who's spending the most</CardDescription>
            <CardAction>
              <ChevronRightIcon />
            </CardAction>
          </CardHeader>
          <CardContent>
            <CardFacts>
              <CardFact
                label={
                  <span class="flex items-center gap-3 text-foreground">
                    <Avatar size="normal">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    Ada
                  </span>
                }
              >
                $7.90
              </CardFact>
              <CardFact
                label={
                  <span class="flex items-center gap-3 text-foreground">
                    <Avatar size="normal">
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    Grace
                  </span>
                }
              >
                $4.50
              </CardFact>
            </CardFacts>
          </CardContent>
          <CardFooter>
            <CardInset class="flex justify-between">
              <span class="text-muted">Average spent</span>
              <span>$6.20</span>
            </CardInset>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Billing"
        description="The console's Billing card: a large balance, a payment fact and a warning inset."
      >
        <Card class="min-h-[320px] w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>
              <a href="#billing">Billing</a>
            </CardTitle>
            <CardDescription>Pay as you go</CardDescription>
            <CardAction>
              <ChevronRightIcon />
            </CardAction>
          </CardHeader>
          <CardFooter>
            <CardFacts>
              <CardFact label="Available credit">
                <span class="text-[24px] leading-[32px] [font-weight:530]">$0.19</span>
              </CardFact>
              <CardFact label="Payment method">Visa ··4242</CardFact>
            </CardFacts>
            <CardInset variant="warning">
              Credit is running low · <a href="#add-credits">Add credits</a>
            </CardInset>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Login"
        description="A sign-in form: a button in CardAction, fields in CardContent, stacked buttons in CardFooter."
      >
        <Card class="w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to log in</CardDescription>
            <CardAction>
              <Button variant="ghost" size="small">
                Sign up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form id="card-login" class="grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <Field name="email">
                <FieldLabel>Email</FieldLabel>
                <InputGroup class="w-full">
                  <Input type="email" placeholder="name@example.com" autocomplete="email" />
                </InputGroup>
              </Field>
              <Field name="password">
                <div class="flex w-full items-center justify-between">
                  <FieldLabel>Password</FieldLabel>
                  <a
                    href="#forgot"
                    class="text-[12px] text-muted underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <InputGroup class="w-full">
                  <Input type="password" autocomplete="current-password" />
                </InputGroup>
              </Field>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              form="card-login"
              variant="contrast"
              class="w-full justify-center"
            >
              Login
            </Button>
            <Button variant="outline" class="w-full justify-center">
              Login with GitHub
            </Button>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Create project"
        description="A short form with a Select, and Cancel and Deploy side by side in the footer."
      >
        <Card class="w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one click</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="grid gap-4" onSubmit={(e) => e.preventDefault()}>
              <Field name="project-name">
                <FieldLabel>Name</FieldLabel>
                <InputGroup class="w-full">
                  <Input placeholder="Name of your project" />
                </InputGroup>
              </Field>
              <Field name="framework">
                <FieldLabel>Framework</FieldLabel>
                <Select items={frameworks} placeholder="Select">
                  <SelectTrigger appearance="base" class="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <For each={frameworks}>
                      {(framework) => (
                        <SelectItem value={framework.value}>{framework.label}</SelectItem>
                      )}
                    </For>
                  </SelectContent>
                </Select>
              </Field>
            </form>
          </CardContent>
          <CardFooter>
            <div class="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button variant="contrast">Deploy</Button>
            </div>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Notifications"
        description="A settings row with a Switch in a CardInset, a list of messages, and a full-width footer action."
      >
        <Card class="w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <CardInset class="flex items-center gap-3">
              <div class="min-w-0 flex-1">
                <p class="[font-weight:530]">Push notifications</p>
                <p class="text-muted">Send notifications to this device</p>
              </div>
              <Switch aria-label="Push notifications">
                <SwitchThumb />
              </Switch>
            </CardInset>
            <ul class="grid gap-3">
              <For each={notifications}>
                {(item) => (
                  <li class="grid grid-cols-[8px_minmax(0,1fr)] items-start gap-3">
                    <span class="mt-[6px] size-2 rounded-full bg-[var(--v2-state-fg-info)]" />
                    <div>
                      <p>{item.title}</p>
                      <p class="text-muted">{item.time}</p>
                    </div>
                  </li>
                )}
              </For>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="contrast" class="w-full justify-center">
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </Group>

      <Group
        label="Stat"
        description="A metric card: the figure as the title, a Badge in CardAction and a trend line in the footer."
      >
        <Card class="w-full max-w-[360px]">
          <CardHeader>
            <CardDescription class="!mt-0">Total revenue</CardDescription>
            <CardTitle class="text-[24px] leading-[32px]">$1,250.00</CardTitle>
            <CardAction>
              <Badge variant="success">
                <TrendingUpIcon />
                +12.5%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter>
            <p class="flex items-center gap-2 [font-weight:530]">
              Trending up this month <TrendingUpIcon class="size-4" />
            </p>
            <p class="text-muted">Visitors for the last 6 months</p>
          </CardFooter>
        </Card>
      </Group>
    </div>
  );
}
