import { createStore } from "vuex";

import user from "./user";
export interface State {
  page?: number;
}

export const store = createStore<State>({
  state: {},
  modules: {
    user,
  },
  strict: false,
});
