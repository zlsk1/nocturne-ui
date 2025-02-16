import { computed, defineComponent, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import Chinese from '@nocturne-ui/locale/lang/zh-cn'
import English from '@nocturne-ui/locale/lang/en'
import { provideGlobalConfig } from '@nocturne-ui/components/config-provider'
import { transferTranslator, useLocale } from '../use-locale'
import type { Locale } from '@nocturne-ui/locale'
import type { ComponentPublicInstance, PropType } from 'vue'
import type { VueWrapper } from '@vue/test-utils'

const TestComp = defineComponent({
  setup() {
    const { t } = useLocale()
    return () => (
      <div class="locale-manifest">{t('noc.popconfirm.confirmButtonText')}</div>
    )
  }
})

describe('use-locale', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>

  beforeEach(() => {
    wrapper = mount(
      defineComponent({
        props: {
          locale: {
            type: Object as PropType<Locale>,
            default: Chinese
          }
        },
        setup(props) {
          provideGlobalConfig(computed(() => ({ locale: props.locale })))
          return () => <TestComp />
        }
      })
    )
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('should provide locale correctly', async () => {
    await nextTick()
    expect(wrapper.find('.locale-manifest').text()).toBe(
      Chinese.noc.popconfirm.confirmButtonText
    )
  })

  it('should update the text reactively', async () => {
    await nextTick()
    expect(wrapper.find('.locale-manifest').text()).toBe(
      Chinese.noc.popconfirm.confirmButtonText
    )
    await wrapper.setProps({
      locale: English
    })

    expect(wrapper.find('.locale-manifest').text()).toBe(
      English.noc.popconfirm.confirmButtonText
    )
  })

  it('return key name if not defined', () => {
    const t = transferTranslator(English)
    expect(t('noc.popconfirm.someThing')).toBe('noc.popconfirm.someThing')
  })

  describe('overrides', () => {
    it('should be override correctly', () => {
      const override = computed(() => English)

      const wrapper = mount(
        defineComponent({
          setup(_, { expose }) {
            const { locale } = useLocale(override)
            expose({
              locale
            })
          },
          template: '<div></div>'
        }),
        {
          global: {
            provide: {
              locale: Chinese
            }
          }
        }
      )
      // @ts-ignore
      expect(wrapper.vm.locale).toBe(override.value)
    })
  })
})
