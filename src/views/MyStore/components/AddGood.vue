<template>
    <BButton @click="modalActived = true">上架商品</BButton>
    <BModal v-model="modalActived" title="產品資訊" @hide="hideModal">
        <template #default>
            <div>
                <p>類型：<select v-model.number="newGoodData.type_id">
                        <template v-for="item of modal_types">
                            <option :value="item.id">{{ item.zh }}</option>
                        </template>
                    </select>
                </p>
                <BFormGroup label="名稱" label-for="name" :state="validateNewGoodDataStatus.name.valid"
                    :invalid-feedback="validateNewGoodDataStatus.name.message">
                    <BFormInput id="name" v-model.trim="newGoodData.name"
                        @input="validateNewGoodDataStatus.name.inputed = true" />
                </BFormGroup>
                <BFormGroup label="價格" label-for="price" :state="validateNewGoodDataStatus.price.valid"
                    :invalid-feedback="validateNewGoodDataStatus.price.message">
                    <BFormInput id="price" v-model.number="newGoodData.price"
                        @input="validateNewGoodDataStatus.price.inputed = true" />
                </BFormGroup>
                <BFormGroup label="數量" label-for="total" :state="validateNewGoodDataStatus.total.valid"
                    :invalid-feedback="validateNewGoodDataStatus.total.message">
                    <BFormInput id="total" v-model.number="newGoodData.total"
                        @input="validateNewGoodDataStatus.total.inputed = true" />
                </BFormGroup>
            </div>
        </template>
        <template #footer>
            <BButton type="submit" variant="primary" :disabled="submitDisabled" @click="addGood">上架</BButton>
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
    newGoodData: {
        get: () => ({
            type_id: null,
            name: null,
            price: null,
            total: null
        })
    },
    validateNewGoodDataStatus: {
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

const newGoodData = reactive(defaultVal.newGoodData)
const validateNewGoodDataStatus = reactive(defaultVal.validateNewGoodDataStatus)
const modalActived = ref(false)
const submitDisabled = ref(true)

const modal_types = computed(() => myStoreStore.good.types.filter(({ id }) => id))

watch(newGoodData, async () => {
    const validRes = await validate.addMyGood(newGoodData)
    for (let { field_name, valid, message } of validRes) {
        const item = validateNewGoodDataStatus[field_name]
        if (!item.inputed) { continue }
        item.valid = valid
        item.message = message
    }
    submitDisabled.value = !validRes.valid
})

function hideModal() {
    Object.assign(newGoodData, defaultVal.newGoodData)
    Object.assign(validateNewGoodDataStatus, defaultVal.validateNewGoodDataStatus)
}

async function addGood() {
    const { valid } = await validate.addMyGood(newGoodData)
    let msg = null
    if (!valid) {
        msg = '發生未知錯誤'
    } else {
        msg = await myStoreStore.requestAdd(newGoodData)
    }
    if (msg) {
        statusStore.reload(msg)
    } else {
        alert('商品上架成功')
    }
    modalActived.value = false
}
</script>