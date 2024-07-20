import { createApp } from 'vue'
import App from './src/App.vue'
import NocturneUI from 'nocturne-ui/index'
import 'nocturne-ui/theme-chalk/src/index.scss'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
