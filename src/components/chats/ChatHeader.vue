<template>
    <div class="header-chat">
        <i class="icon fa fa-hashtag" aria-hidden="true"></i>
        <p class="name">general</p>
        <i class="icon clickable fa fa-users right" aria-hidden="true"></i>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.header-chat {
    background-color: #FFF;
    height: 50px;
    box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.100);
    display: flex;
    align-items: center;
}

.header-chat .icon {
    margin-left: 20px;
    color: #515151;
    font-size: 14pt;
}

.header-chat .name {
    margin: 0 0 0 10px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13pt;
    font-weight: 500;
    color: #515151;
}

.header-chat .right {
    position: absolute;
    right: 40px;
}

.clickable {
    cursor: pointer;
}</style>
