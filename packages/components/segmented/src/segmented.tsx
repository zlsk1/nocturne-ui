import { computed, defineComponent, h, reactive, ref, watch } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import NIcon from '@/components/icon'
import { isUndefined } from '@/utils'
import { useId, useNamespace } from '@/composables'
import { segmentedEmits, segmentedProps } from './type'
import type { Component } from 'vue'
import type { SegmentedOption } from './type'

export default defineComponent({
  name: 'NSegmented',
  components: { NIcon },
  props: segmentedProps,
  emit: segmentedEmits,
  setup(props, ctx) {
    const ns = useNamespace('segmented')
    const defaultId = useId()

    const segmentedRef = ref<HTMLElement | null>(null)
    const state = reactive({
      width: 0,
      height: 0,
      translate: 0
    })
    const isFocus = ref(false)
    const isKeyboard = ref(false)

    const selectedBoxStyle = computed(() => {
      if (props.vertical) {
        return {
          height: `${state.height}px`,
          transform: `translateY(${state.translate}px)`
        }
      }
      return {
        width: `${state.width}px`,
        tranform: `translateX(${state.translate}px)`
      }
    })

    const id = computed(() => {
      return defaultId.value || props.id
    })

    const emitEvent = (value: string | number) => {
      ctx.emit('update:modelValue', value)
      ctx.emit('change', value)
    }

    const onChange = (e: Event, disabled: boolean | undefined) => {
      if (disabled || props.disabled) return
      emitEvent((e.target as HTMLInputElement).value)
    }

    const getOffset = (offset: number) => {
      const abledOptions = props.options!.filter((option) => !option.disabled)
      const currentIndex = abledOptions.findIndex(
        (option) => option.value === props.modelValue
      )
      const total = abledOptions!.length
      const nextIndex = (currentIndex + offset + total) % total
      const nextOption = abledOptions![nextIndex]

      if (nextOption) {
        emitEvent(nextOption.value)
      }
    }

    const onKeydown = (e: KeyboardEvent) => {
      e.stopPropagation()
      const { options } = props
      if (!options || options.length === 0) return

      switch (e.code) {
        case 'ArrowLeft':
        case 'ArrowUp':
          getOffset(-1)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          getOffset(1)
          break
      }
    }

    const onKeyup = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        isKeyboard.value = true
      }
    }

    const onFocus = () => {
      isFocus.value = true
    }

    const onBlur = () => {
      isFocus.value = false
    }

    const onMousedown = () => {
      isKeyboard.value = false
    }

    const updateSelceted = () => {
      if (!segmentedRef.value) return
      const selectedEl = document.querySelector('.is-selected') as HTMLElement
      const selectedInputEl = document.querySelector(
        '.is-selected input'
      ) as HTMLElement
      if (!selectedEl || !selectedInputEl) {
        state.width = 0
        state.translate = 0
      }
      const rect = selectedEl.getBoundingClientRect()
      if (props.vertical) {
        state.height = rect.height
        state.translate = selectedEl.offsetTop
        return
      }
      state.width = rect.width
      state.translate = selectedEl.offsetLeft
    }

    useResizeObserver(segmentedRef, updateSelceted)

    watch(() => props.modelValue, updateSelceted, {
      flush: 'post'
    })

    const getLabel = ({
      value,
      disabled,
      label,
      icon,
      checked,
      isFocusVisible
    }: SegmentedOption & { checked: boolean; isFocusVisible: boolean }) => {
      return (
        <label
          class={[
            ns.e('item'),
            ns.is('selected', checked),
            ns.is('disabled', disabled),
            ns.is('focus-visible', isFocusVisible)
          ]}
          key={label}
          title={props.block ? label : undefined}
        >
          <input
            class={ns.e('input')}
            value={value}
            type="radio"
            disabled={disabled}
            checked={checked}
            id={id.value}
            onChange={(e) => onChange(e, disabled)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {ctx.slots.default ? (
            <div class={ns.e('item-label')}>
              {{
                default: () =>
                  ctx.slots.default?.({ value, disabled, label, icon })
              }}
            </div>
          ) : (
            <div class={ns.e('item-label')} aria-checked={checked}>
              {!isUndefined(icon) ? (
                <NIcon size={18}>
                  {{
                    default: () => h(icon as Component)
                  }}
                </NIcon>
              ) : null}
              {label ? <div>{label}</div> : null}
            </div>
          )}
        </label>
      )
    }

    return () => (
      <div
        ref={segmentedRef}
        class={[
          ns.b(),
          ns.m(props.size),
          ns.is('vertical', props.vertical),
          ns.is('disabled', props.disabled),
          ns.is('block', props.block)
        ]}
        role="radiogroup"
        tabindex={props.disabled ? undefined : 0}
        aria-label={props.ariaLabel}
        onKeydown={(e: KeyboardEvent) => onKeydown(e)}
        onKeyup={(e: KeyboardEvent) => onKeyup(e)}
        onMousedown={onMousedown}
      >
        <div class={ns.e('group')}>
          <div
            class={ns.e('selected__box')}
            style={selectedBoxStyle.value}
          ></div>
          {props.options?.map((option) => {
            return getLabel({
              ...option,
              disabled: props.disabled || option.disabled,
              checked: props.modelValue === option.value,
              isFocusVisible:
                isFocus.value &&
                isKeyboard.value &&
                props.modelValue === option.value
            })
          })}
        </div>
      </div>
    )
  }
})
