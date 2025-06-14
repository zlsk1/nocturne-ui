<template>
  <div class="w-48">
    <n-auto-complete
      v-model="value"
      :options="options"
      @search="onSearch"
      @change="onChange"
      @select="onSelect"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { AutoCompleteOptionType } from 'nocturne-ui'

const value = ref('')
const options = ref<AutoCompleteOptionType[]>([])

const mockData = (str: string, repeat = 1) => str.repeat(repeat)

const onSearch = (query: string) => {
  console.log(query)
  options.value = []

  for (let i = 0; i < 3; i += 1) {
    const value = mockData(query, i + 1)
    options.value.push({
      label: value,
      value
    })
  }
}

const onChange = (value: string | number) => {
  console.log(value)
}

const onSelect = (value: string | number) => {
  console.log(value)
}
</script>
