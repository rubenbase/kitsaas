/**
 * Turn a section heading into a stable URL-safe fragment identifier.
 */
export function slugify(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return base || 'section'
}

/**
 * Stateful slugger for a single page so duplicate section headings
 * never produce colliding `id` attributes.
 */
export function createSlugger() {
  const counts = new Map<string, number>()

  return {
    slug(text: string): string {
      const base = slugify(text)
      const seen = counts.get(base) ?? 0
      counts.set(base, seen + 1)
      return seen === 0 ? base : `${base}-${seen + 1}`
    },
    reset() {
      counts.clear()
    },
  }
}
