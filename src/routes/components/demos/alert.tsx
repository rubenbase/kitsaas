import { AlertTriangleIcon, CheckIcon, InfoIcon } from '#/components/icons'
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '#/components/ui/alert'
import { Button } from '#/components/ui/button'

import { Group } from '../demo-group'

export function AlertDemo() {
  return (
    <div class="grid gap-6 px-6 py-6 lg:grid-cols-2">
      <Group label="Warning">
        <Alert variant="warning" role="status">
          <AlertDescription>
            Your credit balance is running low. Add credits to avoid
            interruptions.
          </AlertDescription>
        </Alert>
      </Group>

      <Group label="Variants">
        <div class="grid w-full gap-2">
          <Alert role="note">
            <AlertDescription>Usage resets on the 1st of each month.</AlertDescription>
          </Alert>
          <Alert variant="info" role="note">
            <AlertDescription>A new model is available in this workspace.</AlertDescription>
          </Alert>
          <Alert variant="success" role="status">
            <AlertDescription>Auto-recharge is on.</AlertDescription>
          </Alert>
          <Alert variant="danger">
            <AlertDescription>Your last payment failed.</AlertDescription>
          </Alert>
        </div>
      </Group>

      <Group label="Title and icon">
        <div class="grid w-full gap-2">
          <Alert variant="info" role="note">
            <InfoIcon />
            <AlertTitle>Spend controls are on</AlertTitle>
            <AlertDescription>
              Requests stop once this workspace reaches $200 this month.
            </AlertDescription>
          </Alert>
          <Alert variant="success" role="status">
            <CheckIcon />
            <AlertTitle>Payment method saved</AlertTitle>
          </Alert>
        </div>
      </Group>

      <Group label="Action">
        <Alert variant="warning" role="status">
          <AlertTriangleIcon />
          <AlertTitle>Low balance</AlertTitle>
          <AlertDescription>$0.19 left, less than a day at your current pace.</AlertDescription>
          <AlertAction>
            <Button size="small">
              Add credits
            </Button>
          </AlertAction>
        </Alert>
      </Group>
    </div>
  )
}
