import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Divider from '../src/divider'

describe('Divider', () => {
  test('render', () => {
    const wrapper = mount(Divider)
    expect(wrapper.find('.n-divider').exists()).toBe(true)
  })
})
