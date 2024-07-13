import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FrAlert: typeof import('packages')['FrAlert']
    FrAvatar: typeof import('packages')['FrAvatar']
    FrBadge: typeof import('packages')['FrBadge']
    FrButton: typeof import('packages')['FrButton']
    FrCarousel: typeof import('packages')['FrCarousel']
    FrCarouselItem: typeof import('packages')['FrCarouselItem']
    FrCheckbox: typeof import('packages')['FrCheckbox']
    FrCheckboxGroup: typeof import('packages')['FrCheckboxGroup']
    FrCollapse: typeof import('packages')['FrCollapse']
    FrCollapseItem: typeof import('packages')['FrCollapseItem']
    FrCollapseTransition: typeof import('packages')['FrCollapseTransition']
    FrIcon: typeof import('packages')['FrIcon']
    FrInput: typeof import('packages')['FrInput']
    FrInputNumber: typeof import('packages')['FrInputNumber']
    FrLink: typeof import('packages')['FrLink']
    FrOption: typeof import('packages')['FrOption']
    FrPagination: typeof import('packages')['FrPagination']
    FrPopper: typeof import('packages')['FrPopper']
    FrProgress: typeof import('packages')['FrProgress']
    FrRadio: typeof import('packages')['FrRadio']
    FrRadioGroup: typeof import('packages')['FrRadioGroup']
    FrSelect: typeof import('packages')['FrSelect']
    FrSlider: typeof import('packages')['FrSlider']
    FrSwitch: typeof import('packages')['FrSwitch']
    FrTag: typeof import('packages')['FrTag']
    FrTooltip: typeof import('packages')['FrTooltip']
    FrStatistic: typeof import('packages')['FrStatistic']
  }

  interface ComponentCustomProperties {
    $message: typeof import('packages')['FrMessage']
  }
}

export {}
