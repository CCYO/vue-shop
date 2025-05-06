<template>
    <header>
        <h1>Vue3商城</h1>
    </header>
    <template v-for="{ id, zh, en } of goodStore.types" :key="id">
        <BButton @click="goodStore.changeCurrentType(en)" :active="$route.params.type === en">{{ zh }}</BButton>
    </template>
    <Main />
</template>

<script setup>
import Main from '@/components/main/index.vue'
import { useGoodStore } from '@/store/goods'

let goodStore = useGoodStore()
</script>


<style scoped lang="scss">
.nav {
    justify-content: center;
}

button.active {
    pointer-events: none;
}
</style>