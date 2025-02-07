import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tabs from '../src/tabs'
import TabPane from '../src/tab-pane-list/tab-pane.vue'

describe('Tabs', () => {
  it('should render tabs correctly', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [TabPane, TabPane, TabPane]
      }
    })
    const tabs = wrapper.findAllComponents(TabPane)
    expect(tabs).toHaveLength(3)
    expect(wrapper.find('.n-tabs').exists()).toBe(true)
  })
})
