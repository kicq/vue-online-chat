<template>
  <div class="tabs-component">
    <div
      v-for="({ title, key }, index) of list"
      :key="key"
      class="tab"
      :class="{ active: index === selected }"
      @click="$emit('onSelect', index)"
    >
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  list: { key: string; title: string }[];
  selected: number;
}
defineProps<Props>();

interface Emits {
  (event: "onSelect", key: number): void;
}
defineEmits<Emits>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.tabs-component {
  padding: 0.7rem 0;
  display: flex;
  gap: 0.5rem;
  .tab {
    border-radius: 1rem;
    padding: 0.6rem 0.8rem;
    background: $blue;
    transition: 0.3s;
    cursor: pointer;
    &:hover,
    &.active {
      background: $white;
      color: $blue;
    }
  }
}
</style>
