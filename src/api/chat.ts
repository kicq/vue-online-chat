import { dialogsStore } from "@/store/dialogs";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

import { db } from "./app";

interface ChatMember {
  name: string;
  uid: string;
}

interface SendMessage {
  chatUid: string;
  from: ChatMember;
  to: ChatMember;
  text: string;
}
//
export interface MessageDB {
  id: string;
  text: string;
  from: string;
  date: Timestamp;
  isViewed: boolean;
}

export interface DialogDB {
  chatUid: string;
  /** used for query */
  membersUid: string[];
  members: ChatMember[];
  messages: MessageDB[];
}

export default class Chat {
  static async addMessage(data: SendMessage) {
    const message: MessageDB = {
      id: uuidv4(),
      text: data.text,
      from: data.from.uid,
      date: Timestamp.now(),
      isViewed: false,
    };
    if (data.chatUid) {
      const docRef = doc(db, "chats", data.chatUid);
      return updateDoc(docRef, {
        messages: arrayUnion(message),
      })
        .then(() => true)
        .catch(() => false);
    }
    const chatUid = data.to.uid + data.from.uid;
    const document: DialogDB = {
      chatUid,
      membersUid: [data.from.uid, data.to.uid],
      members: [data.from, data.to],
      messages: [message],
    };
    return setDoc(doc(db, "chats", chatUid), document)
      .then(() => true)
      .catch(() => false);
  }

  static subscribeChatsBy(uid: string) {
    const q = query(
      collection(db, "chats"),
      where("membersUid", "array-contains", uid)
    );
    const unsub = onSnapshot(q, (data) => {
      dialogsStore.updateDialogs(data.docs.map((v) => v.data()) as DialogDB[]);
    });

    return unsub;
  }
}
