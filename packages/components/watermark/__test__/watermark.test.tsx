import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Watermark from '../src/watermark.vue'

describe('Watermark.vue', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Watermark class="watermark" content="Noc">
        watermark
      </Watermark>
    ))

    expect(wrapper.classes()).toContain('watermark')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
