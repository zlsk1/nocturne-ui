<script lang="ts" setup>
import { computed, ref } from 'vue'
import { isPromise } from '@vue/shared'
import { switchEmits, switchProps } from './switch'
import { isBoolean, isString } from '@/utils'
import { useFormItemId } from '@/components/form'
import { useNamespace } from '@/composables'

defineOptions({
  name: 'NSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const ns = useNamespace('switch')

const labelId = useFormItemId()

const actived = ref(props.modelValue)

const newStyle = computed(() => {
  return {
    width: !isString(props.width) ? `${props.width}px` : props.width
  }
})

const handleChange = () => {
  actived.value = !actived.value
  const val = actived.value ? props.activeValue : props.inactiveValue

  emit('change', val as boolean | string | number)
  emit('update:modelValue', val as boolean | string | number)
}

const handleSwitch = () => {
  if (props.disabled) return
  if (!props.beforeChange) {
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
    beforeChange
      .then((res) => {
        if (res) {
          handleChange()
        }
      })
      .catch((err) => {
        console.error(err)
      })
  } else if (beforeChange) {
    handleChange()
  }
}

defineExpose({
  actived
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.m(size),
      ns.is('checked', !!actived),
      ns.is('disabled', disabled)
    ]"
    :style="newStyle"
    @click.prevent="handleSwitch"
  >
    <input
      :id="labelId"
      type="checkbox"
      :disabled="disabled"
      :class="ns.e('input')"
      :value="modelValue"
      @change="handleChange"
    />
    <span
      v-if="inactiveText && !inlineText"
      :class="[ns.e('label'), ns.e('label--left'), ns.is('active', !actived)]"
    >
      <span>{{ inactiveText }}</span>
    </span>
    <div :class="ns.e('wrap')">
      <div :class="ns.e('action')">
        <template v-if="actived">
          <slot name="active-action-icon" />
        </template>
        <template v-else>
          <slot name="inactive-action-icon" />
        </template>
      </div>
      <div
        v-if="activeText || $slots.activeIcon || $slots.inactiveIcon"
        :class="ns.em('action', 'reverse')"
      >
        <template v-if="actived">
          <slot name="active-icon" />
        </template>
        <template v-else>
          <slot name="inactive-icon" />
        </template>
        <span
          v-if="activeText && inlineText && actived"
          :class="ns.em('action', 'text')"
          >{{ activeText }}</span
        >
        <span v-if="activeText && inlineText && !actived">{{
          inactiveText
        }}</span>
      </div>
    </div>
    <span
      v-if="activeText && !inlineText"
      :class="[ns.e('label'), ns.e('label--right'), ns.is('active', !!actived)]"
    >
      <span>{{ activeText }}</span>
    </span>
  </div>
</template>
