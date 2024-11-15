<template>
  <div flex>
    <div>
      <n-button-group>
        <n-button type="primary" :icon="Previous">上一首</n-button>
        <n-button type="primary">
          下一首
          <Next size="14" ml="2" />
        </n-button>
      </n-button-group>
    </div>
    <div ml="10">
      <n-button-group>
        <n-button type="primary" :icon="Home" />
        <n-button type="primary" :icon="Upload" />
        <n-button type="primary" :icon="Edit" />
      </n-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  RiEditLine as Edit,
  RiHome4Line as Home,
  RiArrowRightDoubleLine as Next,
  RiArrowLeftDoubleLine as Previous,
  RiUploadLine as Upload
} from '@remixicon/vue'
</script>
