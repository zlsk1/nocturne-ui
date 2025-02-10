<template>
  <n-form ref="formRef" :model="formState" :rules="formRules" required-mark>
    <n-form-item label="Activity name" prop="name">
      <n-input v-model="formState.name" />
    </n-form-item>
    <n-form-item label="Activity zone" prop="zone">
      <n-select v-model="formState.zone">
        <n-option
          v-for="zone in zones"
          :key="zone.label"
          :label="zone.label"
          :value="zone.value"
        />
      </n-select>
    </n-form-item>
    <n-form-item label="Instant delivery" prop="delivery">
      <n-switch v-model="formState.delivery" />
    </n-form-item>
    <n-form-item label="Activity type" prop="type">
      <n-checkbox-group v-model="formState.type">
        <n-checkbox
          v-for="type in types"
          :key="type.label"
          :value="type.value"
          :label="type.label"
        />
      </n-checkbox-group>
    </n-form-item>
    <n-form-item label="Resources" prop="resources">
      <n-radio-group v-model="formState.resource">
        <n-radio
          v-for="resource in resources"
          :key="resource.label"
          :value="resource.value"
          :label="resource.label"
        />
      </n-radio-group>
    </n-form-item>
    <n-form-item label="Activity form" prop="form">
      <n-input v-model="formState.form" type="textarea" />
    </n-form-item>
    <n-form-item>
      <n-button type="primary" @click="handleSubmit">Create</n-button>
      <n-button @click="handleReset">Reset</n-button>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { Arrayable } from 'nocturne-ui/es/utils'
import type { FormInstance, FormItemRule } from 'nocturne-ui'

interface FormState {
  name: string
  zone: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  form: string
}

const formRef = ref<FormInstance | null>(null)

const formState = reactive<FormState>({
  name: '',
  zone: undefined,
  delivery: false,
  type: [],
  resource: '',
  form: ''
})

const formRules = reactive<Record<string, Arrayable<FormItemRule>>>({
  name: [
    {
      required: true,
      message: 'Please input activity name',
      trigger: 'change'
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
  ],
  zone: [
    {
      required: true,
      message: 'Please select activity zone',
      trigger: 'change'
    }
  ],
  delivery: [
    {
      type: 'boolean',
      required: true,
      message: 'Please select delivery',
      trigger: 'change'
    }
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select type',
      trigger: 'change'
    }
  ],
  resources: [
    {
      required: true,
      message: 'Please select resources',
      trigger: 'change'
    }
  ],
  form: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur'
    }
  ]
})

const zones = [
  {
    label: 'Zone 1',
    value: '1'
  },
  {
    label: 'Zone 2',
    value: '2'
  }
]

const types = [
  {
    label: 'Online',
    value: 1
  },
  {
    label: 'Promotion',
    value: 2
  },
  {
    label: 'Offline',
    value: 3
  }
]

const resources = [
  {
    label: 'Sponsor',
    value: 1
  },
  {
    label: 'Venue',
    value: 2
  }
]

const handleSubmit = () => {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      console.log(valid)
    } else {
      console.log(valid, fields)
    }
  })
}

const handleReset = () => {
  formRef.value?.resetField()
}
</script>
