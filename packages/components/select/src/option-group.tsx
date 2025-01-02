import { defineComponent } from 'vue'
import { useNamespace } from '@/composables'

export default defineComponent({
  name: 'NOptionGroup',
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    const ns = useNamespace('option-group')
    return () => (
      <ul class={ns.b()}>
        <li class={ns.e('title')}>{props.label}</li>
        {slots.default?.()}
      </ul>
    )
  }
})
