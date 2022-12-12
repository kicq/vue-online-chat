import { SignUpForm } from "@/@types/forms";
import { UserInfo } from "@/@types/user";
import Chat from "@/api/chat";
import Users from "@/api/users";
import router from "@/router";
import { Unsubscribe } from "firebase/firestore";

interface SignInForm {
  email: string;
  password: string;
}

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { dialogsStore } from "./dialogs";

@Module({
  name: "user",
})
export default class User extends VuexModule {
  user: UserInfo = {
    uid: "",
    name: "",
    email: "",
    avatarURL: "",
  };
  isAuth = false;

  private unsub: Unsubscribe | null = null;

  @Action
  async logIn({ email, password }: SignInForm) {
    const response = await Users.signIn(email, password);
    if (response.error) return response;
    const user = await Users.getUserData(response.user.uid);
    if (user) {
      this.updateUser(user);
      this.updateAuth(true);
      router.push({ name: "home" });
    }
    return response;
  }

  @Action
  async signUp({ email, username, password }: SignUpForm) {
    const data = await Users.createUser(email, password, username);
    if (data.error) return data;
    const user = await Users.getUserData(data.user.uid);
    if (user) {
      Users.updateProfileData({ displayName: username });
      this.updateUser(user);
      this.updateAuth(true);
      router.push({ name: "home" });
    }
    return data;
  }

  @Action
  async signOut() {
    const isLoggedOut = await Users.signOut();
    if (isLoggedOut) {
      if (this.unsub) this.unsub();
      const user: UserInfo = {
        uid: "",
        name: "",
        email: "",
        avatarURL: "",
      };
      this.updateUser(user);
      this.updateAuth(false);
      router.push({ name: "login" });
    }
  }

  @Mutation
  updateUser(user: UserInfo) {
    this.user = user;
  }

  @Mutation
  updateAuth(state: boolean) {
    if (state && !this.isAuth) {
      this.unsub = Chat.subscribeChatsBy(this.user.uid);
      dialogsStore.clearDialogs();
    }
    this.isAuth = state;
  }
}
