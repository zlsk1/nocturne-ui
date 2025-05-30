import { definePropType, iconPropType, isClient } from '@nocturne-ui/utils'
import type { ExtractPropTypes, VNode } from 'vue'

export const loadingDefault = {
  target: isClient ? document.body : (undefined as never),
  text: '',
  icon: 'Loader',
  maskBg: 'rgba(0, 0, 0, 0.7)',
  locked: false,
  onClose: undefined,
  fullScreen: false
}

export const loadingProps = {
  target: {
    type: definePropType<object | never>([Object, undefined]),
    default: loadingDefault.target
  },
  text: {
    type: String,
    defautl: loadingDefault.text
  },
  icon: {
    type: iconPropType,
    default: loadingDefault.icon
  },
  maskBg: {
    type: String,
    default: loadingDefault.maskBg
  },
  locked: {
    type: Boolean,
    default: loadingDefault.locked
  },
  onClose: {
    type: definePropType<(...args: any[]) => void | undefined>([
      Function,
      undefined
    ]),
    default: loadingDefault.onClose
  },
  fullScreen: {
    type: Boolean,
    default: loadingDefault.fullScreen
  }
} as const

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingIntance = {
  vm: VNode | null
  close: closeHandler
}

export type loadingParams = Partial<LoadingProps> | (string | HTMLElement)
export type normilizedParams = Partial<LoadingProps> & { target: HTMLElement }
export type closeHandler = () => void
export type LoadingOptions = typeof loadingDefault
