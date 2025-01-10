import { createVNode, render } from 'vue'
import { isObject } from 'lodash'
import { isClient, isElement, isString } from '@/utils'
import { loadingDefault } from './loading'
import Loading from './loading.vue'
import type { AppContext } from 'vue'

import type { LoadingIntance, loadingParams, normilizedParams } from './loading'

const normilizeParams = (props?: loadingParams) => {
  const mergeParams =
    isObject(props) && !isElement(props)
      ? {
          ...loadingDefault,
          ...props
        }
      : {
          ...loadingDefault,
          target: props
        }

  if (!mergeParams.target) {
    mergeParams.target = document.body
  } else if (isString(mergeParams.target)) {
    const _target = document.querySelector<HTMLElement>(mergeParams.target)
    if (!isElement(_target)) {
      console.warn('n-loading', 'target must be a exist HTMLElement')
      mergeParams.target = document.body
    } else {
      mergeParams.target = _target
    }
  }

  return mergeParams as normilizedParams
}

const loading = (
  props?: loadingParams,
  context?: AppContext | null
): LoadingIntance => {
  if (!isClient()) {
    return {
      ...loadingDefault,
      vm: null,
      close: () => {}
    }
  }

  const container = document.createElement('div')
  const normilizedParam = normilizeParams(props)

  const onDestroy = () => {
    render(null, container)
  }
  const close = () => {
    onDestroy()
    document.body.style.overflow = ''
    normilizedParam.onClose?.()
  }

  const options = { ...normilizedParam }

  const vm = createVNode(Loading, options)

  vm.appContext = context || null

  render(vm, container)

  options.target.appendChild(container.firstElementChild!)

  document.body.style.overflow = normilizedParam.locked ? 'hidden' : ''

  return {
    vm,
    close
  }
}

export default loading
