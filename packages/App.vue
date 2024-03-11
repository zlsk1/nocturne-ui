<script setup>
</script>

<template>
  <div class="container">
    <fr-timeline>
      <fr-timeline-item
        timestamp="2020-10-12"
        placement="top"
        size="large"
        icon="eye"
      >
        start
      </fr-timeline-item>
      <fr-timeline-item timestamp="2020-10-12" type="primary">
        start
      </fr-timeline-item>
    </fr-timeline>
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
