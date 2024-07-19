import NocturneUI from 'nocturne-ui'
import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import 'nocturne-ui/dist/index.css';
import 'uno.css'
import { vpComponents } from './components/index'
import vpApp from './components/vp-app.vue'
import type { App, Component } from 'vue'

export default {
  // extends: DefaultTheme,
  Layout: vpApp,
  enhanceApp({ app }: { app: App }) {
    vpComponents.forEach(([name, component]) => {
      app.component(name, component)
    })

    app.use(NocturneUI)
  }
}