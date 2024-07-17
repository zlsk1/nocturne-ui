import { createApp } from 'vue'
import App from './src/App.vue'
import NocturneUI from '../dist/nocturne-ui/dist/index.full'
import '../dist/nocturne-ui/dist/index.css'

const app = createApp(App)

app.use(NocturneUI)
app.mount('#app')
