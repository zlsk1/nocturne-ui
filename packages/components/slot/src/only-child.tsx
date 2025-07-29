import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  defineComponent,
  inject,
  withDirectives
} from 'vue'
import { NOOP, isObject } from '@vue/shared'
import {
  FORWARD_REF_INJECTION_KEY,
  useForwardRefDirective
} from '@nocturne-ui/composables'
import type { VNode } from 'vue'

const NAME = 'NOnlyChild'

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY)
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? NOOP
    )
    return () => {
      const defaultSlot = slots.default?.(attrs)
      if (!defaultSlot) return null

      if (defaultSlot.length > 1) {
        return null
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot)
      if (!firstLegitNode) {
        return null
      }

      return withDirectives(cloneVNode(firstLegitNode!, attrs), [
        [forwardRefDirective]
      ])
    }
  }
})

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null
  const children = node as VNode[]
  for (const child of children) {
    /**
     * when user uses h(Fragment, [text]) to render plain string,
     * this switch case just cannot handle, when the value is primitives
     * we should just return the wrapped string
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue
        case Text:
        case 'svg':
          return wrapTextContent(child)
        case Fragment:
          return findFirstLegitChild(child.children as VNode[])
        default:
          return child
      }
    }
    return wrapTextContent(child)
  }
  return null
}

function wrapTextContent(s: string | VNode) {
  return <span>{s}</span>
}
