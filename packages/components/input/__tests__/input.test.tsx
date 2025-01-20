import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { RiCloseCircleLine, RiEyeLine } from '@remixicon/vue'
import Input from '../src/input.vue'

describe('Input', () => {
  test('render', () => {
    const wrapper = mount(() => <Input></Input>)
    expect(wrapper.find('.n-input').exists()).toBe(true)
  })

  test('variant', async () => {
    const variant = ref('outlined')
    const wrapper = mount(() => <Input variant={variant.value}></Input>)
    expect(wrapper.find('.n-input--outlined').exists()).toBe(false)
    await nextTick()

    variant.value = 'filled'
    await nextTick()
    expect(wrapper.find('.n-input--filled').exists()).toBe(true)
  })

  test('placeholder', () => {
    const wrapper = mount(() => <Input placeholder="请输入"></Input>)
    expect(wrapper.find('.n-input__inner').attributes('placeholder')).toEqual(
      '请输入'
    )
  })

  test('size', () => {
    const wrapper = mount(() => <Input size="small"></Input>)
    expect(wrapper.find('.n-input--small').exists()).toEqual(true)
  })

  test('disabled', () => {
    const wrapper = mount(() => <Input disabled></Input>)
    expect(wrapper.find('.is-disabled').exists()).toEqual(true)
  })

  test('showPassword icon', async () => {
    const value = ref('')
    const wrapper = mount(() => (
      <Input showPassword v-model={value.value}></Input>
    ))
    expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(false)
    value.value = '1'
    await nextTick()
    expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
  })

  describe('should show suffix-icon & prefix-icon', () => {
    describe('suffix-icon', () => {
      test('by props', () => {
        const wrapper = mount(() => <Input suffixIcon={RiEyeLine}></Input>)
        expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
        expect(wrapper.find('.n-input__suffix').exists()).toEqual(true)
      })
      test('by slot', () => {
        const wrapper = mount(() => (
          <Input v-slots={{ suffix: () => <RiEyeLine></RiEyeLine> }}></Input>
        ))
        expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
        expect(wrapper.find('.n-input__suffix').exists()).toEqual(true)
      })
    })
    describe('prefix-icon', () => {
      test('by props', () => {
        const wrapper = mount(() => <Input prefixIcon={RiEyeLine}></Input>)
        expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
        expect(wrapper.find('.n-input__prefix').exists()).toEqual(true)
      })
      test('by slot', async () => {
        const wrapper = mount(() => (
          <Input v-slots={{ prefix: () => <RiEyeLine></RiEyeLine> }}></Input>
        ))
        await nextTick()
        expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
        expect(wrapper.find('.n-input__prefix').exists()).toEqual(true)
      })
    })
  })

  describe('input events', () => {
    test('input event', async () => {
      const onInput = vi.fn()
      const content = ref('a')
      const wrapper = mount(() => (
        <Input modelValue={content.value} onInput={onInput} />
      ))
      const el = wrapper.find('input')
      const nativeInput = el.element
      nativeInput.value = '1'
      await el.trigger('compositionstart')
      await el.trigger('input')
      await el.trigger('compositionupdate')
      await el.trigger('input')
      await el.trigger('compositionend')
      expect(onInput).toBeCalledTimes(1)
      expect(content.value).toEqual('a')
    })

    test('change event', async () => {
      const value = ref('')
      const onChange = (val: string) => (value.value = val)
      const wrapper = mount(() => (
        <Input modelValue={value.value} onChange={onChange}></Input>
      ))
      const el = wrapper.find('input').element
      el.value = '1'
      el.dispatchEvent(new Event('change'))
      await nextTick()
      expect(value.value).toBe('1')
    })

    test('clearValue event', async () => {
      const value = ref('1')
      const wrapper = mount(() => (
        <Input clearable v-model={value.value}></Input>
      ))
      await wrapper.trigger('mouseenter')
      await wrapper.findComponent(RiCloseCircleLine).trigger('click')
      expect(value.value).toBe('')
    })

    test('focus event', async () => {
      const onFocus = vi.fn()
      const wrapper = mount(() => <Input onFocus={onFocus}></Input>)
      const inputWrapper = wrapper.find('input')
      await inputWrapper.trigger('focus')
      expect(onFocus).toHaveBeenCalled()
    })

    test('blur event', async () => {
      const onBlur = vi.fn()
      const wrapper = mount(() => <Input onBlur={onBlur}></Input>)
      const inputWrapper = wrapper.find('input')
      await inputWrapper.trigger('blur')
      expect(onBlur).toHaveBeenCalled()
    })
  })
})
