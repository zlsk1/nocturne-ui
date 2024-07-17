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
        const demoReg = /^demo\s*(.*)$/
        const sourceFileToken = tokens[index + 2]

        if (token.nesting === 1) {
          const matched = token.info.trim().match(demoReg)
          const params = matched?.[1].trim().split(/\s+/) || []
          const src = sourceFileToken.children?.[0].content ?? ''

          return `<demo :demos="demos" :codes="codes" src="${src}">\n`
        } else {
          return '</demo>\n'
        }
      }
    }
  ] as const
}