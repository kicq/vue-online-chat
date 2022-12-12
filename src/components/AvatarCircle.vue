<template>
  <div
    class="avatar-circle"
    :style="{
      minWidth: `${size}rem`,
      width: `${size}rem`,
      height: `${size}rem`,
      outlineColor: ringColor,
      background: color() + 'CC',
    }"
  >
    {{ name.slice(0, 2).toUpperCase() }}
  </div>
</template>

<script lang="ts" setup>
import stc from "string-to-color";
import { computed } from "vue";

interface Props {
  size?: number;
  ringColor?: string;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 3,
  ringColor: "#ffffff",
});

const ringColor = computed(() => {
  return stc(props.name) + "BA";
});

function color() {
  return stc(props.name);
}
</script>

<style lang="scss" scoped>
.avatar-circle {
  width: 3rem;
  height: 3rem;
  font-size: 12px;
  border-radius: 100%;
  background: rgb(113, 94, 94);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  outline: 0.1rem solid rgb(68, 68, 68);
  outline-offset: 0.1rem;
}
</style>
