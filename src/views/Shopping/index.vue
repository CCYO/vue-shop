<template>
    <header>
        <h1>購物車</h1>
    </header>

    <template v-for="{ name, zh } of [{ name: 'car', zh: '待購清單' }, { name: 'order', zh: '下訂清單' }]" :key="name">
        <BButton @click="toType(name)" :active="$route.name === name">{{ zh }}</BButton>
    </template>
    <div class="container">
        <Main />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const $router = useRouter()

async function toType(name) {
    await $router.push({ name })
}
</script>

<style></style>