<script lang="ts">
import {
  cloneVNode,
  defineComponent,
  h,
  inject,
  vShow,
  withDirectives
} from 'vue'
import { useNamespace } from '@/composables'
import { TAB_INJECT_KEY } from '../constants'

export default defineComponent({
  name: 'NTabPaneList',
  setup() {
    const state = inject(TAB_INJECT_KEY, undefined)!
    const ns = useNamespace('tabs')

    return () => {
      return h(
        'div',
        {
          class: ns.e('content')
        },
        [
          state.tabs.map((tab) => {
            return withDirectives(
              h(
                cloneVNode(tab.node, {
                  isActived: tab.label === state.activeTab.label
                })
              ),
              [[vShow, tab.label === state.activeTab.label]]
            )
          })
        ]
      )
    }
  }
})
</script>
