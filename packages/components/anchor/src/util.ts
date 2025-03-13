export function getOffsetTop(
  target: HTMLElement,
  container: HTMLElement | Window
) {
  const { top } = target.getBoundingClientRect()
  if (container === window) {
    // 减去document的边框
    return top - document.documentElement.clientTop
  }
  return top - (container as HTMLElement).getBoundingClientRect().top
}
