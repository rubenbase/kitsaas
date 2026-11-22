import { CheckboxGroup } from "@ui-sdk/solid/checkbox";
import { createMemo, createSignal, For } from "solid-js";

import { Checkbox, CheckboxIndicator } from "#/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/ui/table";

import { Group } from "../demo-group";

const members = [
  { id: "ada", name: "Ada", requests: 1204, spent: 7.9 },
  { id: "grace", name: "Grace", requests: 846, spent: 4.5 },
  { id: "linus", name: "Linus", requests: 312, spent: 1.72 },
  { id: "mira", name: "Mira", requests: 262, spent: 0.95 },
];

const usage = [
  { model: "model-large", input: "182.4M", output: "12.9M", cost: "$9.12" },
  { model: "model-medium", input: "96.1M", output: "7.3M", cost: "$2.41" },
  { model: "model-small", input: "41.0M", output: "2.2M", cost: "$0.38" },
];

const money = (value: number) => `$${value.toFixed(2)}`;
const count = (value: number) => value.toLocaleString("en-US");

type SortKey = "name" | "requests" | "spent";
type SortDirection = "ascending" | "descending";

function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path
        d="M3.53564 8.17857L6.39279 11.75L12.4642 4.25"
        stroke="currentColor"
        stroke-width="1"
      />
    </svg>
  );
}

function MinusMark() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4.5 8h7" stroke="currentColor" stroke-width="1" />
    </svg>
  );
}

export function TableDemo() {
  const [sort, setSort] = createSignal<{ key: SortKey; direction: SortDirection }>({
    key: "spent",
    direction: "descending",
  });

  const sorted = createMemo(() => {
    const { key, direction } = sort();
    const sign = direction === "ascending" ? 1 : -1;
    return [...members].sort((a, b) =>
      key === "name" ? sign * a.name.localeCompare(b.name) : sign * (a[key] - b[key]),
    );
  });

  const sortBy = (key: SortKey) =>
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "descending" ? "ascending" : "descending",
    }));

  const ariaSort = (key: SortKey) => (sort().key === key ? sort().direction : "none");

  const [selected, setSelected] = createSignal<string[]>(["grace"]);

  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="Members">
        <Table class="max-w-[560px]">
          <TableCaption>Spend this month, per member.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Member</TableHead>
              <TableHead scope="col" numeric>
                Requests
              </TableHead>
              <TableHead scope="col" numeric>
                Spent
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={members}>
              {(member) => (
                <TableRow>
                  <TableCell>{member.name}</TableCell>
                  <TableCell numeric>{count(member.requests)}</TableCell>
                  <TableCell numeric>{money(member.spent)}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell numeric>2,624</TableCell>
              <TableCell numeric>$15.07</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Group>

      <Group label="Framed">
        <Table variant="framed" containerClass="max-w-[560px]" aria-label="Usage by model">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Model</TableHead>
              <TableHead scope="col" numeric>
                Input
              </TableHead>
              <TableHead scope="col" numeric>
                Output
              </TableHead>
              <TableHead scope="col" numeric>
                Cost
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={usage}>
              {(row) => (
                <TableRow>
                  <TableCell>{row.model}</TableCell>
                  <TableCell numeric>{row.input}</TableCell>
                  <TableCell numeric>{row.output}</TableCell>
                  <TableCell numeric>{row.cost}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </Group>

      <Group label="Sortable">
        <Table class="max-w-[560px]" aria-label="Members by spend">
          <TableHeader>
            <TableRow>
              <TableHead scope="col" aria-sort={ariaSort("name")}>
                <button type="button" onClick={() => sortBy("name")}>
                  Member
                </button>
              </TableHead>
              <TableHead scope="col" numeric aria-sort={ariaSort("requests")}>
                <button type="button" onClick={() => sortBy("requests")}>
                  Requests
                </button>
              </TableHead>
              <TableHead scope="col" numeric aria-sort={ariaSort("spent")}>
                <button type="button" onClick={() => sortBy("spent")}>
                  Spent
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <For each={sorted()}>
              {(member) => (
                <TableRow>
                  <TableCell>{member.name}</TableCell>
                  <TableCell numeric>{count(member.requests)}</TableCell>
                  <TableCell numeric>{money(member.spent)}</TableCell>
                </TableRow>
              )}
            </For>
          </TableBody>
        </Table>
      </Group>

      <Group label="Row selection">
        <CheckboxGroup
          aria-label="Members"
          value={selected()}
          onValueChange={setSelected}
          allValues={members.map((member) => member.id)}
        >
          <Table class="max-w-[560px]" aria-label="Members">
            <TableHeader>
              <TableRow>
                <TableHead scope="col" class="w-px">
                  <Checkbox appearance="compact" parent aria-label="Select all members">
                    <CheckboxIndicator>
                      <CheckMark />
                      <MinusMark />
                    </CheckboxIndicator>
                  </Checkbox>
                </TableHead>
                <TableHead scope="col">Member</TableHead>
                <TableHead scope="col" numeric>
                  Spent
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={members}>
                {(member) => (
                  <TableRow selected={selected().includes(member.id)}>
                    <TableCell>
                      <Checkbox
                        appearance="compact"
                        value={member.id}
                        aria-label={`Select ${member.name}`}
                      >
                        <CheckboxIndicator>
                          <CheckMark />
                        </CheckboxIndicator>
                      </Checkbox>
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell numeric>{money(member.spent)}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </CheckboxGroup>
      </Group>
    </div>
  );
}
