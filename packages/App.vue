<script setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container">
    <fr-collapse style="width: 1000px" accordion>
      <fr-collapse-item title="countdown" name="1">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.
        </div>
      </fr-collapse-item>
      <fr-collapse-item title="statistic" name="2">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.
        </div>
      </fr-collapse-item>
    </fr-collapse>
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
