<template>
  <div class="mb-4">
    <n-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div>
    <span>当你设置的页数大于7时</span>
    <n-pagination layout="prev, pager, next" :total="1000" />
  </div>
</template>
