<template>
  <div style="width: 340px">
    <n-input v-model="val1">
      <template #append>
        <n-button
          :loading="loading"
          :icon="RiSearchLine"
          type="primary"
          @click="onSearch"
        />
      </template>
    </n-input>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RiSearchLine } from '@remixicon/vue'

const val1 = ref('my site')
const loading = ref(false)

const onSearch = () => {
  loading.value = true

  setTimeout(() => {
    if (loading.value) {
      loading.value = false
    }
  }, 2000)
}
</script>
