import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Select from '../src/select.vue'
import Option from '../src/option.vue'
import type { OptionProxy } from '../src/constants'
import type { VueWrapper } from '@vue/test-utils'
import type { SelectInstance } from '../src/select'

describe('Select', () => {
  let wrapper: VueWrapper
  const _mount = (options: OptionProxy[]) =>
    mount(() => {
      return (
        <Select>
          {{
            default: () =>
              options.map((option) => {
                return (
                  <Option label={option.label} value={option.value}></Option>
                )
              })
          }}
        </Select>
      )
    })

  beforeEach(() => {
    wrapper = _mount([
      {
        label: '1',
        value: 1
      },
      {
        label: '2',
        value: 2
      }
    ])
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('render', () => {
    expect(wrapper.find('.n-select').exists()).toBe(true)
  })

  describe('event', () => {
    test('focus', async () => {
      const mockFocus = vi.fn()
      const wrapper = mount(() => <Select onFocus={mockFocus}></Select>)
      await wrapper.trigger('click')
      expect(mockFocus).toHaveBeenCalledTimes(1)
    })
    test('blur', async () => {
      const mockBlur = vi.fn()
      const selectRef = ref<SelectInstance>()
      const wrapper = mount(() => (
        <Select ref="selectRef" onBlur={mockBlur}></Select>
      ))
      await wrapper.trigger('click')
      selectRef.value?.blur()
      await nextTick()
      expect(mockBlur).toHaveBeenCalledTimes(1)
    })
    test('select', async () => {
      const mockFn = vi.fn()
      const modelValue = ref<any>(1)
      const options = [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        }
      ]
      const wrapper = mount(() => {
        return (
          <Select v-model={modelValue} onSelect={mockFn}>
            {{
              default: () =>
                options.map((option) => {
                  return (
                    <Option label={option.label} value={option.value}></Option>
                  )
                })
            }}
          </Select>
        )
      })
      await wrapper.trigger('click')
      await wrapper.find('.n-select-option__item').trigger('click')
      expect(modelValue.value).toBe(2)
      expect(mockFn).toHaveBeenCalled()
    })
  })
})
