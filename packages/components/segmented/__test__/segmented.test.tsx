import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Segmented from '../src/segmented'
import type { VueWrapper } from '@vue/test-utils'
import type { SegmentedInstance, SegmentedProps } from '../src/type'

describe('Segmented', () => {
  let props: Partial<SegmentedProps>
  let wrapper: VueWrapper<SegmentedInstance>
  let ctx: any

  beforeEach(() => {
    props = {
      modelValue: 'value',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true }
      ],
      size: 'small',
      block: false,
      ariaLabel: 'Segmented Control',
      disabled: false
    }
    ctx = {
      emit: vi.fn()
    }
    wrapper = mount(Segmented, {
      props,
      ctx
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  test('should return the correct component', () => {
    expect(wrapper).toBeDefined()
  })
})
