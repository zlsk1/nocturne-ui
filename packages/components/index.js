import FrButton from './button/src/button.vue'
import svgIcon from './svg-icon/src/icon.vue'

const components = [
  FrButton,
  svgIcon
]

const install = app => {
  components.forEach(comp => {
    app.component(comp.name, comp)
  })
}

export default install

export {
  FrButton,
  svgIcon
}
