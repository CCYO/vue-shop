<template>
    <BButton @click="modalActived = true">上架商品</BButton>
    <BModal v-model="modalActived" title="產品資訊" @hide="hideModal">
        <template #default>
            <div>
                <p>類型：<select v-model.number="newGoodsData.type_id">
                        <template v-for="item of modal_types">
                            <option :value="item.id">{{ item.zh }}</option>
                        </template>
                    </select>
                </p>
                <BFormGroup label="名稱" :state="validateNewGoodsDataStatus.name.valid"
                    :invalid-feedback="validateNewGoodsDataStatus.name.message">
                    <BFormInput v-model.trim="newGoodsData.name"
                        @input="validateNewGoodsDataStatus.name.inputed = true" />
                </BFormGroup>
                <BFormGroup label="價格" :state="validateNewGoodsDataStatus.price.valid"
                    :invalid-feedback="validateNewGoodsDataStatus.price.message">
                    <BFormInput v-model.number="newGoodsData.price"
                        @input="validateNewGoodsDataStatus.price.inputed = true" />
                </BFormGroup>
                <BFormGroup label="數量" :state="validateNewGoodsDataStatus.total.valid"
                    :invalid-feedback="validateNewGoodsDataStatus.total.message">
                    <BFormInput v-model.number="newGoodsData.total"
                        @input="validateNewGoodsDataStatus.total.inputed = true" />
                </BFormGroup>
            </div>
        </template>
        <template #footer>
            <BButton type="submit" variant="primary" :disabled="submitDisabled" @click="addGoods">上架</BButton>
            <BButton variant="primary" @click="modalActived = false">取消</BButton>
        </template>
    </BModal>
</template>
<script setup>
import { reactive, ref, watch, computed } from 'vue'
import { useStatusStore } from '@/store/status'
import { useMyStoreStore } from '@/store/myStore'
import { validate } from '@/utils'

const defaultVal = Object.defineProperties({}, {
    newGoodsData: {
        get: () => ({
            type_id: null,
            name: null,
            price: null,
            total: null
        })
    },
    validateNewGoodsDataStatus: {
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

const statusStore = useStatusStore()
const myStoreStore = useMyStoreStore()

const newGoodsData = reactive(defaultVal.newGoodsData)
const validateNewGoodsDataStatus = reactive(defaultVal.validateNewGoodsDataStatus)
const modalActived = ref(false)
const submitDisabled = ref(true)

const modal_types = computed(() => myStoreStore.goods.types.filter(({ id }) => id))

watch(newGoodsData, async () => {
    const validRes = await validate.myStore_add(newGoodsData)
    for (let { field_name, valid, message } of validRes) {
        const item = validateNewGoodsDataStatus[field_name]
        if (!item.inputed) { continue }
        item.valid = valid
        item.message = message
    }
    submitDisabled.value = !validRes.valid
})

function hideModal() {
    Object.assign(newGoodsData, defaultVal.newGoodsData)
    Object.assign(validateNewGoodsDataStatus, defaultVal.validateNewGoodsDataStatus)
}

async function addGoods() {
    const { valid } = await validate.myStore_add(newGoodsData)
    let msg = null
    if (!valid) {
        msg = '發生未知錯誤'
    } else {
        msg = await myStoreStore.requestAdd(newGoodsData)
    }
    if (msg) {
        statusStore.reload({ prefix: msg })
    } else {
        alert('商品上架成功')
    }
    modalActived.value = false
}
</script>