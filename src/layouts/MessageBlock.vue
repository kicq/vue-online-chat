<template>
  <div class="message-block" :class="{ 'align-left': isAlignRight }">
    <div class="time-date">
      {{ timeAgo.format(messages[0].date) }}
    </div>
    <div class="row">
      <AvatarCircle :name="getName(messages[0].senderUid)" />
      <div class="list">
        <div v-for="(message, key) of messages" :key="key" class="flex">
          <div class="message">
            {{ message.text }}
          </div>
          <div class="time">
            {{ timeAgo.format(messages[0].date) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
import { store } from "@/store";
import { dialogsStore, Message } from "@/store/dialogs";
import User from "@/store/user";
import TimeAgo from "javascript-time-ago";
import { getModule } from "vuex-module-decorators";

const timeAgo = new TimeAgo("en-US");

const { user } = getModule(User, store);

interface Props {
  isAlignRight: boolean;
  messages: Message[];
}

withDefaults(defineProps<Props>(), {
  isAlignRight: false,
});

function getName(uid: string): string {
  if (user.uid === uid) return user.name;
  return dialogsStore.currentDialog.name;
}
</script>

<style lang="scss" scoped>
.message-block {
  width: 100%;
  min-height: 5rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .row {
    display: flex;
    width: 100%;
  }
  .avatar-circle {
    margin: 0 1rem;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    width: 100%;
    align-items: flex-start;
    .flex {
      display: flex;
      flex-direction: column;
      align-items: inherit;
      .time {
        align-self: inherit;
        opacity: 0;
        padding: 0 0.8rem;
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.11);
      }
      &:hover {
        .time {
          opacity: 1;
        }
      }
    }
    .message {
      cursor: pointer;
      width: fit-content;
      max-width: 100%;
      background: rgba(255, 255, 255, 0.11);
      padding: 0.2rem 1.2rem;
      border-radius: 2rem;
      font-size: 1.1rem;
      line-height: 200%;
    }
  }

  .time-date {
    align-self: center;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.21);
    padding: 1rem 0;
  }

  &.align-left {
    .row {
      flex-direction: row-reverse;
    }

    .list {
      align-items: flex-end;
    }
  }
}
</style>
