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
          tabs.value.find((tab) => tab.label === props.modelValue) ||
          tabs.value[0]
        )
      },
      set(val) {
        if (val) {
          emit('update:modelValue', val.label)
          emit('change', val.label)
        }
      }
    })

    const updateActiveTab = (tab: TabType) => (activeTab.value = tab)

    const parseTablist = (root: any): TabType[] => {
      return root[0].children
        ?.map((child: VNode) => {
          const { label, disabled, closeable } = child.props as TabPaneProps

          return {
            label,
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
        [
          h(NTabNavList, {
            'onUpdate:modelValue': (label) => emit('update:modelValue', label),
            onChange: (label) => emit('change', label),
            onClick: (label) => emit('click', label),
            onEdit: (type, label) => emit('edit', type, label)
          }),
          h(NTabPaneList)
        ]
      )

    return () => {
      tabs.value = parseTablist(slots.default?.())
      return getTabs()
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
          onChange: (val) => emit('change', val),
          'onUpdate:modelValue': (val) => emit('update:modelValue', val),
          onClick: (val) => emit('click', val),
          onEdit: (type, label) => emit('edit', type, label)
        },
        { default: () => slots.default?.() }
      )
  }
})
