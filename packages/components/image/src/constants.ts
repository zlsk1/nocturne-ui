import type { InjectionKey } from 'vue'

export type PreviewImageContext = {
  previewList: string[]
}

export const previewImageContextKey: InjectionKey<PreviewImageContext> = Symbol(
  'previewImageContextKey'
)
