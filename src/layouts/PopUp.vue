<template>
  <div class="outside" @click="counter += 10">
    <div class="popup" @click.stop="counter += 3">value {{ counter }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const counter = ref(0);
</script>

<style lang="scss" scoped>
.outside {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
}
.popup {
  width: 20rem;
  min-height: 10rem;
  border-radius: 1rem;
  background-color: gray;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
