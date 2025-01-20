import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { RiHazeLine as Haze } from '@remixicon/vue'
import { IMAGE_FAIL, IMAGE_SUCCESS, mockImageEvent } from '@/tests-utils/image'
import Avatar from '../src/avatar.vue'

describe('Avatar', () => {
  mockImageEvent()

  test('render', () => {
    const wrapper = mount(<Avatar />)
    expect(wrapper.find('.n-avatar').exists()).toBeTruthy()
  })

  test('shape', () => {
    const wrapper = mount(<Avatar shape={'square'} />)
    expect(wrapper.find('.n-avatar').classes()).toContain('n-avatar--square')
  })

  test('fit', () => {
    const fits = ['contain', 'cover', 'fill', 'none', 'scale-down'] as const
    fits.forEach((fit) => {
      const wrapper = mount(<Avatar src={IMAGE_SUCCESS} fit={fit as any} />)
      expect(wrapper.find('img').attributes('style')).toContain(
        `object-fit: ${fit}`
      )
    })
  })

  test('size is string', () => {
    const wrapper = mount(<Avatar size={'50px'} />)
    expect(wrapper.find('.n-avatar').classes()).toContain('n-avatar--50px')
  })

  test('icon avatar', () => {
    const wrapper = mount(() => <Avatar icon={Haze} />)
    expect(wrapper.findComponent(Haze).exists()).toBe(true)
  })

  test('image avatar', () => {
    const wrapper = mount(() => <Avatar src={IMAGE_SUCCESS} />)
    expect(wrapper.find('img').exists()).toBe(true)
  })

  test('error fallback', async () => {
    const wrapper = mount(() => (
      <Avatar
        src={IMAGE_FAIL}
        v-slots={{
          default: () => 'fallback'
        }}
      />
    ))

    await nextTick()
    wrapper.emitted('error') && expect(wrapper.emitted('error')).toBeDefined()
    await nextTick()
    expect(wrapper.text()).toBe('fallback')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  test('src changed', async () => {
    const wrapper = mount(
      <Avatar
        v-slots={{
          default: () => 'fallback'
        }}
      />
    )

    expect(wrapper.vm.isError).toBe(false)
    await wrapper.setProps({ src: IMAGE_FAIL })
    await nextTick()
    expect(wrapper.vm.isError).toBe(true)
    await wrapper.setProps({ src: IMAGE_SUCCESS })
    expect(wrapper.vm.isError).toBe(false)
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
