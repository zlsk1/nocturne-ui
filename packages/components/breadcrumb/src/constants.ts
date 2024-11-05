import type { InjectionKey, ToRef, Component } from 'vue'

export type NBreadcrumbContext = {
  separator: ToRef<string | Component>,
  onClick: (path?: string) => void
}

export const NBREADCRUMBINJECTIONKEY: InjectionKey<NBreadcrumbContext> = Symbol('n-breadcrumb')
