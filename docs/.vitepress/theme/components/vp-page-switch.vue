<template>
  <div class="page-switch-container">
    <a :href="switchPage?.prev?.link" class="switcher">
      <div v-if="switchPage?.prev" class="indicator">
        <RiArrowLeftSLine size="16" />
        <span class="name" :title="switchPage.prev.text">
          {{ switchPage?.prev?.text }}
        </span>
      </div>
    </a>
    <a :href="switchPage?.next?.link" class="switcher">
      <div v-if="switchPage?.next" class="indicator">
        <span class="name" :title="switchPage?.next?.text">
          {{ switchPage?.next?.text }}
        </span>
        <RiArrowLeftSLine size="16" class="rotate-[180deg]" />
      </div>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { RiArrowLeftSLine } from '@remixicon/vue'
import { usePageSwitch } from '../composables'

const switchPage = usePageSwitch()
</script>

<style lang="scss" scoped>
.page-switch-container {
  display: flex;
  justify-content: space-between;
  min-width: 100%;
  padding: 20px 0;
  border-top: 1px solid var(--n-border-color-lighter);

  .switcher {
    display: block;
    width: fit-content;

    .indicator {
      display: flex;
      align-items: center;
      margin-bottom: 2px;
      transition: color 0.2s ease-in-out;
      color: var(--n-color-primary);

      &:hover {
        color: var(--n-color-primary-light-3);
      }

      &:last-child {
        .name {
          margin-left: 10px;
        }
      }

      &:first-child {
        .name {
          margin-right: 10px;
        }
      }

      .name {
        font-size: 14px;
      }
    }
  }
}
</style>
