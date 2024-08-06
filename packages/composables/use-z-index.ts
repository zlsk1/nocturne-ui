import { ref, computed } from 'vue'

const INITIAL_ZINDEX = 2000
const zIndex = ref(0)

export const useZIndex = () => {
  zIndex.value++
  const nextZIndex = computed(() => INITIAL_ZINDEX + zIndex.value)

  return {
    nextZIndex
  }
}
