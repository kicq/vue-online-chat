<template>
  <div class="dialog-box">
    <template v-if="dialogsStore.currentDialog">
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
        <div class="title">
          {{ dialogsStore.currentDialog.name }}
        </div>
        <AvatarCircle :name="dialogsStore.currentDialog.name" :size="2" />
      </div>
      <div class="messages" ref="messages">
        <div class="content">
          <MessageBlock
            v-for="(item, key) of dialogsStore.currentMessages"
            :key="key"
            :messages="item"
            :isAlignRight="item[0].senderUid === user.uid"
          />
        </div>
      </div>
      <SendInputBlock @onInput="handleSend($event)" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
import SendInputBlock from "@/components/SendInputBlock.vue";
import { store } from "@/store";
import { dialogsStore } from "@/store/dialogs";
import User from "@/store/user";
import { onUpdated, ref } from "vue";
import { getModule } from "vuex-module-decorators";
import MessageBlock from "./MessageBlock.vue";

const { user } = getModule(User, store);

const messages = ref<HTMLElement | null>(null);

interface Emits {
  (e: "onExit"): void;
}
const emit = defineEmits<Emits>();

onUpdated(() => {
  if (messages.value) messages.value.scrollTo(0, messages.value.scrollHeight);
});

function handleSend(text: string) {
  dialogsStore.sendMessage(text, dialogsStore.currentDialog.name);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";

.dialog-box {
  min-width: 10rem;
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
      margin-right: 1rem;
    }
  }

  .messages {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    .content {
      padding: 4rem 0 1.5rem;
      margin: 0 auto;
      width: 85%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    @include scroll-bar;
    .message-block {
      flex-shrink: 0;
    }
  }
}

@media screen and (max-width: 500px) {
  .dialog-box {
    .messages {
      .content {
        padding: 2rem 0 0.5rem;
        width: 100%;
      }
    }
  }
}
</style>
