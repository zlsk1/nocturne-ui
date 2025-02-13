import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Statistic from '../src/statistic.vue'

describe('Statistic', () => {
  it('render test', () => {
    const wrapper = mount(() => <Statistic title="test" value={57454157} />)

    expect(wrapper.find('.n-statistic__title').text()).toBe('test')
    expect(wrapper.find('.n-statistic__value').text()).toBe('57,454,157')
  })

  it('basics test', () => {
    const wrapper = mount(() => <Statistic value={268500.123456} />)

    expect(wrapper.find('.n-statistic__value').text()).toBe('268,500')
  })

  it('precision', async () => {
    const precision = ref(6)
    const wrapper = mount(() => (
      <Statistic precision={precision.value} value={268500.123456} />
    ))

    expect(wrapper.find('.n-statistic__value').text()).toBe('268,500.123456')
    precision.value = 4
    await nextTick()
    expect(wrapper.find('.n-statistic__value').text()).toBe('268,500.1234')
  })
})
