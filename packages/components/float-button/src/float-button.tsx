import { defineComponent, h, inject } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import Icon from '@nocturne-ui/components/icon'
import Tooltip from '@nocturne-ui/components/tooltip'
import { consoleWarn } from '@nocturne-ui/utils'
import { InfoOutlined } from '@ant-design/icons-vue'
import { floatButtonEmit, floatButtonProps } from './props'
import { FloatButtonGroupContextKey } from './context'

const FloatButton = defineComponent({
  name: 'NFloatButton',
  props: floatButtonProps,
  emits: floatButtonEmit,
  setup(props, { emit, slots }) {
    const group = inject(FloatButtonGroupContextKey, undefined)!

    const ns = useNamespace('fab')

    if (props.shape !== 'square' && props.description) {
      consoleWarn(
        'n-float-button',
        'description is only valid while shape equals square'
      )
    }

    return () => {
      const {
        description,
        icon = InfoOutlined,
        shape,
        type,
        tooltip,
        buttonType
      } = props

      const fab = (
        <button
          class={[ns.b(), ns.m(group?.shape || shape), ns.m(type)]}
          onClick={(evt: MouseEvent) => emit('click', evt)}
          type={buttonType}
        >
          <div class={ns.m('wrapper')}>
            <div class={ns.m('content')}>
              <div class={ns.e('icon')}>
                <Icon size={18} v-slots={{ default: () => h(icon) }}></Icon>
              </div>
              {description ? (
                <div class={ns.e('description')}>{description}</div>
              ) : null}
            </div>
          </div>
        </button>
      )

      return tooltip ? (
        <Tooltip
          {...tooltip}
          v-slots={{
            default: () => fab,
            content: () => slots.content?.()
          }}
        ></Tooltip>
      ) : (
        fab
      )
    }
  }
})

export default FloatButton
