<script lang="ts">
import { computed, defineComponent, h } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { tabPaneProps } from '../props.pane'

export default defineComponent({
  name: 'NTabPane',
  props: {
    ...tabPaneProps,
    isActived: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const ns = useNamespace('tabs')
    const itemCls = computed(() => [ns.e('content__item')])

    return () => {
      const { isActived } = props
      return h(
        'div',
        {
          role: 'tabpanel',
          class: itemCls.value,
          ariaHidden: !isActived,
          tabindex: isActived ? 0 : -1
        },
        { default: () => (isActived ? slots.default?.() : null) }
      )
    }
  }
})
</script>
