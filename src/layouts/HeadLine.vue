<template>
  <div class="head-line">
    <div class="content">
      <div class="title">SpaceChat</div>
      <AvatarCircle :size="3.5" :ringColor="'white'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
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
    padding: 0 1.5rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 1.6rem;
      font-weight: 800;
      letter-spacing: 0.12rem;
    }
  }
}
</style>
