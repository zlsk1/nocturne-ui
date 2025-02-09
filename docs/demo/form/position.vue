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
    <n-form-item label="Username">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Password">
      <n-input v-model="formData.passward" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const currentPos = ref('left')
const positions = ref(['left', 'right', 'top'])

const formData = reactive({
  username: '',
  passward: ''
})
</script>
