<template>
  <div style="width: 560px">
    <div class="flex justify-center">
      <n-tooltip placement="top-start" content="prompt info">
        <n-button>top-start</n-button>
      </n-tooltip>
      <n-tooltip placement="top" content="prompt info">
        <n-button>top</n-button>
      </n-tooltip>
      <n-tooltip placement="top-end" content="prompt info">
        <n-button>top-end</n-button>
      </n-tooltip>
    </div>
    <div class="my-8">
      <div class="flex justify-between">
        <n-tooltip placement="left-start" content="prompt info">
          <n-button>left-start</n-button>
        </n-tooltip>
        <n-tooltip placement="right-start" content="prompt info">
          <n-button>right-start</n-button>
        </n-tooltip>
      </div>
      <div class="flex justify-between my-4">
        <n-tooltip placement="left" content="prompt info">
          <n-button>left</n-button>
        </n-tooltip>
        <n-tooltip placement="right" content="prompt info">
          <n-button>right</n-button>
        </n-tooltip>
      </div>
      <div class="flex justify-between">
        <n-tooltip placement="left-end" content="prompt info">
          <n-button>left-end</n-button>
        </n-tooltip>
        <n-tooltip placement="right-end" content="prompt info">
          <n-button>right-end</n-button>
        </n-tooltip>
      </div>
    </div>
    <div class="flex justify-center">
      <n-tooltip placement="bottom-start" content="prompt info">
        <n-button>bottom-start</n-button>
      </n-tooltip>
      <n-tooltip placement="bottom" content="prompt info">
        <n-button>bottom</n-button>
      </n-tooltip>
      <n-tooltip placement="bottom-end" content="prompt info">
        <n-button>bottom-end</n-button>
      </n-tooltip>
    </div>
  </div>
</template>
