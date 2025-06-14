<template>
  <div class="flex gap-4">
    <n-dropdown trigger="hover">
      <n-button>hover</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown trigger="click">
      <n-button>click</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown trigger="focus">
      <n-button>focus</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown trigger="contextmenu">
      <n-button>contextmenu</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup></script>
