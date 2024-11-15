import { defineComponent, renderSlot } from 'vue'
import { provideGlobalConfig } from '../composables/use-global-config'
import { configProviderProps } from './props'

const configProvider = defineComponent({
  name: 'NConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  }
})

export default configProvider
