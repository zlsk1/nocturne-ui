import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import mdTag from '../plugins/tag'
import fs from 'fs'
import path from 'path'
import { highlight } from '../../utils'
import type Token from 'markdown-it/lib/token.d.mts'
import type Renderer from 'markdown-it/lib/renderer.d.mts'

const localMd = MarkdownIt().use(mdTag)

interface ContainerOpts {
  marker?: string | undefined
  validate?(params: string): boolean
  render?(
    tokens: Token[],
    index: number,
    options: any,
    env: any,
    self: Renderer
  ): string
}

export const mdPlugin = (md: MarkdownIt) => {
  md.use(...createDemoContainer())
    .use(mdTag)
}

/**
 * @example
 * :::demo a vue3 component
 *    button/basic
 * :::
 * @description description = a vue3 component; sourceFile = button/basic
 * @returns 
 */
const createDemoContainer = () => {
  return [
    mdContainer,
    'demo',
    {
      render(tokens: Token[], idx: number) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
        if(tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : ''
          const sourceFileToken = tokens[idx + 2]
          const sourceFile = sourceFileToken.children?.[0].content ?? ''
          
          let codes = ''

          if (sourceFileToken.type === 'inline') {
            codes = fs.readFileSync(
              path.resolve('demo', `${sourceFile}.vue`),
              'utf-8'
            )
          }

          if (!codes) throw new Error(`Incorrect source file: ${sourceFile}`)

          return `<Demo :demos="demos" codes="${encodeURIComponent(highlight(codes, 'vue'))}"
            src="${sourceFile}"
            description="${encodeURIComponent(localMd.render(description))}"
          >\n`
        }
        else {
          return '</Demo>\n'
        }
      }
    } as ContainerOpts
  ] as const
}