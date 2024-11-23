import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Radio from '../src/radio.vue'
import RadioGroup from '../src/radio-group.vue'

describe('Radio', () => {
  test('render', () => {
    const wrapper = mount(() => <Radio>1</Radio>)
    expect(wrapper.find('.n-radio').exists()).toBe(true)
    expect(wrapper.find('.n-radio').text()).toBe('1')
  })

  test('disabled', async () => {
    const wrapper = mount(() => <Radio disabled></Radio>)
    expect(wrapper.find('.n-radio').classes()).toContain('is-disabled')
    expect(wrapper.find('.n-radio__input').classes()).toContain('is-disabled')
  })

  test('size', async () => {
    const wrapper = mount(() => <Radio size="small"></Radio>)
    expect(wrapper.find('.n-radio--small').exists()).toBe(true)
  })

  test('should show content while use label', () => {
    const wrapper = mount(() => <Radio label="1"></Radio>)
    expect(wrapper.find('.n-radio').text()).toBe('1')
  })
})

describe('Radio Group', () => {
  test('render', () => {
    const wrapper = mount(() => (
      <RadioGroup>
        <Radio>1</Radio>
        <Radio>2</Radio>
      </RadioGroup>
    ))
    expect(wrapper.find('.n-radio-group').exists()).toBe(true)
  })

  test('group disabled', async () => {
    const wrapper = mount(() => (
      <RadioGroup disabled>
        <Radio>1</Radio>
        <Radio>2</Radio>
      </RadioGroup>
    ))
    expect(wrapper.find('.n-radio').classes()).toContain('is-disabled')
  })

  test('group size', async () => {
    const wrapper = mount(() => (
      <RadioGroup size="small">
        <Radio>1</Radio>
        <Radio>2</Radio>
      </RadioGroup>
    ))
    expect(wrapper.find('.n-radio').classes()).toContain('n-radio--small')
  })

  test('should show correctly radio', async () => {
    const value = ref('1')
    const wrapper = mount(() => (
      <RadioGroup v-model={value.value}>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
      </RadioGroup>
    ))
    await nextTick()
    expect(wrapper.find('.n-radio').classes()).toContain('is-checked')
  })

  test('change event', async () => {
    const value = ref()
    const wrapper = mount(() => (
      <RadioGroup v-model={value.value} onChange={(val) => (value.value = val)}>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
      </RadioGroup>
    ))
    await wrapper.trigger('click')
    expect((value.value = '1'))
  })
})
