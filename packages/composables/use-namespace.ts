import { computed, getCurrentInstance, inject, ref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defualtNamespace = 'n'
const statePrefix = 'is-'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string
) => {
  let cls = `${namespace}-${block}`

  if (blockSuffix) cls += `-${blockSuffix}`
  if (element) cls += `__${element}`
  if (modifier) cls += `--${modifier}`

  return cls
}

export const NAMESPACE_INJECTION_KEY: InjectionKey<Ref<string | undefined>> =
  Symbol('namespace')

export const useGetOverRidesNamesapce = (namespaceOverrides?: Ref<string>) => {
  const newNamespace =
    namespaceOverrides ||
    (getCurrentInstance()
      ? inject(NAMESPACE_INJECTION_KEY, ref(defualtNamespace)) // 接收config-provider的值
      : ref(defualtNamespace))

  const namespace = computed(() => {
    return newNamespace.value || defualtNamespace
  })

  return namespace
}

export const useNamespace = (
  block: string,
  namespaceOverrides?: Ref<string>
) => {
  const ns = useGetOverRidesNamesapce(namespaceOverrides)

  const b = (blockSuffix = '') => _bem(ns.value, block, blockSuffix)

  const e = (element?: string) =>
    element ? _bem(ns.value, block, '', element) : ''

  const m = (modifier?: string, blockSuffix = '') =>
    modifier ? _bem(ns.value, block, blockSuffix, '', modifier) : ''

  const em = (element?: string, modifier?: string, blockSuffix = '') =>
    element && modifier
      ? _bem(ns.value, block, blockSuffix, element, modifier)
      : ''

  const be = (blockSuffix = '', element?: string) =>
    element ? _bem(ns.value, block, blockSuffix, element) : ''

  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(ns.value, block, blockSuffix, '', modifier)
      : ''

  const bem = (blockSuffix = '', element?: string, modifier?: string) =>
    element && modifier
      ? _bem(ns.value, block, blockSuffix, element, modifier)
      : ''

  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string // overload
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0] : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  return {
    ns,

    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is
  }
}
