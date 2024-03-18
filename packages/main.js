import { createApp } from 'vue'
import App from './App.vue'
import FreedomUI from '@/components/index'
import 'virtual:svg-icons-register'
import directives from './directives/index.js'

const app = createApp(App)

app.use(FreedomUI)
app.use(directives)

app.mount('#app')
