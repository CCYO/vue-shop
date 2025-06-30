<template>
    <header>
        <h1>Vue3商城</h1>
    </header>
    <template v-for="{ id, en, zh } of goodsStore.types" :key="id">
        <BButton @click="goodsStore.changeCurrentType(en)" :active="$route.params.type === en">{{ zh }}</BButton>
    </template>
    <Main />
</template>

<script setup>
import Main from '@/components/main/index.vue'
import { useGoodsStore } from '@/store/goods'

let goodsStore = useGoodsStore()
</script>


<style scoped lang="scss">
.nav {
    justify-content: center;
}

button.active {
    pointer-events: none;
}
</style>