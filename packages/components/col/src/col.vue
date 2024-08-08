<template>
  <component
    :is="tag"
    class="n-col"
    :class="colClass"
    :style="colStyle"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { colProps } from './col'
import { ROW_INJECTION_KEY } from '@/components/row/src/constants'
import { isNumber } from '@/utils'
import { isObject } from 'lodash'

import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NCol'
})

const props = defineProps(colProps)

const { gutter } = inject(ROW_INJECTION_KEY, { gutter: computed(() => 0) })

const colStyle = computed<CSSProperties>(() => {
  if (gutter.value) {
    return {
      paddingLeft: `${gutter.value / 2}px`,
      paddingRight: `${gutter.value / 2}px`
    }
  }
  return {}
})

const colClass = computed(() => {
  const classes: string[] = []
  const pos = ['span', 'offset', 'pull', 'push'] as const

  pos.forEach((prop) => {
    const size = props[prop]
    if (isNumber(size)) {
      if (prop === 'span') classes.push(`n-col-${props[prop]}`)
      else if (size > 0) classes.push(`n-col-${prop}-${props[prop]}`)
    }
  })

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      classes.push(`n-col-${size}-${props[size]}`)
    }
    else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? `n-col-${size}-${prop}-${sizeProp}`
            : `n-col-${size}-${sizeProp}`
        )
      })
    }
  })

  if (gutter.value) {
    classes.push('is-guttered')
  }
  return [classes]
})
</script>

<style lang="scss" scoped>
@use '@/theme-chalk/src/col.scss';
</style>
