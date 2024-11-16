import { defineComponent, h, inject } from 'vue'
import { NBREADCRUMBINJECTIONKEY } from './constants'
import type { ExtractPropTypes } from 'vue'
import { isString, isUndefined } from '@/utils'
import { useNamespace } from '@/composables'

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
      ? h('span', { class: ns.e('separator') }, separator.value)
      : h(separator.value, { class: ns.e('separator') })

    const linkEl = props.path
      ? h('a', { href: props.path }, slots.default?.())
      : slots.default?.()

    const children = h(
      'span',
      {
        class: [ns.e('content'), ns.is('link', !isUndefined(props.path))],
        onClick: () => onClick(props?.path)
      },
      [linkEl, separatorEl]
    )

    return () => h('li', { class: ns.e('items') }, children)
  }
})
