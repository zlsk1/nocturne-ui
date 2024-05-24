<script setup>
// import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <fr-tooltip
      content="it is the fr-tooltip :)"
      trigger="click"
      placement="top"
    >
      <fr-button>show tooltip</fr-button>
    </fr-tooltip>
  </div>
</template>

<style>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200%;
  height: 200%;
  background-color: #141414;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
