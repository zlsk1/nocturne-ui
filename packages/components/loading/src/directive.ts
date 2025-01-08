import { createVNode, render } from 'vue'
import { isClient, isObject } from '@/utils'
import Loading from './loading.vue'
import { loadingDefault } from './loading'

import type { Directive } from 'vue'
import type { LoadingIntance, LoadingProps } from './loading'

type Attributes = keyof Omit<typeof loadingDefault, 'onClose' | 'target'>
export interface NLoading extends HTMLElement {
  NLoading: {
    instance: LoadingIntance
    options: LoadingProps
  }
}

const container = isClient()
  ? document.createElement('div')
  : (undefined as never)

const _getAttribute = (el: NLoading, name: Attributes) => {
  return el.getAttribute(`n-loading-${name}`) || loadingDefault[name]
}

const getProps = (el: NLoading) => {
  return {
    text: _getAttribute(el, 'text'),
    maskBg: _getAttribute(el, 'maskBg'),
    locked: _getAttribute(el, 'locked'),
    icon: _getAttribute(el, 'icon')
  }
}

export const VLoading: Directive = {
  beforeMount: (el, binding) => {
    let props

    if (isObject(binding.value)) {
      props = binding.value
    } else {
      props = getProps(el)
    }

    const vnode = createVNode(Loading, props)
    render(vnode, container)
  },
  mounted: (el) => {
    el.appendChild(container.firstElementChild!)
  },
  updated: () => {
    render(null, container)
  }
}

export default VLoading
