import { app } from "./app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { UserInfo } from "@/@types/user";

const auth = getAuth(app);

interface UserDataCommon {
  user: UserInfo | null;
  error: boolean;
}

export interface UserDataResponse extends UserDataCommon {
  user: UserInfo;
  error: false;
  errorData: null;
}
export interface UserDataError extends UserDataCommon {
  user: null;
  error: true;
  errorData: {
    code: string;
    info: string;
  };
}

export default class Users {
  static createUser(
    email: string,
    password: string
  ): Promise<UserDataResponse | UserDataError> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => toUserDataResponse(user))
      .catch((error) => {
        console.log(error);
        return userDataReject(error);
      });
  }

  static signIn(
    email: string,
    password: string
  ): Promise<UserDataResponse | UserDataError> {
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => toUserDataResponse(user))
      .catch((error) => {
        return userDataReject(error);
      });
  }

  static signOut(): Promise<boolean> {
    return signOut(auth)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

  static getCurrentUser() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return toUserDataResponse(user);
      } else {
        return userDataReject(null);
      }
    });
  }

  static updateProfileData(data: {
    displayName?: string | null | undefined;
    photoURL?: string | null | undefined;
  }): Promise<boolean> {
    if (!auth.currentUser) return Promise.resolve(false);
    return updateProfile(auth.currentUser, data)
      .then(() => true)
      .catch(() => false);
  }
}

function toUserDataResponse(user: User): UserDataResponse {
  return {
    user: {
      uid: user.uid,
      name: user.displayName || "NoName",
      email: user.email || "",
      avatarURL: user.photoURL || "",
    },
    error: false,
    errorData: null,
  };
}

function userDataReject(error: unknown): UserDataError {
  const errorData = getError(error);
  return {
    user: null,
    error: true,
    errorData,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getError(error: any) {
  if (typeof error === "object" && error.code && error.message)
    return {
      code: error.code as string,
      info: error.message as string,
    };
  else
    return {
      code: "undefined",
      info: "no info",
    };
}