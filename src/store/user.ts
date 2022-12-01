import { SignUpForm } from "@/@types/forms";
import { UserInfo } from "@/@types/user";
import Users from "@/api/users";
import router from "@/router";

interface SignInForm {
  email: string;
  password: string;
}

import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

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

  @Action
  async logIn({ email, password }: SignInForm) {
    const data = await Users.signIn(email, password);
    if (data.error) return data;
    else {
      this.updateUser(data.user);
      this.updateAuth(true);
      router.push({ name: "home" });
      return data;
    }
  }

  @Action
  async signUp({ email, username, password }: SignUpForm) {
    const data = await Users.createUser(email, password, username);
    console.log("signUp", data);
    if (data.error) return data;
    else {
      Users.updateProfileData({ displayName: username });
      this.updateUser(data.user);
      this.updateAuth(true);
      router.push({ name: "home" });
      return data;
    }
  }

  @Action
  async signOut() {
    const isLoggedOut = await Users.signOut();
    if (isLoggedOut) {
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
    this.isAuth = state;
  }
}
