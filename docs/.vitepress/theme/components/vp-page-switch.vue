<template>
  <div class="page-switch-container">
    <a v-if="switchPage?.prev" :href="switchPage.prev.link" class="switcher left">
      <div class="indicator">
        <ArrowLeft size="14"></ArrowLeft>
        <span>上一篇</span>
      </div>
      <p class="desc">{{ switchPage.prev.text }}</p>
    </a>
    <a v-if="switchPage?.next" :href="switchPage.next.link" class="switcher right">
      <div class="indicator">
        <span>下一篇</span>
        <ArrowRight size="14"></ArrowRight>
      </div>
      <p class="desc" :title="switchPage.next.text">{{ switchPage.next.text }}</p>
    </a>
  </div>
</template>

<script setup>
import { usePageSwitch } from '../composables'
import {
  RiArrowRightWideLine as ArrowRight,
  RiArrowLeftWideLine as ArrowLeft,
} from '@remixicon/vue';

const switchPage = usePageSwitch()
</script>

<style lang="scss" scoped>
.page-switch-container {
  position: relative;
  max-width: 100%;

  .switcher {
    position: absolute;
    display: block;
    width: 200px;
    padding: 10px 20px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    transition: border-color .3s;

    &:hover {
      border-color: var(--theme-color);
      .indicator, .desc {
        color: var(--theme-color);
      }
    }

    &.left {
      left: 0;
      top: 0;
    }

    &.right {
      right: 0;
      top: 0;
    }

    .indicator {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      font-size: 12px;
    }

    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .indicator, .desc {
      transition: color .3s;
    }
  }
}
</style>