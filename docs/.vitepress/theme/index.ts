import NocturneUI from 'nocturne-ui'
import './styles/index.scss'
import 'nocturne-ui/dist/index.css';
import 'uno.css'
import { vpComponents } from './global'
import vpApp from './components/vp-app.vue'
import type { App, Component } from 'vue'

export default {
  Layout: vpApp,
  enhanceApp({ app }: { app: App }) {
    vpComponents.forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(NocturneUI)
  }
}