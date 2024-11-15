import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    NAlert: (typeof import('packages'))['NAlert']
    NAnchor: (typeof import('packages'))['NAnchor']
    NAnchorItem: (typeof import('packages'))['NAnchorItem']
    NAvatar: (typeof import('packages'))['NAvatar']
    NBadge: (typeof import('packages'))['NBadge']
    NBreadcrumb: (typeof import('packages'))['NBreadcrumb']
    NBreadcrumbItem: (typeof import('packages'))['NBreadcrumbItem']
    NButton: (typeof import('packages'))['NButton']
    NButtonGroup: (typeof import('packages'))['NButtonGroup']
    NCard: (typeof import('packages'))['NCard']
    NCarousel: (typeof import('packages'))['NCarousel']
    NCarouselItem: (typeof import('packages'))['NCarouselItem']
    NCheckbox: (typeof import('packages'))['NCheckbox']
    NCheckboxGroup: (typeof import('packages'))['NCheckboxGroup']
    NCol: (typeof import('packages'))['NCol']
    NCollapse: (typeof import('packages'))['NCollapse']
    NCollapseItem: (typeof import('packages'))['NCollapseItem']
    NCollapseTransition: (typeof import('packages'))['NCollapseTransition']
    NColorPicker: (typeof import('packages'))['NColorPicker']
    NCountdown: (typeof import('packages'))['NCountdown']
    NDatePicker: (typeof import('packages'))['NDatePicker']
    NDialog: (typeof import('packages'))['NDialog']
    NDrawer: (typeof import('packages'))['NDrawer']
    NDropdown: (typeof import('packages'))['NDropdown']
    NDropdownItem: (typeof import('packages'))['NDropdownItem']
    NForm: (typeof import('packages'))['NForm']
    NIcon: (typeof import('packages'))['NIcon']
    NInput: (typeof import('packages'))['NInput']
    NInputNumber: (typeof import('packages'))['NInputNumber']
    NLink: (typeof import('packages'))['NLink']
    NMenu: (typeof import('packages'))['NMenu']
    NMenuItem: (typeof import('packages'))['NMenuItem']
    NSubMenu: (typeof import('packages'))['NSubMenu']
    NMenuItemGroup: (typeof import('packages'))['NMenuItemGroup']
    NOption: (typeof import('packages'))['NOption']
    NPagination: (typeof import('packages'))['NPagination']
    NPopconfirm: (typeof import('packages'))['NPopconfirm']
    NPopover: (typeof import('packages'))['NPopover']
    NPopper: (typeof import('packages'))['NPopper']
    NProgress: (typeof import('packages'))['NProgress']
    NRadio: (typeof import('packages'))['NRadio']
    NRadioGroup: (typeof import('packages'))['NRadioGroup']
    NRow: (typeof import('packages'))['NRow']
    NSelect: (typeof import('packages'))['NSelect']
    NSlider: (typeof import('packages'))['NSlider']
    NStatistic: (typeof import('packages'))['NStatistic']
    NSwitch: (typeof import('packages'))['NSwitch']
    NTag: (typeof import('packages'))['NTag']
    NTimePicker: (typeof import('packages'))['NTimePicker']
    NTimeline: (typeof import('packages'))['NTimeline']
    NTimelineItem: (typeof import('packages'))['NTimelineItem']
    NTooltip: (typeof import('packages'))['NTooltip']
  }

  interface ComponentCustomProperties {
    $message: (typeof import('packages'))['NMessage']
    $loading: (typeof import('packages'))['NLoading']
    $notify: (typeof import('packages'))['NNotification']
  }
}

export {}
