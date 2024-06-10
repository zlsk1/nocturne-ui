import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type FrPaginationInjectionContext = {
  _currentPage: Ref<number>,
  disabled: boolean,
  totalPages: ComputedRef<number>
  emit: any,
}

export const PAGINATION_INJECTION_KEY: InjectionKey<FrPaginationInjectionContext> = Symbol('frPagination')

