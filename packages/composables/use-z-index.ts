import { ref, computed } from 'vue'

const INITIAL_ZINDEX = 2000
const zIndex = ref(0)

export const useZIndex = () => {
  const currentZIndex = computed(() => INITIAL_ZINDEX + zIndex.value)
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    nextZIndex
  }
}
