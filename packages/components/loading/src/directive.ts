import { isRef } from 'vue'
import { isObject } from 'lodash'
import Loading from './method'
import { loadingDefault } from './loading'
import type { LoadingIntance, LoadingOptions } from './loading'
import type { Directive, UnwrapRef } from 'vue'

export interface NLoading extends HTMLElement {
  instance: LoadingIntance
  options: LoadingOptions
}

const createLoading = (el: NLoading, binding: LoadingOptions) => {
  if (isObject(binding)) {
    const options = {
      ...loadingDefault,
      ...binding,
      target: el
    }
    el.instance = Loading(options)
    el.options = options
  } else {
    el.instance = Loading(el)
    el.options = loadingDefault
  }
}

const updateOptions = (
  newOptions: UnwrapRef<LoadingOptions>,
  originalOptions: LoadingOptions
) => {
  for (const key of Object.keys(originalOptions)) {
    // @ts-ignore
    if (isRef(originalOptions[key])) {
      // @ts-ignore
      originalOptions[key].value = newOptions[key]
    }
  }
}

export const vLoading: Directive<NLoading, LoadingOptions> = {
  mounted: (el, binding) => {
    if (binding.value) {
      createLoading(el, binding.value)
    }
  },
  updated: (el, binding) => {
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createLoading(el, binding.value)
      } else if (binding.oldValue && binding.value) {
        updateOptions(binding.value, el.options)
      } else {
        el.instance.close()
        return
      }
    }
  },
  unmounted: (el) => {
    el.instance.close()
    // @ts-ignore
    el.instance = null
  }
}

export default vLoading
