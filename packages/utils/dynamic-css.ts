const APPEND_ORDER = 'data-order'
const MARK_KEY = 'mark-key'

const containerCache = new Map<ContainerType, Node & ParentNode>()

export type ContainerType = Element | ShadowRoot
export type Prepend = boolean | 'queue'
export type AppendType = 'prependQueue' | 'append' | 'prepend'

interface Options {
  attachTo?: ContainerType
  /**
   * Content Security Policy
   */
  csp?: { nonce?: string }
  prepend?: Prepend
  mark?: string
}

const getOrder = (prepend?: Prepend): AppendType => {
  if (prepend === 'queue') {
    return 'prependQueue'
  }

  return prepend ? 'prepend' : 'append'
}

const getContainer = (option: Options) => {
  if (option.attachTo) {
    return option.attachTo
  }

  const head = document.querySelector('head')
  return head || document.body
}

const findExistNode = (key: string, option: Options = {}) => {
  const container = getContainer(option)

  return findStyles(container).find(
    (node) => node.getAttribute(getMark(option)) === key
  )
}

const getMark = ({ mark }: Options) => {
  if (mark) {
    return mark.startsWith('data-') ? mark : `data-${mark}`
  }
  return MARK_KEY
}

const findStyles = (container: ContainerType) => {
  return Array.from(
    (containerCache.get(container) || container).children
  ).filter((node) => node.tagName === 'STYLE') as HTMLStyleElement[]
}

export const injectCSS = (css: string, option: Options = {}) => {
  const { csp, prepend } = option

  const styleNode = document.createElement('style')
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend))

  if (csp?.nonce) {
    styleNode.nonce = csp.nonce
  }
  styleNode.innerHTML = css

  const container = getContainer(option)

  if (prepend) {
    if (prepend === 'queue') {
      const existStyle = findStyles(container).filter((node) =>
        ['prependQueue', 'prepend'].includes(node.getAttribute(APPEND_ORDER)!)
      )
      if (existStyle.length) {
        container.insertBefore(
          styleNode,
          existStyle[existStyle.length - 1].nextSibling
        )

        return styleNode
      }
    }

    const { firstChild } = container
    container.insertBefore(styleNode, firstChild)
  } else {
    container.appendChild(styleNode)
  }

  return styleNode
}

export function updateCSS(css: string, key: string, option: Options = {}) {
  const existNode = findExistNode(key, option)

  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css
    }

    return existNode
  }

  const newNode = injectCSS(css, option)
  newNode.setAttribute(getMark(option), key)
  return newNode
}

export function removeCSS(key: string, option: Options = {}) {
  const existNode = findExistNode(key, option)
  if (existNode) {
    const container = getContainer(option)
    container.removeChild(existNode)
  }
}
