<template>
  <n-space>
    <n-tooltip content="prompt info" :show-arrow="false" trigger="hover">
      <n-button>hover me</n-button>
    </n-tooltip>
    <n-tooltip content="prompt info" :show-arrow="false" trigger="click">
      <n-button>click me</n-button>
    </n-tooltip>
    <n-tooltip content="prompt info" :show-arrow="false" trigger="focus">
      <n-button>focus</n-button>
    </n-tooltip>
    <n-tooltip content="prompt info" :show-arrow="false" trigger="contextmenu">
      <n-button>contextmenu</n-button>
    </n-tooltip>
  </n-space>
</template>
