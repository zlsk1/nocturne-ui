import Components from './component'
import Plugins from './plugin'
import { INSTALLED_KEY } from '@/constants'
import type { App, Plugin } from 'vue'

const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App) => {
    if (app[INSTALLED_KEY as unknown as keyof typeof app]) return

    (app[INSTALLED_KEY as unknown as keyof typeof app] as boolean) = true
    components.forEach((c) => app.use(c))
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
