import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { typeIcons } from '../icon'

describe('typeIcons', () => {
  test('info', () => {
    const component = mount(typeIcons['info'])
    expect(component.exists()).toBeTruthy()
  })
  test('error', () => {
    const component = mount(typeIcons['error'])
    expect(component.exists()).toBeTruthy()
  })
  test('success', () => {
    const component = mount(typeIcons['success'])
    expect(component.exists()).toBeTruthy()
  })
  test('warning', () => {
    const component = mount(typeIcons['warning'])
    expect(component.exists()).toBeTruthy()
  })
})
