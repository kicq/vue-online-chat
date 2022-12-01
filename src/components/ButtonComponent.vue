<template>
  <button :type="type">{{ text }}</button>
</template>

<script lang="ts" setup>
interface Props {
  text: string;
  type?: "button" | "submit" | "reset";
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
$blue: #1d90f5;
button {
  padding: 0 2rem;
  width: fit-content;
  height: 3rem;
  background: $blue;
  border-radius: 2rem;
  border: none;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background: #fff;
    color: $blue;
  }
}
</style>
