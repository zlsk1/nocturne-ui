import loading from './loading.vue'
import type { ExtractPropTypes } from 'vue'
import { definePropType, iconPropType, isClient, mutable } from '@/utils'

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
    type: {},
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
}

export type LoadingProps = ExtractPropTypes<typeof loadingProps>
export type LoadingIntance = InstanceType<typeof loading>

export type loadingParams = Partial<LoadingProps> & {
  target?: string | HTMLElement
}
export type normilizedParams = Partial<LoadingProps> & { target: HTMLElement }
export type closeHandler = () => void
