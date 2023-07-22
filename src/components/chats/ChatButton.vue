<template>
    <button v-if="!store.getShowedChat" class="open-button" @click="store.openedChat()">Chat</button>
    <button v-if="store.getShowedChat" class="close-button" @click="store.openedChat()">Close Chat <i class="fa fa-close"></i></button>
</template>

<script setup lang="ts">
import { useStore } from '../../store/store'

const store = useStore()
</script>

<style scoped>
.open-button {
    background-color: #555;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    position: fixed;
    bottom: 23px;
    right: 28px;
    width: 280px;
}
.close-chat {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0;
    background-color: transparent;
}

.close-button {
    background-color: #555;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    width: 280px;
    float: right;
    right: 28px;
    position: fixed;
    min-width: 40%;
    bottom: 450px;
}
</style>
