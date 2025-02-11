import type MarkDownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

// https://github.com/markdown-it/markdown-it/blob/master/docs/examples/renderer_rules.md
export default (md: MarkDownIt) => {
  const renderToken: RenderRule = (tokens, idx, options, env, self) =>
    self.renderToken(tokens, idx, options)
  const defaultLinkOpenRenderer = md.renderer.rules.link_open || renderToken
  const defaultLinkCloseRenderer = md.renderer.rules.link_open || renderToken

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const href = token.attrGet('href')

    if (href?.startsWith('https') || href?.startsWith('http')) {
      token.attrJoin('class', 'vp-link')
    }
    return defaultLinkOpenRenderer(tokens, idx, options, env, self)
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    return defaultLinkCloseRenderer(tokens, idx, options, env, self)
  }
}
