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
  FrTooltip
} from '@/components'
const list = ref([
  {
    name: 'option1',
    id: 0
  },
  {
    name: 'option2',
    id: 1
  },
  {
    name: 'option3',
    id: 2
  },
  {
    name: 'option4',
    id: 3
  }
])
const id = ref('option3')
const _id = ref(list.value[0])
const ids = ref(['option2', 'option3'])
const idss = ref([list.value[0], list.value[1]])
</script>

<template>
  <div class="container">
    <FrSelect
      v-model="idss"
      style="width: 240px;"
      value-key="id"
      multiple
    >
      <FrOption
        v-for="item in list"
        :key="item.id"
        :value="item"
        :label="item.name"
      >
      </FrOption>
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
