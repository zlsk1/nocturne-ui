import { defineComponent } from 'vue'
import { nTourStepProps } from './props'

export default defineComponent({
  name: 'NTourStep',
  props: nTourStepProps,
  setup(_, { slots }) {
    return () => {
      return <div>{slots.default?.()}</div>
    }
  }
})
