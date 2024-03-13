<script setup>
import { ref } from 'vue'

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
      background
      disabled
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
