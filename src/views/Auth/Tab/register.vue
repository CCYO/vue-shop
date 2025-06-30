<template>
    <BForm @submit="onSubmit" @reset="onReset">
        <template v-for="item of form" :key="item.name">
            <BFormGroup :label="item.label" :label-for="`register_${item.name}`" :state="check[item.name].valid"
                :invalid-feedback="check[item.name].message">
                <BFormInput :id="`register_${item.name}`" v-model="item.value" />
            </BFormGroup>
        </template>

        <BButton type="submit" variant="primary" :disabled="submit_disabled">Submit</BButton>
        <BButton type="reset" variant="danger">Reset</BButton>
    </BForm>

</template>

<script setup lang='ts'>
import { computed, reactive, watch } from 'vue'

import { useUserStore } from '@/store/user'
import { validate } from '@/utils'

const userStore = useUserStore()

const check = reactive({
    email: {
        valid: null,
        message: undefined
    },
    name: {
        valid: null,
        message: undefined
    },
    password: {
        valid: null,
        message: undefined
    },
    checkPassword: {
        valid: null,
        message: undefined
    },
})

const form = reactive([
    { name: 'email', value: '', label: '信箱' },
    { name: 'name', value: '', label: '暱稱' },
    { name: 'password', value: '', label: '密碼' },
    { name: 'checkPassword', value: '', label: '再次輸入密碼' },
])

const formData = computed(() =>
    form.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc
    }, {})
)

watch(form, async () => {
    const validateRes = await validate.user_register(formData.value)
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
    const msg = await userStore.register(formData.value)
    if (msg) {
        alert(msg)
        _reset()
    } else {
        alert('註冊成功，請嘗試登入。')
        userStore.toggleRegisterTab(false)
    }
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