import { computed, unref, ref } from 'vue'

import type { CSSProperties, StyleValue, ComputedRef } from 'vue'
import type { UsePopperReturn } from '@/composables'
import type { UsePopperContentReturn } from './use-content'
import type { PopperContentProps } from '../content'

export const usePopperContentDOM = (
  props: PopperContentProps,
  {
    attributes,
    styles,
    role
  }: Pick<UsePopperReturn, 'attributes' | 'styles'> &
  Pick<UsePopperContentReturn, 'role'>
) => {
  const contentAttrs = computed(() => unref(attributes).popper)
  const contentZIndex = ref<number>(props.zIndex as number)
  const contentClass = computed(() => props.popperClass)
  const contentStyle = computed<StyleValue[]>(() => {
    return [
      { zIndex: unref(contentZIndex) } as CSSProperties,
      unref(styles).popper as CSSProperties,
      props.popperStyle || {}
    ]
  })

  const ariaModal = computed<string | undefined>(() => role.value === 'dialog' ? 'false' : undefined)
  const arrowStyle = computed(() => unref(styles).arrow || {}) as unknown as CSSProperties

  return {
    ariaModal,
    arrowStyle: arrowStyle as unknown as ComputedRef<CSSProperties>,
    contentAttrs,
    contentZIndex,
    contentClass,
    contentStyle
  }
}

export type UsePopperContentDOMReturn = ReturnType<typeof usePopperContentDOM>
