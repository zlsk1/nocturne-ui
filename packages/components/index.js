import FrButton from './button/src/button.vue'
import FrIcon from './svg-icon/src/icon.vue'

const components = [
  FrButton,
  FrIcon
]

const install = app => {
  components.forEach(comp => {
    app.component(comp.name, comp)
  })
}

export default install

export {
  FrButton,
  FrIcon
}
