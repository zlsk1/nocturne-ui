import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InputNumber from '../src/input-number.vue'

describe('InputNumber', () => {
  test('render', () => {
    const value = ref(1)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value}></InputNumber>
    ))
    expect(wrapper.find('.n-input-number').exists()).toBe(true)
    expect(wrapper.find('input').element.value).toBe('1')
  })

  test('disabled', async () => {
    const value = ref(1)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value} disabled></InputNumber>
    ))
    const buttonWrapper = wrapper.find('.n-input-number__decrease')
    expect(buttonWrapper.classes()).toContain('is-disabled')
    await buttonWrapper.trigger('click')
    expect(wrapper.find('input').element.value).toBe('1')
  })

  test('control', () => {
    const wrapper = mount(() => <InputNumber controls={false}></InputNumber>)
    expect(wrapper.find('.n-input-number__decrease').exists()).toBe(false)
    expect(wrapper.find('.n-input-number__increase').exists()).toBe(false)
  })

  test('decrease/increase step', async () => {
    const value = ref(0)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value} step={5}></InputNumber>
    ))
    await wrapper.find('.n-input-number__decrease').trigger('click')
    expect(value.value).toEqual(-5)
    await wrapper.find('.n-input-number__increase').trigger('click')
    expect(value.value).toEqual(0)
  })

  test('precision', async () => {
    const value = ref(0)
    const wrapper = mount(() => (
      <InputNumber
        v-model={value.value}
        precision={2}
        step={1.23}
      ></InputNumber>
    ))
    expect(wrapper.find('input').element.value).toBe('0.00')
    await wrapper.find('.n-input-number__decrease').trigger('click')
    expect(value.value).toEqual(-1.23)
  })
})
