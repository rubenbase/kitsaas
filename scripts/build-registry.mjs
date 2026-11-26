#!/usr/bin/env node
/**
 * Automatic multi-framework shadcn Registry generator for Kitsaas.
 *
 * Source of truth:
 *   - src/theme.css
 *   - src/components/ui/<slug>.css         (shared across ALL 5 frameworks)
 *   - src/components/ui/<slug>-primitive.ts (custom @ui-sdk/core primitives, shared across ALL 5 frameworks)
 *   - src/components/ui/<slug>.tsx         (live Solid 2.0 wrappers used by Kitsaas itself)
 *   - registry/overrides/<fw>/<slug>.<ext> (optional hand-crafted overrides for stateful primitives)
 *   - src/routes/components/registry.tsx   (component metadata: slug, name, description, packageName)
 *
 * Output (shadcn Registry v2/v3 schema):
 *   - public/r/registry.json               (master discovery index)
 *   - public/r/theme.json                  (Kitsaas --v2-* design tokens)
 *   - public/r/<fw>/registry.json          (per-framework shadcn registry index)
 *   - public/r/<fw>/theme.json             (per-framework theme item)
 *   - public/r/<fw>/<slug>.json            (56 components × 5 frameworks = 280 registry-item.json files)
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const UI_DIR = path.join(ROOT, 'src/components/ui')
const OVERRIDES_DIR = path.join(ROOT, 'registry/overrides')
const OUTPUT_DIR = path.join(ROOT, 'public/r')
const CATALOG_PATH = path.join(ROOT, 'src/routes/components/registry.tsx')
const THEME_PATH = path.join(ROOT, 'src/theme.css')

const REGISTRY_HOMEPAGE =
  process.env.KITSAAS_HOMEPAGE ?? 'https://kitsaas.com'
const REGISTRY_BASE_URL =
  (process.env.KITSAAS_REGISTRY_URL ?? `${REGISTRY_HOMEPAGE}/r`).replace(
    /\/+$/,
    '',
  )

const REGISTRY_SCHEMA = 'https://ui.shadcn.com/schema/registry.json'
const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json'

const FRAMEWORKS = [
  {
    id: 'solid',
    label: 'Solid',
    uiSdkPkg: '@ui-sdk/solid',
    ext: 'tsx',
    lang: 'tsx',
  },
  {
    id: 'react',
    label: 'React',
    uiSdkPkg: '@ui-sdk/react',
    ext: 'tsx',
    lang: 'tsx',
  },
  {
    id: 'vue',
    label: 'Vue',
    uiSdkPkg: '@ui-sdk/vue',
    ext: 'ts',
    lang: 'ts',
  },
  {
    id: 'svelte',
    label: 'Svelte',
    uiSdkPkg: '@ui-sdk/svelte',
    ext: 'ts',
    lang: 'ts',
  },
  {
    id: 'web',
    label: 'Web Components',
    uiSdkPkg: '@ui-sdk/web',
    ext: 'ts',
    lang: 'ts',
  },
]

const CHECK_ONLY = process.argv.includes('--check')

/** Reads component catalog metadata from src/routes/components/registry.tsx using TS AST. */
function parseCatalog() {
  const source = fs.readFileSync(CATALOG_PATH, 'utf8')
  const sf = ts.createSourceFile(
    CATALOG_PATH,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )

  const entries = []

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === 'componentCatalog' &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const el of node.initializer.elements) {
        if (!ts.isObjectLiteralExpression(el)) continue
        const entry = {}
        for (const prop of el.properties) {
          if (!ts.isPropertyAssignment(prop) || !ts.isIdentifier(prop.name)) {
            continue
          }
          const key = prop.name.text
          if (
            ts.isStringLiteral(prop.initializer) ||
            ts.isNoSubstitutionTemplateLiteral(prop.initializer)
          ) {
            entry[key] = prop.initializer.text
          }
        }
        if (entry.slug && entry.name) {
          entries.push({
            slug: entry.slug,
            name: entry.name,
            description: entry.description ?? '',
            packageName: entry.packageName ?? `@ui-sdk/solid/${entry.slug}`,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sf)
  return entries
}

/** Parses a Solid UI component file to extract imports, sibling deps, exported types, and parts. */
function analyzeSolidComponent(slug, tsxSource, cssSource) {
  const sf = ts.createSourceFile(
    `${slug}.tsx`,
    tsxSource,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )

  const uiSdkImports = [] // { moduleSubpath, valueNames: [{orig, local}], typeNames: [{orig, local}] }
  const coreImports = [] // { valueNames, typeNames }
  const siblingComponents = new Set()
  const exportedTypes = [] // raw source text of exported union/interface type aliases
  const exportedValueReexports = [] // names re-exported from @ui-sdk
  const exportedTypeReexports = [] // type names re-exported from @ui-sdk
  const exportedFunctions = [] // { name, uiAlias, dataDefaults }
  const contextNames = new Set()

  // Extract CSS @import "./other.css"
  for (const match of cssSource.matchAll(
    /@import\s+["']\.\/([a-z0-9-]+)\.css["']/g,
  )) {
    if (match[1] !== slug) siblingComponents.add(match[1])
  }

  for (const stmt of sf.statements) {
    // Imports
    if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
      const mod = stmt.moduleSpecifier.text
      const clause = stmt.importClause

      if (mod.startsWith('./') && !mod.endsWith('.css')) {
        const dep = mod.slice(2).replace(/\.(tsx?|jsx?)$/, '')
        if (!dep.endsWith('-primitive') && dep !== slug) {
          siblingComponents.add(dep)
        }
      }

      if (mod.startsWith('@ui-sdk/solid/') && clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        const subpath = mod.slice('@ui-sdk/solid/'.length)
        const valueNames = []
        const typeNames = []
        for (const spec of clause.namedBindings.elements) {
          const orig = spec.propertyName ? spec.propertyName.text : spec.name.text
          const local = spec.name.text
          if (clause.isTypeOnly || spec.isTypeOnly) {
            typeNames.push({ orig, local })
          } else {
            valueNames.push({ orig, local })
          }
        }
        uiSdkImports.push({ subpath, valueNames, typeNames })
      } else if (mod === '@ui-sdk/core' && clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        const valueNames = []
        const typeNames = []
        for (const spec of clause.namedBindings.elements) {
          const orig = spec.propertyName ? spec.propertyName.text : spec.name.text
          const local = spec.name.text
          if (clause.isTypeOnly || spec.isTypeOnly) {
            typeNames.push({ orig, local })
          } else {
            valueNames.push({ orig, local })
          }
        }
        coreImports.push({ valueNames, typeNames })
      }
    }

    // Export declarations (`export { ... }`, `export type { ... } from ...`)
    if (ts.isExportDeclaration(stmt)) {
      const mod =
        stmt.moduleSpecifier && ts.isStringLiteral(stmt.moduleSpecifier)
          ? stmt.moduleSpecifier.text
          : null
      if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
        for (const spec of stmt.exportClause.elements) {
          const name = spec.name.text
          if (stmt.isTypeOnly || spec.isTypeOnly) {
            exportedTypeReexports.push({ name, mod })
          } else {
            exportedValueReexports.push({ name, mod })
          }
        }
      }
    }

    // Exported simple type aliases (e.g. `export type ButtonVariant = ...`)
    if (
      ts.isTypeAliasDeclaration(stmt) &&
      stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const text = tsxSource.slice(stmt.getStart(sf), stmt.getEnd())
      if (!text.includes('Ui') && !text.includes('ComponentProps') && !text.includes('JSX')) {
        exportedTypes.push(text)
      }
    }

    // Track createContext names
    if (ts.isVariableStatement(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (
          ts.isIdentifier(decl.name) &&
          decl.initializer &&
          ts.isCallExpression(decl.initializer) &&
          ts.isIdentifier(decl.initializer.expression) &&
          decl.initializer.expression.text === 'createContext'
        ) {
          contextNames.add(decl.name.text)
        }
      }
    }

    // Exported component functions
    if (
      ts.isFunctionDeclaration(stmt) &&
      stmt.name &&
      stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      const fnName = stmt.name.text
      const bodyText = stmt.body ? tsxSource.slice(stmt.body.getStart(sf), stmt.body.getEnd()) : ''
      // Find primary wrapped Ui* tag if any
      const uiMatch = bodyText.match(/<(Ui[A-Za-z0-9_]+)/)
      // Find static/default data-* attributes written on the wrapped tag
      const dataAttrs = []
      const seenProps = new Set()
      const localDefaults = new Map()
      for (const m of bodyText.matchAll(
        /const\s+([a-zA-Z0-9_]+)\s*=\s*\(\)\s*=>\s*props\.([a-zA-Z0-9_]+)\s*\?\?\s*(['"][^'"]+['"])/g,
      )) {
        localDefaults.set(m[1], { prop: m[2], defaultVal: m[3] })
      }
      for (const m of bodyText.matchAll(
        /data-([a-z0-9-]+)=\{props\.([a-zA-Z0-9_]+)\s*\?\?\s*(['"][^'"]+['"])\}/g,
      )) {
        if (!seenProps.has(m[2])) {
          seenProps.add(m[2])
          dataAttrs.push({ attr: `data-${m[1]}`, prop: m[2], defaultVal: m[3] })
        }
      }
      for (const m of bodyText.matchAll(
        /data-([a-z0-9-]+)=\{([a-zA-Z0-9_]+)\(\)\}/g,
      )) {
        const info = localDefaults.get(m[2])
        if (info && !seenProps.has(info.prop)) {
          seenProps.add(info.prop)
          dataAttrs.push({
            attr: `data-${m[1]}`,
            prop: info.prop,
            defaultVal: info.defaultVal,
          })
        }
      }
      for (const m of bodyText.matchAll(
        /data-([a-z0-9-]+)=\{props\.([a-zA-Z0-9_]+)\s*\?\s*''\s*:\s*undefined\}/g,
      )) {
        if (!seenProps.has(m[2])) {
          seenProps.add(m[2])
          dataAttrs.push({ attr: `data-${m[1]}`, prop: m[2], boolean: true })
        }
      }
      exportedFunctions.push({
        name: fnName,
        uiAlias: uiMatch ? uiMatch[1] : null,
        dataAttrs,
      })
    }
  }

  return {
    slug,
    uiSdkImports,
    coreImports,
    siblingComponents: [...siblingComponents].sort(),
    exportedTypes,
    exportedValueReexports,
    exportedTypeReexports,
    exportedFunctions,
    contextNames: [...contextNames],
  }
}

const SVG_ATTR_MAP = [
  ['stroke-width', 'strokeWidth'],
  ['stroke-linecap', 'strokeLinecap'],
  ['stroke-linejoin', 'strokeLinejoin'],
  ['stroke-dasharray', 'strokeDasharray'],
  ['stroke-dashoffset', 'strokeDashoffset'],
  ['stroke-miterlimit', 'strokeMiterlimit'],
  ['stroke-opacity', 'strokeOpacity'],
  ['fill-rule', 'fillRule'],
  ['clip-rule', 'clipRule'],
  ['fill-opacity', 'fillOpacity'],
  ['stop-color', 'stopColor'],
  ['stop-opacity', 'stopOpacity'],
  ['vector-effect', 'vectorEffect'],
  ['text-anchor', 'textAnchor'],
  ['dominant-baseline', 'dominantBaseline'],
  ['tabindex', 'tabIndex'],
  ['readonly', 'readOnly'],
  ['autofocus', 'autoFocus'],
]

/**
 * Generates an idiomatic React 19 `.tsx` wrapper from the canonical Solid `.tsx` source.
 * Guarantees 0 TypeScript syntax errors.
 */
function generateReactSource(slug, solidSource, analysis) {
  let out = solidSource

  // 1. Rewrite framework imports & doc references
  out = out.replace(/@ui-sdk\/solid\b/g, '@ui-sdk/react')
  out = out.replace(
    /import type \{([^}]+)\} from ['"]@solidjs\/web['"]/g,
    (_, names) => {
      const items = names
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => (s === 'JSX' ? 'ReactNode' : s))
      const unique = [...new Set(items)]
      return `import type { ${unique.join(', ')} } from 'react'`
    },
  )

  let needsOmitHelper = false
  out = out.replace(
    /import \{([^}]+)\} from ['"]solid-js['"]\n?/g,
    (_, names) => {
      const items = names
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      if (items.includes('omit')) needsOmitHelper = true
      const reactItems = items.filter((s) => s !== 'omit')
      if (reactItems.length === 0) return ''
      return `import { ${reactItems.join(', ')} } from 'react'\n`
    },
  )

  // 2. Replace Solid JSX types with ReactNode
  out = out.replace(/\bJSX\.Element\b/g, 'ReactNode')

  // 3. Convert Solid `class` prop references to React `className`
  out = out.replace(/'class'/g, "'className'")
  out = out.replace(/"class"/g, '"className"')
  out = out.replace(/\bclass\?:/g, 'className?:')
  out = out.replace(/\bprops\.class\b/g, 'props.className')
  out = out.replace(/(\s)class=/g, '$1className=')

  // 4. Convert Solid `<Ctx value={...}>` to React `<Ctx.Provider value={...}>`
  for (const ctxName of analysis.contextNames) {
    out = out.replace(
      new RegExp(`<${ctxName}(\\s+value=)`, 'g'),
      `<${ctxName}.Provider$1`,
    )
    out = out.replace(
      new RegExp(`</${ctxName}>`, 'g'),
      `</${ctxName}.Provider>`,
    )
  }

  // 5. Convert kebab-case SVG / HTML attributes to React camelCase
  for (const [kebab, camel] of SVG_ATTR_MAP) {
    out = out.replace(new RegExp(`(\\s)${kebab}=`, 'g'), `$1${camel}=`)
  }

  // 6. Add tiny local omit helper if used (keeps generic signatures 100% intact)
  const omitHelper = needsOmitHelper
    ? `\nfunction omit<T extends object, const K extends readonly (keyof T)[]>(\n  obj: T,\n  ...keys: K\n): Omit<T, K[number]> {\n  const copy = { ...obj }\n  for (const key of keys) delete copy[key]\n  return copy\n}\n`
    : ''

  // Insert omit helper right after the CSS import
  if (omitHelper) {
    const cssImportRe = new RegExp(`import ['"]\\.\\/${slug}\\.css['"]\\n?`)
    if (cssImportRe.test(out)) {
      out = out.replace(cssImportRe, (m) => `${m}${omitHelper}`)
    } else {
      out = `${omitHelper}\n${out}`
    }
  }

  return `'use client'\n\n${out.trimStart()}`
}

/**
 * Generates an idiomatic Vue 3 multi-part TypeScript module wrapping `@ui-sdk/vue/<slug>`
 * and sharing the exact same attribute-driven `<slug>.css`.
 */
function generateVueSource(slug, analysis) {
  const lines = []
  const hasCustomDataAttrs = analysis.exportedFunctions.some(
    (fn) => fn.uiAlias && fn.dataAttrs.length > 0,
  )

  if (hasCustomDataAttrs) {
    lines.push(`import { defineComponent, h } from 'vue'`)
  }

  // Import values from @ui-sdk/vue/<subpath>
  const directReexports = []
  const wrappedAliases = new Map()
  for (const fn of analysis.exportedFunctions) {
    if (fn.uiAlias && fn.dataAttrs.length > 0) {
      wrappedAliases.set(fn.uiAlias, fn)
    }
  }

  for (const imp of analysis.uiSdkImports) {
    const mod = `@ui-sdk/vue/${imp.subpath}`
    const importedForWrap = []
    const passthrough = []
    for (const v of imp.valueNames) {
      if (wrappedAliases.has(v.local)) {
        importedForWrap.push(v)
      } else {
        passthrough.push(v.orig)
      }
    }
    if (importedForWrap.length > 0) {
      const specs = importedForWrap
        .map((v) => (v.orig === v.local ? v.orig : `${v.orig} as ${v.local}`))
        .join(', ')
      lines.push(`import { ${specs} } from '${mod}'`)
    }
    if (passthrough.length > 0) {
      directReexports.push({ mod, names: passthrough })
    }
  }

  for (const imp of analysis.coreImports) {
    const names = imp.valueNames.map((v) => v.orig)
    if (names.length > 0) {
      directReexports.push({ mod: '@ui-sdk/core', names })
    }
  }

  lines.push('')
  lines.push(`import './${slug}.css'`)
  lines.push('')

  // Re-export untouched ui-sdk/vue parts directly
  for (const re of directReexports) {
    lines.push(`export {\n  ${re.names.join(',\n  ')},\n} from '${re.mod}'`)
  }

  // Re-export type-only exports from @ui-sdk/vue/<slug>
  const typeMods = new Map()
  for (const t of analysis.exportedTypeReexports) {
    const targetMod = t.mod
      ? t.mod.replace('@ui-sdk/solid/', '@ui-sdk/vue/')
      : `@ui-sdk/vue/${slug}`
    if (!typeMods.has(targetMod)) typeMods.set(targetMod, [])
    typeMods.get(targetMod).push(t.name)
  }
  for (const [mod, names] of typeMods) {
    lines.push(`export type {\n  ${names.join(',\n  ')},\n} from '${mod}'`)
  }

  // Re-export Kitsaas styling option union types
  if (analysis.exportedTypes.length > 0) {
    lines.push('')
    for (const t of analysis.exportedTypes) {
      lines.push(t)
    }
  }

  // Emit Vue defineComponent wrappers for parts that map Kitsaas props -> data-* attrs
  for (const fn of analysis.exportedFunctions) {
    if (!fn.uiAlias || fn.dataAttrs.length === 0) continue
    lines.push('')
    const propDefs = fn.dataAttrs
      .map((d) =>
        d.boolean
          ? `    ${d.prop}: { type: Boolean, default: false },`
          : `    ${d.prop}: { type: String, default: ${d.defaultVal} },`,
      )
      .join('\n')
    const dataBindings = fn.dataAttrs
      .map((d) =>
        d.boolean
          ? `          '${d.attr}': props.${d.prop} ? '' : undefined,`
          : `          '${d.attr}': props.${d.prop},`,
      )
      .join('\n')
    lines.push(`export const ${fn.name} = defineComponent({
  name: '${fn.name}',
  inheritAttrs: false,
  props: {
${propDefs}
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        ${fn.uiAlias},
        {
          ...attrs,
${dataBindings}
        },
        slots,
      )
  },
})`)
  }

  return `${lines.join('\n').trim()}\n`
}

/**
 * Generates an idiomatic Svelte 5 entry module wrapping `@ui-sdk/svelte/<slug>`
 * and loading the shared attribute-driven `<slug>.css`.
 */
function generateSvelteSource(slug, analysis) {
  const lines = [`import './${slug}.css'`, '']

  // Re-export all value exports from @ui-sdk/svelte/<subpath>
  for (const imp of analysis.uiSdkImports) {
    const mod = `@ui-sdk/svelte/${imp.subpath}`
    const names = imp.valueNames.map((v) => v.orig)
    if (names.length > 0) {
      lines.push(`export {\n  ${names.join(',\n  ')},\n} from '${mod}'`)
    }
  }

  for (const imp of analysis.coreImports) {
    const names = imp.valueNames.map((v) => v.orig)
    if (names.length > 0) {
      lines.push(`export {\n  ${names.join(',\n  ')},\n} from '@ui-sdk/core'`)
    }
  }

  // Re-export type-only exports from @ui-sdk/svelte/<slug>
  const typeMods = new Map()
  for (const t of analysis.exportedTypeReexports) {
    const targetMod = t.mod
      ? t.mod.replace('@ui-sdk/solid/', '@ui-sdk/svelte/')
      : `@ui-sdk/svelte/${slug}`
    if (!typeMods.has(targetMod)) typeMods.set(targetMod, [])
    typeMods.get(targetMod).push(t.name)
  }
  for (const [mod, names] of typeMods) {
    lines.push(`export type {\n  ${names.join(',\n  ')},\n} from '${mod}'`)
  }

  if (analysis.exportedTypes.length > 0) {
    lines.push('')
    for (const t of analysis.exportedTypes) {
      lines.push(t)
    }
  }

  return `${lines.join('\n').trim()}\n`
}

/**
 * Generates a Web Components entry module registering `@ui-sdk/web/<slug>` custom
 * elements alongside Kitsaas's shared attribute-driven `<slug>.css`.
 */
function generateWebSource(slug, analysis) {
  const lines = []
  const subpaths = new Set(analysis.uiSdkImports.map((i) => i.subpath))
  if (subpaths.size === 0) subpaths.add(slug)

  for (const sub of subpaths) {
    lines.push(`import '@ui-sdk/web/${sub}'`)
  }
  lines.push(`import './${slug}.css'`)
  lines.push('')

  // Re-export non-component helpers (controllers, toast(), confirm(), etc.)
  const helperValues = analysis.exportedValueReexports.filter(
    (e) => /^[a-z]/.test(e.name),
  )
  if (helperValues.length > 0) {
    lines.push(
      `export {\n  ${helperValues.map((h) => h.name).join(',\n  ')},\n} from '@ui-sdk/web/${slug}'`,
    )
  }

  // Re-export Kitsaas option union types
  if (analysis.exportedTypes.length > 0) {
    for (const t of analysis.exportedTypes) {
      lines.push(t)
    }
  }

  return `${lines.join('\n').trim()}\n`
}

/** Verifies generated TS/TSX parses with zero syntax errors. */
function validateTypeScriptSyntax(fileName, content) {
  const scriptKind = fileName.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.TS
  const sf = ts.createSourceFile(
    fileName,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  )
  const diagnostics = sf.parseDiagnostics ?? []
  if (diagnostics.length > 0) {
    const first = diagnostics[0]
    const pos = sf.getLineAndCharacterOfPosition(first.start ?? 0)
    const msg = ts.flattenDiagnosticMessageText(first.messageText, '\n')
    throw new Error(
      `Syntax error in generated ${fileName}:${pos.line + 1}:${pos.character + 1}: ${msg}`,
    )
  }
}

function writeJson(filePath, data) {
  if (CHECK_ONLY) return
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function build() {
  const catalog = parseCatalog()
  if (catalog.length === 0) {
    throw new Error(`No components found in ${CATALOG_PATH}`)
  }

  const themeCss = fs.readFileSync(THEME_PATH, 'utf8')
  const themeItem = {
    $schema: ITEM_SCHEMA,
    name: 'theme',
    type: 'registry:style',
    title: 'Kitsaas Theme',
    description:
      'Kitsaas --v2-* design tokens (light and dark schemes) and Tailwind v4 @theme bindings.',
    files: [
      {
        path: 'src/theme.css',
        type: 'registry:file',
        target: '~/src/theme.css',
        content: themeCss,
      },
    ],
  }

  writeJson(path.join(OUTPUT_DIR, 'theme.json'), themeItem)

  const summary = {}
  let totalItems = 0

  for (const fw of FRAMEWORKS) {
    const fwItemsIndex = [
      {
        name: themeItem.name,
        type: themeItem.type,
        title: themeItem.title,
        description: themeItem.description,
        files: themeItem.files.map(({ path: p, type, target }) => ({
          path: p,
          type,
          target,
        })),
      },
    ]

    writeJson(path.join(OUTPUT_DIR, fw.id, 'theme.json'), themeItem)

    let overrideCount = 0

    const entries = [
      ...catalog,
      ...(fs.existsSync(path.join(UI_DIR, 'chart.tsx'))
        ? [
            {
              slug: 'chart',
              name: 'Chart',
              description:
                'Opencode-styled data visualization primitives built on @tanstack/charts.',
              dependencies: ['@tanstack/charts'],
            },
          ]
        : []),
    ]

    for (const entry of entries) {
      const { slug, name, description } = entry
      const solidTsxPath = path.join(UI_DIR, `${slug}.tsx`)
      const cssPath = path.join(UI_DIR, `${slug}.css`)
      const primitivePath = path.join(UI_DIR, `${slug}-primitive.ts`)

      const solidSource = fs.readFileSync(solidTsxPath, 'utf8')
      const cssSource = fs.readFileSync(cssPath, 'utf8')
      const hasPrimitive = fs.existsSync(primitivePath)
      const primitiveSource = hasPrimitive
        ? fs.readFileSync(primitivePath, 'utf8')
        : null

      const analysis = analyzeSolidComponent(slug, solidSource, cssSource)

      // Check for an explicit hand-crafted override first
      const overridePath = path.join(OVERRIDES_DIR, fw.id, `${slug}.${fw.ext}`)
      let fwCode
      let sourcePath

      if (fw.id === 'solid') {
        fwCode = solidSource
        sourcePath = `src/components/ui/${slug}.tsx`
      } else if (fs.existsSync(overridePath)) {
        fwCode = fs.readFileSync(overridePath, 'utf8')
        sourcePath = `registry/overrides/${fw.id}/${slug}.${fw.ext}`
        overrideCount++
      } else {
        sourcePath = `registry/${fw.id}/ui/${slug}.${fw.ext}`
        if (fw.id === 'react') {
          fwCode = generateReactSource(slug, solidSource, analysis)
        } else if (fw.id === 'vue') {
          fwCode = generateVueSource(slug, analysis)
        } else if (fw.id === 'svelte') {
          fwCode = generateSvelteSource(slug, analysis)
        } else {
          fwCode = generateWebSource(slug, analysis)
        }
      }

      // Syntax-validate every generated TS/TSX file
      validateTypeScriptSyntax(`${fw.id}/${slug}.${fw.ext}`, fwCode)
      if (primitiveSource) {
        validateTypeScriptSyntax(
          `${fw.id}/${slug}-primitive.ts`,
          primitiveSource,
        )
      }

      const files = [
        {
          path: sourcePath,
          type: 'registry:ui',
          target: `components/ui/${slug}.${fw.ext}`,
          content: fwCode,
        },
        {
          path: `src/components/ui/${slug}.css`,
          type: 'registry:ui',
          target: `components/ui/${slug}.css`,
          content: cssSource,
        },
      ]

      if (primitiveSource) {
        files.splice(1, 0, {
          path: `src/components/ui/${slug}-primitive.ts`,
          type: 'registry:lib',
          target: `components/ui/${slug}-primitive.ts`,
          content: primitiveSource,
        })
      }

      const dependencies = entry.dependencies ?? ['@ui-sdk/core', fw.uiSdkPkg]
      const registryDependencies = [
        `${REGISTRY_BASE_URL}/${fw.id}/theme.json`,
        ...analysis.siblingComponents.map(
          (dep) => `${REGISTRY_BASE_URL}/${fw.id}/${dep}.json`,
        ),
      ]

      const item = {
        $schema: ITEM_SCHEMA,
        name: slug,
        type: 'registry:ui',
        title: name,
        description,
        dependencies,
        registryDependencies,
        files,
        meta: {
          framework: fw.id,
          uiSdkPackage: entry.dependencies
            ? entry.dependencies[0]
            : hasPrimitive
              ? `@ui-sdk/core`
              : `${fw.uiSdkPkg}/${slug}`,
        },
      }

      writeJson(path.join(OUTPUT_DIR, fw.id, `${slug}.json`), item)

      fwItemsIndex.push({
        name: slug,
        type: 'registry:ui',
        title: name,
        description,
        dependencies,
        registryDependencies,
        files: files.map(({ path: p, type, target }) => ({
          path: p,
          type,
          target,
        })),
      })
      totalItems++
    }

    const fwRegistry = {
      $schema: REGISTRY_SCHEMA,
      name: `kitsaas-${fw.id}`,
      homepage: REGISTRY_HOMEPAGE,
      items: fwItemsIndex,
    }

    writeJson(path.join(OUTPUT_DIR, fw.id, 'registry.json'), fwRegistry)

    summary[fw.id] = {
      components: entries.length,
      overrides: overrideCount,
      indexUrl: `${REGISTRY_BASE_URL}/${fw.id}/registry.json`,
      namespaceTemplate: `${REGISTRY_BASE_URL}/${fw.id}/{name}.json`,
    }
  }

  // Root discovery manifest
  const rootManifest = {
    $schema: REGISTRY_SCHEMA,
    name: 'kitsaas',
    homepage: REGISTRY_HOMEPAGE,
    frameworks: summary,
    items: [
      {
        name: 'theme',
        type: 'registry:style',
        title: themeItem.title,
        description: themeItem.description,
        files: themeItem.files.map(({ path: p, type, target }) => ({
          path: p,
          type,
          target,
        })),
      },
      ...catalog.map((entry) => ({
        name: entry.slug,
        type: 'registry:ui',
        title: entry.name,
        description: entry.description,
      })),
    ],
  }

  writeJson(path.join(OUTPUT_DIR, 'registry.json'), rootManifest)

  console.log(
    `${CHECK_ONLY ? 'Validated' : 'Built'} Kitsaas shadcn registry: ${catalog.length} components × ${FRAMEWORKS.length} frameworks (${totalItems} items + theme) — 0 syntax errors.`,
  )
  for (const [fwId, info] of Object.entries(summary)) {
    console.log(
      `  • ${fwId.padEnd(7)} ${info.components} items (${info.overrides} custom override${info.overrides === 1 ? '' : 's'}) -> public/r/${fwId}/registry.json`,
    )
  }
}

build()
