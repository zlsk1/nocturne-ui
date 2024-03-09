import FrButton from './button/src/button.vue'

const components = [
  FrButton
]

const install = app => {
  components.forEach(comp => {
    app.component(comp.name, comp)
  })
}

export default install

export {
  FrButton
}
