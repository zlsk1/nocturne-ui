import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import type { Token } from 'markdown-it'

export const mdPlugin = (md: MarkdownIt) => {
  md.use(useContainer)
}

const useContainer = (md: MarkdownIt) => {
  md.use(...createDemoContainer())
}

const createDemoContainer = () => {
  return [
    mdContainer,
    'demo',
    {
      render(tokens: Token[], index: number) {
        const token = tokens[index]
        const sourceFileToken = tokens[index + 2]

        if (token.nesting === 1) {
          const src = sourceFileToken.children?.[0].content ?? ''

          return `<Demo :demos="demos" :codes="codes" src="${src}">\n`
        } else {
          return '</Demo>\n'
        }
      }
    }
  ] as const
}