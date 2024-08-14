import type { Header } from 'vitepress'

// cached list of anchor elements from resolveHeaders
const resolvedHeaders: { element: HTMLHeadElement; link: string }[] = []

export type MenuItem = Omit<Header, "slug" | "children"> & {
  element: HTMLHeadElement;
  children?: MenuItem[];
}

export function getHeaders() {
  const headers = [
    ...document.querySelectorAll('.doc-content :where(h1,h2,h3,h4,h5,h6)')
  ]
    .filter((el) => el.id && el.hasChildNodes())
    .map((el) => {
      const level = Number(el.tagName[1])
      return {
        element: el as HTMLHeadElement,
        title: serializeHeader(el),
        link: '#' + el.id,
        level
      }
    })

  return resolveHeaders(headers)
}

function serializeHeader(h: Element): string {
  let ret = ''
  for (const node of h.childNodes) {
    if (node.nodeType === 1) {
      ret += node.textContent
    } else if (node.nodeType === 3) {
      ret += node.textContent
    }
  }
  return ret.trim()
}

export const resolveHeaders = (headers: MenuItem[]) => {
  resolvedHeaders.length = 0
  // update global header list for active link rendering
  for (const { element, link } of headers) {
    resolvedHeaders.push({ element, link })
  }

  const ret: MenuItem[] = []

  outer: for (let i = 0; i < headers.length; i++) {
    const cur = headers[i]
    if (i === 0) {
      ret.push(cur)
    } else {
      for (let j = i - 1; j >= 0; j--) {
        const prev = headers[j]
        if (prev.level < cur.level) {
          (prev.children || (prev.children = [])).push(cur)
          continue outer
        }
      }
      ret.push(cur)
    }
  }

  return ret
}