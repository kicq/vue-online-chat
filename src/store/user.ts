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
      this.updateData(data.user, true);
      router.push({ name: "home" });
      return data;
    }
  }

  @Action
  async signUp({ email, username, password }: SignUpForm) {
    const data = await Users.createUser(email, password);
    if (data.error) return data;
    else {
      Users.updateProfileData({ displayName: username });
      this.updateData(data.user, true);
      router.push({ name: "home" });
      return data;
    }
  }

  @Mutation
  private updateData(user: UserInfo, auth: boolean) {
    this.user = user;
    this.isAuth = auth;
  }
}
