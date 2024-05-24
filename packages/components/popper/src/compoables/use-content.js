import { computed, inject, onMounted, ref, unref, watch } from 'vue'
import { usePopper } from '@/compoables'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils'

const DEFAULT_ARROW_OFFSET = 0

export const usePopperContent = (props) => {
  const { instancePopperRef, contentRef, referenceRef, role } = inject(
    'popperProvide',
    undefined
  )

  const arrowRef = ref()
  const arrowOffset = ref()

  const eventListenerModifier = computed(() => {
    return {
      name: 'eventListeners',
      enabled: !!props.visible
    }
  })

  const arrowModifier = computed(() => {
    const arrowEl = unref(arrowRef)
    const offset = unref(arrowOffset) ?? DEFAULT_ARROW_OFFSET

    return {
      name: 'arrow',
      enabled: typeof arrowEl !== 'undefined',
      options: {
        element: arrowEl,
        padding: offset
      }
    }
  })

  const options = computed(() => {
    return {
      onFirstUpdate: () => {
        update()
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier)
      ])
    }
  })

  const computedReference = computed(
    () => unwrapMeasurableEl(props.referenceEl) || unref(referenceRef)
  )

  const { attributes, state, styles, update, forceUpdate, instanceRef } =
    usePopper(computedReference, contentRef, options)

  watch(instanceRef, (instance) => (instancePopperRef.value = instance))

  onMounted(() => {
    watch(
      () => unref(computedReference)?.getBoundingClientRect(),
      () => update()
    )
  })

  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,

    forceUpdate,
    update
  }
}
