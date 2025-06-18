import {
  Transition,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  toRef,
  vShow,
  withDirectives
} from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { isUndefined } from '@nocturne-ui/utils'
import { onClickOutside } from '@vueuse/core'
import FloatButton from './float-button'
import { floatButtonGroupEmit, floatButtonGroupProps } from './props'
import { FloatButtonGroupContextKey } from './context'

const FloatButtonGroup = defineComponent({
  name: 'NFloatButtonGroup',
  props: floatButtonGroupProps,
  emits: floatButtonGroupEmit,
  setup(props, { emit, slots }) {
    const ns = useNamespace('fab')

    const value = ref(props.modelValue)
    const triggerRef = ref<HTMLElement>()
    const listRef = ref<HTMLElement>()

    onClickOutside(triggerRef, (e: MouseEvent) => {
      if (props.trigger === 'click') {
        if (!listRef.value?.contains(e.target as HTMLElement))
          value.value = false
      }
    })

    const onToggle = () => {
      if (props.trigger === 'click') {
        value.value = !value.value

        emitEvent(value.value)
      }
    }

    const onMouseenter = () => {
      if (props.trigger === 'hover') {
        value.value = true

        emitEvent(value.value)
      }
    }

    const onMouseleave = () => {
      if (props.trigger === 'hover') {
        value.value = false

        emitEvent(value.value)
      }
    }

    const emitEvent = (value: boolean) => {
      if (!isUndefined(props.modelValue)) {
        emit('open', value)
        emit('update:modelValue', value)
      }
    }

    provide(
      FloatButtonGroupContextKey,
      reactive({
        shape: toRef(props, 'shape')
      })
    )

    return () => {
      const { closeIcon, icon, placement, shape } = props

      return (
        <div class={ns.b('group')}>
          <Transition name="fab-group">
            {withDirectives(
              <div
                class={[
                  ns.be('group', 'list'),
                  ns.is(placement),
                  ns.bm('group', shape)
                ]}
                ref={listRef}
              >
                {slots.default?.()}
              </div>,
              [[vShow, value.value]]
            )}
          </Transition>
          {h(FloatButton, {
            ref: triggerRef,
            icon: value.value ? closeIcon : icon,
            onClick: onToggle,
            onMouseenter,
            onMouseleave
          })}
        </div>
      )
    }
  }
})

export default FloatButtonGroup
