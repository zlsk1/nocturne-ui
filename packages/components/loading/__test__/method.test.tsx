import { nextTick } from 'vue'
import { afterEach, describe, expect, test } from 'vitest'
import { Ri24HoursFill } from '@remixicon/vue'
import LoadingMethod from '../src/method'

describe('loading-method', () => {
  const container = document.createElement('div')

  afterEach(() => {
    const instance = document.querySelector('.n-loading')
    if (!instance) return
    instance.parentNode!.removeChild(instance)
  })

  test('append to element', () => {
    LoadingMethod(container)
    document.body.appendChild(container)
    expect(document.body.querySelector('.n-loading')).toBeTruthy()
  })
  test('append to element with string', () => {
    const container = document.createElement('div')
    container.className = 'halo'
    LoadingMethod('.halo')
    expect(document.querySelector('.n-loading')).toBeTruthy()
  })
  test('close', async () => {
    const { close } = LoadingMethod(container)

    expect(typeof close === 'function').toBe(true)

    await nextTick()
    close()
    expect(document.querySelector('.n-loading')).not.toBeTruthy()
  })
  test('text', () => {
    LoadingMethod({ target: container, text: 'text' })
    expect(
      document.querySelector('.n-loading__content')?.textContent === 'text'
    ).toBe(true)
  })
  test('maskBg', () => {
    LoadingMethod({ target: container, maskBg: 'rgb(51, 51, 51)' })
    expect(
      (document.querySelector('.n-loading') as HTMLElement)!.style
        .backgroundColor === 'rgb(51, 51, 51)'
    ).toBe(true)
  })
  test('locked', () => {
    LoadingMethod({ target: container, locked: true })
    expect(document.body.style.overflow === 'hidden').toBe(true)
  })
  test('icon', () => {
    LoadingMethod({ target: container, icon: <Ri24HoursFill /> })
    expect(document.querySelector('.n-loading__icon')).not.toBeTruthy()
  })
})
