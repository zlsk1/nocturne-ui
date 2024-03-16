<script setup>
import { ref } from 'vue'

const arr = [1, 2]

const change = e => {
  console.log(e)
}
</script>

<template>
  <div class="container">
    <fr-collapse
      v-model="arr"
      style="width: 600px"
      accordion
      @change="change"
    >
      <fr-collapse-item
        v-for="item in arr"
        :key="item"
        :name="item"
        title="Consistency"
      >
        <div>
          Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.
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
