<template>
  <div class="chat-list">
    <TabComponent
      :list="tabList"
      :selected="currentTabIndex"
      @onSelect="currentTabIndex = $event"
    />
    <div v-if="tabList[currentTabIndex].key === 'dialogs'" class="content">
      <div
        class="dialog"
        v-for="(item, key) of dialogsStore.sortedDialogs"
        :key="item.chatUid + key"
        @click="emit('onSelect', item.chatUid)"
        :class="{
          active: dialogsStore.currentDialog
            ? item.chatUid === dialogsStore.currentDialog.chatUid
            : false,
        }"
      >
        <AvatarCircle :name="item.name" />
        <div class="data">
          <div class="name">{{ item.name }}</div>
          <div class="row">
            <div class="message">
              {{ toAbbreviated(item.messages[item.messages.length - 1].text) }}
            </div>
            <div class="time">
              {{ timeAgo.format(item.messages[item.messages.length - 1].date) }}
            </div>
          </div>
        </div>
      </div>
      <div class="empty" v-if="!dialogsStore.sortedDialogs.length">
        <div>You have not any dialogs</div>
        <div class="fill" @click="currentTabIndex++">> Search user</div>
      </div>
    </div>
    <template v-if="tabList[currentTabIndex].key === 'search'">
      <SearchUser @onSelect="openNewDialog" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
import TabComponent from "@/components/TabComponent.vue";
import { dialogsStore } from "@/store/dialogs";
import { ref } from "vue";
import SearchUser from "./SearchUser.vue";
import TimeAgo from "javascript-time-ago";
import { UserInfo } from "@/@types/user";
const timeAgo = new TimeAgo("en-US");

const currentTabIndex = ref(0);
const tabList = ref([
  { key: "dialogs", title: "Dialogs" },
  { key: "search", title: "Search user" },
]);

function toAbbreviated(text: string) {
  return text.length > 25 ? text.slice(0, 25) + "..." : text;
}

function openNewDialog(item: UserInfo) {
  dialogsStore.createDialog(item);
  emit("onSelect", "");
}

interface Emits {
  (event: "onSelect", chatUid: string): void;
}

const emit = defineEmits<Emits>();
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.chat-list {
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 21rem;
  max-width: 100%;
  height: 100%;
  background-color: rgba(65, 105, 225, 0.145);
  display: flex;
  flex-direction: column;

  padding: 0.5rem 1rem 0.5rem;
  box-sizing: border-box;

  .content {
    width: 100%;
    display: flex;
    overflow-y: scroll;
    flex-direction: column;
    gap: 5px;
    &::-webkit-scrollbar {
      width: 0;
    }
  }

  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    color: rgba($white, 0.5);
    .fill {
      cursor: pointer;
      text-decoration: underline;
      color: $white;
      &:hover {
        color: $blue;
      }
    }
  }

  .dialog {
    cursor: pointer;
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
    &.active {
      background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.25) 0%,
        rgba(255, 255, 255, 0.1) 100%
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
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .time {
          align-self: flex-end;
          font-size: 0.7rem;
          color: rgba($white, 0.5);
        }
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
      max-width: 100%;
    }
  }
}

@media screen and (max-width: 500px) {
  .chat-list {
    width: 100%;
  }
  .chat-list .dialog {
    max-width: 100%;
  }
}
</style>
