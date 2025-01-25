import { withInstall } from '@/utils'
import radio from './src/radio.vue'
import radioButton from './src/radio-button.vue'
import radioGroup from './src/radio-group.vue'

export const NRadio = withInstall(radio)
export const NRadioButton = withInstall(radioButton)
export const NRadioGroup = withInstall(radioGroup)
export default NRadio
