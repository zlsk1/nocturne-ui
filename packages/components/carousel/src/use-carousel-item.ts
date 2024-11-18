import { type Ref, computed } from 'vue'

export const useCarouselItem = (
  currentIndex: Ref<number>,
  itemCount: Ref<number>,
  itemIndex: Ref<number>,
  size: Ref<number>
) => {
  const translateStyle = computed(() => {
    const _size: number = size.value
    if (currentIndex.value === itemCount.value - 1 && itemIndex.value === 0) {
      return `${_size!}px`
    }

    if (currentIndex.value === 0 && itemIndex.value === itemCount.value - 1) {
      return `${-_size!}px`
    }

    if (itemIndex.value <= Math.floor(itemCount.value / 2)) {
      return Math.abs(currentIndex.value - itemIndex.value) >
        Math.floor(itemCount.value / 2)
        ? `${Math.ceil((currentIndex.value - itemIndex.value) / 2) * _size!}px`
        : `${(itemIndex.value - currentIndex.value) * _size!}px`
    } else {
      return Math.abs(currentIndex.value - itemIndex.value) >
        Math.floor(itemCount.value / 2)
        ? `${-Math.ceil((itemIndex.value - currentIndex.value) / 2) * _size!}px`
        : `${(itemIndex.value - currentIndex.value) * _size!}px`
    }
  })
  return { translateStyle }
}
