import FrButton from './button/src/button.vue'
import FrIcon from './svg-icon/src/icon.vue'
import FrInput from './input/src/input.vue'
import FrInputNumber from './input-number/src/input-number.vue'
import FrSwitch from './switch/src/switch.vue'

const components = [
  FrButton,
  FrIcon,
  FrInput,
  FrInputNumber,
  FrSwitch
]

const install = app => {
  components.forEach(comp => {
    app.component(comp.name, comp)
  })
}

export default install

export {
  FrButton,
  FrIcon,
  FrInput,
  FrInputNumber,
  FrSwitch
}
