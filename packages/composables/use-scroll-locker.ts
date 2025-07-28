import { computed, watchEffect } from 'vue'
import { canUseDom, removeCSS, updateCSS } from '@nocturne-ui/utils'
import type { Ref } from 'vue'

const UNIQUE_ID = `noc-locker-${Date.now()}`

let uuid = 0

export const useScrollLocker = (lock?: Ref<boolean>) => {
  const mergedLock = computed(() => !!lock && !!lock.value)
  uuid += 1
  const id = `${UNIQUE_ID}_${uuid}`

  watchEffect(
    (onClear) => {
      if (!canUseDom()) {
        return
      }
      if (mergedLock.value) {
        updateCSS(
          `
html body {
  overflow-y: hidden;
}`,
          id
        )
      } else {
        removeCSS(id)
      }
      onClear(() => {
        removeCSS(id)
      })
    },
    { flush: 'post' }
  )
}
