import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Button from '@nocturne-ui/components/button'
import ConfigProvider from '../src/config-provider'

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
