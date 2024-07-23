declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NAlert: typeof import('nocturne-ui')['NAlert'],
    NAvatar: typeof import('nocturne-ui')['NAvatar'],
    NBadge: typeof import('nocturne-ui')['NBadge'],
    NButton: typeof import('nocturne-ui')['NButton'],
    NButtonGroup: typeof import('nocturne-ui')['NButtonGroup'],
    NCarousel: typeof import('nocturne-ui')['NCarousel'],
    NCarouselItem: typeof import('nocturne-ui')['NCarouselItem'],
    NCheckbox: typeof import('nocturne-ui')['NCheckbox'],
    NCheckboxGroup: typeof import('nocturne-ui')['NCheckboxGroup'],
    NCollapse: typeof import('nocturne-ui')['NCollapse'],
    NCollapseItem: typeof import('nocturne-ui')['NCollapseItem'],
    NCollapseTransition: typeof import('nocturne-ui')['NCollapseTransition'],
    NCountdown: typeof import('nocturne-ui')['NCountdown'],
    NIcon: typeof import('nocturne-ui')['NIcon'],
    NInput: typeof import('nocturne-ui')['NInput'],
    NInputNumber: typeof import('nocturne-ui')['NInputNumber'],
    NLink: typeof import('nocturne-ui')['NLink'],
    NOption: typeof import('nocturne-ui')['NOption'],
    NPagination: typeof import('nocturne-ui')['NPagination'],
    NPopper: typeof import('nocturne-ui')['NPopper'],
    NProgress: typeof import('nocturne-ui')['NProgress'],
    NRadio: typeof import('nocturne-ui')['NRadio'],
    NRadioGroup: typeof import('nocturne-ui')['NRadioGroup'],
    NSelect: typeof import('nocturne-ui')['NSelect'],
    NSlider: typeof import('nocturne-ui')['NSlider'],
    NStatistic: typeof import('nocturne-ui')['NStatistic'],
    NSwitch: typeof import('nocturne-ui')['NSwitch'],
    NTag: typeof import('nocturne-ui')['NTag'],
    NTimeLine: typeof import('nocturne-ui')['NTimeLine'],
    NTimelineItem: typeof import('nocturne-ui')['NTimelineItem'],
    NTooltip: typeof import('nocturne-ui')['NTooltip'],
  }

  interface ComponentCustomProperties {
    $message: typeof import('nocturne-ui')['NMessage']
  }
}
