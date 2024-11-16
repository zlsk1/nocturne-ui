import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ButtonGroup from '../src/button-group.vue'
import Button from '@/components/button'

describe('Button Group', () => {
  test('render', () => {
    const wrapper = mount(() => (
      <ButtonGroup>
        <Button>button1</Button>
        <Button>button2</Button>
      </ButtonGroup>
    ))
    expect(wrapper.find('.n-button-group').exists()).toBe(true)
    expect(wrapper.findAll('button')).length(2)
  })
})
