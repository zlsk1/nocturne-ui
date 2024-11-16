import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Badge from '../src/badge.vue'

describe('Badge', () => {
  test('render', () => {
    const wrapper = mount(() => <Badge value={10} />)
    expect(wrapper.find('.n-badge').exists()).toBe(true)
    expect(wrapper.find('.n-badge__content').text()).toBe('10')
  })

  test('type', () => {
    const wrapper = mount(() => <Badge value={10} type={'warning'} />)
    expect(
      wrapper.find('.n-badge__content.n-badge__content--warning').exists()
    ).toBe(true)
  })

  test('is dot', () => {
    const wrapper = mount(() => <Badge value={10} dot />)
    expect(wrapper.find('.n-badge__content.is-dot').exists()).toBe(true)
    expect(wrapper.find('.n-badge__content.is-dot').text()).not.toBe(10)
  })

  test('max', () => {
    const maxVal = 100
    const wrapper = mount(() => <Badge value={111} max={maxVal} />)
    expect(wrapper.find('.n-badge__content').text()).toBe(`${maxVal}+`)
  })

  test('hidden', () => {
    const wrapper = mount(() => <Badge value={111} hidden />)
    expect(wrapper.find('.n-badge__content').exists()).toBe(false)
  })
})
