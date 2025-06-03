import { INSTALLED_KEY } from '@nocturne-ui/constants'
import { provideGlobalConfig } from '@nocturne-ui/components/config-provider'
import dayjs from 'dayjs'
import Components from './component'
import Plugins from './plugin'
import type { App } from 'vue'
import type { ConfigProviderProps } from '@nocturne-ui/components/config-provider'

const makeInstaller = (components: any[] = []) => {
  const install = (
    app: App,
    options?: Partial<ConfigProviderProps> & { prefix?: string }
  ) => {
    if (app[INSTALLED_KEY]) return
    app[INSTALLED_KEY] = true

    components.forEach((component) => {
      if (
        component.name &&
        typeof component !== 'function' &&
        options?.prefix
      ) {
        component.name = component.name.replace(/^[N]/, options?.prefix)
      }
      app.use(component)
    })

    options && provideGlobalConfig(options, app)
  }

  return {
    install
  }
}

const installer = makeInstaller([...Components, ...Plugins])
export default installer

export * from '@nocturne-ui/components'
export * from '@nocturne-ui/constants'
export * from '@nocturne-ui/composables'
export * from '@nocturne-ui/directives'

export const install = installer.install

export { dayjs }
