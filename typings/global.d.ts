declare module 'vue' {
  export interface GlobalComponents {
    NAlert: typeof import('nocturne-ui')['NAlert'],
    NAvatar: typeof import('nocturne-ui')['NAvatar'],
    NBadge: typeof import('nocturne-ui')['NBadge'],
    NButton: typeof import('nocturne-ui')['NButton'],
    NButtonGroup: typeof import('nocturne-ui')['NButtonGroup'],
    NCard: typeof import('nocturne-ui')['NCard'],
    NCarousel: typeof import('nocturne-ui')['NCarousel'],
    NCarouselItem: typeof import('nocturne-ui')['NCarouselItem'],
    NCheckbox: typeof import('nocturne-ui')['NCheckbox'],
    NCheckboxGroup: typeof import('nocturne-ui')['NCheckboxGroup'],
    NCol: typeof import('nocturne-ui')['NCol'],
    NCollapse: typeof import('nocturne-ui')['NCollapse'],
    NCollapseItem: typeof import('nocturne-ui')['NCollapseItem'],
    NCollapseTransition: typeof import('nocturne-ui')['NCollapseTransition'],
    NColorPicker: typeof import('nocturne-ui')['NColorPicker'],
    NCountdown: typeof import('nocturne-ui')['NCountdown'],
    NDialog: typeof import('nocturne-ui')['NDialog'],
    NDrawer: typeof import('nocturne-ui')['NDrawer'],
    NForm: typeof import('nocturne-ui')['NForm'],
    NIcon: typeof import('nocturne-ui')['NIcon'],
    NInput: typeof import('nocturne-ui')['NInput'],
    NInputNumber: typeof import('nocturne-ui')['NInputNumber'],
    NLink: typeof import('nocturne-ui')['NLink'],
    NOption: typeof import('nocturne-ui')['NOption'],
    NPagination: typeof import('nocturne-ui')['NPagination'],
    NPopconfirm: typeof import('nocturne-ui')['NPopconfirm'],
    NPopover: typeof import('nocturne-ui')['NPopover'],
    NPopper: typeof import('nocturne-ui')['NPopper'],
    NProgress: typeof import('nocturne-ui')['NProgress'],
    NRadio: typeof import('nocturne-ui')['NRadio'],
    NRadioGroup: typeof import('nocturne-ui')['NRadioGroup'],
    NRow: typeof import('nocturne-ui')['NRow'],
    NSelect: typeof import('nocturne-ui')['NSelect'],
    NSlider: typeof import('nocturne-ui')['NSlider'],
    NStatistic: typeof import('nocturne-ui')['NStatistic'],
    NSwitch: typeof import('nocturne-ui')['NSwitch'],
    NTag: typeof import('nocturne-ui')['NTag'],
    NTimeline: typeof import('nocturne-ui')['NTimeline'],
    NTimelineItem: typeof import('nocturne-ui')['NTimelineItem'],
    NTooltip: typeof import('nocturne-ui')['NTooltip'],
  }

  interface ComponentCustomProperties {
    $message: typeof import('nocturne-ui')['NMessage']
    $loading: typeof import('nocturne-ui')['NLoading']
    $notify: typeof import('nocturne-ui')['NNotification']
  }
}

export {}
