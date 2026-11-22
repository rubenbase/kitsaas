import { ChevronDownIcon } from '#/components/icons'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '#/components/ui/accordion'

import { Group } from '../demo-group'

export function AccordionDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Single, collapsible">
        <Accordion defaultValue={['shipping']} class="w-full">
          <AccordionItem value="shipping">
            <AccordionHeader>
              <AccordionTrigger>
                What are your shipping options?
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Standard (5 to 7 days), express (2 to 3 days) and overnight.
                Every order ships with tracking.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="returns">
            <AccordionHeader>
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Return any unused item in its original packaging within 30 days.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Group>

      <Group label="Multiple open">
        <Accordion
          multiple
          defaultValue={['notifications', 'privacy']}
          class="w-full"
        >
          <AccordionItem value="notifications">
            <AccordionHeader>
              <AccordionTrigger>Notification settings</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Choose what we email you about, and how often.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="privacy">
            <AccordionHeader>
              <AccordionTrigger>Privacy and security</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Turn on two-factor authentication and review signed-in devices.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="billing">
            <AccordionHeader>
              <AccordionTrigger>Billing and subscription</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Update your payment method and download past invoices.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Group>

      <Group label="Disabled item">
        <Accordion class="w-full">
          <AccordionItem value="access">
            <AccordionHeader>
              <AccordionTrigger>
                Can I access my account history?
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Yes. Every order and payment from the last five years is in your
                account.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="premium" disabled>
            <AccordionHeader>
              <AccordionTrigger>Premium feature information</AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Premium includes priority support and early access to new
                features.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Group>

      <Group label="Trailing icon">
        <Accordion class="w-full">
          <AccordionItem value="keyboard">
            <AccordionHeader>
              <AccordionTrigger>
                Keyboard shortcuts
                <ChevronDownIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Tab moves between triggers; Enter or Space opens the focused
                panel. Arrow keys do nothing here.
              </div>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="theme">
            <AccordionHeader>
              <AccordionTrigger>
                Theme
                <ChevronDownIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionPanel>
              <div class="px-3 py-2 text-[12px] text-muted">
                Light, dark or system, set on the document&apos;s
                data-color-scheme attribute.
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Group>
    </div>
  )
}
