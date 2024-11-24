import { config, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { ID_INJECTION_KEY, useId } from '../use-id'

describe('no injection value', () => {
  test('use-id', () => {
    const wrapper = mount({
      setup() {
        const id = useId()
        return { id }
      },
      render: () => undefined
    })

    expect(wrapper.vm.id).toMatch(/^n-id--\d{0,4}--\d+$/)
  })
})

describe('with injection value', () => {
  beforeEach(() => {
    config.global.provide = {
      [ID_INJECTION_KEY as symbol]: {
        prefix: 20,
        suffix: 1
      }
    }
  })

  afterEach(() => {
    config.global.provide = {}
  })

  test('use-id', () => {
    const wrapper = mount({
      setup() {
        const id = useId()
        return { id }
      },
      render: () => undefined
    })

    expect(wrapper.vm.id).toBe('n-id--20--1')
  })
})
