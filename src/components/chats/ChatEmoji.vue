<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '../../store/store';

const emoji = ref<string[]>(['&#128512;', '&#128513;', '&#128514;', '&#128515;', '&#128516;', '&#128517;', '&#128518;', '&#128519;', '&#128520;', '&#128521;', '&#128522;', '&#128523;', '&#128524;', '&#128525;', '&#128526;', '&#128527;', '&#128528;', '&#128529;', '&#128530;', '&#128531;'])
const store = useStore()

const props = defineProps({
    modelValue: String,
    modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function compileEmoji(inputText: string) {
    const div = document.createElement('div');
    div.innerHTML = inputText;
    return div.innerHTML;
}

function handleEmoji(emoticon: string) {
    let value = props.modelValue + compileEmoji(emoticon);
    emit('update:modelValue', value);
    store.openedEmoji();
}
</script>

<template>
    <div v-if="store.showEmoji" class="emoji-chat">
        <p v-for="item in emoji" :key="item" @click="handleEmoji(item)" class="clickable emoji" v-html="item">
        </p>
    </div>
</template>

<style scoped>
.emoji-chat {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto auto auto;
    align-items: center;
    position: absolute;
    bottom: 0;
    background-color: white;
    padding: 10px;
}
.emoji {
    font-size: 20pt;
    padding: 2px 20px;
}

.clickable {
    cursor: pointer;
}
</style>
