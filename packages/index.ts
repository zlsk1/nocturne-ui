import Components from './component'
import Plugins from './plugin'
import { INSTALLED_KEY } from '@/constants'
import { provideGlobalConfig } from './components/config-provider'
import type { App } from 'vue'
import type { ConfigProviderProps } from './components/config-provider'

const makeInstaller = (components: any[] = []) => {
  const install = (app: App, options?: Partial<ConfigProviderProps> & { prefix?: string }) => {
    if (app[INSTALLED_KEY as unknown as keyof typeof app]) return

    (app[INSTALLED_KEY as unknown as keyof typeof app] as boolean) = true

    components.forEach((component) => {
      if (component.name && typeof component !== 'function' && options?.prefix) {
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

export * from '@/components'
export * from '@/constants'
export * from '@/composables'

export const install = installer.install
