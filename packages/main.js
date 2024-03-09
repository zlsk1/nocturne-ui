import { createApp } from 'vue'
import App from './App.vue'
import FreedomUI from '@/components/index'

const app = createApp(App)

app.use(FreedomUI)

app.mount('#app')
