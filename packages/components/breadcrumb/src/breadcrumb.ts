import { defineComponent, h, provide, toRef } from 'vue'
import { iconPropType, isString } from '@nocturne-ui/utils'
import { useLocale, useNamespace } from '@nocturne-ui/composables'
import { NBREADCRUMBINJECTIONKEY } from './constants'
import type { ExtractPropTypes } from 'vue'

export const breadcrumbProps = {
  separator: {
    type: iconPropType,
    default: '/'
  }
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export const breadcrumbEmit = {
  onClick: (path?: string) => isString(path) || typeof path === 'undefined'
}

export type BreadcrumbEmit = typeof breadcrumbEmit

export default defineComponent({
  name: 'NBreadcrumb',
  props: breadcrumbProps,
  emits: breadcrumbEmit,
  setup(props, { emit, slots }) {
    const ns = useNamespace('breadcrumb')
    const { t } = useLocale()

    const handleClick = (path?: string) => emit('onClick', path)

    provide(NBREADCRUMBINJECTIONKEY, {
      separator: toRef(props, 'separator'),
      onClick: handleClick
    })

    return () =>
      h(
        'ol',
        { class: ns.b(), ariaLabel: t('noc.breadcrumb.label') },
        slots.default?.()
      )
  }
})
