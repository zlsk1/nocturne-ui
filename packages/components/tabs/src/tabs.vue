<script lang="ts">
import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  toRef,
  vShow,
  watch,
  withDirectives
} from 'vue'
import {
  RiAddLine as Add,
  RiCloseLine as Close,
  RiMoreLine as More
} from '@remixicon/vue'
import NIcon from '@/components/icon'
import NTooltip from '@/components/tooltip'
import { useNamespace } from '@/composables'
import { tabsEmits, tabsProps } from './tabs'
import { TAB_INJECT_KEY } from './constants'
import type { NTabInjectionContent } from './constants'
import type { TabType } from './tabs'
import type { ComponentPublicInstance } from 'vue'

export default defineComponent({
  name: 'NTabs',
  components: { NIcon, NTooltip },
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('tabs')

    const tabs = ref<TabType[]>([])
    const currentTransformVal = ref(0)
    const navWrapRef = ref<HTMLDivElement>()
    const navlistRef = ref<HTMLDivElement>()
    const navBtnRefs = ref<{ [key: string]: any }>({})

    const activeTab = computed({
      get() {
        return (
          tabs.value.find((tab) => tab.label === props.modelValue) ||
          tabs.value[0]
        )
      },
      set(val) {
        if (val) emitModelValue(val.label)
      }
    })

    const isHorizontal = computed(() =>
      ['left', 'right'].includes(props.position)
    )

    const hiddenTabs = computed(() => {
      const hiddenTabs = []

      for (const tab of tabs.value) {
        const el = navBtnRefs.value[tab.label] as HTMLElement
        const offset = !isHorizontal.value ? el.offsetLeft : el.offsetTop
        const minimum = currentTransformVal.value > offset
        const maximum = !isHorizontal.value
          ? offset -
              currentTransformVal.value +
              el?.getBoundingClientRect().width >
            navWrapRef.value?.getBoundingClientRect().width!
          : offset -
              currentTransformVal.value +
              el?.getBoundingClientRect().height >
            navWrapRef.value?.getBoundingClientRect().height!

        if (minimum || maximum) {
          hiddenTabs.push(tab)
        }
      }

      return hiddenTabs
    })

    const newTransform = computed(() => {
      if (!isHorizontal.value) {
        return `translateX(${-currentTransformVal.value}px)`
      }
      return `translateY(${-currentTransformVal.value}px)`
    })

    const updateActiveTab = (tab: TabType) => {
      activeTab.value = tab
    }

    const addLabel: NTabInjectionContent['addLabel'] = ({
      label,
      slot,
      disabled,
      closeable
    }) => {
      if (!tabs.value.some((item) => item.label === label)) {
        tabs.value.push({ label, slot, disabled, closeable })
      }
    }

    const onTabClick = (tab: TabType) => {
      if (props.disabled || tab.disabled) return
      updateActiveTab(tab)
      emitModelValue(tab.label)
      emit('click', tab.label)
    }

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation()
      currentTransformVal.value += e.deltaY
    }

    const onTouchmove = (e: TouchEvent) => {
      e.stopPropagation()
    }

    const setRef = (
      el: Element | ComponentPublicInstance | null,
      label: string
    ) => {
      if (el) {
        navBtnRefs.value[label] = el
      }
    }

    const handleTransformBounary = (val: number) => {
      const wrapRect = navWrapRef.value?.getBoundingClientRect()!
      const navRect = navlistRef.value?.getBoundingClientRect()!
      const max = !isHorizontal.value
        ? navRect.width - wrapRect.width
        : navRect.height - wrapRect.height

      if (max - Math.abs(val) <= 0) currentTransformVal.value = max
      if (val <= 0) currentTransformVal.value = 0
    }

    const jumpToTab = (target: TabType) => {
      if (!target || target.disabled) return
      const newTransform = !isHorizontal.value
        ? navBtnRefs.value[
            tabs.value.filter((tab) => target.label === tab.label)?.[0].label
          ].offsetLeft
        : navBtnRefs.value[
            tabs.value.filter((tab) => target.label === tab.label)?.[0].label
          ].offsetTop

      currentTransformVal.value = newTransform

      updateActiveTab(target)
      emitModelValue(target.label)
    }

    const emitModelValue = (value: string) => {
      emit('update:modelValue', value)
      emit('change', value)
    }

    watch(currentTransformVal, (val) => {
      handleTransformBounary(val)
    })

    watch(
      () => props.position,
      () => {
        jumpToTab(activeTab.value)
      }
    )

    provide(
      TAB_INJECT_KEY,
      reactive({
        disabled: toRef(props, 'disabled'),
        activeTab,
        updateActiveTab,
        addLabel
      })
    )

    const getNav = () =>
      h(
        'div',
        {
          class: [ns.e('nav')]
        },
        [getNavWrap(), getOperation()]
      )

    const getNavWrap = () =>
      h(
        'div',
        {
          ref: navWrapRef,
          class: ns.em('nav', 'wrap'),
          onWheel,
          onTouchmove
        },
        [getNavlist()]
      )

    const getNavlist = () =>
      h(
        'div',
        {
          ref: navlistRef,
          class: ns.em('nav', 'list'),
          style: {
            transform: newTransform.value
          }
        },
        tabs.value.map((item) => {
          return h(
            'div',
            {
              ref: (el) => setRef(el, item.label),
              class: [
                ns.e('nav__btn'),
                ns.is('active', activeTab.value.label === item.label),
                ns.is('disabled', item.disabled)
              ],
              'aria-selected': activeTab.value
                ? item.label === activeTab.value.label
                : item.label === tabs.value[0].label,
              'aria-disalbed': item.disabled,
              role: 'tab',
              tabindex: -1,
              onClick: () => onTabClick(item)
            },
            !item.slot?.label
              ? props.type === 'editable-card' &&
                !item.disabled &&
                item.closeable
                ? [
                    item.label,
                    h(
                      'button',
                      {
                        class: ns.e('nav__btn__remove'),
                        onClick: (e: Event) => {
                          e.stopPropagation()
                          emit('edit', 'del', item.label)
                        }
                      },
                      h(NIcon, { size: 18 }, { default: () => h(Close) })
                    )
                  ]
                : item.label
              : item.slot?.label?.({})
          )
        })
      )

    const getOperation = () =>
      h('div', { class: ns.e('operation') }, [getMore(), getAdd()])

    const getMore = () =>
      h(
        NTooltip,
        {
          showArrow: false,
          pure: true,
          // trigger: 'click',
          popperClass: [ns.m('more__popper'), props.popperClass || '']
        },
        {
          default: () => h(NIcon, null, { default: () => h(More) }),
          content: () => h('ul', null, getMorelist())
        }
      )

    const getAdd = () =>
      h(
        NIcon,
        {
          size: 18,
          class: ns.em('icon', 'add'),
          onClick: (e: Event) => {
            e.stopPropagation()
            emit('edit', 'add')
          }
        },
        { default: () => h(Add) }
      )

    const getMorelist = () =>
      hiddenTabs.value.map((hiddenTab) => {
        return h(
          'li',
          {
            class: [ns.m('more__item'), ns.is('disabled', hiddenTab.disabled)],
            onClick: () => jumpToTab(hiddenTab)
          },
          hiddenTab.label
        )
      })

    const getContent = () =>
      h(
        'div',
        {
          class: ns.e('content')
        },
        [
          tabs.value.map((item) => {
            return withDirectives(
              h(
                'div',
                {
                  class: [ns.e('content__item')]
                },
                item.slot?.default?.({})
              ),
              [
                [
                  vShow,
                  activeTab.value
                    ? item.label === activeTab.value.label
                    : item.label === tabs.value[0].label
                ]
              ]
            )
          }),
          slots.default?.()
        ]
      )

    const getTabs = () =>
      h(
        'div',
        {
          class: [
            ns.b(),
            ns.is('disabled', props.disabled),
            ns.is(`${props.position}`),
            ns.m(props.type),
            ns.m(props.size)
          ]
        },
        [getNav(), getContent()]
      )

    return () => getTabs()
  }
})
</script>
