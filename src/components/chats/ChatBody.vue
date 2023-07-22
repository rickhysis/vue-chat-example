<script setup lang="ts">
import { computed, ref } from 'vue';
import ChatHeader from './ChatHeader.vue';
import ChatEmoji from './ChatEmoji.vue';
import { useStore } from '../../store/store';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';

const { VITE_WS } = import.meta.env
const message = ref<string>('');
const typing = ref<boolean>(false)

const store = useStore()
const socket = io(VITE_WS);
const chatList = computed(() => store.getChatList)

socket.on("connect", () => {
    const uid = uuidv4();

    console.log('Connected', socket.connected);
    store.setId(uid);
});

socket.on("basicId", (id: string) => {
    console.log(id);
});

socket.on("typing", (id: string) => {
    if (id !== store.getId) {
        typing.value = true;
        setTimeout(() => {
            typing.value = false;
        }, 2000);
    }
});

socket.on("message", (args: any) => {
    console.log(args)
    store.setChat(args)
    console.log(chatList.value)
});

socket.on("disconnect", () => {
    console.log(socket.id);
});

function handleTyping(e: any) {
    console.log(e.target);
    socket.emit('typing', store.getId);
}

function handleMessage(e: any) {
    const data = { userId: store.getId, message: message.value };

    console.log(e.target, message);
    store.setChat(data);
    socket.emit('message', data);
    message.value = '';
}
</script>

<template>
    <section v-if="store.$state.showChat" class="chat">
        <ChatHeader />
        <div class="messages-chat">
            <div v-for="item in chatList" :key="item.message" class="message">
                <div :class="{ response: item.userId === store.$state.id, sender: item.userId !== store.$state.id }">
                    <Transition name="slide-fade">
                        <p v-if="item.userId === store.$state.id" class="text"> {{ item.message }}</p>
                    </Transition>
                    <div :class="{ photo: true, 'photo-sender': item.userId === store.$state.id, 'photo-receiver': item.userId !== store.$state.id }">
                        <div class="online"></div>
                    </div>
                    <Transition name="slide-fade">
                        <p v-if="item.userId !== store.$state.id" class="text"> {{ item.message }}</p>
                    </Transition>
                </div>
            </div>
            <div v-if="typing" class="message">
                <div class="sender">
                    <div :class="{ photo: true, 'photo-receiver': true }">
                        <div class="online"></div>
                    </div>
                    <Transition name="slide-fade">
                        <p class="text">Typing...</p>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="footer-chat">
            <input type="text" class="write-message" placeholder="Type your message here" v-model="message"
                @keyup="handleTyping" @keyup.enter="handleMessage" />
            <i class="icon fa fa-smile-o clickable" aria-hidden="true" @click="store.openedEmoji"></i>
            <i class="icon send fa fa-paper-plane-o clickable" aria-hidden="true" @click="handleMessage"></i>
        </div>
        <ChatEmoji v-model="message" />
    </section>
</template>

<style scoped>
.chat {
    background: url(../../assets/images/background-chat.png);
    color: #000;
    position: fixed;
    bottom: 0;
    right: 28px;
    border: 3px solid #f1f1f1;
    z-index: 9;
    border: 8px solid #d8d8d8;
    min-width: 40%;
    min-height: 50%;
}

.messages-chat {
    padding: 25px 35px;
    overflow-y: auto;
    max-height: 500px;
}

.message {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.photo {
    display: block;
    width: 45px;
    height: 45px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 50%;
}
.photo-sender{
    background-image: url(https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg);
}
.photo-receiver {
    background-image: url(https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80);
}

.text {
    margin: 0 35px;
    background-color: #f6f6f6;
    padding: 15px;
    border-radius: 12px;
}

.time {
    font-size: 10px;
    color: lightgrey;
    margin-bottom: 10px;
    margin-left: 85px;
}

.response-time {
    float: right;
    margin-right: 40px !important;
}

.sender {
    margin-right: 0px !important;
    margin-left: 0px;
    display: inline-flex;
}

.response {
    float: right;
    margin-right: 0px !important;
    margin-left: auto;
    display: inline-flex;

    /* flexbox alignment rule */
    .text {
        background-color: #e3effd !important;
    }
}



.footer-chat {
    width: 100%;
    display: grid;
    grid-template-columns: 75% 10% 15%;
    align-items: center;
    position: absolute;
    bottom: 0;
    background-color: transparent;


    *::-webkit-input-placeholder {
        color: #000;
        font-size: 13pt;
    }

    input {
        *:-moz-placeholder {
            color: #000;
            font-size: 13pt;
        }

        *::-moz-placeholder {
            color: #000;
            font-size: 13pt;
            margin-left: 5px;
        }

        *:-ms-input-placeholder {
            color: #000;
            font-size: 13pt;
        }
    }
}

.send {
    font-size: 14pt;
    color: #fff;
    background-color: #4f6ebd;
    position: absolute;
    right: 5px;
    padding: 13px 13px 13px 13px;
    border-radius: 50px;
}

.fa-smile-o {
    border-width: 2px 2px 2px 0px;
    border-style: solid;
    font-size: 22pt;
    border-color: #4f6ebd;
    border-radius: 0 0.3rem 0.3rem 0;
    padding: 8px;
}

.write-message {
    height: 50px;
    padding: 10px;
    background: transparent;
    color: #000;
    border-radius: 0.3rem 0 0 0.3rem;
    border-width: 2px 0px 2px 2px;
    border-style: solid;
    border-color: #4f6ebd;
}

.write-message:focus {
    outline: none;
}



.clickable {
    cursor: pointer;
}
</style>
