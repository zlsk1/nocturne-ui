import { withInstall } from '@nocturne-ui/utils'
import Loading from './src/method'
import vLoading from './src/directive'
import Spin from './src/spin.vue'
import type { App } from 'vue'

export * from './src/method'

export const NLoading = {
  directive: vLoading,
  use: Loading,
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  }
}

const NSpin = withInstall(Spin)

export default NLoading
export * from './src/loading'
export * from './src/spin'

export { vLoading, vLoading as NLoadingDirective, Loading as useLoading, NSpin }
