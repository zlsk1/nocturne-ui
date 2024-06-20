<script lang="ts" setup>
import { ref } from 'vue'
import {
  FrInputNumber,
  FrInput,
  FrLink,
  FrMessage,
  FrButton,
  FrPagination,
  FrRadio,
  FrRadioGroup,
  FrCountdown,
  FrProgress,
  FrSelect,
  FrOption,
  FrIcon,
  FrTooltip,
  FrTag
} from '@/components'

const value = ref()
const list = ref([
  {
    id: 0,
    value: 'Option1'
  },
  {
    id: 1,
    value: 'Option2'
  },
  {
    id: 2,
    value: 'Option3'
  },
  {
    id: 3,
    value: 'Option4'
  },
  {
    id: 4,
    value: 'Option5'
  },
  {
    id: 5,
    value: 'Option6'
  }
])
</script>

<template>
  <div class="container">
    <FrSelect v-model="value" style="width: 120px;">
      <FrOption
        v-for="item in list"
        :key="item.id"
        :value="item.value"
        :label="item.value"
      ></FrOption>
    </FrSelect>
  </div>
</template>

<style>
html, body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* background-color: #141414; */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.frpoppppper {
  padding: 100px;
}
</style>
