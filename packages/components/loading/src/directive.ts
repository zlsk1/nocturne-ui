import { isObject } from 'lodash'
import Loading from './method'
import type { LoadingIntance, LoadingProps } from './loading'
import type { Directive } from 'vue'

export interface NLoading extends HTMLElement {
  instance: LoadingIntance
}

const createLoading = (el: NLoading, binding: LoadingProps) => {
  if (isObject(binding)) {
    el.instance = Loading({
      ...binding,
      target: el
    })
  } else {
    el.instance = Loading(el)
  }
}

export const vLoading: Directive<NLoading, LoadingProps> = {
  mounted: (el, binding) => {
    if (binding.value) {
      createLoading(el, binding.value)
    }
  },
  updated: (el, binding) => {
    if (binding.value || binding.oldValue) {
      if (!binding.value) {
        el.instance.close()
        return
      }
      createLoading(el, binding.value)
    }
  },
  unmounted: (el) => {
    el.instance.close()
    // @ts-ignore
    el.instance = null
  }
}

export default vLoading
