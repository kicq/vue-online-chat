<template>
  <div class="input-search">
    <input
      :value="modelValue"
      placeholder="Search user..."
      type="text"
      name="search"
      @keyup="emit('onInput', text)"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      @click="emit('onInput', text)"
    >
      <path
        stroke="#fff"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 6 6"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  modelValue: string;
}
defineProps<Props>();

interface Emits {
  (event: "onInput", text: string): void;
  (event: "update:modelValue", text: string): void;
}

const text = ref("");

const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.input-search {
  width: 100%;
  height: 3rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  input {
    background: transparent;
    width: 100%;
    border: none;
    outline: none;
    color: $white;
  }
  ::placeholder {
    color: rgba($white, 0.6);
  }
  svg {
    padding: 0 0.2rem;
    &:hover {
      path {
        stroke: rgba($white, 0.6);
      }
    }
  }
  color: $white;
}
</style>
