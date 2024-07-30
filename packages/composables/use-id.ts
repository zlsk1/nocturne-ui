import { computed } from 'vue'

const initialId = {
  prefix: Math.floor(Math.random() * 10000),
  suffix: 0
}

const namespace = 'n-id'

export const useId = () => {
  const id = computed(() => {
    return `${namespace}--${initialId.prefix}--${initialId.suffix++}`
  })

  return id
}
