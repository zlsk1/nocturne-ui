<script setup>
defineOptions({
  name: 'FrCollapseTransition'
})

const reset = (el) => {
  el.style.height = ''
}

const on = {
  beforeEnter (el) {
    if (!el.dataset) el.dataset = {}

    if (el.style.height) el.dataset.elExistsHeight = el.style.height

    el.style.height = 0
  },

  enter (el) {
    if (el.dataset.elExistsHeight) {
      el.style.height = el.dataset.elExistsHeight
    } else if (el.scrollHeight !== 0) {
      el.style.height = `${el.scrollHeight}px`
    } else {
      el.style.height = 0
    }
  },

  afterEnter (el) {
    reset(el)
  },

  enterCancelled (el) {
    reset(el)
  },

  beforeLeave (el) {
    if (!el.dataset) el.dataset = {}

    el.style.height = `${el.scrollHeight}px`
  },

  leave (el) {
    if (el.scrollHeight !== 0) {
      el.style.height = 0
    }
  },

  afterLeave (el) {
    reset(el)
  },

  leaveCancelled (el) {
    reset(el)
  }
}
</script>

<template>
  <transition name="fr-collapse-transition" v-on="on">
    <slot></slot>
  </transition>
</template>

<style scoped>
.fr-collapse-transition-enter-active,
.fr-collapse-transition-leave-active {
  transition: height .2s ease-out;
}
</style>
