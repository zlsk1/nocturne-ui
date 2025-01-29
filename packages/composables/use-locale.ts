import { computed, inject, ref, unref } from 'vue'
import { get } from 'lodash'
import zhCn from '@/locale/lang/zh-cn'
import type { ComputedRef, InjectionKey, MaybeRef, Ref } from 'vue'
import type { Locale } from '@/locale'

export type TranslatorOption = Record<string, string | number>
export type Translator = (path: string, option?: TranslatorOption) => string
export type LocaleContext = {
  lang: Ref<string>
  locale: Ref<Locale>
  t: Translator
}

export const LOCALE_INJECTION_KEY: InjectionKey<Ref<Locale | undefined>> =
  Symbol('locale')

export const transferTranslator =
  (locale: MaybeRef<Locale>): Translator =>
  (path, option) =>
    translate(path, option, unref(locale))

export const translate = (
  path: string,
  option: TranslatorOption | undefined,
  locale: Locale
) =>
  (get(locale, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  )

export const useLocale = (localOverrides?: Ref<Locale>): LocaleContext => {
  const locale = localOverrides || inject(LOCALE_INJECTION_KEY, ref())!

  const actualLocale = computed(
    () => locale.value || zhCn
  ) as ComputedRef<Locale>

  const lang = computed(() => unref(actualLocale).name)

  return {
    lang,
    locale: actualLocale,
    t: transferTranslator(actualLocale)
  }
}
