<template>
  <div class="dialog-box">
    <template v-if="props.showChat">
      <div class="headline">
        <div @click="emit('onExit')" class="arrow">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path
              fill="#fff"
              d="M21 13a1 1 0 1 0 0-2v2ZM3 11a1 1 0 1 0 0 2v-2Zm18 0H3v2h18v-2Z"
            />
            <path
              fill="#fff"
              d="M7.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM3 12l-.707-.707a1 1 0 0 0 0 1.414L3 12Zm5.707-4.293a1 1 0 0 0-1.414-1.414l1.414 1.414Zm0 8.586-5-5-1.414 1.414 5 5 1.414-1.414Zm-5-3.586 5-5-1.414-1.414-5 5 1.414 1.414Z"
            />
          </svg>
        </div>
        <div class="title">Kirill Kharitonov</div>
        <AvatarCircle :size="2" />
      </div>
      <div class="messages">
        <div class="content">
          <MessageBlock :isAlignRight="false" />
          <MessageBlock :isAlignRight="true" />
          <MessageBlock :isAlignRight="false" />
          <MessageBlock :isAlignRight="true" />
          <MessageBlock :isAlignRight="false" />
          <MessageBlock :isAlignRight="true" />
        </div>
      </div>
      <SendInputBlock />
    </template>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
import SendInputBlock from "@/components/SendInputBlock.vue";
import MessageBlock from "./MessageBlock.vue";
interface Props {
  showChat: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  showChat: false,
});

interface Emits {
  // eslint-disable-next-line no-unused-vars
  (e: "onExit"): void;
}
const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";

.dialog-box {
  min-width: 30rem;
  width: 100%;
  background-size: cover;
  background: #005c97;
  background: linear-gradient(to right, #363795, #005c97);
  display: flex;
  flex-direction: column;
  .headline {
    width: 100%;
    min-height: 4rem;
    display: flex;
    align-items: center;
    background: rgba($white, 0.175);
    .arrow {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      &:hover {
        background: rgba($white, 0.1);
      }
      svg {
        width: 2rem;
        height: 2rem;
      }
    }
    .title {
      font-size: 1.2rem;
      margin-left: 2rem;
    }
    .avatar-circle {
      margin-left: auto;
      margin-right: 3rem;
    }
  }

  .messages {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .content {
      padding: 4rem 0 1.5rem;
      margin: 0 auto;
      width: 85%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    &::-webkit-scrollbar {
      width: 0.5rem;
    }
    &::-webkit-scrollbar-track {
      background-color: rgba(130, 120, 120, 0);
      border-radius: 1rem;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 1rem;
      box-shadow: inset 0 0 1rem rgba($white, 0.1);
    }
    .message-block {
      flex-shrink: 0;
    }
  }
}
</style>
