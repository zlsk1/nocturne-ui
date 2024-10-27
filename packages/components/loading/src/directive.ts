import { createVNode, render } from 'vue'
import Loading from './loading.vue'
import { loadingDefault } from './loading'
import { isObject, isClient } from '@/utils'

import type { DirectiveBinding, Directive } from 'vue'
import type { LoadingProps, LoadingIntance } from './loading'

type Attributes = keyof Omit<typeof loadingDefault, 'onClose' | 'target'>
export interface NLoading extends HTMLElement {
  'NLoading': {
    instance: LoadingIntance,
    options: LoadingProps
  }
}

const container = isClient() ? document.createElement('div') : (undefined as never)

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

    if (isObject(binding)) {
      props = binding.value
    }
    else {
      props = getProps(el)
    }

    const vnode = createVNode(Loading, props)
    render(vnode, container)
  },
  mounted: (el, binding) => {
    el.appendChild(container.firstElementChild!)
  },
  updated: () => {
    render(null, container)
  }
}

export default VLoading
