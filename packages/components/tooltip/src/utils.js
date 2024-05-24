import { unref } from 'vue'

export const isTriggerType = (
  trigger,
  type
) => {
  if (Array.isArray(trigger)) {
    return trigger.includes(type)
  }
  return trigger === type
}

export const whenTrigger = (
  trigger,
  type,
  handler
) => {
  return (e) => {
    isTriggerType(unref(trigger), type) && handler(e)
  }
}
