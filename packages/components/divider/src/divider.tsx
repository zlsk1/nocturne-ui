import { computed, defineComponent } from 'vue'
import { definePropType, isFunction } from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import type { ExtractPropTypes } from 'vue'

export type DividerOrientation = 'left' | 'right' | 'center'

export const dividerProps = {
  dashed: {
    type: Boolean,
    default: false
  },
  type: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'horizontal'
  },
  orientation: {
    type: definePropType<DividerOrientation>(String),
    default: 'center'
  }
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>

const Divider = defineComponent({
  name: 'NDivider',
  props: dividerProps,
  setup(props, { slots }) {
    const ns = useNamespace('divider')

    const hasDefaultSlot = computed(() => isFunction(slots.default))

    const cls = computed(() => [
      ns.b(),
      ns.m(props.type),
      hasDefaultSlot.value && ns.m('with-text'),
      props.orientation !== 'center' && ns.is(props.orientation),
      props.dashed && ns.is('dashed')
    ])

    return () => {
      return (
        <div class={cls.value} role="separator">
          {hasDefaultSlot.value ? (
            <span class={ns.e('text')}>{slots.default?.()}</span>
          ) : null}
        </div>
      )
    }
  }
})

export default Divider

export type NDividerInstance = InstanceType<typeof Divider>
