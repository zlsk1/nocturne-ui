import { defineComponent, ref } from 'vue'
import { pickerProps } from './props/picker'
import PickPanel from './time-picker-panel.vue'
import Picker from './picker.vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import type { PickerInstance } from './props/picker'

dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'NTimePicker',
  props: pickerProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, expose }) {
    const pickerRef = ref<PickerInstance>()

    const onUpdate = (time: number | string | Date | object) => {
      emit('update:modelValue', time)
    }

    const onChange = (time: number | string | Date | object) => {
      emit('change', time)
    }

    expose({
      focus: pickerRef.value?.focus,
      blur: pickerRef.value?.blur
    })

    return () => {
      return (
        <div class="n-time-picker">
          <Picker
            ref={pickerRef}
            {...props}
            onUpdate:modelValue={onUpdate}
            onChange={onChange}>
            {{ default: (props: any) => <PickPanel {...props}></PickPanel> }}
          </Picker>
        </div>
      )
    }
  }
})
