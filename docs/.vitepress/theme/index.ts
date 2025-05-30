import './styles/index.scss'
import 'nocturne-ui/theme-chalk/n-message.css'
import 'uno.css'
import { vpComponents } from './global'
import vpApp from './components/vp-app.vue'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'virtual:group-icons.css'
import type { App } from 'vue'

export default {
  Layout: vpApp,
  enhanceApp({ app }: { app: App }) {
    vpComponents.forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}
