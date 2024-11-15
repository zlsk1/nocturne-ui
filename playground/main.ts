import { createApp } from 'vue'
import NocturneUI from 'nocturne-ui/index'
import App from './src/App.vue'
import 'nocturne-ui/theme-chalk/src/index.scss'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
