import Chat, { DialogDB } from "@/api/chat";
import { ref } from "vue";
import { getModule } from "vuex-module-decorators";
import { store } from ".";
import User from "./user";

export interface Message {
  id: string;
  text: string;
  date: Date;
  senderUid: string;
  isViewed: boolean;
}

interface Dialog {
  chatUid: string;
  uid: string;
  name: string;
  messages: Message[];
}

interface DialogList {
  [key: string]: Dialog;
}

class Dialogs {
  showTemporaryDialog = ref(false);
  temporaryDialog = ref<Dialog>({
    chatUid: "",
    uid: "",
    name: "",
    messages: [],
  });

  dialogs = ref<DialogList>({});

  dialogIndex = ref("");

  get sortedDialogs() {
    return Object.values(this.dialogs.value)
      .sort(
        (dialog1, dialog2) =>
          dialog1.messages[dialog1.messages.length - 1].date.getTime() -
          dialog2.messages[dialog2.messages.length - 1].date.getTime()
      )
      .reverse();
  }

  get currentDialog() {
    return this.showTemporaryDialog.value
      ? this.temporaryDialog.value
      : this.dialogs.value[this.dialogIndex.value];
  }

  get currentMessages() {
    const list: Message[][] = [];

    let index = 0;
    let lastId = "";
    for (const message of this.currentDialog.messages) {
      if (!lastId) lastId = message.senderUid;
      if (lastId !== message.senderUid) index++;
      if (!list[index]) list[index] = [];
      list[index].push(message);
      lastId = message.senderUid;
    }
    return list;
  }

  get companionUnReadMessages() {
    const { user } = getModule(User, store);
    return this.currentDialog.messages.filter((message) => {
      return !message.isViewed && message.senderUid !== user.uid;
    });
  }

  selectDialog(key: string) {
    this.showTemporaryDialog.value = false;
    this.dialogIndex.value = key;
  }

  findChatByMemberUid(memberUid: string) {
    const array = Object.entries(this.dialogs.value);
    const index = array.findIndex((v) => v[1].uid === memberUid);
    return index === -1 ? false : array[index][0];
  }

  createDialog(data: { uid: string; name: string }) {
    const dialogUid = this.findChatByMemberUid(data.uid);
    if (dialogUid) {
      this.selectDialog(dialogUid);
      return;
    }
    this.temporaryDialog.value.uid = data.uid;
    this.temporaryDialog.value.name = data.name;
    this.showTemporaryDialog.value = true;
  }

  reset() {
    this.dialogIndex.value = "";
    this.showTemporaryDialog.value = false;
  }

  clearDialogs() {
    this.dialogs.value = {};
  }

  updateDialogs(data: DialogDB[]) {
    const { user } = getModule(User, store);
    // check dialogs
    data.forEach((remoteDialogRaw) => {
      const remoteDialog = toLocalDialog(remoteDialogRaw, user.uid);
      const localDialog = Object.values(this.dialogs.value).find(
        (v) => v.uid === remoteDialog.uid
      );
      if (localDialog) {
        if (localDialog.messages.length < remoteDialog.messages.length) {
          remoteDialog.messages.forEach((message) => {
            if (!localDialog.messages.some((m) => m.id === message.id)) {
              localDialog.messages.push(message);
            }
          });
        }
      } else {
        this.dialogs.value[remoteDialog.chatUid] = remoteDialog;
      }
    });
    //
  }

  async sendMessage(text: string, name: string) {
    const { user } = getModule(User, store);
    const chatUid = this.currentDialog.chatUid;
    const toUid = this.currentDialog.uid;
    const data = {
      chatUid,
      from: { uid: user.uid, name: user.name },
      to: { uid: toUid, name },
      text,
    };
    const result = await Chat.addMessage(data);
    if (result && !chatUid) this.selectDialog(toUid + user.uid);
  }
}

export const dialogsStore = new Dialogs();

function toLocalDialog(data: DialogDB, ownerUid: string): Dialog {
  const result: Dialog = {
    chatUid: data.chatUid,
    uid: "",
    name: "",
    messages: [],
  };
  const value = data.members.find((v) => v.uid !== ownerUid);
  if (value?.uid) {
    result.uid = value.uid;
    result.name = value.name;
  }
  result.messages = data.messages.map(({ id, text, from, date, isViewed }) => {
    const localMess: Message = {
      id,
      text,
      senderUid: from,
      date: date.toDate(),
      isViewed,
    };
    return localMess;
  });
  return result;
}
