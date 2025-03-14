<template>
  <transition
    :name="transition"
    @enter="$emit('open')"
    @after-enter="$emit('opened')"
    @leave="onLeave"
    @after-leave="$emit('closed')"
  >
    <n-overlay
      v-show="modelValue"
      :custom-class="maskerClass"
      :masker="masker"
      custom-event
      :z-index="zIndex"
    >
      <div
        :class="[`${ns.ns.value}-overlay-dialog`, ns.is('center', center)]"
        @click="overlayEvent.onClick"
        @mousedown="overlayEvent.onMousedown"
        @mouseup="overlayEvent.onMouseup"
      >
        <div
          v-if="shouldRender"
          :style="dialogStyle"
          :class="dialogCls"
          tabindex="-1"
        >
          <div :class="ns.e('header')">
            <slot name="header" />
            <div :class="ns.e('title')">{{ title }}</div>
            <button
              v-if="showClose"
              :class="ns.e('close')"
              aria-label="close"
              @click="$emit('update:modelValue', false)"
            >
              <Close size="18" />
            </button>
            <component
              :is="closeIcon"
              v-else-if="closeIcon"
              :class="ns.e('close')"
              @click="$emit('update:modelValue', false)"
            />
          </div>
          <div :class="ns.e('content')">
            <slot>
              {{ content }}
            </slot>
          </div>
          <slot name="footer">
            <div :class="ns.e('footer')">
              <n-button v-if="showCancel" @click="(e) => handleCancel(e)">
                {{ cancelText || t('noc.dialog.cancel') }}
              </n-button>
              <n-button
                v-if="showConfirm"
                type="primary"
                :loading="confirmLoading"
                @click="(e) => $emit('confirm', e)"
              >
                {{ confirmText || t('noc.dialog.confirm') }}
              </n-button>
            </div>
          </slot>
        </div>
      </div>
    </n-overlay>
  </transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RiCloseLine as Close } from '@remixicon/vue'
import {
  useLocale,
  useNamespace,
  useSameTarget
} from '@nocturne-ui/composables'
import NButton from '@nocturne-ui/components/button'
import NOverlay from '@nocturne-ui/components/overlay'
import { isString } from '@nocturne-ui/utils'
import { dialogEmits, dialogProps } from './dialog'
import { useDialog } from './use-dialog'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'NDialog'
})

const props = defineProps(dialogProps)
defineEmits(dialogEmits)

const { t } = useLocale()
const ns = useNamespace('dialog')

const { shouldRender, zIndex, onLeave, clickMaskerToClose, handleCancel } =
  useDialog(props)

const dialogCls = computed(() => [ns.b(), props.customClass])

const dialogTop = computed(() =>
  isString(props.offsetTop) ? props.offsetTop : `${props.offsetTop}vh`
)

const dialogStyle = computed<CSSProperties>(() => {
  return {
    width: isString(props.width) ? props.width : `${props.width}%`,
    top: props.center ? 0 : `${dialogTop.value}`
  }
})

const transition = computed(
  () => props.transition || `${ns.ns.value}-dialog-zoom-in`
)

const overlayEvent = useSameTarget(clickMaskerToClose)
</script>
