<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { RiLoader2Fill as Loader } from '@remixicon/vue'
import { isBoolean, isNil, isPromise, isString } from '@/utils'
import { useForm, useFormItem } from '@/components/form'
import { useNamespace } from '@/composables'
import { switchEmits, switchProps } from './switch'

defineOptions({
  name: 'NSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const ns = useNamespace('switch')

const { formItemId, formItemDisabled, formItemSize } = useFormItem()
const { formItem } = useForm()

const actived = ref(props.modelValue)

const newStyle = computed(() => {
  return {
    width: !isString(props.width) ? `${props.width}px` : props.width
  }
})

const actualDisabled = computed(() => formItemDisabled.value || props.disabled)
const actualSize = computed(() => formItemSize.value || props.size)

const handleChange = () => {
  actived.value = !actived.value
  const val = actived.value ? props.activeValue : props.inactiveValue

  emit('change', val)
  emit('update:modelValue', val)
}

const handleSwitch = () => {
  if (props.loading || actualDisabled.value) return
  if (isNil(props.beforeChange)) {
    handleChange()
    return
  }

  const beforeChange = props.beforeChange()

  const showProcess = [
    isBoolean(beforeChange),
    isPromise(beforeChange)
  ].includes(true)

  if (!showProcess) {
    throw new Error('before-change must be a boolean or promise')
  } else if (isPromise(beforeChange)) {
    // manuallyLoading.value = true
    beforeChange
      .then((res) => {
        if (res) {
          // manuallyLoading.value = false
          handleChange()
        }
      })
      .catch((err) => {
        // manuallyLoading.value = false
        console.error(err)
      })
  } else if (beforeChange) {
    handleChange()
  }
}

watch(
  () => props.modelValue,
  () => {
    formItem?.validate('change')
  }
)

defineExpose({
  actived
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(actualSize),
      ns.is('checked', !!actived),
      ns.is('disabled', actualDisabled || loading)
    ]"
    :style="newStyle"
    @click.prevent="handleSwitch"
  >
    <input
      :id="formItemId"
      type="checkbox"
      :disabled="actualDisabled"
      :class="ns.e('input')"
      :value="modelValue"
      @change="handleChange"
    />
    <span
      v-if="inactiveText && !inlinePrompt"
      :class="[ns.e('label'), ns.e('label--left'), ns.is('active', !actived)]"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <div :class="ns.e('wrap')" :style="newStyle">
      <div :class="ns.e('action')">
        <Loader v-if="loading" :class="ns.e('loading')" />
        <slot v-if="actived" name="active-action-icon" />
        <slot v-else name="inactive-action-icon" />
      </div>
      <div :class="ns.em('action', 'reverse')">
        <slot v-if="actived" name="active-icon" />
        <slot v-else name="inactive-icon" />
        <span
          v-if="activeText && inlinePrompt && actived"
          :class="ns.em('action', 'text')"
          >{{ activeText }}</span
        >
        <span v-else-if="activeText && inlinePrompt && !actived">
          {{ inactiveText }}
        </span>
      </div>
    </div>
    <span
      v-if="activeText && !inlinePrompt"
      :class="[ns.e('label'), ns.e('label--right'), ns.is('active', !!actived)]"
    >
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>
