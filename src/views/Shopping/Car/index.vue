<template>
    <div>
        購物清單
        <ul>
            <li v-for="[id, goods] of [...ListToBuy]" :key="id">
                {{ goods.name }} * {{ goods.count }}
            </li>
            總額
            ${{ [...ListToBuy.values()].reduce(function (acc, { count, price }) { acc += count * price; return acc }, 0) }}
        </ul>
        <button @click="placeOrder" :disabled="!ListToBuy.size">確認下訂單</button>
    </div>
    <BListGroup class="container" ref="container">

        <BListGroupItem v-for="{ id, count, goods, updatedAt } of listInCar" :key="id">

            <template v-if="!goods.order">
                <div :class="goods.total - goods.selled <= 0 && 'visibility'" class="goods-item">
                    <label>
                        <BFormCheckbox :id="id" :value="true" class="b-check"
                            @update:model-value="toggleToBuy($event, { id, goods, count })" />
                    </label>
                    <div class="goods-info">
                        <div class="item-info">
                            <p>類型：{{ goods.type.zh }}</p>
                            <p>名稱：{{ goods.name }}</p>
                            <p>數量：{{ count }}</p>
                            <p>費用：{{ goods.price * count }}</p>
                        </div>
                        <!-- <p>放入購物車的時間：{{ new Date(updatedAt) }}</p> -->
                        <div class="seller-info">
                            <span>賣家：</span>
                            <div class="avatar">
                                <img :src="goods.seller.avatar">
                            </div>
                            <span>{{ goods.seller.name }}</span>
                        </div>
                    </div>
                    <BButton squared @click="takeout(id)">
                        移除
                    </BButton>
                </div>
            </template>
        </BListGroupItem>

        <BListGroupItem v-if="takeMoreing">
            <p>讀取中...</p>
        </BListGroupItem>
    </BListGroup>
</template>

<script setup>
import { ref, computed, watch, onActivated, onDeactivated } from 'vue'
import { useShoppingStore } from '@/store/shopping'
import { useStatusStore } from '@/store/status'
import { usePagination } from '@/hooks'
import { validate } from '@/utils'

const statusStore = useStatusStore()
const shoppingStore = useShoppingStore()
const ListToBuy = ref(new Map())

const { offset, currentPage } = usePagination()

const container = ref()
const takeMoreing = ref(false)

let removeLazyReadMore = false

function toggleToBuy(checked, { id, goods, count }) {
    if (checked) {
        ListToBuy.value.set(id, { ...goods, count })
    } else {
        ListToBuy.value.delete(id)
    }
}

async function takeout(id) {
    let payload = { id }
    const { valid } = await validate.shopping_remove(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    await shoppingStore.requestRemove(payload)
    ListToBuy.value.delete(payload.id)
}

async function placeOrder() {
    const id_list = [...ListToBuy.value.keys()]
    const payload = { id_list }
    const { valid } = await validate.shopping_order(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    let msg = await shoppingStore.order(payload)
    const options = {}
    if (msg) {
        options.prefix = msg
    } else {
        options.msg = '訂單已送出'
    }
    statusStore.reload(options)
}

onActivated(async () => {
    await more(true)
    // 重新引入組件時，若未曾移除過lazyReadMore，則重新綁定
    if (!removeLazyReadMore) {
        window.addEventListener('scroll', lazyReadMore)
    }
})

onDeactivated(() => {
    // 緩存組件時，若未曾移除過lazyReadMore，則先解除綁定
    if (!removeLazyReadMore) {
        window.removeEventListener('scroll', lazyReadMore)
    }
})

async function lazyReadMore() {
    if (takeMoreing.value) {
        return
    }
    let b = container.value.$el.getBoundingClientRect().bottom
    let h = window.innerHeight
    if (b > h) {
        return
    }
    await more()
}

watch(() => shoppingStore.total.unOrder, () => {
    // 若後端數據總數有變動，重新綁定scroll handle
    if (removeLazyReadMore) {
        window.addEventListener('scroll', lazyReadMore)
        removeLazyReadMore = false
    }
})

let listInCar = computed(() => {
    const list = [...shoppingStore.store.values()].filter(({ order }) => !order)
    return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
})

async function more(firstTime = false) {
    if (!firstTime) {
        if (shoppingStore.total.unOrder === listInCar.value.length) {
            window.removeEventListener('scroll', lazyReadMore)
            removeLazyReadMore = true
            return
        }
        currentPage.value++
    }
    const { start, limit } = offset.value
    const payload = { offset: start, limit, order: false }
    const { valid } = await validate.shopping_readPage(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    takeMoreing.value = true
    const msg = await shoppingStore.requestList(payload, { _transitionModal: false })
    if (msg) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    takeMoreing.value = false
}

</script>

<style scoped lang="scss">
.container {
    text-align: center;
}

.goods-item {
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 11rem;
    flex-wrap: wrap;

    &>label {
        cursor: pointer;
    }

    &>label:hover,
    &>label:hover~div {
        background: rgba($color: #b63e3e, $alpha: .3);
    }

    .b-check {
        position: relative;
        display: flex;
        min-width: 2rem;
        height: 100%;
        margin: 0;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .goods-info {
        flex-grow: 1;
        padding: .5rem;

        p {
            line-height: 2rem;
            margin: 0;
        }

        .seller-info {
            height: 2rem;
            background: rgba(200, 200, 200, .5);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;

            span {
                font-weight: bold;
            }

            .avatar {
                display: inline-block;
                height: 2rem;
                width: 2rem;
                height: 2rem;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }

            }

            img {
                width: 2rem;
                height: 2rem;
                border-radius: 50%;
            }
        }
    }
}



.visibility {
    pointer-events: none;
}

.visibility::before {
    position: absolute;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    display: block;
    content: '';
    background-color: rgba(255, 255, 255, .5);
}

.visibility::after {
    position: absolute;
    top: 50%;
    font-size: 3rem;
    left: 0%;
    right: 0%;
    margin-top: -1.5rem;
    display: block;
    content: '已售罄';
    color: red;
    font-weight: bold;
}
</style>