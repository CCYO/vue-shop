<template>
    <BTabs content-class="mt-3">
        <BTab title="Login" :active="!userStore.isRegisterTabActive" @click="userStore.toggleRegisterTab(false)">
            <Login />
        </BTab>
        <BTab title="Register" :active="userStore.isRegisterTabActive" @click="userStore.toggleRegisterTab(true)">
            <Register />
        </BTab>
    </BTabs>
</template>

<script setup>
import Login from './login.vue'
import Register from './register.vue';
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

</script>

<style lang="scss">
button.active {
    pointer-events: none;
}
</style>