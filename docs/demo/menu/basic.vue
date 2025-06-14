<template>
  <div style="width: 800px">
    <n-menu default-active="2">
      <n-menu-item index="1">Navigation 1</n-menu-item>
      <n-menu-item index="2" disabled>Navigation 2</n-menu-item>
      <n-sub-menu index="3">
        <template #title>Navigation 3</template>
        <n-menu-item index="3-1">Navigation 3-1</n-menu-item>
        <n-menu-item index="3-2">Navigation 3-2</n-menu-item>
      </n-sub-menu>
    </n-menu>
  </div>
</template>
