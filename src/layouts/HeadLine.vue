<template>
  <div class="head-line">
    <div class="content">
      <div class="title">
        <LogoSVG />
        <span>SpaceChat</span>
      </div>
      <div class="right">
        <div class="username">
          {{ user.name }}
        </div>
        <ButtonComponent @click="logOut" text="logout" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ButtonComponent from "@/components/ButtonComponent.vue";
import LogoSVG from "@/components/LogoSVG.vue";
import { store } from "@/store";
import User from "@/store/user";
import { getModule } from "vuex-module-decorators";
const { signOut, user } = getModule(User, store);
function logOut() {
  signOut();
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.head-line {
  width: 100%;
  height: 5rem;
  background: linear-gradient(
    0deg,
    rgba($white, 0.01) 0%,
    rgba($white, 0.1) 100%
  );
  border-bottom: 0.2rem solid rgba($blue, 1);
  flex-shrink: 0;
  .content {
    margin: 0 auto;
    max-width: 90rem;
    padding: 0 0.5rem 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: 0.12rem;
    }
    .right {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      .username {
        font-size: 1.4rem;
        font-weight: 700;
      }
    }
  }
}

@media screen and (max-width: 500px) {
  .title {
    span {
      display: none;
    }
  }

  .head-line .content .right {
    gap: 1rem;
    .username {
      font-size: 1rem;
    }
  }
}
</style>
