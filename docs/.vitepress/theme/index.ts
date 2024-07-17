import NocturneUI from 'nocturne-ui'
import DefaultTheme from 'vitepress/theme'
import '../styles/index.scss'
import 'uno.css'
import demo from '../components/demo.vue'
import type { App, Component } from 'vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo', demo)
    app.use(NocturneUI)
  }
}