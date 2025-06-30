<template>
    <BNavbar class="my-navbar" v-b-color-mode="'dark'" variant="primary" fixed="bottom">
        <BNavbarNav class="w-100">
            <BNavItem v-for="{ path, title } of list" :to="path" :active="active(path)" class="flex-grow-1 text-center">
                {{ title }}
            </BNavItem>
        </BNavbarNav>
    </BNavbar>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import constantRoutes from '@/router/routes'

const route = useRoute()

const list = reactive([])

let active = computed(() => (path) => {
    return path === `/${route.path.split('/')[1]}`
})


onMounted(() => {
    // 取得navbar數據
    let navbar = constantRoutes
        .find(({ name }) => name === 'layout')
        .children
        .filter(({ meta }) => meta.title)
        .map(({ path, meta }) => {
            return { path, title: meta.title }
        })

    list.push(...navbar)
})

</script>

<style lang="scss">
.nav-item:hover {
    background: #000;
}

.my-navbar {
    height: $navbar-height;
}

.active {
    pointer-events: none;
}
</style>