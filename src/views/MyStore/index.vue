<template>
    <header>
        <h1>我的商城</h1>
    </header>
    <div>
        <p>依<select v-model="orderBy">
                <template v-for="{ zh, value } of orderOptions">
                    <option :value="value">{{ zh }}</option>
                </template>
            </select>做
            <select v-model="sortBy">
                <template v-for="{ zh, value } of sortOptions">
                    <option :value="value">{{ zh }}</option>
                </template>
            </select>
        </p>
        <p>列出<select v-model="filterBy">
                <template v-for="{ zh, value } of filterTypeOptions">
                    <option :value="value">{{ zh }}</option>
                </template>
            </select>類型
        </p>

        <button @click="statusStore.reload()">reload</button>
        <AddGood />
        <GoodList :list="listOfPage" :num="rowsOfPage" />

        每頁顯示幾筆資料
        <select v-model="rowsOfPage">
            <!-- <template v-for="n of countOfGoodsPerPage"> -->
            <template v-for="n of maxRowsOfPage">
                <option v-if="n >= minRowsOfPage" :value="n">{{ n }}</option>
            </template>
        </select>
        <BContainer>
            <BRow>
                <BCol>
                    <div class="overflow-auto">
                        <b-pagination v-model="currentPage" :total-rows="myStoreStore.good.total[filterBy]"
                            :per-page="rowsOfPage" :limit="pagesOfPagination" aria-controls="my-table" />
                    </div>
                </BCol>
            </BRow>
        </BContainer>
    </div>
    <div>

    </div>
</template>

<script setup>
import objectHash from 'object-hash'

import { ref, watch, computed, onMounted } from 'vue'
import { useStatusStore } from '@/store/status'
import { useMyStoreStore } from '@/store/myStore'
import { usePagination } from '@/hooks'
import { validate } from '@/utils'

import AddGood from './components/AddGood.vue'
import GoodList from '@/components/goodList/index.vue'

const defaultVal = Object.defineProperties({}, {
    orderOptions: {
        get: () => [
            { zh: '上架時間', value: 'createdAt' },
            { zh: '類型', value: 'type_id' },
            { zh: '價格', value: 'price' },
        ]
    }
})
// 將「請求分頁的參數」轉換成hash，並保存下來
const cache_pagination = []

const statusStore = useStatusStore()
const myStoreStore = useMyStoreStore()

const { minRowsOfPage, maxRowsOfPage, rowsOfPage, pagesOfPagination, currentPage, offset } = usePagination()

// 過濾的類型
const filterBy = ref('all')
// 排序的標的
const orderBy = ref('createdAt')
// 排序方式
const sortBy = ref('desc')
// 過濾類型的選單
const filterTypeOptions = computed(() => {
    return myStoreStore.good.types.filter(item => {
        if (orderBy.value === 'type_id') {
            return !item.id
        } else {
            return true
        }
    }).map(({ zh, en }) => ({ zh, value: en }))
})
// 排序標的的選單
const orderOptions = computed(() => {
    return defaultVal.orderOptions.filter(item => {
        if (filterBy.value === 'all') {
            return true
        } else {
            return item.value !== 'type_id'

        }
    })
})
// 排序方式的選單
const sortOptions = computed(() => {
    const order = orderBy.value
    if (order === 'createdAt') {
        return [
            { zh: '由新至舊', value: 'desc' },
            { zh: '由舊至新', value: 'asc' },
        ]
    } else if (order === 'type_id') {
        return [
            { zh: '由Z到A', value: 'desc' },
            { zh: '由A到Z', value: 'asc' },
        ]
    } else {
        return [
            { zh: '由高至低', value: 'desc' },
            { zh: '由低至高', value: 'asc' },
        ]
    }
})

const goodList = computed(() => {
    let result = myStoreStore.good.list
    if (filterBy.value !== 'all') {
        result = result.filter(item => item.type.en === filterBy.value)
    }
    return result.sort(
        (a, b) => {
            let A
            let B
            if (orderBy.value === 'createdAt') {
                A = new Date(a[orderBy.value])
                B = new Date(b[orderBy.value])
                if (sortBy.value === 'asc') {
                    return A - B
                } else {
                    return B - A
                }
            } else if (orderBy.value === 'type_id') {
                A = a.type.zh
                B = b.type.zh
                if (sortBy.value === 'asc') {
                    return A.localeCompare(B)
                } else {
                    return B.localeCompare(A)
                }
            } else if (sortBy.value === 'asc') {
                return a[orderBy.value] - b[orderBy.value]
            } else {
                return b[orderBy.value] - a[orderBy.value]
            }
        })
})
const listOfPage = computed(() => {
    const { start, end } = offset.value
    let res = goodList.value.slice(start, end)
    console.log('res', res)
    return res
})

watch([offset, filterBy, orderBy, sortBy], getListOfPage)

onMounted(async () => await getListOfPage())

async function getListOfPage(newVal) {
    const myGood = myStoreStore.good
    const total = myGood.total[filterBy.value]
    if (total === undefined) {
        // 解決：當新分類資料未請求過，無法判別新分類的總數使否可達到當前頁數，故自動分配到第一頁
        if (offset.value.start !== 0) {
            currentPage.value = 1
            return
        }
    } else if (total !== 0) {
        // 解決：轉換新分類時，若新分類的總數無法達到當前頁數，故自動分配到當前分頁的最後一頁
        let totalPage = Math.ceil(total / rowsOfPage.value)
        if (currentPage.value > totalPage) {
            currentPage.value = totalPage
            return
        }
    }
    //當前頁數的資料已經請求過，則不再請求
    if (newVal) {
        const hash = objectHash(newVal)
        if (cache_pagination.some(item => item === hash)) {
            return
        } else {
            cache_pagination.push(hash)
        }
    }
    const { start, limit } = offset.value

    const inited = myStoreStore.good.types.length > 1
    const noMoreDate = goodList.value.length === myGood.total[filterBy.value]
    if (inited && noMoreDate) {
        return
    }
    const payload = {
        inited,
        limit,
        offset: start,
        type_id: myStoreStore.good.types.find(item => item.en === filterBy.value).id,
        order: orderBy.value,
        sort: sortBy.value
    }
    const { valid } = await validate.readMyGoods(payload)
    let msg = null
    if (!valid) {
        msg = '發生未知錯誤'
    } else {
        msg = await myStoreStore.requestGoods(payload)
    }
    if (msg) {
        statusStore.reload(msg)
    }
}


</script>

<style></style>