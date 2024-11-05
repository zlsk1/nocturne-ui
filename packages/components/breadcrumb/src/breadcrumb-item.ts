import { defineComponent, h, inject } from 'vue'
import { NBREADCRUMBINJECTIONKEY } from './constants'

import type { ExtractPropTypes } from 'vue'
import { isString } from '@/utils'

export const breadcrumbItemProps = {
  path: String
} as const

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

export default defineComponent({
  name: 'NBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props, { slots }) {
    const { separator, onClick } = inject(NBREADCRUMBINJECTIONKEY, undefined)!

    const separatorEl = isString(separator.value)
      ? h('span', { class: 'n-breadcrumb__separator' }, separator.value)
      : h(separator.value, { class: 'n-breadcrumb__separator' })

    const linkEl = props.path
      ? h('a', { href: props.path }, slots.default?.())
      : slots.default?.()

    const children = h(
      'span',
      {
        class: ['n-breadcrumb__content', props.path && 'is-link'],
        onClick: () => onClick(props?.path)
      },
      [
        linkEl,
        separatorEl
      ]
    )

    return () => h(
      'li',
      { class: 'n-breadcrumb__items' },
      children
    )
  }
})
