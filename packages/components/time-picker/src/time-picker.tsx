import { defineComponent, ref } from 'vue'
import dayjs, { type Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { pickerProps } from './props/picker'
import PickPanel from './time-picker-panel.vue'
import Picker from './picker.vue'
import type { PickerInstance } from './props/picker'

dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'NTimePicker',
  props: pickerProps,
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, expose }) {
    const pickerRef = ref<PickerInstance>()

    const onUpdate = (time: string | Dayjs) => {
      emit('update:modelValue', time)
    }

    const onChange = (time: string | Dayjs) => {
      emit('change', time)
    }

    expose({
      focus: pickerRef.value?.focus,
      blur: pickerRef.value?.blur,
      open: pickerRef.value?.openPopper
    })

    return () => {
      return (
        <Picker
          ref={pickerRef}
          {...props}
          onUpdate:modelValue={onUpdate}
          onChange={onChange}
        >
          {{
            default: (props: any) => <PickPanel {...props}></PickPanel>
          }}
        </Picker>
      )
    }
  }
})
