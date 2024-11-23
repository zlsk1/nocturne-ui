import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import dayjs from 'dayjs'
import Countdown from '../src/countdown.vue'

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  test('render', () => {
    const wrapper = mount(() => (
      <Countdown title="t" value={Date.now() + 1000 * 60}></Countdown>
    ))
    expect(wrapper.find('.n-statistic').exists()).toBe(true)
    expect(wrapper.text()).toBe('00:01:00')
  })

  test('format', () => {
    const day = dayjs()
      .add(2, 'd')
      .add(1, 'h')
      .add(1, 'm')
      .add(1, 's')
      .add(1, 'ms')
    const arr = [
      ['DD HH:mm:ss', '02 01:01:01'],
      ['HH:mm:ss', '49:01:01'],
      ['DD [days] HH [hours] mm:ss', '02 days 01 hours 01:01']
    ]
    arr.forEach(([format, expected]) => {
      const wrapper = mount(() => <Countdown value={day} format={format} />)
      expect(wrapper.text()).toBe(expected)
    })
  })

  test('change event', async () => {
    const count = ref(0)
    mount(() => (
      <Countdown
        onChange={() => (count.value += 1)}
        value={Date.now() + 1000 * 60}
      />
    ))
    setTimeout(() => expect(count.value).toBe(1), 16)
  })

  test('finish event', () => {
    const isFinish = ref(false)
    mount(() => (
      <Countdown
        onFinish={() => (isFinish.value = true)}
        value={Date.now() + 2000}
      />
    ))

    setTimeout(() => expect(isFinish.value).not.toBeTruthy(), 1000)
    setTimeout(() => expect(isFinish.value).toBeTruthy(), 2000)
  })
})
