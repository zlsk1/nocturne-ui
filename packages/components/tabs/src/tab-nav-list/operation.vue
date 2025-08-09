<script lang="ts">
import { defineComponent, h, inject } from 'vue'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons-vue'
import NIcon from '@nocturne-ui/components/icon'
import NTooltip from '@nocturne-ui/components/tooltip'
import { useNamespace } from '@nocturne-ui/composables'
import { TAB_INJECT_KEY, TAB_NAV_INJECT_KEY } from '../constants'

export default defineComponent({
  name: 'NTabOperation',
  components: {
    NIcon,
    NTooltip
  },
  emits: ['edit'],
  setup(_, { emit }) {
    const state = inject(TAB_INJECT_KEY, undefined)!
    const { hiddenTabs, jumpToTab } = inject(TAB_NAV_INJECT_KEY, undefined)!

    const ns = useNamespace('tabs')

    return () => {
      const getOperation = () =>
        h('div', { class: ns.e('operation') }, [
          hiddenTabs.value && hiddenTabs.value.length ? getMore() : null,
          state.type === 'editable-card' && getAdd()
        ])

      const getMore = () =>
        h(
          NTooltip,
          {
            showArrow: false,
            pure: true,
            popperClass: [ns.m('more__popper'), state.popperClass || '']
          },
          {
            default: () =>
              h(NIcon, null, { default: () => h(EllipsisOutlined) }),
            content: () => h('ul', null, getMorelist())
          }
        )

      const getAdd = () =>
        h(
          NIcon,
          {
            size: 12,
            class: ns.em('icon', 'add'),
            onClick: (e: Event) => {
              e.stopPropagation()
              emit('edit', 'add')
            }
          },
          { default: () => h(PlusOutlined) }
        )

      const getMorelist = () =>
        hiddenTabs.value.map((hiddenTab, index) => {
          return h(
            'li',
            {
              key: `${hiddenTab.label}-${index}`,
              class: [
                ns.m('more__item'),
                ns.is('disabled', hiddenTab.disabled)
              ],
              onClick: () => jumpToTab(hiddenTab)
            },
            hiddenTab.label
          )
        })

      return getOperation()
    }
  }
})
</script>
