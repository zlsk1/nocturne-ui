import { createApp } from 'vue'
import App from './src/App.vue'
import NocturneUI from 'nocturne-ui'
import 'nocturne-ui/dist/index.css'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
