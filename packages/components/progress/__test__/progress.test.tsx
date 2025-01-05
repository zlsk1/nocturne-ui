import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Progress from '../src/progress.vue'

describe('Progress', () => {
  test('render', () => {
    const wrapper = mount(() => <Progress></Progress>)
    expect(wrapper.find('.n-progress').exists()).toBe(true)
  })
  test('percent', () => {
    const wrapper = mount(() => <Progress percentage={50}></Progress>)
    expect(wrapper.find('.n-progress__bar').attributes('style')).toContain(
      'width: 50%'
    )
  })
  describe('type', () => {
    test('circle', () => {
      const wrapper = mount(() => <Progress type="circle"></Progress>)
      expect(wrapper.find('.n-progress').classes()).toContain('is-circle')
      expect(wrapper.find('.n-progress--circle').exists()).toBe(true)
    })
  })
  test('color', () => {
    const wrapper = mount(() => <Progress color="red"></Progress>)
    expect(wrapper.find('.n-progress__bar').attributes('style')).toContain(
      'background-color: red'
    )
  })
})
