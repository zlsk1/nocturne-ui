import Loading from './src/method'
import vLoading from './src/directive'
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
export default NLoading

export { vLoading, vLoading as NLoadingDirective, Loading as NLoadingUse }
