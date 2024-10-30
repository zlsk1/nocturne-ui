import { getCurrentInstance, inject, ref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defualtNamespace = 'n'

export const NAMESPACE_INJECTION_KEY: InjectionKey<Ref<string | undefined>> = Symbol('namespace')

export const useNamesapce = (namespaceOverrides?: Ref<string>) => {
  const newNamespace =
    namespaceOverrides ||
    getCurrentInstance()
      ? inject(NAMESPACE_INJECTION_KEY, ref(defualtNamespace)) // 接收config-provider的值
      : ref(defualtNamespace)

  return newNamespace
}
