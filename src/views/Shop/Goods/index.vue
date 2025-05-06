<template>
    <template v-if="listOfPage.length">
        <BListGroup class="container">
            <BListGroupItem v-for="item of listOfPage" :key="item.id">
                <p>id: {{ item.id }}</p>
                <p>name: {{ item.name }}</p>
                <p>price: {{ item.price }}</p>
                <BButton @click="showModal(item)">加入購物車</BButton>
            </BListGroupItem>
        </BListGroup>
        <BModal v-model="modal.show" title="產品資訊">
            <template #default>
                <div>{{ modal.good.id }}
                    <p>產品名稱：{{ modal.good.zh }}</p>
                    <p>單價：${{ modal.good.price }}</p>
                </div>
                <div>
                    購買數量
                    <button @click="modal.item.num--">-</button>{{ modal.item.num }}<button
                        @click="modal.item.num++">+</button>
                    <p>總額${{ modal.item.num * modal.item.price }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="takeGoods({ type: $route.params.type, ...modal.item })">加入購物車</button>
                <button @click="hideModal">取消</button>
            </template>
        </BModal>
        <input type="number" v-model="rowsOfPage">
        <BContainer>
            <BRow>
                <BCol>
                    <div class="overflow-auto">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="rowsOfPage"
                            :limit="pageOfPagination" aria-controls="my-table" />
                    </div>
                </BCol>
            </BRow>
        </BContainer>
    </template>
    <div v-else class="container">沒有任何商品</div>
</template>

<script setup>
import { computed, reactive, watch, onMounted } from 'vue'
import { useRouter, useRoute, isNavigationFailure, NavigationFailureType } from 'vue-router'
import { useGoodStore } from '@/store/goods'
import { useStatusStore } from '@/store/status'
import { useShoppingCarStore } from '@/store/shoppingCar'
import { usePagination } from '@/hooks'
const { rowsOfPage, pageOfPagination, currentPage, offset } = usePagination()

let $router = useRouter()
let $route = useRoute()

const goodStore = useGoodStore()
const shoppingCartStore = useShoppingCarStore()
const statusStore = useStatusStore()

let modal = reactive({
    show: false,
    good: {},
    shoppingCart: {
        id: null,
        count: 0
    },
    submitDisabled: true
})

async function takeGoods(count) {
    const { id, type_id } = modal.item
    const payload = { id, type_id, count }
    // const { valid } = validate
    const msg = null
    if (!valid) {
        msg = '發生未知錯誤'
    } else {
        msg = await shoppingCartStore.requestAdd(payload)
    }
    if (msg) {
        statusStore.reload(msg)
    }
    hideModal()
}

function showModal(good) {
    modal.show = true
    Object.assign(modal.good, good)
}

watch(modal.show, async () => {
    const payload = { good_id: modal.good.id }
    const msg = await shoppingCartStore.requestGood(payload)
    if (msg) {
        statusStore.reload(msg)
    }

    modal.shoppingCart = shoppingCartStore.store.get(good_id)
})
function hideModal() {
    modal.item.num = 0
    modal.show = false
}

const theGoodData = computed(() => {
    return goodStore.state[$route.params.type] || { list: [], total: 0 }
})
const totalRows = computed(() => {
    return theGoodData.value.total
})
const theGoodList = computed(() => {
    return theGoodData.value.list
})
const listOfPage = computed(() => {
    const { start, end } = offset.value
    return theGoodList.value.slice(start, end).filter((x) => x);
})

watch([currentPage, () => goodStore.currentType], async (n, o) => {
    let targetType = n[1]
    let targetState = goodStore.state[targetType]

    const someType = n[1] === o[1]
    const somePage = targetState.currentPage === n[0]
    // 更換分類導致currentPage改變，因此調用的watch需忽略
    if (someType && somePage) {
        return
    }
    // 僅翻頁
    else if (someType && !somePage) {
        targetState.currentPage = n[0]
    }
    // 更換分類且與當前頁碼不同
    else if (!someType && !somePage) {
        currentPage.value = targetState.currentPage
    }
    // 改變路由，同時會發生listOfPage、theGoodList、totalRows的變化
    await $router.push({
        name: "goods",
        params: { type: targetType },
        query: { page: currentPage.value },
    }).then(result => {
        if (isNavigationFailure(result, NavigationFailureType.duplicate)) {
            console.log('導航重複，可忽略')
        }
    })
    const { start, limit } = offset.value
    let hasData = totalRows.value && (listOfPage.value.length === limit || totalRows.value === theGoodList.value.length)
    if (!hasData) {
        await goodStore.requestGoods({ offset: start, limit, type: targetType });
    }

})

onMounted(async () => {
    const payload = {
        offset: offset.value.start,
        limit: offset.value.limit,
        type: $route.params.type
    }
    await goodStore.requestGoods(payload)
})
</script>

<style scoped>
@keyframes _loading {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.container {
    display: flex;
    width: 100%;
    min-height: 450px;

    >div {
        width: 100%;
        flex-grow: 1;
    }
}
</style>