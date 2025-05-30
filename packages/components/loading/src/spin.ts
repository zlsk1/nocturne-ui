import { ExtractPropTypes } from 'vue'
import { omit } from 'lodash'
import { loadingProps } from './loading'
import Spin from './spin.vue'

export const spinProps = {
  ...omit(loadingProps, ['target', 'onClose', 'locked', 'maskBg']),
  loading: {
    type: Boolean,
    default: false
  },
  maskBg: String
}

export type SpinProps = ExtractPropTypes<typeof spinProps>
export type SpinInstance = InstanceType<typeof Spin>
