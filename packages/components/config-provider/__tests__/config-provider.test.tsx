import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ConfigProvider from '../src/config-provider'
import Button from '@/components/button'

describe('Config Provider', () => {
  test('render', () => {
    const wrapper = mount(
      <ConfigProvider namespace="el">
        <Button>show button</Button>
      </ConfigProvider>
    )
    expect(wrapper.findComponent(Button).classes()).toContain('el-button')
  })
})
