import {
  Transition,
  defineComponent,
  onMounted,
  ref,
  vShow,
  withDirectives
} from 'vue'
import { useEventListener } from '@vueuse/core'
import { consoleWarn, isElement } from '@nocturne-ui/utils'
import FloatButton from './float-button'
import { backTopEmits, backTopProps } from './props'

const BackTop = defineComponent({
  name: 'NBackTop',
  props: backTopProps,
  emits: backTopEmits,
  setup(props, { emit }) {
    const scrollY = ref(0)

    const getElement = (
      get: () => HTMLElement | Window
    ): HTMLElement | Window => {
      let target = get()

      if (!isElement(target)) {
        consoleWarn('n-back-top', 'you should pass a exist HTMLElement')
        target = window
      }

      return target
    }

    const onClick = (evt: MouseEvent) => {
      const target = getElement(props.target)
      target.scrollTo({ top: 0, behavior: 'smooth' })
      emit('click', evt)
    }

    onMounted(() => {
      const target = getElement(props.target)

      useEventListener(target, 'scroll', (e) => {
        scrollY.value =
          target instanceof Window
            ? window.scrollY
            : (e.target as HTMLElement).scrollTop
      })
    })

    return () => {
      return (
        <Transition name="n-fade-in">
          {{
            default: () =>
              withDirectives(
                <FloatButton
                  {...props}
                  onClick={(evt: MouseEvent) => onClick(evt)}
                ></FloatButton>,
                [[vShow, scrollY.value > props.offset]]
              )
          }}
        </Transition>
      )
    }
  }
})

export default BackTop
