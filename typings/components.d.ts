import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NAlert: typeof import('packages')['NAlert'],
    NAvatar: typeof import('packages')['NAvatar'],
    NBadge: typeof import('packages')['NBadge'],
    NButton: typeof import('packages')['NButton'],
    NButtonGroup: typeof import('packages')['NButtonGroup'],
    NCarousel: typeof import('packages')['NCarousel'],
    NCarouselItem: typeof import('packages')['NCarouselItem'],
    NCheckbox: typeof import('packages')['NCheckbox'],
    NCheckboxGroup: typeof import('packages')['NCheckboxGroup'],
    NCollapse: typeof import('packages')['NCollapse'],
    NCollapseItem: typeof import('packages')['NCollapseItem'],
    NCollapseItemTransition: typeof import('packages')['NCollapseTransition'],
    NCountdown: typeof import('packages')['NCountdown'],
    NIcon: typeof import('packages')['NIcon'],
    NInput: typeof import('packages')['NInput'],
    NInputNumber: typeof import('packages')['NInputNumber'],
    NLink: typeof import('packages')['NLink'],
    NOption: typeof import('packages')['NOption'],
    NPagination: typeof import('packages')['NPagination'],
    NPopper: typeof import('packages')['NPopper'],
    NProgress: typeof import('packages')['NProgress'],
    NRadio: typeof import('packages')['NRadio'],
    NRadioGroup: typeof import('packages')['NRadioGroup'],
    NSelect: typeof import('packages')['NSelect'],
    NSlider: typeof import('packages')['NSlider'],
    NStatistic: typeof import('packages')['NStatistic'],
    NSwitch: typeof import('packages')['NSwitch'],
    NTag: typeof import('packages')['NTag'],
    NTimeline: typeof import('packages')['NTimeline'],
    NTimelineItem: typeof import('packages')['NTimelineItem'],
    NTooltip: typeof import('packages')['NTooltip'],
  }

  interface ComponentCustomProperties {
    $message: typeof import('packages')['NMessage']
  }
}
