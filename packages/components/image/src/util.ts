import { isClient } from '@nocturne-ui/utils'

export const isInContainer = (
  target?: Element,
  container?: Element | Window
) => {
  if (!isClient || !target || !container) return false

  const targetRect = target.getBoundingClientRect()
  let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>

  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect()
  } else {
    containerRect = {
      top: 0,
      bottom: window.innerHeight,
      left: 0,
      right: window.innerWidth
    }
  }

  return (
    targetRect.top < containerRect.bottom &&
    targetRect.bottom > containerRect.top &&
    targetRect.left < containerRect.right &&
    targetRect.right > containerRect.left
  )
}

export const isScroll = (el: HTMLElement, vertical?: boolean) => {
  if (!isClient) return false

  const key = {
    undefined: 'overflow',
    true: 'overflow-y',
    false: 'overlfow-x'
  }[String(vertical)]!

  const overflow = el.style[key as keyof CSSStyleDeclaration]! as string

  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

export const getScrollContainer = (el: HTMLElement, vertical?: boolean) => {
  if (!isClient) return

  let parent = el

  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, vertical)) return parent

    parent = parent.parentNode as HTMLElement
  }

  return parent
}
