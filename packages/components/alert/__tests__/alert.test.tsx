import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import Alert from '../src/alert.vue'

const VARIABLE = 'breaking bad'

describe('Alert', () => {
  test('render', () => {
    const wrapper = mount(() => <Alert title={VARIABLE} showIcon />)
    expect(wrapper.find('.n-alert__title').text()).toEqual(VARIABLE)
    expect(wrapper.find('.n-alert').classes()).toContain('n-alert--info')
  })

  test('type', () => {
    const wrapper = mount(() => (
      <Alert title={'success'} showIcon type={'success'} />
    ))
    expect(wrapper.find('.n-alert').classes()).toContain('n-alert--success')
    expect(wrapper.findComponent(CheckCircleFilled).exists()).toBe(true)
  })

  test('effect', () => {
    const wrapper = mount(() => (
      <Alert title={'dark'} showIcon effect={'dark'} />
    ))
    expect(wrapper.find('.n-alert').classes()).toContain('is-dark')
  })

  test('description', () => {
    const wrapper = mount(() => (
      <Alert title={'dark'} showIcon description={VARIABLE} />
    ))
    expect(wrapper.find('.n-alert__description').text()).toEqual(VARIABLE)
  })

  test('close', async () => {
    const wrapper = mount(() => (
      <Alert title={'dark'} showIcon closeText="close it" />
    ))
    const closeBtn = wrapper.find('.n-alert__close')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('slot title', () => {
    const wrapper = mount(() => <Alert v-slots={{ title: () => VARIABLE }} />)
    expect(wrapper.find('.n-alert__title').text()).toEqual(VARIABLE)
  })
})
