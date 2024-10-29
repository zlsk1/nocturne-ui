import { getCurrentInstance, inject, ref } from 'vue'

import type { InjectionKey, Ref } from 'vue'

export const defualtNamespace = 'n'

export type namesapceInjection = Ref<string>

export const NAMESPACE_INJECTION_KEY: InjectionKey<namesapceInjection> = Symbol('namespace')

export const useNamesapce = (namespaceOverrides: Ref<string | undefined>) => {
  const newNamespace =
    namespaceOverrides ||
    getCurrentInstance()
      ? inject(NAMESPACE_INJECTION_KEY, ref(defualtNamespace))
      : ref(defualtNamespace)

  return newNamespace
}
