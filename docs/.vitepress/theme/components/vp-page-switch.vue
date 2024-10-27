<template>
  <div class="page-switch-container">
    <a :href="switchPage?.prev?.link" class="switcher">
      <div v-if="switchPage?.prev">
        <div class="indicator">
          <ArrowLeft size="14"></ArrowLeft>
          <span>上一篇</span>
        </div>
        <span class="desc">{{ switchPage.prev.text }}</span>
      </div>
    </a>
    <a :href="switchPage?.next?.link" class="switcher">
      <div v-if="switchPage?.next">
        <div class="indicator">
          <span>下一篇</span>
          <ArrowRight size="14"></ArrowRight>
        </div>
        <p class="desc" :title="switchPage.next.text">{{ switchPage.next.text }}</p>
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { usePageSwitch } from '../composables'
import {
  RiArrowRightWideLine as ArrowRight,
  RiArrowLeftWideLine as ArrowLeft,
} from '@remixicon/vue';

const switchPage = usePageSwitch()
</script>

<style lang="scss" scoped>
.page-switch-container {
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  margin-top: 20px;

  .switcher {
    display: block;
    width: 200px;
    height: 60px;

    > div {
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
      margin: 0;
    }

    .indicator, .desc {
      transition: color .3s;
    }
  }
}
</style>