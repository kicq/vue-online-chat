<template>
  <div class="input-text" :class="{ focused: isActive }">
    <div class="title">{{ title }}</div>
    <input
      @focusin="isActive = true"
      @focusout="isActive = false"
      :type="type"
      :placeholder="props.placeholder"
      :name="name"
      autocomplete="on"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  title: string;
  placeholder: string;
  /** input:type */
  type: string;
  /** input:name */
  name: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Password",
  placeholder: "default text",
  type: "text",
  name: "default",
});

const isActive = ref(false);
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables.scss";

.input-text {
  background: rgba($white, 0.1);
  width: 16rem;
  height: 3rem;
  border-radius: 0.8rem;
  border: none;
  color: $white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: box-shadow 0.4s;
  position: relative;
  &.focused {
    outline: 2px solid $blue;
    box-shadow: 0 0 0 4px rgba($blue, 0.2);
    .title {
      top: 0.2rem;
      font-size: 0.6rem;
      line-height: 0.8rem;
      color: $blue;
    }
    input {
      padding-top: 0;
    }
  }
  .title {
    position: absolute;
    margin-left: 1rem;
    top: 0.5rem;
    align-self: flex-start;
    font-size: 0.8rem;
    line-height: 0.8rem;
    transition: 0.3s;
  }
  input {
    padding: 0 1rem;
    padding-top: 0.8rem;
    font-size: 1rem;
    width: 100%;
    height: 3rem;
    transition: 0.3s;
    background: transparent;
    color: $white;
    // border: 1px solid red;
    border: none;
    outline: none;
    &::placeholder {
      color: rgba($white, 0.775);
    }
  }

  // outline: 1px solid black;
}
</style>
