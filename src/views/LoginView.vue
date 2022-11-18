<template>
  <div class="login-page">
    <div class="title">Log In</div>
    <InputText title="Логин или email" placeholder="Введите логин" />
    <InputText title="Пароль" placeholder="Введите пароль" type="password" />
    <ButtonComponent text="Войти" />
    <div>New? <RouterLink to="/">Create an account.</RouterLink></div>
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputText from "@/components/InputText.vue";
</script>

<style lang="scss" scoped>
.login-page {
  width: 20rem;
  box-sizing: border-box;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
  margin: 0 auto;
  margin-top: 10rem;
  .title {
    align-self: center;
  }
}
</style>
