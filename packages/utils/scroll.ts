import { easeInOutCubic } from './easings'
import { isClient, isFunction, isWindow } from './types'
import { cAF, rAF } from './raf'

type ScrollTarget = HTMLElement | Window | Document

export const getScroll = (target: ScrollTarget, isLeft: boolean = false) => {
  if (!isClient() || !target) {
    return 0
  }
  const property = isLeft ? 'scrollLeft' : 'scrollTop'
  let result = 0
  if (isWindow(target)) {
    result = target[isLeft ? 'scrollX' : 'scrollY']
  } else if (target instanceof Document) {
    result = target.documentElement[property]
  } else if (target) {
    result = (target as HTMLElement)[property]
  }
  return result
}

export const getScrollElement = (
  target: HTMLElement,
  container: HTMLElement | Window
) => {
  if (isWindow(container)) {
    return target.ownerDocument.documentElement
  }
  return container
}

export function scrollTo(
  container: HTMLElement | Window,
  from: number,
  to: number,
  duration: number,
  callback?: unknown
) {
  const startTime = Date.now()

  let handle: number | undefined
  const scroll = () => {
    const timestamp = Date.now()
    const time = timestamp - startTime
    const nextScrollTop = easeInOutCubic(
      Math.min(time, duration),
      from,
      to,
      duration
    )

    if (isWindow(container)) {
      container.scrollTo(window.scrollX, nextScrollTop)
    } else {
      container.scrollTop = nextScrollTop
    }
    if (time < duration) {
      handle = rAF(scroll)
    } else if (isFunction(callback)) {
      callback()
    }
  }

  scroll()

  return () => {
    handle && cAF(handle)
  }
}
