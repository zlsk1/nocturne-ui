import { defineComponent, h, isVNode, renderSlot } from 'vue'
import { definePropType, flattedChildren, isString } from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import type { ExtractPropTypes } from 'vue'

export const spaceProps = {
  size: {
    type: definePropType<'small' | 'medium' | 'large' | number>([
      String,
      Number
    ]),
    default: 'small'
  },
  direction: {
    type: definePropType<'vertical' | 'horizontal'>(String),
    default: 'horizontal'
  },
  align: {
    type: definePropType<'start' | 'end' | 'center' | 'baseline'>(String)
  },
  wrap: {
    type: Boolean,
    default: false,
    validate: ({ direction }: any) => {
      if (direction !== 'horizontal') {
        return false
      }
    }
  }
} as const

export type SpaceProps = ExtractPropTypes<typeof spaceProps>

const Space = defineComponent({
  name: 'NSpace',
  props: spaceProps,
  setup(props, { slots }) {
    const ns = useNamespace('space')

    const sizeMap = {
      small: '8px',
      medium: '16px',
      large: '24px'
    } as const

    return () => {
      const children = flattedChildren(renderSlot(slots, 'default'))
      const split = slots.split?.()

      const finalChildren: Array<any> = []

      for (const [i, child] of children.entries()) {
        finalChildren.push(child)
        if (i !== children.length - 1 && split && isVNode(split[0])) {
          finalChildren.push(split[0])
        }
      }

      return h(
        'div',
        {
          class: [
            ns.b(),
            props.direction === 'vertical' && ns.m(props.direction),
            ns.m(props.align),
            ns.is('wrap', props.wrap)
          ],
          style: {
            gap: isString(props.size) ? sizeMap[props.size] : `${props.size}px`
          }
        },
        [finalChildren.map((v) => h(v))]
      )
    }
  }
})

export default Space

export type NSpaceInstance = InstanceType<typeof Space>
