import { unref } from 'vue'
import { isArray } from '@/utils'

import type { Ref } from 'vue'
import type { TooltipTriggerType } from './reference'

export const isTriggerType = (
  trigger: TooltipTriggerType,
  type: TooltipTriggerType
) => {
  if (isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}

export const whenTrigger = (
  trigger: Ref<TooltipTriggerType>,
  type: TooltipTriggerType,
  handler: (e: Event) => void
) => {
  return (e: Event) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}
