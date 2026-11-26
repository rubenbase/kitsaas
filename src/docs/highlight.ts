/**
 * Lightweight, synchronous, zero-dependency syntax tokenizer for internal docs
 * code blocks (`tsx`, `ts`, `css`, `bash`, `text`).
 *
 * Tokens map to semantic CSS classes (`.doc-tok-*`) themed via Kitsaas's
 * `--v2-*` light/dark design tokens, so theme switching is instant and zero
 * `innerHTML` is required.
 */

export type CodeLanguage = 'tsx' | 'ts' | 'css' | 'bash' | 'text'

export type TokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'type'
  | 'number'
  | 'tag'
  | 'attr'
  | 'punct'
  | 'fn'
  | 'var'

export type HighlightToken = {
  kind: TokenKind
  text: string
}

export type HighlightLine = HighlightToken[]

const TS_KEYWORDS = new Set([
  'as',
  'async',
  'await',
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'default',
  'delete',
  'do',
  'else',
  'enum',
  'export',
  'extends',
  'false',
  'finally',
  'for',
  'from',
  'function',
  'if',
  'implements',
  'import',
  'in',
  'instanceof',
  'interface',
  'let',
  'new',
  'null',
  'of',
  'readonly',
  'return',
  'satisfies',
  'static',
  'super',
  'switch',
  'this',
  'throw',
  'true',
  'try',
  'type',
  'typeof',
  'undefined',
  'var',
  'void',
  'while',
])

const BASH_COMMANDS = new Set([
  'pnpm',
  'npm',
  'npx',
  'yarn',
  'bun',
  'bunx',
  'git',
  'cd',
  'mkdir',
  'cp',
  'cat',
  'echo',
  'vite',
  'tsc',
])

const BASH_SUBCOMMANDS = new Set([
  'add',
  'install',
  'dlx',
  'run',
  'dev',
  'build',
  'preview',
  'init',
  'create',
  'exec',
])

function tokenizeTsx(code: string): HighlightLine[] {
  const lines = code.replace(/\r\n/g, '\n').split('\n')
  let inBlockComment = false

  return lines.map((line) => {
    const tokens: HighlightToken[] = []
    let i = 0
    const len = line.length

    const push = (kind: TokenKind, text: string) => {
      if (!text) return
      const prev = tokens[tokens.length - 1]
      if (prev && prev.kind === kind) {
        prev.text += text
      } else {
        tokens.push({ kind, text })
      }
    }

    while (i < len) {
      if (inBlockComment) {
        const end = line.indexOf('*/', i)
        if (end === -1) {
          push('comment', line.slice(i))
          break
        }
        push('comment', line.slice(i, end + 2))
        i = end + 2
        inBlockComment = false
        continue
      }

      const ch = line[i]
      const next = line[i + 1]

      // Line comment
      if (ch === '/' && next === '/') {
        push('comment', line.slice(i))
        break
      }

      // Block comment start
      if (ch === '/' && next === '*') {
        const end = line.indexOf('*/', i + 2)
        if (end === -1) {
          push('comment', line.slice(i))
          inBlockComment = true
          break
        }
        push('comment', line.slice(i, end + 2))
        i = end + 2
        continue
      }

      // Strings ('...', "...", `...`)
      if (ch === "'" || ch === '"' || ch === '`') {
        const quote = ch
        let j = i + 1
        while (j < len) {
          if (line[j] === '\\') {
            j += 2
            continue
          }
          if (line[j] === quote) {
            j += 1
            break
          }
          j += 1
        }
        push('string', line.slice(i, j))
        i = j
        continue
      }

      // JSX opening/closing tags: <SelectTrigger or </SelectTrigger or <div
      if (ch === '<' && (next === '/' || /[A-Za-z]/.test(next ?? ''))) {
        const closing = next === '/'
        let j = i + (closing ? 2 : 1)
        while (j < len && /[A-Za-z0-9_.-]/.test(line[j])) j++
        const tagName = line.slice(i + (closing ? 2 : 1), j)
        if (tagName) {
          push('punct', closing ? '</' : '<')
          push(/^[A-Z]/.test(tagName) ? 'type' : 'tag', tagName)
          i = j
          continue
        }
      }

      if (ch === '/' && next === '>') {
        push('punct', '/>')
        i += 2
        continue
      }

      // Numbers
      if (/\d/.test(ch) && (i === 0 || !/[A-Za-z0-9_$]/.test(line[i - 1]))) {
        let j = i + 1
        while (j < len && /[0-9._a-fA-FxXoObB]/.test(line[j])) j++
        push('number', line.slice(i, j))
        i = j
        continue
      }

      // Identifiers, keywords, attributes, functions, types
      if (/[A-Za-z_$]/.test(ch)) {
        let j = i + 1
        while (j < len && /[A-Za-z0-9_$-]/.test(line[j])) {
          // Only allow '-' when followed by JSX attribute '=' (e.g. aria-label, data-slot)
          if (line[j] === '-') {
            const rest = line.slice(j)
            if (!/^-[a-z0-9-]+\s*=/.test(rest)) break
          }
          j++
        }
        const word = line.slice(i, j)
        const after = line.slice(j).match(/^\s*(.)/)?.[1]

        if (TS_KEYWORDS.has(word)) {
          push('keyword', word)
        } else if (after === '=' && /^[a-z][a-zA-Z0-9-]*$/.test(word)) {
          push('attr', word)
        } else if (after === '(') {
          push('fn', word)
        } else if (/^[A-Z][A-Za-z0-9_]*$/.test(word)) {
          push('type', word)
        } else {
          push('plain', word)
        }
        i = j
        continue
      }

      // Punctuation
      if (/[{}()[\].,:;?!=<>+\-*/&|]/.test(ch)) {
        push('punct', ch)
        i += 1
        continue
      }

      push('plain', ch)
      i += 1
    }

    return tokens
  })
}

function tokenizeCss(code: string): HighlightLine[] {
  const lines = code.replace(/\r\n/g, '\n').split('\n')
  let inComment = false

  return lines.map((line) => {
    const tokens: HighlightToken[] = []
    let i = 0
    const len = line.length

    const push = (kind: TokenKind, text: string) => {
      if (!text) return
      const prev = tokens[tokens.length - 1]
      if (prev && prev.kind === kind) prev.text += text
      else tokens.push({ kind, text })
    }

    while (i < len) {
      if (inComment) {
        const end = line.indexOf('*/', i)
        if (end === -1) {
          push('comment', line.slice(i))
          break
        }
        push('comment', line.slice(i, end + 2))
        i = end + 2
        inComment = false
        continue
      }

      const ch = line[i]
      if (ch === '/' && line[i + 1] === '*') {
        const end = line.indexOf('*/', i + 2)
        if (end === -1) {
          push('comment', line.slice(i))
          inComment = true
          break
        }
        push('comment', line.slice(i, end + 2))
        i = end + 2
        continue
      }

      if (ch === '"' || ch === "'") {
        let j = i + 1
        while (j < len && line[j] !== ch) {
          if (line[j] === '\\') j += 2
          else j += 1
        }
        if (j < len) j += 1
        push('string', line.slice(i, j))
        i = j
        continue
      }

      // At-rules (@layer, @media, @container, @starting-style)
      if (ch === '@') {
        let j = i + 1
        while (j < len && /[a-zA-Z0-9-]/.test(line[j])) j++
        push('keyword', line.slice(i, j))
        i = j
        continue
      }

      // CSS custom properties (--v2-...)
      if (ch === '-' && line[i + 1] === '-') {
        let j = i + 2
        while (j < len && /[a-zA-Z0-9_-]/.test(line[j])) j++
        push('var', line.slice(i, j))
        i = j
        continue
      }

      // Hex colors & numeric values
      if (ch === '#' && /[0-9a-fA-F]{3,8}/.test(line.slice(i + 1))) {
        let j = i + 1
        while (j < len && /[0-9a-fA-F]/.test(line[j])) j++
        push('number', line.slice(i, j))
        i = j
        continue
      }

      if (/\d/.test(ch) && (i === 0 || !/[A-Za-z0-9_-]/.test(line[i - 1]))) {
        let j = i + 1
        while (j < len && /[0-9.%a-zA-Z]/.test(line[j])) j++
        push('number', line.slice(i, j))
        i = j
        continue
      }

      // Attribute selectors [data-...]
      if (ch === '[' || ch === ']' || ch === '{' || ch === '}' || ch === ':' || ch === ';' || ch === '(' || ch === ')' || ch === ',') {
        push('punct', ch)
        i += 1
        continue
      }

      if (/[A-Za-z_-]/.test(ch)) {
        let j = i + 1
        while (j < len && /[A-Za-z0-9_-]/.test(line[j])) j++
        const word = line.slice(i, j)
        const after = line[j]
        if (after === ':' && line[j + 1] !== ':') {
          push('attr', word)
        } else if (after === '(') {
          push('fn', word)
        } else if (word.startsWith('data-') || word.startsWith('aria-')) {
          push('tag', word)
        } else {
          push('plain', word)
        }
        i = j
        continue
      }

      push('plain', ch)
      i += 1
    }

    return tokens
  })
}

function tokenizeBash(code: string): HighlightLine[] {
  const lines = code.replace(/\r\n/g, '\n').split('\n')

  return lines.map((line) => {
    const tokens: HighlightToken[] = []
    if (/^\s*#/.test(line)) {
      return [{ kind: 'comment', text: line }]
    }

    const parts = line.match(/(\s+|"[^"]*"|'[^']*'|[^\s]+)/g) ?? []
    let seenCommand = false

    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        tokens.push({ kind: 'plain', text: part })
      } else if (part.startsWith('"') || part.startsWith("'")) {
        tokens.push({ kind: 'string', text: part })
      } else if (part.startsWith('-')) {
        tokens.push({ kind: 'attr', text: part })
      } else if (!seenCommand && BASH_COMMANDS.has(part)) {
        seenCommand = true
        tokens.push({ kind: 'fn', text: part })
      } else if (seenCommand && BASH_SUBCOMMANDS.has(part)) {
        tokens.push({ kind: 'keyword', text: part })
      } else if (part.startsWith('@') || part.includes('/')) {
        tokens.push({ kind: 'string', text: part })
      } else {
        if (!seenCommand) seenCommand = true
        tokens.push({ kind: 'plain', text: part })
      }
    }

    return tokens
  })
}

export function highlightCode(
  code: string,
  lang: CodeLanguage = 'tsx',
): HighlightLine[] {
  const trimmed = code.replace(/\n+$/, '')
  if (!trimmed) return [[]]
  switch (lang) {
    case 'tsx':
    case 'ts':
      return tokenizeTsx(trimmed)
    case 'css':
      return tokenizeCss(trimmed)
    case 'bash':
      return tokenizeBash(trimmed)
    case 'text':
      return trimmed
        .replace(/\r\n/g, '\n')
        .split('\n')
        .map((line) => [{ kind: 'plain', text: line }])
  }
}
