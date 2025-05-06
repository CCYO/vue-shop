<template>
    <BForm @submit="onSubmit" @reset="onReset">
        <template v-for="item of form" :key="item.name">
            <BFormGroup :label="item.label" :label-for="`login_${item.name}`" :state="check[item.name].valid"
                :invalid-feedback="check[item.name].message">
                <BFormInput :id="`login_${item.name}`" v-model="item.value" />
            </BFormGroup>
        </template>

        <BButton type="submit" variant="primary" :disabled="submit_disabled">Submit</BButton>
        <BButton type="reset" variant="danger">Reset</BButton>
    </BForm>
</template>

<script setup lang='ts'>
import { computed, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/store/user'
import { validate } from '@/utils'

const router = useRouter()
const userStore = useUserStore()

const check = reactive({
    email: {
        valid: null,
        message: undefined
    },
    password: {
        valid: null,
        message: undefined
    },
})

const form = reactive([
    { name: 'email', value: '', label: '信箱' },
    { name: 'password', value: '', label: '密碼' },
])

const formData = computed(() =>
    form.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc
    }, {})
)

watch(form, async () => {
    const validateRes = await validate.login(formData.value)
    validateRes.forEach(({ valid, field_name, message }) => {
        const field = form.find(item => item.name === field_name)
        if (valid) {
            check[field_name] = {
                valid,
                message: 'ok',
            }
        } else if (field.value || check[field_name].valid !== null) {
            check[field_name] = {
                valid,
                message
            }
        }
    })
})

async function onSubmit(event) {
    event.preventDefault()
    const msg = await userStore.login(formData.value)
    if (msg) {
        alert(msg)
        _reset()
        return
    }
    await router.push({ name: 'goods', params: { type: 'hot' }, query: { page: 1 } })
}

const onReset = (event: Event) => {
    event.preventDefault()
    _reset()
}

function _reset() {
    for (let item of form) {
        item.value = ''
        check[item.name].valid = null
        check[item.name].message = undefined
    }
}

const submit_disabled = computed(() => Object.values(check).some(({ valid }) => !valid))
</script>

<style></style>