// ref https://github.com/vuejs/vitepress/blob/main/src/node/markdown/plugins/highlight.ts
import escapeHtml from 'escape-html'
import prism from 'prismjs'

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<div class="language-${lang} vp-adaptive-theme">
      <button title="Copy Title" class="copy"></button>
      <span class="lang">${lang}</span>
      <pre v-pre><code>${code}</code></pre>
    </div>
  `
}

export const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (!prism.languages[lang]) {
    console.warn(
      `[vitepress] Syntax highlight for language "${lang}" is not supported.`
    )
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
