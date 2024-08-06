import { computed } from 'vue'
import { DialogProps } from '../dialog'
import { isString, isUndefined } from '@/utils'

import type { Ref } from 'vue'

let instanceCount = 0
const defaultWidth = 300

export const useDialog = (dialogRef: Ref<HTMLElement | undefined>, props: DialogProps) => {
  instanceCount++

  const width = computed(() => {
    if (isUndefined(props.width)) {
      return defaultWidth * (4 - instanceCount) / 3 + 'px'
    }
    else {
      return isString(props.width) ? props.width : props.width + 'px'
    }
  })

  return {
    width
  }
}
