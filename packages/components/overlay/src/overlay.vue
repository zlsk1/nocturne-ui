<script lang="ts">
import { defineComponent, h } from 'vue'
import { useSameTarget, useNamespace } from '@/composables'

import type { ExtractPropTypes } from 'vue'

export const overlayProps = {
  zIndex: Number,
  customClass: String,
  masker: {
    type: Boolean,
    default: true
  },
  customEvent: {
    type: Boolean,
    default: false
  }
} as const

export const overlayEmit = {
  click: (e: MouseEvent) => e instanceof MouseEvent
}

export type OverlayProps = ExtractPropTypes<typeof overlayProps>
export type OverlayEmit = typeof overlayEmit

export default defineComponent({
  name: 'NOverlay',
  inheritAttrs: false,
  props: overlayProps,
  emit: overlayEmit,
  setup(props, { emit, slots }) {
    const ns = useNamespace('overlay')

    const onMaskerClick = (e: MouseEvent) => {
      emit('click', e)
    }
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customEvent ? undefined : onMaskerClick)
    return () => {
      return props.masker
        ? h(
          'div',
          {
            class: ns.b(),
            style: {
              zIndex: props.zIndex
            },
            onClick,
            onMousedown,
            onMouseup
          },
          slots.default?.()
        )
        : h(
          'div',
          {
            class: ns.b(),
            style: {
              zIndex: props.zIndex,
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px'
            },
            onClick,
            onMousedown,
            onMouseup
          },
          slots.default?.()
        )
    }
  }
})
</script>
