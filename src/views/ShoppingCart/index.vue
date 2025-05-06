<template>
    <header>
        <h1>購物車</h1>
    </header>
    <ul>
        <li v-for="{ type, id, name, num, price } of list">
            <p>[產品資訊]</p>
            <p>類型：{{ type }}</p>
            <p>ＩＤ：{{ id }}</p>
            <p>名稱：{{ name }}</p>
            <p>數量：{{ num }}</p>
            <p>費用：{{ num * price }}</p>
        </li>
    </ul>
</template>

<script setup>
import { computed } from 'vue'
import { useShoppingCartStore } from '@/store/shoppingCar'

let shoppingCartStore = useShoppingCartStore()

let list = computed(() => {
    console.log('shoppingCartStore.list: ', shoppingCartStore.state.list)
    return shoppingCartStore.state.list
})

</script>

<style scoped>
.container {
    text-align: center;
}
</style>