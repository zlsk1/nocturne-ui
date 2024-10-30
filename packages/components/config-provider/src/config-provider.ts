import { defineComponent, renderSlot } from 'vue'
import { configProviderProps } from './props'
import { provideGlobalConfig } from '../composables/use-global-config'

const configProvider = defineComponent({
  name: 'NConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  }
})

export default configProvider
