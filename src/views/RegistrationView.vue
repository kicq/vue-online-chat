<template>
  <div class="registration-page">
    <form @submit.prevent="submit">
      <h1>Sign Up</h1>
      <InputText
        v-model="form.username"
        title="Username"
        placeholder="Example: Andrew Smith"
        validateType="username"
        @isValidValue="setValid('username', $event)"
        required
      />
      <InputText
        v-model="form.email"
        title="Email"
        placeholder="Example: example@gm.ru"
        validateType="email"
        @isValidValue="setValid('email', $event)"
        required
      />
      <InputText
        v-model="form.password"
        title="Password"
        placeholder="Example: '123456'"
        type="password"
        validateType="password"
        @isValidValue="setValid('password', $event)"
        required
      />
      <InputText
        v-model="form.passwordRepeat"
        title="Password"
        placeholder="Repeat the password"
        type="password"
        validateType="password"
        @isValidValue="setValid('passwordRepeat', $event)"
        required
      />
      <span class="error-text">{{ errorText }}</span>
      <ButtonComponent type="submit" text="Sign up" :disabled="disabled" />
      <div class="subtitle">
        Already have an account? <RouterLink to="/login">Sign in →</RouterLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { SignUpForm } from "@/@types/forms";
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputText from "@/components/InputText.vue";
import User from "@/store/user";
import { store } from "@/store";
import { getModule } from "vuex-module-decorators";

const userModule = getModule(User, store);
const disabled = ref(false);
const errorText = ref("");

const valid = ref({
  username: false,
  email: false,
  password: false,
  passwordRepeat: false,
});

const form = ref<SignUpForm>({
  email: "",
  username: "",
  password: "",
  passwordRepeat: "",
});

function setValid(key: keyof SignUpForm, isValidValue: boolean) {
  if (key === "passwordRepeat") {
    if (form.value.password !== form.value.passwordRepeat) {
      errorText.value = "Passwords mismatch";
      isValidValue = false;
    } else errorText.value = "";
  }
  valid.value[key] = isValidValue;
}

function isFormValid() {
  return Object.values(valid.value).every((v) => v);
}

async function submit() {
  if (disabled.value) return;
  if (!isFormValid()) return;
  disabled.value = true;
  const data = await userModule.signUp(form.value);
  if (data.error) {
    errorText.value = data.errorData.code;
    disabled.value = true;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/variables";
.registration-page {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
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
