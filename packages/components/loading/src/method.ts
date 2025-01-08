import { AppContext, createVNode, render } from 'vue'
import { isClient, isElement, isObject, isString } from '@/utils'
import { loadingDefault } from './loading'
import Loading from './loading.vue'

import type { closeHandler, loadingParams, normilizedParams } from './loading'

const normilizeParams = (props?: loadingParams) => {
  const mergeParams = isObject(props)
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
): closeHandler => {
  if (!isClient()) return () => undefined
  const container = document.createElement('div')
  const normilizedParam = normilizeParams(props)
  const onDestroy = () => {
    render(null, container)
  }
  const close = () => {
    onDestroy()
    document.body.style.overflow = 'auto'
    normilizedParam.onClose?.()
  }

  const options = {
    ...normilizedParam
  }

  const vnode = createVNode(Loading, options)

  vnode.appContext = context || null

  render(vnode, container)

  options.target.appendChild(container.firstElementChild!)

  document.body.style.overflow = normilizedParam.locked ? 'hidden' : 'auto'

  return close
}

export default loading
