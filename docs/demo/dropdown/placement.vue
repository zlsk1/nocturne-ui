<template>
  <div class="flex gap-4">
    <n-dropdown placement="bottom-start">
      <n-button>bottomStart</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown>
      <n-button>bottom</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown placement="bottom-end">
      <n-button>bottomEnd</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown placement="top-start">
      <n-button>topStart</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown placement="top">
      <n-button>top</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
    <n-dropdown placement="top-end">
      <n-button>topEnd</n-button>
      <template #content>
        <n-dropdown-item label="item 1">item 1</n-dropdown-item>
        <n-dropdown-item label="item 2">item 2</n-dropdown-item>
        <n-dropdown-item label="item 3">item 3</n-dropdown-item>
      </template>
    </n-dropdown>
  </div>
</template>

<script lang="ts" setup></script>
