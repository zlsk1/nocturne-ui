<script lang="ts">
import { computed, defineComponent, h, inject, provide, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { useNamespace } from '@nocturne-ui/composables'
import { TAB_INJECT_KEY, TAB_NAV_INJECT_KEY } from '../constants'
import { tabsEmits } from '../props'
import TabNode from './tab-node.vue'
import TabOperation from './operation.vue'
import type { TabType } from '../props'
import type { ComponentPublicInstance } from 'vue'

export default defineComponent({
  name: 'NTabNavList',
  components: { TabNode, TabOperation },
  emits: tabsEmits,
  setup(_, { emit }) {
    const ns = useNamespace('tabs')
    const state = inject(TAB_INJECT_KEY, undefined)!

    const currentTransform = ref(0)
    const navBtnRefs = ref<{ [key: string]: any }>({})
    const navWrapRef = ref<HTMLElement | null>(null)
    const navlistRef = ref<HTMLElement | null>(null)

    const isHorizontal = computed(() =>
      ['left', 'right'].includes(state.position)
    )

    const newTransform = computed(() => {
      if (!isHorizontal.value) {
        return `translateX(${-currentTransform.value}px)`
      }
      return `translateY(${-currentTransform.value}px)`
    })

    const hiddenTabs = computed(() => {
      const hiddenTabs: TabType[] = []
      if (!state.tabs.length) return hiddenTabs

      for (const tab of state.tabs) {
        const el = navBtnRefs.value[tab.label] as HTMLElement
        const offset = !isHorizontal.value ? el.offsetLeft : el.offsetTop
        const minimum = currentTransform.value > offset

        const maximum = !isHorizontal.value
          ? offset -
              currentTransform.value +
              el?.getBoundingClientRect().width >
            navWrapRef.value?.getBoundingClientRect().width!
          : offset -
              currentTransform.value +
              el?.getBoundingClientRect().height >
            navWrapRef.value?.getBoundingClientRect().height!

        if (minimum || maximum) {
          hiddenTabs.push(tab)
        }
      }

      return hiddenTabs
    })

    const setRef = (
      el: Element | ComponentPublicInstance | null,
      label: string
    ) => {
      if (el) {
        navBtnRefs.value[label] = el
      }
    }

    const jumpToTab = (target: TabType) => {
      if (!target || target.disabled) return
      const newTransform = !isHorizontal.value
        ? navBtnRefs.value[
            state.tabs.find((tab) => target.label === tab.label).label
          ].offsetLeft
        : navBtnRefs.value[
            state.tabs.find((tab) => target.label === tab.label).label
          ].offsetTop

      currentTransform.value = newTransform

      state.updateActiveTab(target)
      emit('update:modelValue', target.value)
      emit('change', target.value)
    }

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation()
      e.preventDefault()
      currentTransform.value += e.deltaY
    }

    const onTouchmove = (e: TouchEvent) => {
      e.stopPropagation()
      e.preventDefault()
      currentTransform.value +=
        e.touches[0].clientY - e.changedTouches[0].clientY
    }

    const handleTransformBounary = (val: number) => {
      const wrapRect = navWrapRef.value?.getBoundingClientRect()!
      const navRect = navlistRef.value?.getBoundingClientRect()!
      const max = !isHorizontal.value
        ? navRect.width - wrapRect.width
        : navRect.height - wrapRect.height

      if (max - Math.abs(val) <= 0) currentTransform.value = max
      if (val <= 0) currentTransform.value = 0
    }

    watch(currentTransform, (val) => {
      handleTransformBounary(val)
    })

    useResizeObserver(navWrapRef, () => {
      jumpToTab(state.activeTab)
    })

    provide(TAB_NAV_INJECT_KEY, { hiddenTabs, setRef, jumpToTab })

    return () =>
      h(
        'div',
        {
          class: ns.e('nav')
        },
        [
          h(
            'div',
            {
              ref: navWrapRef,
              class: ns.e('nav--wrapper'),
              onWheel,
              onTouchmove
            },
            h(
              'div',
              {
                ref: navlistRef,
                class: ns.e('nav--list'),
                style: {
                  transform: newTransform.value
                }
              },
              state.tabs.map((tab, index) =>
                h(TabNode, {
                  tab,
                  key: `${tab.label}-${index}`,
                  onClick: (value) => emit('click', value),
                  onChange: (value) => emit('change', value),
                  'onUpdate:modelValue': (value) =>
                    emit('update:modelValue', value),
                  onEdit: (type, value) => emit('edit', type, value)
                })
              )
            )
          ),
          h(TabOperation, {
            onEdit: (type, value) => emit('edit', type, value)
          })
        ]
      )
  }
})
</script>
