export const chartColors = {
  primary: 'var(--v2-blue-600)',
  secondary: 'var(--v2-purple-500)',
  tertiary: 'var(--v2-cyan-500)',
  quaternary: 'var(--v2-green-600)',
  quinary: 'var(--v2-orange-600)',
} as const

export const spendSeries = [
  4, 6, 5, 9, 8, 12, 10, 14, 13, 17, 15, 21, 18, 23, 20, 26, 22, 28, 24, 31,
  27, 33, 29, 36, 32, 38, 34, 41, 37, 44,
]

export type DailyTrafficPoint = {
  date: string
  desktop: number
  mobile: number
}

export const dailyTraffic: DailyTrafficPoint[] = [
  { date: 'Oct 21', desktop: 222, mobile: 150 },
  { date: 'Oct 22', desktop: 186, mobile: 132 },
  { date: 'Oct 23', desktop: 248, mobile: 174 },
  { date: 'Oct 24', desktop: 210, mobile: 162 },
  { date: 'Oct 25', desktop: 294, mobile: 205 },
  { date: 'Oct 26', desktop: 318, mobile: 220 },
  { date: 'Oct 27', desktop: 265, mobile: 188 },
  { date: 'Oct 28', desktop: 342, mobile: 240 },
  { date: 'Oct 29', desktop: 310, mobile: 214 },
  { date: 'Oct 30', desktop: 378, mobile: 268 },
  { date: 'Oct 31', desktop: 356, mobile: 248 },
  { date: 'Nov 1', desktop: 402, mobile: 290 },
  { date: 'Nov 2', desktop: 384, mobile: 274 },
  { date: 'Nov 3', desktop: 428, mobile: 312 },
  { date: 'Nov 4', desktop: 396, mobile: 280 },
  { date: 'Nov 5', desktop: 452, mobile: 334 },
  { date: 'Nov 6', desktop: 430, mobile: 308 },
  { date: 'Nov 7', desktop: 478, mobile: 352 },
  { date: 'Nov 8', desktop: 446, mobile: 326 },
  { date: 'Nov 9', desktop: 492, mobile: 360 },
  { date: 'Nov 10', desktop: 468, mobile: 340 },
  { date: 'Nov 11', desktop: 518, mobile: 382 },
  { date: 'Nov 12', desktop: 496, mobile: 358 },
  { date: 'Nov 13', desktop: 534, mobile: 394 },
  { date: 'Nov 14', desktop: 508, mobile: 372 },
  { date: 'Nov 15', desktop: 562, mobile: 416 },
  { date: 'Nov 16', desktop: 540, mobile: 398 },
  { date: 'Nov 17', desktop: 588, mobile: 432 },
  { date: 'Nov 18', desktop: 566, mobile: 412 },
  { date: 'Nov 19', desktop: 612, mobile: 454 },
]

export const monthlyTraffic = [
  { month: 'Jan', desktop: 186, mobile: 80, delta: 24 },
  { month: 'Feb', desktop: 305, mobile: 200, delta: 48 },
  { month: 'Mar', desktop: 237, mobile: 120, delta: -18 },
  { month: 'Apr', desktop: 173, mobile: 190, delta: -32 },
  { month: 'May', desktop: 289, mobile: 165, delta: 36 },
  { month: 'Jun', desktop: 344, mobile: 214, delta: 54 },
]

export const modelSeries = [
  {
    name: 'DeepSeek V4.1',
    requests: 15_320,
    share: 48,
    color: chartColors.primary,
  },
  {
    name: 'GPT-6 Luna',
    requests: 8_160,
    share: 26,
    color: chartColors.secondary,
  },
  {
    name: 'Claude Sonnet 5',
    requests: 4_724,
    share: 15,
    color: chartColors.tertiary,
  },
  {
    name: 'MiniMax M2',
    requests: 3_480,
    share: 11,
    color: chartColors.quaternary,
  },
]

export const radarAxes = [
  'Requests',
  'Tokens',
  'Throughput',
  'Cache',
  'Latency',
  'Uptime',
]

export const radarSeries = [
  {
    name: 'DeepSeek V4.1',
    values: [92, 86, 78, 72, 66, 95],
    color: chartColors.primary,
  },
  {
    name: 'GPT-6 Luna',
    values: [68, 74, 88, 62, 82, 90],
    color: chartColors.secondary,
  },
]
