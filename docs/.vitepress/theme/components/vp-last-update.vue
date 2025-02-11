<script lang="ts" setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useData } from 'vitepress'

const { theme, page, lang } = useData()

const date = computed(() => new Date(page.value.lastUpdated!))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isoDatetime = computed(() => date.value.toISOString())
const datetime = ref('')

// set time on mounted hook to avoid hydration mismatch due to
// potential differences in timezones of the server and clients
onMounted(() => {
  watchEffect(() => {
    datetime.value = new Intl.DateTimeFormat(
      theme.value.lastUpdated?.formatOptions?.forceLocale
        ? lang.value
        : undefined,
      theme.value.lastUpdated?.formatOptions ?? {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    ).format(date.value)
  })
})
</script>

<template>
  <div v-if="date" class="vp-last-update">
    上次更新时间：<span>{{ datetime }}</span>
  </div>
</template>

<style>
.vp-last-update {
  margin-top: 40px;
  padding: 20px 0;
  font-size: 13px;
  color: var(--theme-color);
}
</style>
