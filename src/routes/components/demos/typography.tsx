import {
  Typography,
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
} from "#/components/ui/typography";

import { Group } from "../demo-group";

export function TypographyDemo() {
  return (
    <div class="grid gap-6 px-6 py-6">
      <Group label="Article">
        <Typography class="w-full max-w-[640px]">
          <TypographyH1>Shared budgets</TypographyH1>
          <TypographyLead>
            Workspaces can now pool credit and set a spend limit for every member.
          </TypographyLead>
          <TypographyP>
            A shared budget replaces each member's personal balance. Requests draw from the
            workspace first, and a member's own limit still applies on top of it.
          </TypographyP>
          <TypographyH2>Setting a limit</TypographyH2>
          <TypographyP>
            Open <strong>Billing</strong>, choose <a href="#limits">Spend limits</a> and enter a
            monthly amount. The new limit takes effect on the next request.
          </TypographyP>
          <TypographyBlockquote>
            Limits reset on the first day of each month, in the workspace's time zone.
          </TypographyBlockquote>
          <TypographyH3>What counts toward it</TypographyH3>
          <TypographyList>
            <li>Every model request made with a workspace key</li>
            <li>Requests from members who joined mid-month</li>
            <li>
              Retries, unless the response was a <TypographyInlineCode>5xx</TypographyInlineCode>
            </li>
          </TypographyList>
          <TypographyH4>Turning it off</TypographyH4>
          <TypographyP>
            Set the limit to <TypographyInlineCode>0</TypographyInlineCode> to remove it.
          </TypographyP>
        </Typography>
      </Group>

      <Group label="Markdown">
        <Typography
          class="w-full max-w-[640px]"
          innerHTML={`<h2>March update</h2>
<p>The usage chart now groups requests by <strong>model</strong> and by <code>key</code>.</p>
<ol><li>Pick a range</li><li>Choose a grouping</li><li>Export as CSV</li></ol>
<pre><code>curl https://example.com/v1/usage?group=model</code></pre>
<table><thead><tr><th>Model</th><th>Requests</th></tr></thead>
<tbody><tr><td>Model A</td><td>1,204</td></tr><tr><td>Model B</td><td>388</td></tr></tbody></table>`}
        />
      </Group>

      <Group label="Compact">
        <Typography size="compact" class="w-full max-w-[480px]">
          <TypographyH2>Keys</TypographyH2>
          <TypographyP>
            Rotate a key from its menu. The old key keeps working for 24 hours.
          </TypographyP>
          <TypographyList>
            <li>Keys are scoped to one workspace</li>
            <li>Only admins can create them</li>
          </TypographyList>
        </Typography>
      </Group>

      <Group label="Text styles">
        <div class="grid w-full gap-3">
          <TypographyLead>A lead paragraph introduces a page.</TypographyLead>
          <TypographyLarge>Are you sure you want to continue?</TypographyLarge>
          <TypographyP>Body text for paragraphs and lists.</TypographyP>
          <TypographySmall>Updated 3 minutes ago</TypographySmall>
          <TypographyMuted>Enter the email address of the person to invite.</TypographyMuted>
        </div>
      </Group>
    </div>
  );
}
