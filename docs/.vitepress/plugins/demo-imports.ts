import { basename } from 'node:path'

import type { Plugin } from 'vite'

export function autoImportDemo(): Plugin {
  return {
    name: 'demo-imports',
    enforce: 'pre',

    async transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      const component = basename(id, '.md')
      const scriptSetups = [
        `const demos = import.meta.glob('@docs/demo/${component}/**/*.vue', { eager: true, import: 'default' })`,
        `const codes = import.meta.glob('@docs/demo/${component}/**/*.vue', { eager: true, import: 'default', query: '?raw' })`
      ]

      return combineMarkdown(code, [`\n<script setup>\n${scriptSetups.join('\n')}\n</script>\n`])
    }
  }
}

function combineMarkdown(code: string, headers: string[] = [], footers: string[] = []) {
  if (headers.length) {
    const frontmatterEnd = code.indexOf('---\n\n')
    const firstHeader = code.search(/\n#{1,6}\s.+/)
    const sliceIndex = firstHeader < 0
      ? frontmatterEnd < 0
        ? 0
        : frontmatterEnd + 4
      : firstHeader

    code = code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }

  return code + footers.join('\n') + '\n'
}
