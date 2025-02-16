import { computed, inject, onMounted, ref, unref, watch } from 'vue'
import { usePopper } from '@nocturne-ui/composables'
import { buildPopperOptions, unwrapMeasurableEl } from '../utils'
import { POPPER_INJECTION_KEY } from '../constants'

import type { Modifier } from '@popperjs/core'
import type { PartialOptions } from '@nocturne-ui/composables'
import type { PopperContentProps } from '../content'

const DEFAULT_ARROW_OFFSET = 0

export const usePopperContent = (props: PopperContentProps) => {
  const { instancePopperRef, contentRef, referenceRef, role } = inject(
    POPPER_INJECTION_KEY,
    undefined
  )!

  const arrowRef = ref<HTMLElement>()
  const arrowOffset = ref<number>()

  const eventListenerModifier = computed(() => {
    return {
      name: 'eventListeners',
      enabled: !!props.visible
    } as Modifier<'eventListeners', any>
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
    } as any
  })

  const options = computed<PartialOptions>(() => {
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

export type UsePopperContentReturn = ReturnType<typeof usePopperContent>
