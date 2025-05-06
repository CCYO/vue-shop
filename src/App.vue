<template>
    <div>
        <RouterView v-if="statusStore.isRouterAlive" />
        <div v-else>12456</div>
    </div>
    <Transition mode="out-in">
        <div v-if="statusStore.loading" class="modal">
            <p>INIT ING,,,,</p>
        </div>
    </Transition>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useStatusStore } from '@/store/status'

let statusStore = useStatusStore()

</script>

<style scoped lang="scss">
.modal {
    display: flex;
    height: 100vh;
    width: 100vw;
    color: white;
    background: red;
    opacity: .7;
    text-align: center;
    flex-direction: column;
    justify-content: center;

    >p {
        margin: 0;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
