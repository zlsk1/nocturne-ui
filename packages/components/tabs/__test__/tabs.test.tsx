import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Tabs from '../src/tabs'
import TabPane from '../src/tab-pane-list/tab-pane.vue'
import TabNav from '../src/tab-nav-list/tab-node.vue'

describe('Tabs', () => {
  it('should render tabs correctly', async () => {
    const curTabs = ref(1)
    const wrapper = mount(() => (
      <Tabs
        v-model={curTabs.value}
        v-slots={{
          default: () => {
            return (
              <>
                <TabPane label="tab1" value={1}>
                  tab1
                </TabPane>
                <TabPane label="tab2" value={2}>
                  tab2
                </TabPane>
                <TabPane label="tab3" value={3}>
                  tab3
                </TabPane>
              </>
            )
          }
        }}
      ></Tabs>
    ))
    const panes = wrapper.findAllComponents(TabPane)
    const navs = wrapper.findAllComponents(TabNav)

    expect(wrapper.find('.n-tabs').exists()).toBe(true)
    expect(panes).toHaveLength(3)
    expect(navs).toHaveLength(3)
    expect(navs[0].classes()).toContain('is-active')
    expect(navs[0].attributes('aria-selected')).toBe('true')
    expect(panes[0].attributes('aria-hidden')).toBe('false')

    await navs[1].trigger('click')
    expect(navs[0].classes()).not.toContain('is-active')
    expect(navs[0].attributes('aria-selected')).toBe('false')
    expect(panes[0].attributes('aria-hidden')).toBe('true')
    expect(navs[1].classes()).toContain('is-active')
    expect(navs[1].attributes('aria-selected')).toBe('true')
    expect(panes[1].attributes('aria-hidden')).toBe('false')
  })

  it('should render tabs with correct type', () => {
    const wrapper = mount(() => (
      <Tabs
        type="card"
        modelValue={1}
        v-slots={{
          default: () => (
            <>
              <TabPane label="tab1" value={1}>
                tab1
              </TabPane>
            </>
          )
        }}
      ></Tabs>
    ))
    expect(wrapper.find('.n-tabs--card').exists()).toBe(true)
  })
})
