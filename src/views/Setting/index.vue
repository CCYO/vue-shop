<template>
    <header>
        <h1>個人設置</h1>
    </header>

    <button @click="logout()">登出</button>
</template>

<script setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

async function logout() {
    await userStore.logout()
    alert('成功登出')
}

</script>

<style scoped></style>