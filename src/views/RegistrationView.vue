<template>
  <div class="registration-page">
    <form action="">
      <h1>Sign Up</h1>
      <InputText title="Login" placeholder="Enter login" />
      <InputText title="Email" placeholder="Enter your email" />
      <InputText
        title="Password"
        placeholder="Enter password"
        type="password"
      />
      <InputText
        title="Password"
        placeholder="Repeat the password"
        type="password"
      />
      <ButtonComponent text="Sign up" />
      <div class="subtitle">
        Already have an account? <RouterLink to="/login">Sign in →</RouterLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputText from "@/components/InputText.vue";
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
}
</style>
