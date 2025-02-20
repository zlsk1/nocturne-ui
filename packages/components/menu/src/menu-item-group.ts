import { defineComponent, h } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'

export const menuItemGroupProps = {
  title: String
} as const

export default defineComponent({
  name: 'NMenuItemGroup',
  props: menuItemGroupProps,
  setup(props, { slots }) {
    const ns = useNamespace('menu-group')

    return () =>
      h(
        'li',
        {
          class: [ns.b()]
        },
        [
          h(
            'span',
            {
              class: [ns.m('title')]
            },
            props.title
          ),
          h(
            'ul',
            {
              class: [ns.m('content')]
            },
            slots.default?.()
          )
        ]
      )
  }
})
