<template>
  <div class="search-user">
    <InputSearch v-model="searchString" />
    <div class="content" style="margin-top: 1rem">
      <div
        @click="emit('onSelect', item)"
        v-for="item of filtered"
        :key="item.uid"
        class="user"
      >
        <AvatarCircle :name="item.name" :size="2.5" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserInfo } from "@/@types/user";
import Users from "@/api/users";
import AvatarCircle from "@/components/AvatarCircle.vue";
import InputSearch from "@/components/InputSearch.vue";
import { store } from "@/store";
import User from "@/store/user";
// import { dialogsStore } from "@/store/dialogs";
import { computed, onMounted, ref } from "vue";
import { getModule } from "vuex-module-decorators";

interface Emits {
  (event: "onSelect", item: UserInfo): string;
}
const { user } = getModule(User, store);

const emit = defineEmits<Emits>();

const searchString = ref("");
const users = ref<UserInfo[]>([]);
const filtered = computed(() => {
  return users.value.filter(
    (v) =>
      v.name.toLowerCase().includes(searchString.value.toLowerCase()) &&
      v.uid !== user.uid
  );
});

onMounted(async () => {
  users.value = await Users.getUserList();
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/main.scss";
@import "@/assets/styles/variables.scss";
.search-user {
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    overflow-y: auto;
    @include scroll-bar;
  }
}
.user {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.6rem;
  border-radius: 1rem;
  transition: 0.3s;
  margin-right: 0.4rem;
  cursor: pointer;
  .name {
    font-size: 1.2rem;
  }
  &:hover {
    background-color: rgba($white, 0.1);
  }
}
</style>
