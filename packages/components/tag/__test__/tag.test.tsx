import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Tag from '../src/tag.vue'

describe('Tag', () => {
  test('render text & class', () => {
    const wrapper = mount(() => (
      <Tag
        v-slots={{
          default: () => 'tag'
        }}
      />
    ))
    const container = wrapper.find('.n-tag')

    expect(container.exists()).toBe(true)
    expect(container.text()).toEqual('tag')
    expect(container.classes()).not.toContain('n-tag__close')
    expect(container.classes()).not.toContain('is-hit')
    expect(container.classes()).not.toContain('n-flip')
  })

  test('type', () => {
    const wrapper = mount(() => <Tag type="success" />)
    const container = wrapper.find('.n-tag')

    expect(container.classes()).toContain('n-tag--success')
    expect(container.classes()).not.toContain('n-tag--primary')
    expect(container.classes()).not.toContain('n-tag--danger')
    expect(container.classes()).not.toContain('n-tag--info')
    expect(container.classes()).not.toContain('n-tag--warning')
  })

  test('border', () => {
    const wrapper = mount(() => <Tag border={true} />)
    const container = wrapper.find('.n-tag')
    expect(container.classes()).toContain('is-hit')
  })

  test('closable', async () => {
    const wrapper = mount(() => <Tag closable={true} />)
    const comp = wrapper.getComponent(Tag)
    const closeBtn = comp.find('.n-tag .n-tag__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(comp.emitted().close).toBeTruthy()
  })

  test('disableTransitions', () => {
    const wrapper = mount(() => <Tag transition={false} />)
    const vm = wrapper.vm
    // FIXME: This check actually is useless as there is no the class `md-fade-center` in the code.
    expect(vm.$el.classList.contains('n-flip')).toEqual(false)
  })

  test('color', () => {
    const wrapper = mount(() => <Tag color="rgb(0, 0, 0)" />)
    expect(wrapper.find('.n-tag').attributes('style')).toEqual(
      'background-color: rgb(0, 0, 0);'
    )
  })

  test('theme', () => {
    const wrapper = mount(() => <Tag effect="dark" />)
    const container = wrapper.find('.n-tag')
    expect(container.classes()).toContain('n-tag--dark')
    expect(container.classes()).not.toContain('n-tag--light')
    expect(container.classes()).not.toContain('n-tag--plain')
  })

  test('size', () => {
    const wrapper = mount(() => <Tag size="large" />)
    const container = wrapper.find('.n-tag')
    expect(container.classes()).toContain('n-tag--large')
    expect(container.classes()).not.toContain('n-tag--default')
    expect(container.classes()).not.toContain('n-tag--small')
  })
})
