import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type NPaginationInjectionContext = {
  _currentPage: Ref<number>,
  disabled: boolean,
  totalPages: ComputedRef<number>,
  pageSize: Ref<number>,
  emit: any,
}

export const PAGINATION_INJECTION_KEY: InjectionKey<NPaginationInjectionContext> = Symbol('frPagination')

