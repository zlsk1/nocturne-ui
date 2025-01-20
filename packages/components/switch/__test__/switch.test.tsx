import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { Ri24HoursFill, Ri4kFill } from '@remixicon/vue'
import Switch from '../src/switch.vue'

const wait = (wait: number) =>
  new Promise((resolve) => setTimeout(() => resolve(true), wait))

describe('Switch', () => {
  test('render', () => {
    const wrapper = mount(() => <Switch modelValue={true}></Switch>)
    expect(wrapper.classes()).toContain('n-switch')
    expect(wrapper.classes()).toContain('is-checked')
  })

  test('disabled', () => {
    const wrapper = mount(() => <Switch modelValue={true} disabled></Switch>)
    expect(wrapper.classes()).toContain('is-disabled')
  })

  test('size', () => {
    const wrapper = mount(() => <Switch size="small"></Switch>)
    expect(wrapper.classes()).toContain('n-switch--small')
  })

  test('should toggle correctly', async () => {
    const toggleVal = ref(false)
    const wrapper = mount(<Switch v-model={toggleVal.value}></Switch>)

    expect(wrapper.classes()).not.toContain('is-checked')
    await wrapper.trigger('click')
    expect(wrapper.classes()).toContain('is-checked')
    expect(wrapper.vm.actived).toBeTruthy()
  })

  test('should get value correctly', async () => {
    const toggleVal = ref(false)
    const wrapper = mount(
      <Switch
        v-model={toggleVal.value}
        activeValue={1}
        inactiveValue={0}
      ></Switch>
    )

    await wrapper.trigger('click')
    expect(toggleVal.value).toBe(1)
  })

  test('should show text correctly', async () => {
    const wrapper = mount(() => (
      <Switch modelValue={false} activeText="1" inactiveText="0"></Switch>
    ))

    expect(wrapper.find('.n-switch__label--left').classes()).toContain(
      'is-active'
    )
    expect(wrapper.find('.n-switch__label--right').classes()).not.toContain(
      'is-active'
    )
    await wrapper.trigger('click')
    expect(wrapper.find('.n-switch__label--left').classes()).not.toContain(
      'is-active'
    )
    expect(wrapper.find('.n-switch__label--right').classes()).toContain(
      'is-active'
    )
  })

  test('should show active/inactive icon correctly', async () => {
    const wrapper = mount(() => (
      <Switch
        modelValue={false}
        v-slots={{
          'active-icon': () => <Ri24HoursFill></Ri24HoursFill>,
          'inactive-icon': () => <Ri4kFill></Ri4kFill>
        }}
      ></Switch>
    ))

    expect(wrapper.findComponent(Ri24HoursFill).exists()).toBe(false)
    expect(wrapper.findComponent(Ri4kFill).exists()).toBe(true)
    await wrapper.trigger('click')
    expect(wrapper.findComponent(Ri24HoursFill).exists()).toBe(true)
    expect(wrapper.findComponent(Ri4kFill).exists()).toBe(false)
  })

  test('inlinePrompt', async () => {
    const wrapper = mount(() => (
      <Switch
        modelValue={false}
        inlinePrompt
        activeText="1"
        inactiveText="0"
      ></Switch>
    ))

    expect(wrapper.find('.n-switch__action--reverse').text()).toBe('0')
    await wrapper.trigger('click')
    expect(wrapper.find('.n-switch__action--reverse').text()).toBe('1')
  })

  test('width', () => {
    const wrapper = mount(() => <Switch modelValue={false} width={60}></Switch>)
    expect(wrapper.find('.n-switch').attributes('style')).toContain(
      'width: 60px'
    )
    expect(wrapper.find('.n-switch__wrap').attributes('style')).toContain(
      'width: 60px'
    )
  })

  describe('should block or continue to change while using before-change', () => {
    const onChange = vi.fn()

    afterEach(() => {
      vi.restoreAllMocks()
    })

    test('with boolean', async () => {
      const value = ref(false)
      const shouldChange = ref(false)
      const wrapper = mount(() => (
        <Switch
          v-model={value.value}
          beforeChange={() => shouldChange.value}
          onChange={onChange}
        ></Switch>
      ))

      await wrapper.trigger('click')
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(value.value).toBe(false)

      shouldChange.value = true
      await nextTick()

      await wrapper.trigger('click')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(value.value).toBe(true)
    })

    describe('with Promise<boolean>', () => {
      test('while resolve', async () => {
        const value = ref(false)
        const beforeChange = (): Promise<boolean> =>
          new Promise((resolve) => {
            setTimeout(() => resolve(true), 300)
          })
        const wrapper = mount(() => (
          <Switch
            v-model={value.value}
            beforeChange={beforeChange}
            onChange={onChange}
          ></Switch>
        ))

        await wrapper.trigger('click')
        await wait(50)
        expect(value.value).toBe(false)
        expect(wrapper.find('.n-switch__loading').exists()).toBe(true)
        expect(wrapper.find('.is-disabled').exists()).toBe(true)
        await wait(250)
        expect(onChange).toHaveBeenCalledOnce()
        expect(value.value).toBe(true)
      })
    })

    test('while reject', async () => {
      const value = ref(false)
      const beforeChange = (): Promise<boolean> =>
        new Promise((_, reject) => {
          setTimeout(() => reject(true), 300)
        })
      const wrapper = mount(() => (
        <Switch
          v-model={value.value}
          beforeChange={beforeChange}
          onChange={onChange}
        ></Switch>
      ))

      await wrapper.trigger('click')
      await wait(50)
      expect(value.value).toBe(false)
      expect(wrapper.find('.n-switch__loading').exists()).toBe(true)
      expect(wrapper.find('.is-disabled').exists()).toBe(true)
      await wait(250)
      expect(onChange).not.toHaveBeenCalledOnce()
      expect(value.value).toBe(false)
    })
  })
})
