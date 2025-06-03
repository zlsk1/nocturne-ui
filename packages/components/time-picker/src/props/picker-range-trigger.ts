import { definePropType } from '@nocturne-ui/utils'

export const pickerRangeTriggerProps = {
  modelValue: {
    type: definePropType<[string, string]>(Array)
  }
} as const
