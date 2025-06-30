<template>
    <BListGroup class="container" ref="container">

        <BListGroupItem v-for="{ id, count, goods, updatedAt } of listInCar" :key="id">

            <template v-if="!goods.order">
                <div class="goods-item">
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
                    <BButton squared @click="cancelOrder(id)">
                        取消訂單
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
import { ref, computed, onActivated, onDeactivated } from 'vue'
import { useShoppingStore } from '@/store/shopping'
import { useStatusStore } from '@/store/status'
import { usePagination } from '@/hooks'
import { validate } from '@/utils'

const statusStore = useStatusStore()

let shoppingCarStore = useShoppingStore()
const { offset } = usePagination()

const takeMoreing = ref(false)


onActivated(async () => {
    await more(true)
    // 重新引入組件時，若未曾移除過lazyReadMore，則重新綁定
})

onDeactivated(() => {
    // 緩存組件時，若未曾移除過lazyReadMore，則先解除綁定
})

let listInCar = computed(() => {
    const list = [...shoppingCarStore.store.values()].filter(({ order }) => order)
    return list.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
})

async function more(firstTime = false) {
    const { start, limit } = offset.value
    const payload = { offset: start, limit, order: true }
    const { valid } = await validate.shopping_readPage(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    takeMoreing.value = true
    const msg = await shoppingCarStore.requestList(payload, { _transitionModal: false })
    if (msg) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    takeMoreing.value = false
}

async function cancelOrder(id) {
    const payload = { id }
    const { valid } = await validate.shopping_remove(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    const msg = await shoppingCarStore.requestRemove(payload)
    if (msg) {
        statusStore.reload({ prefix: msg })
    } else {
        statusStore.reload({ msg: '訂單已取消' })
    }
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
</style>