<template>
  <div class="home-page">
    <HeaderLayout />
    <div class="content">
      <ChatsList
        :class="{ hidden: showChat }"
        @onSelect="showChat = !showChat"
      />
      <DialogBox
        :showChat="showChat"
        :class="{ hidden: !showChat }"
        @onExit="() => (showChat = !showChat)"
      />
    </div>
    <PopUp v-if="showSettings" />
  </div>
</template>

<script lang="ts" setup>
import HeaderLayout from "@/layouts/HeadLine.vue";
import ChatsList from "@/layouts/ChatsList.vue";
import DialogBox from "@/layouts/DialogBox.vue";
import { ref } from "vue";
import PopUp from "@/layouts/PopUp.vue";

const showChat = ref(true);
const showSettings = ref(false);
</script>

<style lang="scss" scoped>
.home-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  .content {
    display: flex;
    flex-shrink: 0;
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.119);
    height: calc(100% - 5rem);
  }
}

@media screen and (max-width: 880px) {
  .hidden {
    display: none;
  }
}
</style>
