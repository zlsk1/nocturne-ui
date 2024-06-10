import {
  defineComponent,
  computed,
  ref,
  provide,
  h
} from 'vue'
import { PAGINATION_INJECTION_KEY } from './constants'
import { isNumber } from '@/utils'

import type { ExtractPropTypes, VNode } from 'vue'

import jumper from './components/jumper.vue'
import pager from './components/pager.vue'
import prev from './components/prev.vue'
import next from './components/next.vue'
import total from './components/total.vue'
import size from './components/size.vue'

type layoutType =
  | 'total'
  | 'prev'
  | 'pager'
  | 'next'
  | 'sizes'
  | 'jumper'
  | 'slot'

export const paginationProps = {
  pageCount: Number,
  background: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  layout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes'
  },
  total: Number,
  pageSize: {
    type: Number,
    default: 10
  },
  maxPages: {
    type: Number,
    default: 7
  },
  defaultPage: {
    type: Number,
    default: 1
  },
  currentPage: Number,
  nextText: String,
  prevText: String,
  jumperText: String,
  nextIcon: {
    type: String,
    default: 'arrow-right'
  },
  prevIcon: {
    type: String,
    default: 'arrow-left'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  slotIndex: Number
} as const

export const paginationEmits = {
  changePage: (val: number) => isNumber(val),
  clickPrev: (val: number) => isNumber(val),
  clickNext: (val: number) => isNumber(val),
  'update:current-page': (val: number) => isNumber(val)
}

export type PaginationProps = ExtractPropTypes<typeof paginationProps>
export type PaginationEmits = typeof paginationEmits

export default defineComponent({
  name: 'FrPagination',
  props: paginationProps,
  emit: paginationEmits,

  setup(props, { slots, emit }) {
    const _currentPage = ref(props.currentPage || props.defaultPage)

    const totalPages = computed(() => {
      return props.pageCount || Math.ceil(props.total! / props.pageSize)
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
      sizes: h(size),
      jumper: h(jumper, {
        disabled: props.disabled
      }),
      slot: slots?.default?.() ?? null
    }
    const layouts = props.layout.split(',').map(v => v.trim())

    layouts.forEach((v) => {
      template.push(components[v as keyof typeof components])
    })

    provide(
      PAGINATION_INJECTION_KEY,
      {
        _currentPage,
        totalPages,
        disabled: props.disabled,
        emit
      }
    )

    return () => {
      return h(
        'div',
        {
          class: [
            'fr-pagination',
            {
              'is-background': props.background,
              'is-small': props.small,
              'is-disabled': props.disabled
            }
          ]
        },
        template
      )
    }
  }
})

