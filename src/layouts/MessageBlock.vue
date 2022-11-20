<template>
  <div class="message-block" :class="{ 'align-left': isAlignRight }">
    <AvatarCircle />
    <div class="list">
      <div v-for="(message, key) of messagesList" :key="key" class="message">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AvatarCircle from "@/components/AvatarCircle.vue";
interface Props {
  isAlignRight: boolean;
}

withDefaults(defineProps<Props>(), {
  isAlignRight: false,
});

const messagesList = [
  "Message for ypu",
  "hey",
  "Are you okey?? What are yu doing now? What are the hell is it?",
];
</script>

<style lang="scss" scoped>
.message-block {
  width: 100%;
  min-height: 5rem;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  .avatar-circle {
    margin: 0 1rem;
  }
  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .message {
      width: fit-content;
      max-width: 70%;
      background: rgba(255, 255, 255, 0.11);
      padding: 0.2rem 1.2rem;
      border-radius: 2rem;
      font-size: 1.2rem;
      line-height: 200%;
    }
  }

  &.align-left {
    flex-direction: row-reverse;

    .list {
      align-items: flex-end;
    }
  }
}
</style>
