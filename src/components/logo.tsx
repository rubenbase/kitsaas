import type { JSX } from '@solidjs/web'

type LogoProps = JSX.SVGAttributes<SVGSVGElement>

const MARK =
  'M4.5 1H11.5A3.5 3.5 0 0 1 15 4.5V11.5A3.5 3.5 0 0 1 11.5 15H4.5A3.5 3.5 0 0 1 1 11.5V4.5A3.5 3.5 0 0 1 4.5 1ZM9.75 8.5A1.25 1.25 0 0 0 8.5 9.75V11.25A1.25 1.25 0 0 0 9.75 12.5H11.25A1.25 1.25 0 0 0 12.5 11.25V9.75A1.25 1.25 0 0 0 11.25 8.5Z'

/**
 * Kitsaas mark: one solid block with a slot cut out of it, a component with
 * room for what you compose. Drawn in `currentColor` so it follows the theme.
 */
export function KitsaasMark(props: LogoProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path fill-rule="evenodd" d={MARK} />
    </svg>
  )
}
