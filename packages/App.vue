<script setup>
const handleClose = () => {
  console.log(1111)
}
</script>

<template>
  <div class="container">
    <fr-alert
      style="width: 600px;"
      type="success"
      effect="dark"
      title="alert"
      show-icon
      description="hello"
      close-text="close"
      @close="handleClose"
    >
    </fr-alert>
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
