<script setup>
import { inject, ref } from 'vue'
import { jumperProps } from './jumper'

defineProps(jumperProps)

const pagination = inject('pagination', undefined)

const val = ref(pagination.currentPage)

const change = value => {
  val.value = Number(value)
  pagination.currentPage = Number(value)
  pagination.emit('changePage', Number(value))
}
</script>

<template>
  <div class="fr-pagination__jumper">
    <span>{{ jumperText || 'Go to' }}</span>
    <fr-input
      :model-value="val"
      size="large"
      type="number"
      @change="change"
    ></fr-input>
  </div>
</template>
