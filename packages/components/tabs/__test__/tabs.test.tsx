import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tabs from '../src/tabs.vue'
import TabItem from '../src/tab-item.vue'

describe('Tabs', () => {
  it('should render tabs correctly', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [TabItem, TabItem, TabItem]
      }
    })
    const tabs = wrapper.findAllComponents(TabItem)
    expect(tabs).toHaveLength(3)
    expect(wrapper.find('.n-tabs').exists()).toBe(true)
  })
})
