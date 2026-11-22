import { createSignal } from 'solid-js'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export const PACKAGE_MANAGERS: readonly PackageManager[] = [
  'pnpm',
  'npm',
  'yarn',
  'bun',
]

export type TargetFramework = 'solid' | 'react' | 'vue' | 'svelte' | 'web'

export const TARGET_FRAMEWORKS: readonly {
  id: TargetFramework
  label: string
  uiSdkPkg: string
}[] = [
  { id: 'solid', label: 'Solid', uiSdkPkg: '@ui-sdk/solid' },
  { id: 'react', label: 'React', uiSdkPkg: '@ui-sdk/react' },
  { id: 'vue', label: 'Vue', uiSdkPkg: '@ui-sdk/vue' },
  { id: 'svelte', label: 'Svelte', uiSdkPkg: '@ui-sdk/svelte' },
  { id: 'web', label: 'Web', uiSdkPkg: '@ui-sdk/web' },
]

const STORAGE_KEY = 'kitsaas:docs:pm'
const FRAMEWORK_STORAGE_KEY = 'kitsaas:docs:framework'

function readStoredFramework(): TargetFramework {
  if (typeof window === 'undefined') return 'solid'
  try {
    const raw = window.localStorage.getItem(FRAMEWORK_STORAGE_KEY)
    if (
      raw === 'solid' ||
      raw === 'react' ||
      raw === 'vue' ||
      raw === 'svelte' ||
      raw === 'web'
    ) {
      return raw
    }
  } catch {
    // Storage may be unavailable.
  }
  return 'solid'
}

const [targetFramework, setTargetFrameworkSignal] =
  createSignal<TargetFramework>(readStoredFramework())

export function useTargetFramework() {
  const set = (next: TargetFramework) => {
    setTargetFrameworkSignal(next)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(FRAMEWORK_STORAGE_KEY, next)
      } catch {
        // Ignore storage write errors.
      }
    }
  }

  return [targetFramework, set] as const
}

export function getFrameworkMeta(id: TargetFramework) {
  return (
    TARGET_FRAMEWORKS.find((fw) => fw.id === id) ?? TARGET_FRAMEWORKS[0]
  )
}

export function formatComponentsJson(
  framework: TargetFramework,
  origin = 'https://kitsaas.dev',
): string {
  return JSON.stringify(
    {
      registries: {
        '@kitsaas': `${origin}/r/${framework}/{name}.json`,
      },
    },
    null,
    2,
  )
}

function readStoredPackageManager(): PackageManager {
  if (typeof window === 'undefined') return 'pnpm'
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (
      raw === 'pnpm' ||
      raw === 'npm' ||
      raw === 'yarn' ||
      raw === 'bun'
    ) {
      return raw
    }
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
  return 'pnpm'
}

const [packageManager, setPackageManagerSignal] =
  createSignal<PackageManager>(readStoredPackageManager())

export function usePackageManager() {
  const set = (next: PackageManager) => {
    setPackageManagerSignal(next)
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Ignore storage write errors.
      }
    }
  }

  return [packageManager, set] as const
}

/**
 * Formats a package installation command for the selected package manager.
 */
export function formatInstallCommand(
  pm: PackageManager,
  packages: string | string[],
): string {
  const list = Array.isArray(packages) ? packages.join(' ') : packages
  switch (pm) {
    case 'pnpm':
      return `pnpm add ${list}`
    case 'npm':
      return `npm install ${list}`
    case 'yarn':
      return `yarn add ${list}`
    case 'bun':
      return `bun add ${list}`
  }
}

/**
 * Formats a one-off CLI execution command (`dlx` / `npx` / `bunx`).
 */
export function formatExecCommand(pm: PackageManager, args: string): string {
  switch (pm) {
    case 'pnpm':
      return `pnpm dlx ${args}`
    case 'npm':
      return `npx ${args}`
    case 'yarn':
      return `yarn dlx ${args}`
    case 'bun':
      return `bunx ${args}`
  }
}
