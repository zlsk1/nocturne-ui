import type { CSSProperties } from 'vue'

export const separateCssKey = (key: string) =>
  key.replace(/([A-Z])/g, '-$1').toLowerCase()

export const getStyleStr = (style: CSSProperties): string =>
  (Object.keys(style) as [keyof CSSProperties])
    .map((key) => `${separateCssKey(key)}: ${style[key]};`)
    .join(' ')

export const getPixelRatio = () => window.devicePixelRatio || 1
