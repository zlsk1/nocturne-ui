<template>
  <div flex>
    <div>
      <n-button-group>
        <n-button type="primary" :icon="Previous">上一首</n-button>
        <n-button type="primary">
          下一首
          <Next size="14" ml="2"></Next>
        </n-button>
      </n-button-group>
    </div>
    <div ml="10">
      <n-button-group>
        <n-button type="primary" :icon="Home"></n-button>
        <n-button type="primary" :icon="Upload"></n-button>
        <n-button type="primary" :icon="Edit"></n-button>
      </n-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  RiArrowRightDoubleLine as Next,
  RiArrowLeftDoubleLine as Previous,
  RiHome4Line as Home,
  RiUploadLine as Upload,
  RiEditLine as Edit,
} from '@remixicon/vue'
</script>