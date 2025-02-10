<template>
  <n-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-position="right"
    required-mark
    style="max-width: 400px"
  >
    <n-form-item label="Username" prop="username">
      <n-input v-model="formData.username" />
    </n-form-item>
    <n-form-item label="Password" prop="passward">
      <n-input v-model="formData.passward" type="password" />
    </n-form-item>
    <n-form-item>
      <n-checkbox v-model="formData.remember" label="Remeber me" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Submit</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormItemRule } from 'nocturne-ui'
import type { Arrayable } from 'nocturne-ui/es/utils'

type FormData = {
  username: string
  passward: string
  remember: boolean
}

const formRef = ref<FormInstance | null>(null)

const formData = reactive<FormData>({
  username: '',
  passward: '',
  remember: true
})
const formRules = reactive<Record<string, Arrayable<FormItemRule>>>({
  username: [
    {
      required: true,
      message: 'Please input your username!',
      trigger: 'blur'
    }
  ],
  passward: [
    {
      required: true,
      message: 'Please input your password!',
      trigger: 'blur'
    }
  ]
})

const handleSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!!')
    }
  })
}
</script>
