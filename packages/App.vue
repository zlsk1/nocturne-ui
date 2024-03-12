<script setup>
const change = e => {
  console.log(e)
}
</script>

<template>
  <div class="container">
    <fr-pagination
      page-count="5"
      background
      small
      @changePage="change"
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
