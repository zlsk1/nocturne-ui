import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import TooltipTrigger from '@nocturne-ui/components/tooltip/src/reference.vue'
import AutoComplete from '../src/auto-complete.vue'
import type { DOMWrapper, VueWrapper } from '@vue/test-utils'

const options = Array.from({ length: 3 })
  .fill(0)
  .map((_, index) => ({
    label: `option${index}`,
    value: `option${index}`
  }))

describe('AutoComplete', () => {
  test('render', () => {
    const wrapper = mount(() => <AutoComplete />)
    expect(wrapper.find('.n-auto-complete').exists()).toBeTruthy()
  })

  test('disabled', () => {
    const wrapper = mount(() => <AutoComplete disabled />)
    expect(wrapper.find('.n-auto-complete').classes()).toContain('is-disabled')
  })

  test('do not active-first-option', async () => {
    const wrapper = mount(() => (
      <AutoComplete options={options} defaultActiveFirstOption={false} />
    ))
    const items = wrapper.findAll('.n-auto-complete__content__item')
    expect(items[0].classes()).not.toContain('hovering')
  })

  test('filterOption', () => {})

  describe('event', () => {
    let wrapper: VueWrapper
    let items: DOMWrapper<Element>[]
    let trigger: VueWrapper
    const inputValue = ref()

    beforeEach(async () => {
      wrapper = mount(
        <AutoComplete v-model={inputValue.value} options={options} />
      )
      items = wrapper.findAll('.n-auto-complete__content__item')
      trigger = wrapper.findComponent(TooltipTrigger)
    })

    afterEach(() => {
      wrapper.unmount()
      inputValue.value = ''
    })

    test('update:modelValue and change', async () => {
      await items[0].trigger('click')
      expect(wrapper.emitted()['update:modelValue']).toBeCalledTimes(1)
      expect(wrapper.emitted()['change']).toBeCalledTimes(1)
      expect(inputValue.value).toEqual('option0')
    })

    describe('keydown', async () => {
      test('arrow-down and arrow-up should change item hovering', async () => {
        await trigger.trigger('click')
        items = wrapper.findAll('.n-auto-complete__content__item')

        await trigger.trigger('keydown', { key: 'ArrowDown' })
        expect(items[2].classes()).toContain('hovering')
        await trigger.trigger('keydown', { key: 'ArrowUp' })
        expect(items[0].classes()).toContain('hovering')
      })
      test('esc should close tooltip', async () => {
        await trigger.trigger('click')
        await trigger.trigger('keydown', { key: 'ESC' })
        expect(wrapper.classes()).not.toContain('n-auto-complete__popper')
      })
      test('enter should select item', async () => {
        await trigger.trigger('keydown', { key: 'click' })
        await items[0].trigger('mouseenter')
        await trigger.trigger('keydown', { key: 'Enter' })
        expect(inputValue.value).toBe('option0')
      })
    })
  })
})
