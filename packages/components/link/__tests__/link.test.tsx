import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { RiEditLine } from '@remixicon/vue'
import Link from '../src/link.vue'

describe('Link', () => {
  test('render', () => {
    const wrapper = mount(() => <Link>1</Link>)
    expect(wrapper.find('.n-link').exists()).toBe(true)
    expect(wrapper.find('.n-link').text()).toEqual('1')
  })

  test('type', () => {
    const wrapper = mount(() => <Link type="info">1</Link>)
    expect(wrapper.find('.n-link--info').exists()).toBe(true)
  })

  test('disabled', () => {
    const wrapper = mount(() => <Link disabled></Link>)
    expect(wrapper.find('.is-disabled').exists()).toBe(true)
  })

  describe('underline', () => {
    test('should show underline', () => {
      const wrapper = mount(() => <Link underline></Link>)
      expect(wrapper.find('.is-underline').exists()).toBe(true)
    })

    test('should not show underline while disabled', () => {
      const wrapper = mount(() => <Link underline disabled></Link>)
      expect(wrapper.find('.is-underline').exists()).toBe(false)
    })
  })

  test('icon', () => {
    const wrapper = mount(() => <Link icon={RiEditLine}></Link>)
    expect(wrapper.findComponent(RiEditLine).exists()).toBe(true)
  })
})
