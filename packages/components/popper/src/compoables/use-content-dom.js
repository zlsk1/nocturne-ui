import { computed, unref, ref } from 'vue'

export const usePopperContentDOM = (
  props,
  {
    attributes,
    styles,
    role
  }
) => {
  const contentAttrs = computed(() => unref(attributes).popper)
  const contentZIndex = ref(props.zIndex)
  const contentClass = computed(() => props.popperClass)
  const contentStyle = computed(() => {
    return [
      { zIndex: unref(contentZIndex) },
      unref(styles).popper,
      props.popperStyle || {}
    ]
  })
  const ariaModal = computed(() => role.value === 'dialog' ? 'false' : undefined)
  const arrowStyle = computed(() => unref(styles).arrow || {})

  return {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentZIndex,
    contentClass,
    contentStyle
  }
}
