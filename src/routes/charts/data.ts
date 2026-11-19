export const spendSeries = [
  4, 6, 5, 9, 8, 12, 10, 14, 13, 17, 15, 21, 18, 23, 20, 26, 22, 28, 24, 31,
  27, 33, 29, 36, 32, 38, 34, 41, 37, 44,
]

export const stats = [
  { label: 'Spend', value: '$4.82', hint: '+12.4% vs previous' },
  { label: 'Requests', value: '18,204', hint: '+3.1% vs previous' },
  { label: 'Tokens', value: '42.6M', hint: '+8.7% vs previous' },
  { label: 'p95 latency', value: '2.4 s', hint: '−0.3 s vs previous' },
]

export const modelSeries = [
  {
    name: 'DeepSeek V4.1 Flash',
    requests: 15_320,
    share: 84,
    color: 'var(--v2-background-bg-accent)',
  },
  {
    name: 'GPT-6 Luna',
    requests: 1_860,
    share: 10,
    color: 'var(--v2-purple-500)',
  },
  {
    name: 'Claude Sonnet 5',
    requests: 724,
    share: 4,
    color: 'var(--v2-cyan-500)',
  },
  {
    name: 'MiniMax M2',
    requests: 300,
    share: 2,
    color: 'var(--v2-yellow-500)',
  },
]

export const days = [
  { date: 'Nov 19', requests: 1_284, tokens: '3.1M', cost: '$0.71' },
  { date: 'Nov 18', requests: 1_196, tokens: '2.9M', cost: '$0.64' },
  { date: 'Nov 17', requests: 1_142, tokens: '2.7M', cost: '$0.59' },
  { date: 'Nov 16', requests: 984, tokens: '2.3M', cost: '$0.51' },
  { date: 'Nov 15', requests: 761, tokens: '1.8M', cost: '$0.40' },
  { date: 'Nov 14', requests: 843, tokens: '2.0M', cost: '$0.44' },
  { date: 'Nov 13', requests: 902, tokens: '2.1M', cost: '$0.47' },
  { date: 'Nov 12', requests: 1_034, tokens: '2.4M', cost: '$0.53' },
]
