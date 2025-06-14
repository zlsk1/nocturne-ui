<template>
  <n-select
    v-model="val"
    style="max-width: 320px"
    show-search
    clear-value
    @search="onSearch"
  >
    <template #empty>
      <span v-if="!fetching">暂无结果</span>
      <n-spin v-else loading />
    </template>
    <n-option
      v-for="item in list"
      :key="`${item.login.uuid}-${item.login.md5}`"
      :value="item.name.first"
      :label="item.name.first"
    >
      <div class="flex items-center gap-4">
        <img
          :src="item.picture.thumbnail"
          loading="lazy"
          alt=""
          class="w-8 h-8 rounded-full"
        />
        <span>
          {{ item.name.first }}
        </span>
      </div>
    </n-option>
  </n-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref()
const list = ref<any[]>([])
const fetching = ref(false)

const fetchData = () => {
  return new Promise<any>((resolve) => {
    fetching.value = true
    fetch('https://randomuser.me/api?results=200').then(async (res) => {
      const result = await res.json()
      fetching.value = false
      resolve(result.results)
    })
  })
}

const onSearch = async () => {
  list.value = await fetchData()
}
</script>
