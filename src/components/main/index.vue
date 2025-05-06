<template>
    <!-- <Suspense>
        <template #default> -->
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <component :is="Component"></component>
        </template>
    </RouterView>
    <!-- </template>
        <template #fallback>
            <div>SUSPENSE LOADING</div>
        </template>
    </Suspense> -->
</template>

<script setup>

</script>

<style lang="">

</style>