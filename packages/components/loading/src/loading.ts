import {
  definePropType,
  iconPropType,
  isClient,
  mutable
} from '@nocturne-ui/utils'
import type { ExtractPropTypes, VNode } from 'vue'

export const loadingDefault = mutable({
  target: isClient() ? document.body : (undefined as never),
  text: '',
  icon: 'Loader',
  maskBg: 'rgba(0, 0, 0, 0.8)',
  locked: false,
  onClose: undefined
} as const)

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
