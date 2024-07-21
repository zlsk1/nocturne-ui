import { useDark, useToggle } from '@vueuse/core'

export const isDark = useDark({
  selector: 'html',
  storageKey: 'n-theme-appearance',
  valueDark: 'dark',
  valueLight: 'light'
})

export const toggleDark = useToggle(isDark)