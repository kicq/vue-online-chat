<template>
  <div
    class="input-text"
    :class="{ focused: isActive, invalid: !isValidValue }"
  >
    <div class="title">{{ title || props.title }}</div>
    <input
      @focusin="isActive = true"
      @focusout="focusOut"
      :type="type"
      :placeholder="props.placeholder"
      :name="name"
      autocomplete="on"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { Validation } from "@/utils/validation";
import { ref } from "vue";

interface Props {
  modelValue: string;
  title: string;
  placeholder: string;
  validateType?: "email" | "password" | "username";
  required?: boolean;
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

interface Emits {
  (event: "update:modelValue", text: string): void;
  (event: "isValidValue", isValidValue: boolean): void;
}
const emit = defineEmits<Emits>();
const isValidValue = ref<boolean>(true);
const title = ref("");
function focusOut() {
  isActive.value = false;
  if (props.required && Validation.isEmpty(props.modelValue)) {
    isValidValue.value = false;
    title.value = "This field is required";
    return emit("isValidValue", isValidValue.value);
  }
  if (!props.validateType) return;
  const { message, error } = Validation[props.validateType](props.modelValue);
  isValidValue.value = !error;
  title.value = message;
  emit("isValidValue", isValidValue.value);
}

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
  &.invalid {
    outline: 2px solid $red;
    box-shadow: 0 0 0 4px rgba($red, 0.2);
    .title {
      color: $red;
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
