import { defineComponent, h, inject } from 'vue'
import { NBREADCRUMBINJECTIONKEY } from './constants'
import { isString, isUndefined } from '@/utils'
import { useNamespace } from '@/composables'

import type { ExtractPropTypes } from 'vue'

export const breadcrumbItemProps = {
  path: String
} as const

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

export default defineComponent({
  name: 'NBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props, { slots }) {
    const ns = useNamespace('breadcrumb')

    const { separator, onClick } = inject(NBREADCRUMBINJECTIONKEY, undefined)!

    const separatorEl = isString(separator.value)
      ? h('span', { class: ns.be('separator') }, separator.value)
      : h(separator.value, { class: ns.be('separator') })

    const linkEl = props.path
      ? h('a', { href: props.path }, slots.default?.())
      : slots.default?.()

    const children = h(
      'span',
      {
        class: [ns.be('content'), ns.is('link', !isUndefined(props.path))],
        onClick: () => onClick(props?.path)
      },
      [
        linkEl,
        separatorEl
      ]
    )

    return () => h(
      'li',
      { class: ns.be('items') },
      children
    )
  }
})
