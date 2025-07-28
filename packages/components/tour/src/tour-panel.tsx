import { computed, defineComponent, h } from 'vue'
import Button from '@nocturne-ui/components/button'
import Icon from '@nocturne-ui/components/icon'
import Space from '@nocturne-ui/components/space'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { RiCloseLine } from '@remixicon/vue'
import { nTourEmit } from './props'
import type { SlotsType, VNode } from 'vue'

export default defineComponent({
  name: 'NTourPanel',
  props: {
    length: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    },
    title: String,
    description: String,
    open: {
      type: Boolean,
      default: true
    }
  },
  emits: nTourEmit,
  slots: Object as SlotsType<{
    default: any
    indicator: { current: number; length: number }
  }>,
  setup(props, { emit, slots }) {
    const { t } = useLocale()
    const ns = useNamespace('tour')

    const isFinish = computed(() => props.current === props.length - 1)

    const handleNext = (e: Event) => {
      if (!isFinish.value) {
        const nextCur = props.current + 1
        emit('update:current', nextCur)
        emitChange(nextCur)
      } else {
        handleClose(e)
        emit('finish')
      }
    }

    const handlePrev = () => {
      if (props.current > 0) {
        const prevCur = props.current - 1
        emit('update:current', prevCur)
        emitChange(prevCur)
      }
    }

    const handleClose = (e: Event) => {
      emit('update:open', false)
      emit('close', e)
    }

    const emitChange = (current: number) => {
      emit('change', current)
    }

    return () => {
      const { current, title, description, length } = props

      const slotContent = slots.default?.()

      const hasDefaultSlotContent = slotContent?.some(
        (vnode: VNode) =>
          vnode.children || vnode.props || typeof vnode.type !== 'symbol'
      )

      const indicator = Array.from({ length })
        .fill(0)
        .map((_, i) => (
          <i
            class={[
              ns.bem('panel', 'footer', 'dot'),
              current === i && ns.bem('panel', 'dot', 'selected')
            ]}
          ></i>
        ))

      const closeIcon = h(
        Icon,
        {
          size: 18,
          class: ns.bm('panel', 'close'),
          onclick: handleClose
        },
        { default: () => <RiCloseLine></RiCloseLine> }
      )

      return (
        <div class={ns.b('panel')}>
          {closeIcon}
          {hasDefaultSlotContent && (
            <div class={ns.bm('panel', 'cover')}>{slotContent}</div>
          )}
          <div class={ns.be('panel', 'content')}>
            <div class={ns.bem('panel', 'content', 'title')}>{title}</div>
            <p class={ns.bem('panel', 'content', 'description')}>
              {description}
            </p>
          </div>
          <div class={ns.be('panel', 'footer')}>
            <slot name="indicator">
              <div class={ns.bem('panel', 'footer', 'indicator')}>
                {indicator}
              </div>
            </slot>
            <Space>
              {current > 0 ? (
                <Button size="small" onClick={handlePrev}>
                  {t('noc.tour.previous')}
                </Button>
              ) : null}
              <Button type="primary" size="small" onClick={handleNext}>
                {isFinish.value ? t('noc.tour.finish') : t('noc.tour.next')}
              </Button>
            </Space>
          </div>
        </div>
      )
    }
  }
})
