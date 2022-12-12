<template>
  <div class="login-page">
    <form @submit.prevent="submit" class="form">
      <h1>Sign In</h1>
      <InputText
        v-model="form.email"
        :title="'Enter email'"
        validateType="email"
        type="email"
        required
        placeholder="Example: mail@gmail.com"
        @isValidValue="setValid('email', $event)"
      />
      <InputText
        v-model="form.password"
        title="Password"
        placeholder="Example: 123456"
        validateType="password"
        required
        type="password"
        @isValidValue="setValid('password', $event)"
      />
      <span class="error-text">{{ errorText }}</span>
      <ButtonComponent type="submit" text="Sign In" :disabled="disabled" />
      <div class="subtitle">
        New? <RouterLink to="/signup">Create an account.</RouterLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { LogInForm } from "@/@types/forms";
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputText from "@/components/InputText.vue";
import { store } from "@/store";
import User from "@/store/user";
import { ref } from "vue";
import { getModule } from "vuex-module-decorators";

const userModule = getModule(User, store);
const disabled = ref(false);

const valid = ref({
  email: false,
  password: false,
});
const form = ref<LogInForm>({
  email: "",
  password: "",
});
const errorText = ref("");

function setValid(key: keyof LogInForm, isValidValue: boolean) {
  valid.value[key] = isValidValue;
}
async function submit() {
  if (disabled.value) return;
  if (!valid.value.email || !valid.value.password) return;
  disabled.value = true;
  const result = await userModule.logIn(form.value);
  if (result.error) {
    errorText.value = result.errorData.code;
    disabled.value = false;
  }
  console.log("result", result);
}

console.log("getModule", userModule.isAuth);
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    width: 20rem;
    box-sizing: border-box;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
  }
  .title {
    align-self: center;
  }
  .subtitle {
    color: $white;
    a {
      margin-left: 0.5rem;
    }
  }

  .error-text {
    color: $red;
    font-size: 1rem;
  }
}
</style>
