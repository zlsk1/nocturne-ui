import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import {
  RiLoaderLine as Loading,
  RiLoader2Line as Loading2,
  RiUploadLine as Upload
} from '@remixicon/vue'
import Button from '../src/button.vue'
import ButtonGroup from '../src/button-group.vue'

describe('Button', () => {
  test('render & type', () => {
    const wrapper = mount(() => <Button type="primary" />)
    expect(wrapper.find('.n-button').exists()).toBe(true)
    expect(wrapper.find('.n-button').classes()).toContain('n-button--primary')
  })

  test('size', () => {
    const wrapper = mount(() => <Button type="primary" size="small" />)
    expect(wrapper.find('.n-button').classes()).toContain(`n-button--small`)
  })

  test('is plain', () => {
    const wrapper = mount(() => <Button type="primary" plain />)
    expect(wrapper.find('.n-button').classes()).toContain('n-button--primary')
    expect(wrapper.find('.n-button').classes()).toContain('is-plain')
  })

  test('is round', () => {
    const wrapper = mount(() => <Button round />)
    expect(wrapper.find('.n-button').classes()).toContain('is-round')
  })

  test('is circle', () => {
    const wrapper = mount(() => <Button circle />)
    expect(wrapper.find('.n-button').classes()).toContain('is-circle')
  })

  test('is disabled', () => {
    const wrapper = mount(() => <Button disabled />)
    expect(wrapper.find('.n-button').classes()).toContain('is-disabled')
  })

  test('is text', () => {
    const wrapper = mount(() => <Button text />)
    expect(wrapper.find('.n-button').classes()).toContain('is-text')
  })

  test('icon', () => {
    const wrapper = mount(() => <Button icon={Upload} />)
    expect(wrapper.findComponent(Upload).exists()).toBe(true)
  })

  test('loading', async () => {
    const isLoad = ref(true)
    const wrapper = mount(() => <Button loading={isLoad.value}>button</Button>)

    expect(wrapper.findComponent(Loading).exists()).toBe(true)
    expect(wrapper.find('.is-loading').exists()).toBe(true)

    isLoad.value = false
    await nextTick()
    expect(wrapper.findComponent(Loading).exists()).toBe(false)
    expect(wrapper.find('.is-loading').exists()).toBe(false)
  })

  test('loading-icon', () => {
    const wrapper = mount(() => <Button loading loadingIcon={Loading2} />)
    expect(wrapper.findComponent(Loading2).exists()).toBe(true)
    expect(wrapper.find('.is-loading').exists()).toBe(true)
  })

  test('render text', () => {
    const wrapper = mount(() => <Button>button</Button>)
    expect(wrapper.find('.n-button > span').text()).toBe('button')
  })

  test('click event', async () => {
    const wrapper = mount(() => <Button>button</Button>)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })
})

describe('Button Group', () => {
  test('render', () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button1</Button>
        <Button>button2</Button>
      </ButtonGroup>
    ))
    expect(wrapper.find('.n-button-group').exists()).toBe(true)
    expect(wrapper.findAll('button')).length(2)
  })
})
