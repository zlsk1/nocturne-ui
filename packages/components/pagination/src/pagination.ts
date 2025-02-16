import { computed, defineComponent, h, provide, ref, watch } from 'vue'
import { useNamespace } from '@nocturne-ui/composables'
import { isNumber } from '@nocturne-ui/utils'
import { PAGINATION_INJECTION_KEY } from './constants'

import { jumperProps } from './components/jumper'
import { pagerProps } from './components/pager'
import { prevProps } from './components/prev'
import { nextProps } from './components/next'
import { totalProps } from './components/total'
import { sizeProps } from './components/size'

import jumper from './components/jumper.vue'
import pager from './components/pager.vue'
import prev from './components/prev.vue'
import next from './components/next.vue'
import total from './components/total.vue'
import size from './components/size.vue'
import type { ExtractPropTypes, VNode } from 'vue'

type layoutType =
  | 'total'
  | 'prev'
  | 'pager'
  | 'next'
  | 'sizes'
  | 'jumper'
  | 'slot'

export const paginationProps = {
  ...jumperProps,
  ...pagerProps,
  ...prevProps,
  ...nextProps,
  ...totalProps,
  ...sizeProps,
  pageCount: Number,
  background: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next, sizes, jumper'
  },
  defaultPage: {
    type: Number,
    default: 1
  },
  currentPage: Number,
  slotIndex: Number
} as const

export const paginationEmits = {
  changePage: (val: number) => isNumber(val),
  clickPrev: (val: number) => isNumber(val),
  clickNext: (val: number) => isNumber(val),
  'update:current-page': (val: number) => isNumber(val),
  'update:page-size': (val: number) => isNumber(val),
  changeSize: (val: number) => isNumber(val)
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits

export default defineComponent({
  name: 'NPagination',
  props: paginationProps,
  emit: paginationEmits,

  setup(props, { slots, emit }) {
    const ns = useNamespace('pagination')

    const _currentPage = ref(props.currentPage || props.defaultPage)
    const pageSize = ref(props.pageSize)

    const totalPages = computed(() => {
      return props.pageCount || Math.ceil(props.total! / pageSize.value)
    })

    const paginationCls = computed(() => [
      ns.b(),
      ns.is('background', props.background),
      ns.is('small', props.small),
      ns.is('disabled', props.disabled)
    ])

    watch(pageSize, () => {
      if (totalPages.value < _currentPage.value) {
        _currentPage.value = totalPages.value
      }
    })

    const template: Array<VNode | VNode[] | null> = []
    const components: Record<layoutType, VNode | VNode[] | null> = {
      total: h(total, {
        total: props.total
      }),
      prev: h(prev, {
        prevIcon: props.prevIcon,
        prevText: props.prevText
      }),
      pager: h(pager, {
        maxPages: props.maxPages
      }),
      next: h(next, {
        nextIcon: props.nextIcon,
        nextText: props.nextText
      }),
      sizes: h(size, {
        pageSizes: props.pageSizes,
        pageSize: props.pageSize,
        small: props.small
      }),
      jumper: h(jumper, {
        disabled: props.disabled
      }),
      slot: slots?.default?.() ?? null
    }
    const layouts = props.layout.split(',').map((v) => v.trim())

    layouts.forEach((v) => {
      template.push(components[v as keyof typeof components])
    })

    provide(PAGINATION_INJECTION_KEY, {
      _currentPage,
      totalPages,
      disabled: props.disabled,
      pageSize,
      emit
    })

    return () => {
      return h(
        'div',
        {
          class: paginationCls.value
        },
        template
      )
    }
  }
})
