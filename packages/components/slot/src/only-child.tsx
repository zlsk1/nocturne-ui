import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  defineComponent,
  inject,
  withDirectives
} from 'vue'

import type { Ref, VNode } from 'vue'

const NAME = 'NOnlyChild'

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
  }
})

function wrapTextContent(s: string | VNode) {
  return <span>{s}</span>
}

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>
}
