<template>
  <div class="chat-list">
    <div class="dialog" v-for="i in 32" :key="i" @click="emit('onSelect')">
      <AvatarCircle />
      <div class="data">
        <div class="name">Lesli Malesly</div>
        <div class="row">
          <div class="message">You: hello. hi hey u?</div>
          <div class="time">23m</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";

interface Emits {
  // eslint-disable-next-line no-unused-vars
  (e: "onSelect"): void;
}
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
.chat-list {
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 21rem;
  max-width: 100%;
  height: 100%;
  background-color: rgba(65, 105, 225, 0.145);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 2.5rem 1rem 0.5rem;
  gap: 5px;
  box-sizing: border-box;
  &::-webkit-scrollbar {
    width: 0;
  }

  .dialog {
    width: 100%;
    height: 5rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.01) 100%
    );
    gap: 1rem;
    border-radius: 1rem;
    transition: 0.93s;
    &:hover {
      background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.05) 100%
      );
    }
    .avatar-circle {
      flex-shrink: 0;
    }
    .data {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .name {
        font-size: 1.2rem;
        font-weight: 500;
      }
      .row {
        display: flex;
        justify-content: center;
        justify-content: space-between;
      }
    }
  }
}

@media screen and (max-width: 880px) {
  .chat-list {
    width: 100%;
    display: flex;
    align-items: center;
    .dialog {
      max-width: 21rem;
    }
  }
}

@media screen and (max-width: 500px) {
  .chat-list .dialog {
    max-width: 100%;
  }
}
</style>
