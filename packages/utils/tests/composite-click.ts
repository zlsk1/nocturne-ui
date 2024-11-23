import type { DOMWrapper, VueWrapper } from '@vue/test-utils'

export const triggerCompositeClick = async <
  T extends VueWrapper<any> | DOMWrapper<Element>
>(
  wrapper: T
) => {
  await wrapper.trigger('mousedown')
  await wrapper.trigger('mouseup')
  await wrapper.trigger('click')
}
