import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  storageKey: 'n-theme-appearance'
})

export const toggleDark = useToggle(isDark)
