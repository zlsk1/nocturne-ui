<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  RiSearchLine as Search,
  RiCornerDownLeftLine as CornerDown,
  RiArrowUpLine as ArrowUp,
  RiArrowDownLine as ArrowDown,
} from '@remixicon/vue'

const visible = ref(false)
const searchField = ref()
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  window.addEventListener('keydown', onKeyDownEsc)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDownEsc)
})

const onOpen = () => {
  inputRef.value?.focus ? inputRef.value?.focus() : ''
}

const onKeyDownEsc = (e: KeyboardEvent) => {
  if(e.key === 'Escape') {
    visible.value = false
  }
}
</script>

<template>
  <div class="vp-search" @click="visible = true">
    <div class="search">
      <Search size="13"></Search>
      <span class="placeholder">搜索文档</span>
      <div class="tips">Ctrl K</div>
    </div>
  </div>
  <n-dialog v-model="visible" :showClose="false" width="25%" custom-class="search-dialog" @open="onOpen">
    <div class="search-dialog-input">
      <Search size="18"></Search>
      <input ref="inputRef" v-model="searchField" placeholder="搜索文档"></input>
    </div>
    <div class="search-dialog-content">
      <div class="title"></div>
      <ul class="list">
        <li class="item">
          <a href="" class="item__inner">
            <Search size="18"></Search>
            <div>
              <p></p>
              <span></span>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <template #footer>
      <div class="search-dialog-footer">
        <div>
          <CornerDown size="16"></CornerDown>
          <span>选择</span>
        </div>
        <div>
          <ArrowUp size="16"></ArrowUp>
          <ArrowDown size="16"></ArrowDown>
          <span>切换</span>
        </div>
        <div>
          <span>esc</span>
          <span>关闭</span>
        </div>
      </div>
    </template>
  </n-dialog>
</template>

<style lang="scss">
.vp-search {
  width: 150px;
  cursor: pointer;
  .search {
    position: relative;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    font-size: 13px;
    border-radius: 6px;
    color: var(--n-text-color-placeholder);
    background-color: var(--n-fill-color-lighter);
    border: 1px solid transparent;
    transition: .3s;

    &:hover {
      color: var(--n-text-color-regular);
      background-color: var(--n-bg-color);
      border: 1px solid #a8b1ff;
    }

    .placeholder {
      margin-left: 5px;
      margin-right: 10px;
    }

    .tips {
      padding: 2px 4px;
      font-weight: 550;
      font-size: 12px;
      color: var(--n-text-color-placeholder);
      border: 1px solid var(--n-border-color-light);
      border-radius: var(--n-border-radius-base);
    }
  }
}

.search-dialog {
  width: 100%;
  padding: 10px 0;
  .search-dialog-input {
    display: flex;
    align-items: center;
    margin: 0 14px 6px 14px;
    padding: 5px 10px;
    border: 1px solid #a8b1ff;
    border-radius: var(--n-border-radius-base);

    input {
      width: 100%;
      height: 40px;
      margin-left: 10px;
      font-size: 18px;
      border: none;
      outline: none;
    }
  }
  .search-dialog-content {
    padding: 0 10px 20px 10px;
    margin-bottom: 6px;
    border-radius: var(--n-border-radius-base);

    .list {
      .item {
        .item__inner {
          display: flex;
          align-items: center;

          > p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .search-dialog-footer {
    display: flex;
    justify-content: start;
    padding: 10px 14px 0 14px;
    font-size: 12px;
    color: var(--n-text-color-placeholder);
    border-top: 1px solid var(--n-border-color-light);

    > div {
      display: flex;
      align-items: center;
      margin-right: 14px;

      > span {
        margin-left: 4px;
      }
    }
  }
}
</style>