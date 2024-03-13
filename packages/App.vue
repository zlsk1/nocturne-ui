<script setup>
import { ref } from 'vue'

const number = ref(2)

const change = e => {
  console.log(e)
}
const clickPrev = e => {
  console.log(e)
}
const clickNext = e => {
  console.log(e)
}
</script>

<template>
  <div class="container">
    <fr-pagination
      :page-count="100"
      next-text="下一页"
      prev-text="上一页"
      background
      layout="prev, next, pages, jumper"
      jumper-text="跳转至"
      @changePage="change"
      @clickPrev="clickPrev"
      @clickNext="clickNext"
    >
    </fr-pagination>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
}
</style>
