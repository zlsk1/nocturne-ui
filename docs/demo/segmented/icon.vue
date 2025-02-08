<template>
  <div class="w-[100%]">
    <n-segmented v-model="active" :options="options" @change="handleChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  RiLineFill,
  RiMessageFill,
  RiTelegramFill,
  RiWechatFill
} from '@remixicon/vue'
import type { SegmentedOption } from 'nocturne-ui'

const active = ref(1)
const options = ref<SegmentedOption[]>([
  { value: 1, label: 'line', icon: RiLineFill },
  { value: 2, label: 'message', icon: RiMessageFill },
  { value: 3, label: 'telegram', icon: RiTelegramFill },
  { value: 4, label: 'wechat', icon: RiWechatFill }
])

const handleChange = (val: string | number) => {
  console.log(val)
}
</script>
