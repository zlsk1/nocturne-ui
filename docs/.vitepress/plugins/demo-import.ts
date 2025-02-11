import path from 'path'

import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

export function autoImportDemo(): Plugin {
  return {
    name: 'demo-imports',
    enforce: 'pre',

    async transform(code: string, id: string) {
      if (!id.endsWith('.md')) return

      const component = path.basename(id, '.md')
      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: [
          `const demos = import.meta.glob('@docs/demo/${component}/*.vue', { eager: true, import: 'default' })`
        ]
      }

      code = transformVpScriptSetup(code, append)

      return combineMarkdown(code, [
        combineScriptSetup(append.scriptSetups),
        ...append.headers
      ])
    }
  }
}

const combineScriptSetup = (codes: string[]) => {
  return `\n<script setup>
    ${codes.join('\n')}
  </script>
  `
}

const vpScriptSetupRE = /<vp-script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/vp-script>/

const transformVpScriptSetup = (code: string, append: Append) => {
  const matches = code.match(vpScriptSetupRE)
  if (matches) code = code.replace(matches[0], '')
  const scriptSetup = matches?.[3] ?? ''
  if (scriptSetup) append.scriptSetups.push(scriptSetup)
  return code
}

const combineMarkdown = (
  code: string,
  headers: string[] = [],
  footers: string[] = []
) => {
  const frontmatterEnd = code.indexOf('---\n\n')
  const firstHeader = code.search(/\n#{1,6}\s.+/)
  const sliceIndex =
    firstHeader < 0
      ? frontmatterEnd < 0
        ? 0
        : frontmatterEnd + 4
      : firstHeader

  if (headers.length > 0) {
    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  }
  code += footers.join('\n')

  return code
}
