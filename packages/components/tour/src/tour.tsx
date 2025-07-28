import { Teleport, computed, defineComponent, ref, toRefs } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import ToolTip from '@nocturne-ui/components/tooltip'
import { nTourEmit, nTourProps } from './props'
import TourPanel from './tour-panel'
import useTarget from './use-target'
import TourMask from './tour-mask'
import type { NTourStepProps } from './props'
import type { SlotsType } from 'vue'

export default defineComponent({
  name: 'NTour',
  props: nTourProps,
  emits: nTourEmit,
  slots: Object as SlotsType<{
    default: any
    indicator: { current: number; length: number }
  }>,
  setup(props, { slots, emit }) {
    const { scrollIntoViewOptions, gap, mask } = toRefs(props)

    const ns = useNamespace('tour')

    const current = ref(props.current || 0)
    const open = ref(props.open)

    const originalSlots = computed(() => slots.default?.()!)

    const curStepCom = computed(() => originalSlots.value[current.value])

    const curStepProps = computed(
      () => curStepCom.value.props as NTourStepProps
    )

    const mergedScrollIntoViewOptions = computed(
      () =>
        curStepProps.value.scrollIntoViewOptions ?? scrollIntoViewOptions.value
    )

    const mergedMask = computed(
      () => open.value && (curStepProps.value.mask ?? mask.value)
    )

    const [posInfo, targetElement] = useTarget(
      computed(() => curStepProps.value.target),
      open,
      gap,
      mergedScrollIntoViewOptions
    )

    return () => {
      const { animated, zIndex } = props
      const {
        title = '',
        description = '',
        arrow,
        placement
      } = curStepProps.value

      const mergedShowMask =
        typeof mergedMask.value === 'boolean'
          ? mergedMask.value
          : !!mergedMask.value
      const mergedMaskStyle =
        typeof mergedMask.value === 'boolean' ? undefined : mergedMask.value

      return (
        <Teleport to="body">
          <ToolTip
            show-arrow={arrow}
            placement={placement}
            visible={open.value}
            virtualRef={targetElement.value}
            popper-class={`${ns.ns.value}-tour-popper`}
            pure={true}
            v-slots={{
              content: () => (
                <div class={ns.b()}>
                  <TourPanel
                    current={current.value}
                    length={originalSlots.value.length}
                    title={title}
                    description={description}
                    onUpdate:current={(newCurrent) => {
                      current.value = newCurrent
                      emit('update:current', newCurrent)
                    }}
                    onUpdate:open={(opened) => {
                      open.value = opened
                      emit('update:open', opened)
                    }}
                    onChange={(newCurrent) => emit('change', newCurrent)}
                    onClose={(e) => emit('close', e)}
                    onFinish={() => emit('finish')}
                    v-slots={{
                      default: () => curStepCom.value.children?.default?.(),
                      indicator: ({
                        current,
                        length
                      }: {
                        current: number
                        length: number
                      }) => slots.indicator?.({ current, length })
                    }}
                  ></TourPanel>
                </div>
              )
            }}
          ></ToolTip>
          <TourMask
            mask={mergedShowMask}
            style={mergedMaskStyle?.style}
            fill={mergedMaskStyle?.color}
            animated={animated}
            open={open.value}
            pos={posInfo.value}
            zIndex={zIndex}
          ></TourMask>
        </Teleport>
      )
    }
  }
})
