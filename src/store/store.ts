import { defineStore } from "pinia";
//import { contactsObj, currentChatObj, messageObj, userObj } from "../classes/type";

interface Message {
    userId: string
    message: string
}

interface ChatState {
    id: string;
    chatList: Message[];
    message: Message;
    showEmoji: boolean;
    showChat: boolean;
}


export const useStore = defineStore("store", {
    state: (): ChatState => ({
        id: '',
        showEmoji: false,
        showChat: false,
        message: {} as Message,
        chatList: [],
    }),
    getters: {
        getId: (state) => state.id,
        getShowedChat: (state) => state.showChat,
        getShowedEmoji: (state) => state.showEmoji,
        getChatList: (state) => state.chatList,
    },
    actions: {
        async openedChat() {
            this.showChat = !this.showChat
        },
        async openedEmoji() {
            this.showEmoji = !this.showEmoji
        },
        async setId(id: string) {
            this.id = id
        },
        async setChat(data : Message) {
            this.chatList.push(data)
        },
    },
});