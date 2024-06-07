<script lang="ts" setup>
import { ref } from 'vue'
import { FrCollapse, FrCollapseItem, FrCollapseTransition } from '@/components'

</script>

<template>
  <div class="container">
    <FrCollapse style="width: 600px;">
      <FrCollapseItem name="1" title="11111">
        <div>
          Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;
        </div>
        <div>
          Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.
        </div>
      </FrCollapseItem>
      <FrCollapseItem name="2" title="22222">
        111123333333333333
      </FrCollapseItem>
      <FrCollapseItem name="3" title="33333">
        111123333333333333
      </FrCollapseItem>
      <FrCollapseItem name="4" title="44444">
        111123333333333333
      </FrCollapseItem>
    </FrCollapse>
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
</style>
