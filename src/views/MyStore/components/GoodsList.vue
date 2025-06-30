<template>
    <BListGroup>
        <TransitionGroup name="list" v-if="listOfPage.length">
            <BListGroupItem v-for="item of listOfPage" :key="item.id">
                <div>
                    <p>id: {{ item.id }}</p>
                    <p>類型: {{ item.type.zh }} - {{ item.name }} - ${{ item.price }}</p>
                    <p>庫存: {{ item.total - item.selled }}個</p>
                    <button @click="removeGoods({ id: item.id, type: item.type })">下架</button>
                    <button @click="showModal(item.id)">修改資訊</button>
                </div>
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
        </TransitionGroup>
        <div v-else>
            沒有數據
        </div>
    </BListGroup>
    <BModal v-model="modalActived" title="產品資訊" @hide="hideModal">
        <template #default>
            <div>
                <p>類型：<select v-model.number="modifiedData.type_id">
                        <template v-for="item of myStoreStore.goods.types">
                            <option :value="item.id" :disabled="currentData.type_id === item.id">{{ item.zh }}
                            </option>
                        </template>
                    </select>
                </p>
                <BFormGroup label="名稱" :state="modifiedDataStatus.name.valid"
                    :invalid-feedback="modifiedDataStatus.name.message">
                    <BFormInput v-model.trim="modifiedData.name" :placeholder="currentData.name"
                        @input="modifiedDataStatus.name.inputed = true" />
                </BFormGroup>
                <BFormGroup label="價格" :state="modifiedDataStatus.price.valid"
                    :invalid-feedback="modifiedDataStatus.price.message">
                    <BFormInput v-model.number="modifiedData.price" :placeholder="currentData.price"
                        @input="modifiedDataStatus.price.inputed = true" />
                </BFormGroup>
                <BFormGroup label="數量" :state="modifiedDataStatus.total.valid"
                    :invalid-feedback="modifiedDataStatus.total.message">
                    <BFormInput v-model.number="modifiedData.total" :placeholder="currentData.total"
                        @input="modifiedDataStatus.total.inputed = true" />
                </BFormGroup>
            </div>
        </template>
        <template #footer>
            <BButton type="submit" variant="primary" :disabled="submitDisabled" @click="modifyGoods">修改</BButton>
            <BButton variant="primary" @click="modalActived = false">取消</BButton>
        </template>
    </BModal>
</template>

<script setup>

import { defineProps, computed, reactive, ref, watch, toRaw } from 'vue'

import { validate } from '@/utils'
import { useMyStoreStore } from '@/store/myStore'
import { useStatusStore } from '@/store/status'

const defaultVal = Object.defineProperties({}, {
    modifiedData: {
        get: () => ({
            // id: null,
            type_id: null,
            name: null,
            price: null,
            total: null
        })
    },
    modifiedDataStatus: {
        get: () => ({
            type_id: {
                inputed: false,
                valid: null,
                message: undefined,
            },
            name: {
                inputed: false,
                valid: null,
                message: undefined,
            },
            price: {
                inputed: false,
                valid: null,
                message: undefined,
            },
            total: {
                inputed: false,
                valid: null,
                message: undefined,
            }
        })
    }
})

const myStoreStore = useMyStoreStore()
const statusStore = useStatusStore()

const current_id = ref(null)

const props = defineProps(['list', 'num'])

// 「商品要被更新的數據」的數據
const modifiedData = reactive(defaultVal.modifiedData)
// 「商品要被更新的數據」的驗證狀態
const modifiedDataStatus = reactive(defaultVal.modifiedDataStatus)
// 「更新商品數據的表格」可否submit
const submitDisabled = ref(true)
// 「更新商品數據的表格」的顯示狀態
const modalActived = ref(false)

const listOfPage = computed(() => props.list)
const fillCount = computed(() => {
    return props.num - listOfPage.value.length
})
// 「待更新數據的商品」未修改時的數據
const currentData = computed(() => {
    // const { id } = modifiedData

    // if (!id) {
    if (!current_id.value) {
        return modifiedData
    } else {
        let { type_id, name, price, total } = myStoreStore.goods.list.find(item => item.id === current_id.value)
        return { type_id, name, price, total }
    }
})

watch(modifiedData, async () => {
    // modal若是開啟狀態，則校驗變動的modifiedData
    if (modalActived.value) {
        await _validatemodifiedDataAndGetPayload()
    }
})

function showModal(id) {
    // modifiedData.id = id
    current_id.value = id
    modalActived.value = true
}

function hideModal() {
    current_id.value = null
    Object.assign(modifiedData, defaultVal.modifiedData)
    Object.assign(modifiedDataStatus, defaultVal.modifiedDataStatus)
}

async function removeGoods({ id, type }) {
    if (!confirm('確定要刪除？')) { return }
    const payload = { id, type_id: type.id }
    const { valid } = await validate.myStore_remove(payload)
    let prefix = null
    if (!valid) {
        prefix = '發生未知錯誤'
    } else {
        prefix = await myStoreStore.requestRemove(payload)
    }
    if (prefix) {
        statusStore.reload({ prefix })
    } else {
        alert('商品下架成功')
    }
}

async function modifyGoods() {
    const payload = await _validatemodifiedDataAndGetPayload()
    let prefix = null
    if (!payload) {
        prefix = '發生未知錯誤'
    } else {
        prefix = await myStoreStore.requestModify(payload)
    }
    if (prefix) {
        statusStore.reload({ prefix })
    } else {
        alert('商品資訊修改成功')
    }
    // 隱藏modal
    modalActived.value = false
}

async function _validatemodifiedDataAndGetPayload() {
    const rawData = toRaw(modifiedData)
    const payload = Object.entries(rawData).reduce((acc, [key, value]) => {
        // payload只取有值的欄位
        if (value) {
            acc[key] = value
        }
        // 若沒有值，則將modifiedDataStatus對應的欄位設作未驗證狀態
        else {
            modifiedDataStatus[key].valid = null
        }
        return acc
    }, { id: current_id.value })
    const validRes = await validate.myStore_modify({ ...payload, _old: currentData.value })
    for (let { field_name, valid, message } of validRes) {
        const item = modifiedDataStatus[field_name]
        if (!item?.inputed) { continue }
        item.valid = valid
        item.message = message
    }
    let valid = validRes.valid
    submitDisabled.value = !valid
    if (valid) {
        return payload
    } else {
        return null
    }
}

</script>

<style scoped lang="scss">
@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateX(-200%);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.list-enter-active {
    animation: fadeIn .5s ease;

}

.list-leave-active {
    animation: fadeIn .5s ease reverse;
    position: absolute;
}
</style>