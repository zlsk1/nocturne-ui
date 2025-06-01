import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Skeleton from '../src/skeleton.vue'

const text = 'test'

describe('Skeleton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('render test', () => {
    const wrapper = mount(<Skeleton />)
    expect(wrapper.findAll('.n-skeleton__p')).toHaveLength(4)
    expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "n-skeleton",
      ]
    `)
  })

  it('should render with animation', () => {
    const wrapper = mount(<Skeleton animated={true} />)

    expect(wrapper.classes()).toMatchInlineSnapshot(`
      [
        "n-skeleton",
        "is-animated",
      ]
    `)
  })

  it('should render x rows', () => {
    const wrapper = mount(<Skeleton rows={4} />)

    expect(wrapper.findAll('.n-skeleton__p')).toHaveLength(5)
  })

  it('should render default slots', () => {
    const wrapper = mount(<Skeleton loading={false}>{text}</Skeleton>)

    expect(wrapper.text()).toBe(text)
  })

  it('should render templates', () => {
    const wrapper = mount(
      <Skeleton
        v-slots={{
          extra: () => text
        }}
      />
    )

    expect(wrapper.text()).toBe(text)
  })
})
