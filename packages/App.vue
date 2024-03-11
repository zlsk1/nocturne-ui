<script setup>
</script>

<template>
  <div class="container">
    <fr-badge
      :value="12"
      :max="10"
    >
      <fr-button>badge</fr-button>
    </fr-badge>
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
