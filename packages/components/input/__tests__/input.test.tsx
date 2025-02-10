import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import { RiCloseCircleFill, RiEyeLine, RiEyeOffLine } from '@remixicon/vue'
import Input from '../src/input.vue'
import type { InputStatus } from '../src/input'

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

  test('show-password', async () => {
    const password = ref(123)
    const showPassword = ref(true)
    const wrapper = mount(() => (
      <Input
        v-model={password.value}
        showPassword={showPassword.value}
        type="password"
      ></Input>
    ))
    expect(wrapper.findComponent(RiEyeOffLine).exists()).toEqual(true)
    showPassword.value = false
    await nextTick()
    expect(wrapper.findComponent(RiEyeOffLine).exists()).toEqual(false)
  })

  test('clearable', async () => {
    const inputVal = ref('123')
    const wrapper = mount(() => (
      <Input v-model={inputVal.value} clearable></Input>
    ))
    const InputEl = wrapper.findComponent(Input)
    await InputEl.trigger('mouseenter')
    expect(wrapper.findComponent(RiCloseCircleFill).exists()).toEqual(true)
    await InputEl.trigger('mouseleave')
    expect(wrapper.findComponent(RiCloseCircleFill).exists()).toEqual(false)

    inputVal.value = ''
    await nextTick()
    await InputEl.trigger('mouseenter')
    expect(wrapper.findComponent(RiCloseCircleFill).exists()).toEqual(false)
  })

  test('password', async () => {
    const value = ref('')
    const wrapper = mount(() => (
      <Input type="password" v-model={value.value}></Input>
    ))
    expect(wrapper.findComponent(RiEyeOffLine).exists()).toEqual(false)
    value.value = '1'
    await nextTick()
    expect(wrapper.findComponent(RiEyeOffLine).exists()).toEqual(true)
    await wrapper.findComponent(RiEyeOffLine).trigger('click')
    await nextTick()
    expect(wrapper.findComponent(RiEyeLine).exists()).toEqual(true)
  })

  test('status', () => {
    const status = ref<InputStatus>('error')
    const wrapper = mount(() => <Input status={status.value}></Input>)
    expect(wrapper.find('.is-error').exists()).toEqual(true)
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

  test('limit input and show word count', async () => {
    const input1 = ref('')
    const input2 = ref('')
    const input3 = ref('')
    const input4 = ref('exceed')
    const show = ref(false)

    const wrapper = mount(() => (
      <div>
        <Input
          class="test-text"
          type="text"
          v-model={input1.value}
          maxlength="10"
          showLimit={show.value}
        />
        <Input
          class="test-textarea"
          type="textarea"
          v-model={input2.value}
          maxlength="10"
          showLimit
        />
        <Input
          class="test-password"
          type="password"
          v-model={input3.value}
          maxlength="10"
          showLimit
        />
        <Input
          class="test-initial-exceed"
          type="text"
          v-model={input4.value}
          maxlength="2"
          showLimit
        />
      </div>
    ))

    const inputElm1 = wrapper.vm.$el.querySelector('.test-text')
    const inputElm2 = wrapper.vm.$el.querySelector('.test-textarea')
    const inputElm3 = wrapper.vm.$el.querySelector('.test-password')
    const inputElm4 = wrapper.vm.$el.querySelector('.test-initial-exceed')

    expect(inputElm1.querySelectorAll('.n-input__count').length).toEqual(0)
    expect(inputElm2.querySelectorAll('.n-input__count').length).toEqual(1)
    expect(inputElm3.querySelectorAll('.n-input__count').length).toEqual(0)
    expect(Array.from(inputElm4.classList)).toMatchInlineSnapshot(`
      [
        "n-input",
        "test-initial-exceed",
      ]
    `)

    show.value = true
    await nextTick()
    expect(inputElm1.querySelectorAll('.n-input__count').length).toEqual(1)

    input4.value = '1'
    await nextTick()
    expect(Array.from(inputElm4.classList)).toMatchInlineSnapshot(`
      [
        "n-input",
        "test-initial-exceed",
      ]
    `)
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
      await wrapper.findComponent(RiCloseCircleFill).trigger('click')
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

  describe('test emoji', () => {
    test('should minimize value between emoji length and maxLength', async () => {
      const inputVal = ref('12🌚')
      const wrapper = mount(() => (
        <Input
          class="test-exceed"
          maxlength="4"
          showLimit
          v-model={inputVal.value}
        />
      ))
      const vm = wrapper.vm
      const inputElm = wrapper.find('input')
      const nativeInput = inputElm.element
      expect(nativeInput.value).toMatchInlineSnapshot(`"12🌚"`)

      const nCount = wrapper.find('.n-input__count-inner')
      expect(nCount.exists()).toBe(true)
      expect(nCount.text()).toMatchInlineSnapshot(`"4 / 4"`)

      inputVal.value = '1👌3😄'
      await nextTick()
      expect(nativeInput.value).toMatchInlineSnapshot(`"1👌3😄"`)
      expect(nCount.text()).toMatchInlineSnapshot(`"6 / 4"`)

      inputVal.value = '哈哈1👌3😄'
      await nextTick()
      expect(nativeInput.value).toMatchInlineSnapshot(`"哈哈1👌3😄"`)
      expect(nCount.text()).toMatchInlineSnapshot(`"8 / 4"`)
      expect(Array.from(vm.$el.classList)).toMatchInlineSnapshot(`
        [
          "n-input",
          "test-exceed",
        ]
      `)
    })

    test('textarea should minimize value between emoji length and maxLength', async () => {
      const inputVal = ref('啊好😄')
      const wrapper = mount(() => (
        <Input
          type="textarea"
          maxlength="4"
          showLimit
          v-model={inputVal.value}
        />
      ))
      const vm = wrapper.vm
      const inputElm = wrapper.find('textarea')
      const nativeInput = inputElm.element
      expect(nativeInput.value).toMatchInlineSnapshot(`"啊好😄"`)

      const nCount = wrapper.find('.n-input__count')
      expect(nCount.exists()).toBe(true)
      expect(nCount.text()).toMatchInlineSnapshot(`"4 / 4"`)

      inputVal.value = '哈哈1👌3😄'
      await nextTick()
      expect(nativeInput.value).toMatchInlineSnapshot(`"哈哈1👌3😄"`)
      expect(nCount.text()).toMatchInlineSnapshot(`"8 / 4"`)
      expect(Array.from(vm.$el.classList)).toMatchInlineSnapshot(`
        [
          "n-textarea",
        ]
      `)
    })
  })
})
