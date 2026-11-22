import { For } from "solid-js";

import { ChevronRightIcon } from "#/components/icons";
import { Avatar, AvatarFallback } from "#/components/ui/avatar";
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

import { Group } from "../demo-group";

const days = Array.from({ length: 30 }, (_, i) => i);

export function CardDemo() {
  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="Dashboard">
        <div class="grid w-full gap-3 lg:grid-cols-3">
          <Card class="min-h-[320px]">
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

          <Card class="min-h-[320px]">
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

          <Card class="min-h-[320px]">
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
        </div>
      </Group>

      <Group label="Plain">
        <Card class="w-full max-w-[360px]">
          <CardHeader>
            <CardTitle>Spend limit</CardTitle>
            <CardDescription>Requests stop at the monthly limit</CardDescription>
          </CardHeader>
          <CardContent>
            <CardInset>No spend limits set.</CardInset>
          </CardContent>
        </Card>
      </Group>
    </div>
  );
}
