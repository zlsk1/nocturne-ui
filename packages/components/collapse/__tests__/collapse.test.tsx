import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import Collapse from '../src/collapse.vue'
import CollapseItem from '../src/collapse-item.vue'

describe('Collapse', () => {
  test('render', () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem title="a"></CollapseItem>
      </Collapse>
    ))
    expect(wrapper.find('.n-collapse').exists()).toBeTruthy()
    expect(wrapper.text()).toBe('a')
    expect(wrapper.findAllComponents(CollapseItem)).length(1)
  })

  test('show content', async () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem title="a">aaa</CollapseItem>
      </Collapse>
    ))
    expect(
      wrapper.find('.n-collapse-item__wrap').attributes('style')
    ).toContain('display: none')
    await wrapper.find('.n-collapse-item__title').trigger('click')
    await nextTick()
    expect(wrapper.find('.n-collapse-item__wrap').attributes('style')).toBe('')
  })

  test('accordion', async () => {
    const wrapper = mount(() => (
      <Collapse accordion>
        <CollapseItem title="a" name="a">
          aaa
        </CollapseItem>
        <CollapseItem title="b" name="b">
          bbb
        </CollapseItem>
      </Collapse>
    ))
    const items = wrapper.findAll('.n-collapse-item__title')
    const itemWraps = wrapper.findAll('.n-collapse-item__wrap')

    await items[0].trigger('click')
    await nextTick()
    expect(itemWraps[0].attributes('style')).toBe('')

    await items[1].trigger('click')
    await nextTick()
    expect(itemWraps[1].attributes('style')).toContain('')
    expect(itemWraps[0].attributes('style')).toBe('display: none;')
  })

  test('disabled', () => {
    const wrapper = mount(() => (
      <Collapse>
        <CollapseItem disabled title="a" name="a">
          aaa
        </CollapseItem>
      </Collapse>
    ))
    expect(wrapper.find('.n-collapse-item').classes()).toContain('is-disabled')
  })

  test('model', async () => {
    const expand = ref(['a'])
    const wrapper = mount(() => (
      <Collapse v-model={expand.value}>
        <CollapseItem title="a" name="a"></CollapseItem>
        <CollapseItem title="b" name="b"></CollapseItem>
      </Collapse>
    ))
    await wrapper.findAll('.n-collapse-item__title')[1].trigger('click')
    await nextTick()
    expect(expand.value).toEqual(['a', 'b'])
  })

  describe('change event', () => {
    test('have no name', async () => {
      const data = ref()
      const wrapper = mount(() => (
        <Collapse onChange={(val) => (data.value = val)}>
          <CollapseItem title="a"></CollapseItem>
        </Collapse>
      ))
      const items = wrapper.find('.n-collapse-item__title')
      await items.trigger('click')
      expect(data.value).toBe(undefined)
    })

    test('have name', async () => {
      const data = ref()
      const wrapper = mount(() => (
        <Collapse onChange={(val) => (data.value = val)}>
          <CollapseItem title="a" name="1"></CollapseItem>
        </Collapse>
      ))
      const items = wrapper.find('.n-collapse-item__title')
      await items.trigger('click')
      expect(data.value).toBe('1')
    })
  })
})
