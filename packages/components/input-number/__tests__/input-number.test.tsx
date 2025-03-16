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
    const decreaseWrapper = wrapper.find('.n-input-number__control--decrease')
    expect(wrapper.classes()).toContain('is-disabled')
    await decreaseWrapper.trigger('click')
    expect(value.value).toBe(1)
  })

  test('controls', () => {
    const wrapper = mount(() => <InputNumber controls={false}></InputNumber>)
    expect(wrapper.find('.n-input-number__control--decrease').exists()).toBe(
      false
    )
    expect(wrapper.find('.n-input-number__control--increase').exists()).toBe(
      false
    )
  })

  test('min', async () => {
    const value = ref(1)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value} min={1}></InputNumber>
    ))

    await wrapper.find('.n-input-number__control--decrease').trigger('click')

    expect(value.value).toEqual(1)
  })

  test('max', async () => {
    const value = ref(1)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value} max={1}></InputNumber>
    ))

    await wrapper.find('.n-input-number__control--increase').trigger('click')

    expect(value.value).toEqual(1)
  })

  test('controls mode', () => {
    const wrapper = mount(() => (
      <InputNumber controlsMode="outter"></InputNumber>
    ))

    expect(wrapper.find('.n-input-number--outter').exists()).toBe(true)
  })

  test('decrease/increase step', async () => {
    const value = ref(0)
    const wrapper = mount(() => (
      <InputNumber v-model={value.value} step={5}></InputNumber>
    ))
    await wrapper.find('.n-input-number__control--decrease').trigger('click')
    expect(value.value).toEqual(-5)
    await wrapper.find('.n-input-number__control--increase').trigger('click')
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
    await wrapper.find('.n-input-number__control--decrease').trigger('click')
    expect(value.value).toEqual(-1.23)
  })
})
