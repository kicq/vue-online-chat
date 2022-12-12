<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { getModule } from "vuex-module-decorators";
import Users from "./api/users";
import router from "./router";
import { store } from "./store";
import User from "./store/user";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

const { updateAuth, updateUser } = getModule(User, store);

onMounted(async () => {
  const data = await Users.getCurrentUser();
  if (data.user) {
    updateUser(data.user);
    updateAuth(true);
    router.push({ name: "home" });
  }
});
</script>
<style lang="scss">
@import "~@/assets/styles/main.scss";
#app {
  color: $white;
  box-sizing: border-box;
  background-color: $blue;
  background-image: linear-gradient(135deg, #342e2e 0%, #232660 100%);
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
