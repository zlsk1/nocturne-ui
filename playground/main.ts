import { createApp } from 'vue'
import NocturneUI from 'nocturne-ui/index'
import 'nocturne-ui/theme-chalk/src/index.scss'
import 'virtual:uno.css'
import type { Component } from 'vue'

/**
 * @description const modules = {
    './src/app.vue': () => import('./src/app.vue'),
  }
 */
const glob = import.meta.glob<
  true,
  string,
  () => Promise<{ default: Component }>
>('./src/*.vue')
const file = glob['./src/app.vue']

const App = (await file()).default

const app = createApp(App)
app.use(NocturneUI)
app.mount('#app')
