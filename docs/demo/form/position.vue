<template>
  <div class="mb-4">
    <n-radio-group v-model="currentPos">
      <n-radio-button
        v-for="pos in positions"
        :key="pos"
        :value="pos"
        :label="pos"
      />
    </n-radio-group>
  </div>
  <n-form
    :model="formData"
    :label-position="currentPos"
    style="max-width: 400px"
  >
    <n-form-item label="Name">
      <n-input />
    </n-form-item>
    <n-form-item label="Gender">
      <n-segmented
        v-model="formData.gender"
        :options="[
          {
            label: 'male',
            value: 0
          },
          {
            label: 'female',
            value: 1
          }
        ]"
      />
    </n-form-item>
    <n-form-item label="Address">
      <n-input />
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

type FormData = {
  name: string
  gender: number
  address: string
}

const currentPos = ref('left')
const positions = ref(['left', 'right', 'top'])

const formData = reactive<FormData>({
  name: 'Jack',
  gender: 0,
  address: 'Shanghai'
})
</script>
