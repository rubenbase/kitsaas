import { createSignal } from 'solid-js'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import { Input, InputGroup } from '#/components/ui/input'
import { Textarea } from '#/components/ui/textarea'

import { Group } from '../demo-group'

export function FieldDemo() {
  const [bio, setBio] = createSignal('')

  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Label and description">
        <div class="w-[280px] max-w-full self-start">
          <Field name="email">
            <FieldLabel>Email</FieldLabel>
            <InputGroup>
              <Input
                type="email"
                placeholder="name@example.com"
                autocomplete="email"
              />
            </InputGroup>
            <FieldDescription>
              We&apos;ll only use it for receipts.
            </FieldDescription>
          </Field>
        </div>

        <div class="w-[280px] max-w-full self-start">
          <Field name="feedback">
            <FieldLabel>Feedback</FieldLabel>
            <Textarea placeholder="What could be better?" />
          </Field>
        </div>
      </Group>

      <Group label="With error (invalid)">
        <div class="w-[280px] max-w-full self-start">
          <Field name="email" invalid>
            <FieldLabel>Email</FieldLabel>
            <InputGroup invalid>
              <Input type="email" defaultValue="not-an-email" />
            </InputGroup>
            <FieldError>
              Enter an email address like name@example.com.
            </FieldError>
          </Field>
        </div>
      </Group>

      <Group label="Required">
        <form
          class="flex w-[280px] max-w-full flex-col gap-2"
          onSubmit={(event) => event.preventDefault()}
        >
          <Field name="team">
            <FieldLabel>Team name</FieldLabel>
            <InputGroup>
              <Input required placeholder="Acme" />
            </InputGroup>
            <FieldDescription>
              Submitting empty shows the browser&apos;s message.
            </FieldDescription>
            <FieldError />
          </Field>
          <Button
            type="submit"
            variant="outline"
            size="small"
            class="self-start"
          >
            Submit
          </Button>
        </form>
      </Group>

      <Group label="Disabled field set">
        <fieldset
          disabled
          class="m-0 flex w-[280px] max-w-full flex-col gap-4 border-0 p-0"
        >
          <Field name="billing-street">
            <FieldLabel>Street address</FieldLabel>
            <InputGroup>
              <Input autocomplete="billing street-address" />
            </InputGroup>
          </Field>
          <Field name="billing-city">
            <FieldLabel>City</FieldLabel>
            <InputGroup>
              <Input autocomplete="address-level2" />
            </InputGroup>
          </Field>
        </fieldset>
      </Group>

      <Group label="Character count">
        <div class="w-[280px] max-w-full self-start">
          <Field name="bio">
            <FieldLabel>Bio</FieldLabel>
            <Textarea value={bio()} onValueChange={setBio} maxlength={280} />
            <FieldDescription>{bio().length} / 280</FieldDescription>
          </Field>
        </div>
      </Group>
    </div>
  )
}
