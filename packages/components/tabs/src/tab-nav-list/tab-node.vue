<script lang="ts">
import { defineComponent, h, inject } from 'vue'
import { RiCloseLine as Close } from '@remixicon/vue'
import NIcon from '@/components/icon'
import { useNamespace } from '@/composables'
import { definePropType } from '@/utils'
import { tabsEmits } from '../props'
import { TAB_INJECT_KEY, TAB_NAV_INJECT_KEY } from '../constants'
import type { TabType } from '../props'

export default defineComponent({
  name: 'NTabNode',
  components: { NIcon, Close },
  props: {
    tab: {
      type: definePropType<TabType>(Object),
      required: true
    }
  },
  emits: tabsEmits,
  setup(props, { emit }) {
    const ns = useNamespace('tabs')
    const state = inject(TAB_INJECT_KEY, undefined)!
    const { setRef } = inject(TAB_NAV_INJECT_KEY, undefined)!

    const onTabClick = (tab: TabType) => {
      if (state.disabled || tab.disabled) return
      state.updateActiveTab(tab)
      emit('update:modelValue', tab.value)
      emit('change', tab.value)
      emit('click', tab.value)
    }

    return () => {
      const { tab } = props

      return h(
        'div',
        {
          ref: (el) => setRef(el, tab.label),
          class: [
            ns.e('nav__btn'),
            ns.is('active', state.activeTab.label === tab.label),
            ns.is('disabled', tab.disabled)
          ],
          'aria-selected': state.activeTab
            ? tab.label === state.activeTab.label
            : tab.label === state.tabs[0].label,
          'aria-disalbed': tab.disabled,
          role: 'tab',
          tabindex: -1,
          onClick: () => onTabClick(tab)
        },
        state.type === 'editable-card' && tab.closeable && !tab.disabled
          ? [
              tab.label,
              h(
                'button',
                {
                  class: ns.e('nav__btn__remove'),
                  onClick: (e: Event) => {
                    e.stopPropagation()
                    emit('edit', 'del', tab.value)
                  }
                },
                h(NIcon, { size: 18 }, { default: () => h(Close) })
              )
            ]
          : tab.label
      )
    }
  }
})
</script>
