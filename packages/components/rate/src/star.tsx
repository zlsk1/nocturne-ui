import { computed, defineComponent } from 'vue'
import { isString } from '@nocturne-ui/utils'
import { useNamespace } from '@nocturne-ui/composables'
import { StarFilled } from '@ant-design/icons-vue'
import { rateProps } from './rate'

export const starProps = {
  index: {
    type: Number,
    required: true
  },
  focused: {
    type: Boolean,
    default: false
  },
  ...rateProps
} as const

export default defineComponent({
  name: 'Star',
  props: starProps,
  emits: ['hover', 'click'],
  setup(props, { emit }) {
    const ns = useNamespace('rate')

    const cls = computed(() => {
      const { index, modelValue, allowHalf, focused } = props
      const starValue = index + 1
      let className = ''
      const prefixCls = ns.b('star')
      if (modelValue === 0 && index === 0 && focused) {
        className += ` ${prefixCls}-focused`
      } else if (
        allowHalf &&
        modelValue &&
        modelValue + 0.5 >= starValue &&
        modelValue < starValue
      ) {
        className += ` ${prefixCls}-half ${prefixCls}-active`
        if (modelValue) {
          className += ` ${prefixCls}-focused`
        }
      } else {
        className +=
          modelValue && starValue <= modelValue
            ? ` ${prefixCls}-full`
            : ` ${prefixCls}-zero`
        if (starValue === modelValue && focused) {
          className += ` ${prefixCls}-focused`
        }
      }
      return [ns.b('star'), className]
    })

    const onHover = (e: MouseEvent) => {
      if (props.readonly) return

      emit('hover', e, props.index)
    }

    const onClick = (e: MouseEvent) => {
      if (props.readonly) return

      emit('click', e, props.index)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (props.readonly) return

      if (e.key === 'Enter') {
        emit('click', e, props.index)
      }
    }

    return () => {
      const { character = StarFilled, modelValue, index } = props

      const characterNode = isString(character) ? character : <character />

      return (
        <li
          class={cls.value}
          onMousemove={onHover}
          onClick={onClick}
          onKeydown={onKeyDown}
        >
          <div
            class={[
              ns.bm('star', 'container'),
              ns.is('readonly', props.readonly)
            ]}
            tabindex={props.readonly ? -1 : 0}
            role="radio"
            aria-checked={modelValue && modelValue > index ? 'true' : 'false'}
            aria-disabled={props.readonly}
          >
            <div class={ns.bm('star', 'first')}>{characterNode}</div>
            <div class={ns.bm('star', 'second')}>{characterNode}</div>
          </div>
        </li>
      )
    }
  }
})
