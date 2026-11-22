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

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12.5 8h-9M7 4.5 3.5 8 7 11.5" />
    </Icon>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3.5 8h9M9 4.5 12.5 8 9 11.5" />
    </Icon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
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

export function CopyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M3.5 10.5H3a1.5 1.5 0 0 1-1.5-1.5V3A1.5 1.5 0 0 1 3 1.5h6A1.5 1.5 0 0 1 10.5 3v.5" />
    </Icon>
  )
}

export function RotateCcwIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7.5a5 5 0 1 1 1.25 3.35" />
      <path d="M3 3.75v3.75h3.75" />
    </Icon>
  )
}

export function TerminalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3.5 5.25 3 2.75-3 2.75" />
      <path d="M8 11.25h4.5" />
    </Icon>
  )
}

export function FileCodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 2.25h5.25L12.5 5.5v8.25a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75V3A.75.75 0 0 1 4 2.25Z" />
      <path d="M9 2.25v3.5h3.5" />
      <path d="m6.75 8.5-1.5 1.5 1.5 1.5M9.25 8.5l1.5 1.5-1.5 1.5" />
    </Icon>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5.5 4.5-3 3.5 3 3.5M10.5 4.5l3 3.5-3 3.5M9 3.5 7 12.5" />
    </Icon>
  )
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 12.5v-9M4.5 7 8 3.5 11.5 7" />
    </Icon>
  )
}

export function TrendingUpIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m2.5 11 4-4 2.5 2.5 4.5-4.5" />
      <path d="M10 5h3.5v3.5" />
    </Icon>
  )
}

export function AreaChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 2.5v11h11" />
      <path d="M4.5 11.5 7 7l2.5 2 3-4.5v7Z" />
    </Icon>
  )
}

export function LineChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M2.5 2.5v11h11" />
      <path d="m4.5 10.5 2.75-3.5 2.5 2 3.25-4.5" />
    </Icon>
  )
}

export function PieChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M13.5 8.5A5.5 5.5 0 1 1 7.5 2.5v6Z" />
      <path d="M10 2.5a5.5 5.5 0 0 1 3.5 3.5H10Z" />
    </Icon>
  )
}

export function RadarChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polygon points="8,2.25 13.5,6.25 11.5,12.75 4.5,12.75 2.5,6.25" />
      <polygon points="8,5.25 10.75,7.25 9.75,10.5 6.25,10.5 5.25,7.25" />
    </Icon>
  )
}

export function RadialChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="5.5" stroke-dasharray="22 14" />
      <circle cx="8" cy="8" r="3" stroke-dasharray="12 8" />
    </Icon>
  )
}

export function SolidFrameworkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M14.1 4.65C13.5 3.4 12.1 2.75 10.65 3.15L5.2 4.65C4.55 4.83 4.05 5.25 3.75 5.8L2.6 7.8C3.2 7.25 4.0 6.95 4.9 7.15L10.4 8.3C11.9 8.6 13.3 7.8 13.9 6.5L14.3 5.65C14.45 5.32 14.3 4.95 14.1 4.65Z"
        fill="currentColor"
        opacity="0.45"
      />
      <path
        d="M12.2 6.85L6.5 5.65C4.95 5.33 3.4 6.15 2.75 7.5L1.9 9.25C1.75 9.55 1.85 9.92 2.05 10.2C2.65 11.4 4.05 12.05 5.5 11.65L10.95 10.15C11.6 9.97 12.1 9.55 12.4 9.0L13.5 7.05C13.1 7.05 12.65 6.95 12.2 6.85Z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M11.7 9.95L6.2 8.8C4.7 8.48 3.3 9.25 2.7 10.55L1.95 12.15C2.55 13.1 3.75 13.55 5.0 13.2L10.45 11.7C11.2 11.5 11.8 11.0 12.1 10.3L12.2 10.1C12.05 10.05 11.88 10.0 11.7 9.95Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ReactFrameworkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <circle cx="8" cy="8" r="1.35" fill="currentColor" />
      <ellipse
        cx="8"
        cy="8"
        rx="6.25"
        ry="2.55"
        stroke="currentColor"
        stroke-width="1.15"
      />
      <ellipse
        cx="8"
        cy="8"
        rx="6.25"
        ry="2.55"
        stroke="currentColor"
        stroke-width="1.15"
        transform="rotate(60 8 8)"
      />
      <ellipse
        cx="8"
        cy="8"
        rx="6.25"
        ry="2.55"
        stroke="currentColor"
        stroke-width="1.15"
        transform="rotate(120 8 8)"
      />
    </svg>
  )
}

export function VueFrameworkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M1.5 2.75H4.1L8 9.5L11.9 2.75H14.5L8 14L1.5 2.75Z"
        fill="currentColor"
      />
      <path
        d="M4.1 2.75H6.5L8 5.35L9.5 2.75H11.9L8 9.5L4.1 2.75Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  )
}

export function SvelteFrameworkIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={16}
      height={16}
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12.35 3.45C11.2 1.8 8.9 1.35 7.25 2.4L4.4 4.2C3.25 4.95 2.7 6.3 3.0 7.6C3.15 8.15 3.45 8.65 3.85 9.05C3.5 9.65 3.35 10.35 3.55 11.05C3.85 12.2 4.75 13.1 5.9 13.45C7.05 13.8 8.3 13.6 9.3 12.95L12.15 11.15C13.3 10.4 13.85 9.05 13.55 7.75C13.4 7.2 13.1 6.7 12.7 6.3C13.05 5.7 13.2 5.0 13.0 4.3C12.85 3.95 12.65 3.7 12.35 3.45ZM10.8 9.3L7.95 11.1C7.35 11.45 6.55 11.3 6.15 10.7C5.95 10.4 5.9 10.05 6.0 9.7L6.1 9.45L6.35 9.65C7.0 10.1 7.75 10.35 8.55 10.35L8.75 10.35L8.7 10.15C8.65 9.9 8.7 9.65 8.85 9.45C9.0 9.25 9.2 9.1 9.45 9.05L9.65 9.0L10.8 9.3ZM10.4 6.1C10.55 6.35 10.6 6.7 10.5 7.0L10.4 7.25L10.15 7.05C9.5 6.6 8.75 6.35 7.95 6.35L7.75 6.35L7.8 6.55C7.85 6.8 7.8 7.05 7.65 7.25C7.5 7.45 7.3 7.6 7.05 7.65L6.85 7.7L5.7 7.4L8.55 5.6C9.15 5.25 9.95 5.4 10.4 6.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function WebFrameworkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M2.5 8h11" />
      <path d="M8 2.25c1.65 1.6 2.5 3.55 2.5 5.75s-.85 4.15-2.5 5.75C6.35 12.15 5.5 10.2 5.5 8S6.35 3.85 8 2.25Z" />
    </Icon>
  )
}
