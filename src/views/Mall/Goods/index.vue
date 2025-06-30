<template>
    <template v-if="listOfPage.length">
        <BListGroup class="container">
            <BListGroupItem v-for="item of listOfPage" :key="item.id">
                <p>id: {{ item.id }}</p>
                <p>name: {{ item.name }}</p>
                <p>price: {{ item.price }}</p>
                <BButton @click="showModal(item)">加入購物車</BButton>
            </BListGroupItem>
            <template v-if="fillCount">
                <BListGroupItem v-for="ind of fillCount" :key="ind">
                    <div style="visibility: hidden;">
                        <p>id: </p>
                        <p>類型: </p>
                        <p>庫存: </p>
                        <button>下架</button>
                        <button>修改資訊</button>
                    </div>
                </BListGroupItem>
            </template>
        </BListGroup>
        <BModal v-model="modal.show" title="產品資訊">
            <template #default>
                <div>
                    <p>產品名稱：{{ modal.goods.name }}</p>
                    <p>單價：${{ modal.goods.price }}</p>
                </div>
                <div>
                    購買數量
                    <button @click="modal.shopping.count--" :disabled="modal.shopping.count === 0">-</button>
                    {{ modal.shopping.count }}
                    <button @click="modal.shopping.count++"
                        :disabled="(modal.goods.total - modal.goods.selled) === modal.shopping.count">+</button>
                    <p>總額${{ modal.shopping.count * modal.goods.price }}</p>
                </div>
            </template>
            <template #footer>
                <button @click="take()">加入購物車</button>
                <button @click="hideModal">取消</button>
            </template>
        </BModal>
        每頁顯示<select v-model="rowsOfPage">
            <template v-for="n of maxRowsOfPage">
                <option v-if="n >= minRowsOfPage" :value="n">{{ n }}</option>
            </template>
        </select>筆資料
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
import { useGoodsStore } from '@/store/goods'
import { useStatusStore } from '@/store/status'
import { useShoppingStore } from '@/store/shopping'
import { usePagination } from '@/hooks'
import { validate } from '@/utils'
import goods from '@/utils/request/goods'
const { rowsOfPage, pageOfPagination, currentPage, offset, maxRowsOfPage, minRowsOfPage } = usePagination()


let $router = useRouter()
let $route = useRoute()

const goodsStore = useGoodsStore()
const shopping = useShoppingStore()
const statusStore = useStatusStore()

const fillCount = computed(() => {
    return rowsOfPage.value - listOfPage.value.length
})

let modal = reactive({
    show: false,
    goods: {},
    shopping: {
        id: null,
        goods_id: null,
        count: 0,
        goods: {},
        seller: {}
    },
    submitDisabled: true
})

async function take() {
    const { id, goods_id, count } = modal.shopping
    let prefix
    if (id) {
        prefix = await _modifyGoods({ id, goods_id, count })
    } else {
        prefix = await _takeInCar({ goods_id: modal.goods.id, count })
    }
    if (prefix) {
        statusStore.reload({ prefix })
        return
    }
    alert('已加入購物車')
    hideModal()
}

async function _takeInCar(payload) {
    const { valid } = await validate.shopping_takeInCar(payload)
    let msg
    if (!valid) {
        msg = '輸入的資料有誤,請重新嘗試。'
    } else {
        msg = await shopping.requestAdd(payload)
    }
    return msg
}

async function _modifyGoods(payload) {
    const { valid } = await validate.shopping_modifyInCar(payload)
    let msg
    if (!valid) {
        msg = '輸入的資料有誤,請重新嘗試。'
    } else {
        msg = await shopping.requestModify(payload)
    }
    return msg
}

async function showModal(goods) {
    modal.show = true
    Object.assign(modal.goods, goods)
    const payload = { goods_id: goods.id }
    const { valid } = await validate.shopping_read(payload)
    let prefix = '發生未知錯誤'
    if (!valid) {
        statusStore.reload({ prefix })
        return
    }
    prefix = await shopping.requestGoods(payload)
    if (prefix) {
        statusStore.reload({ prefix })
        return
    }
    modal.shopping = { ...shopping.store.get(goods.id) }
}

function hideModal() {
    modal.show = false
    modal.goods = {}
    modal.shopping = {
        id: null,
        goods_id: null,
        count: 0
    }
}

const theGoodsData = computed(() => {
    return goodsStore.state[$route.params.type] || { list: [], total: 0 }
})
const totalRows = computed(() => {
    return theGoodsData.value.total
})
const theGoodsList = computed(() => {
    return theGoodsData.value.list
})
const listOfPage = computed(() => {
    const { start, end } = offset.value
    return theGoodsList.value.slice(start, end).filter((x) => x);
})

let cache_route = $route.fullPath
watch(() => $route.name, async (n, o) => {
    let comeBack = n === 'goods' && n !== o
    if (!comeBack) {
        return
    }
    await $router.replace(cache_route)
})
watch([currentPage, () => goodsStore.currentType], async (n, o) => {
    let targetType = n[1]
    let targetState = goodsStore.state[targetType]

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
    // 改變路由，同時會發生listOfPage、theGoodsList、totalRows的變化
    await $router.push({
        name: "goods",
        params: { type: targetType },
        query: { page: currentPage.value },
    }).then(result => {
        if (isNavigationFailure(result, NavigationFailureType.duplicate)) {
            console.log('導航重複，可忽略')
        }
    })
    cache_route = $route.fullPath
    const { start, limit } = offset.value
    let hasData = totalRows.value && (listOfPage.value.length === limit || totalRows.value === theGoodsList.value.length)
    if (!hasData) {
        await goodsStore.requestPage({ offset: start, limit, type: targetType });
    }
})

onMounted(async () => {
    const payload = {
        offset: offset.value.start,
        limit: offset.value.limit,
        type: $route.params.type
    }
    await goodsStore.requestPage(payload)
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