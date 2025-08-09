import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { HddFilled } from '@ant-design/icons-vue'
import LoadingDirective from '../src/directive'
import type { VNode } from 'vue'

describe('loading-directive', () => {
  const _mount = (template: () => VNode) =>
    mount(template, {
      global: {
        directives: {
          loading: LoadingDirective
        }
      }
    })

  test('render', () => {
    const wrapper = _mount(() => <div v-loading={true}></div>)
    expect(wrapper.find('.n-loading').exists()).toBe(true)
  })
  test('close', async () => {
    const loading = ref(true)
    const wrapper = _mount(() => <div v-loading={loading.value}></div>)
    expect(wrapper.find('.n-loading').exists()).toBe(true)
    await nextTick()
    loading.value = false
    await nextTick()
    expect(wrapper.find('.n-loading').exists()).toBe(false)
  })
  test('text', () => {
    const wrapper = _mount(() => <div v-loading={{ text: 'halo' }}></div>)
    expect(wrapper.find('.n-loading__content').text()).toBe('halo')
  })
  test('maskBg', () => {
    const wrapper = _mount(() => (
      <div v-loading={{ maskBg: 'rgb(51, 51, 51)' }}></div>
    ))

    expect(wrapper.find('.n-loading').attributes('style')).toContain(
      'background-color: rgb(51, 51, 51)'
    )
  })
  test('locked', () => {
    _mount(() => <div v-loading={{ locked: true }}></div>)
    expect(document.body.style.overflow === 'hidden').toBe(true)
  })
  test('icon', () => {
    const wrapper = _mount(() => (
      <div v-loading={{ icon: <HddFilled /> }}></div>
    ))
    expect(wrapper.find('.n-loading__icon').exists()).toBe(false)
  })
})
