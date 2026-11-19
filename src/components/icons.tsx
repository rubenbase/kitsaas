import type { JSX } from '@solidjs/web'

type IconProps = JSX.SVGAttributes<SVGSVGElement>

function Icon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      stroke="currentColor"
      stroke-width={1.25}
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...props}
    />
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 6.5 4 4 4-4" />
    </Icon>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6.5 4 4 4-4 4" />
    </Icon>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="7" r="4.25" />
      <path d="m10.2 10.2 3 3" />
    </Icon>
  )
}

export function CoinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M9.75 6.4c-.35-.5-1-.8-1.75-.8-1 0-1.75.5-1.75 1.2 0 .8.8 1.1 1.75 1.3 1 .2 1.75.5 1.75 1.3 0 .7-.8 1.2-1.75 1.2-.8 0-1.45-.3-1.8-.8M8 4.75v6.5" />
    </Icon>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3.5v9M3.5 8h9" />
    </Icon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 4.5 7 7M11.5 4.5l-7 7" />
    </Icon>
  )
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 3v7M5 7.5 8 10.5l3-3M3.5 12.5h9" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3.5 8.5 3 3 6-7" />
    </Icon>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 11 11 5M6 5h5v5" />
    </Icon>
  )
}

export function ComponentsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="1" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="1" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="1" />
    </Icon>
  )
}

export function ChartsIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 2.5v11h11" />
      <path d="M5.5 13.5V9M8.5 13.5V6M11.5 13.5V3" />
    </Icon>
  )
}
