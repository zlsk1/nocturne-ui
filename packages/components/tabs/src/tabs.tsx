import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  ref,
  toRefs
} from 'vue'
import { useNamespace } from '@/composables'
import NTabPaneList from './tab-pane-list/index.vue'
import NTabNavList from './tab-nav-list/index.vue'
import { tabsEmits, tabsProps } from './props'
import { TAB_INJECT_KEY } from './constants'
import type { TabPaneProps } from './props.pane'
import type { VNode } from 'vue'
import type { TabType } from './props'

const InternalTabs = defineComponent({
  name: 'InternalTabs',
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots }) {
    const ns = useNamespace('tabs')

    const tabs = ref<TabType[]>([])

    const activeTab = computed({
      get() {
        return (
          tabs.value.find((tab) => tab.value === props.modelValue) ||
          tabs.value[0]
        )
      },
      set(val) {
        if (val) {
          emit('update:modelValue', val.value)
          emit('change', val.value)
        }
      }
    })

    const updateActiveTab = (tab: TabType) => (activeTab.value = tab)

    const parseTablist = (root: any): TabType[] => {
      return root[0].children
        ?.map((child: VNode) => {
          const { label, disabled, closeable, value } =
            child.props as TabPaneProps

          return {
            label,
            value,
            node: child,
            disabled,
            // @ts-ignore
            closeable: (closeable === '' || closeable === true) && true
          }
        })
        .filter((tab: TabType) => tab)
    }

    provide(
      TAB_INJECT_KEY,
      reactive({
        ...toRefs(props),
        activeTab,
        tabs,
        updateActiveTab
      })
    )

    return () => {
      tabs.value = parseTablist(slots.default?.())

      return h(
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
        [
          h(NTabNavList, {
            onClick: (value) => emit('click', value),
            onEdit: (type, value) => emit('edit', type, value)
          }),
          h(NTabPaneList)
        ]
      )
    }
  }
})

export default defineComponent({
  name: 'NTabs',
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots }) {
    return () =>
      h(
        InternalTabs,
        {
          ...props,
          onChange: (value) => emit('change', value),
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          onClick: (value) => emit('click', value),
          onEdit: (type, value) => emit('edit', type, value)
        },
        { default: () => slots.default?.() }
      )
  }
})
