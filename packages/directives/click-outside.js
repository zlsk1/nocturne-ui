export const clickOutside = {
  mounted (el, binding) {
    el.clickOutsideEvent = function (e) {
      if (typeof (binding.value) !== 'function') return
      if (!(el === e.target || el.contains(e.target))) {
        binding.value(e)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted (el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
