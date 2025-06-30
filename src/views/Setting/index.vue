<template>
    <header>
        <h1>個人設置</h1>
    </header>
    <button @click="logout()">登出</button>
    <div class="container">
        <BCard bg-variant="light">
            <BForm @submit.prevent="submit">
                <BFormGroup label-cols-lg="3" label="個人資料" label-size="lg" label-class="fw-bold pt-0" class="mb-0">
                    <BFormGroup label="暱稱" label-for="userInfo_name" label-cols-sm="3" label-align-sm="end"
                        :state="check.name.valid" :invalid-feedback="check.name.message">
                        <BFormInput id="userInfo_name" name="name" :placeholder="userStore.userInfo.name"
                            v-model="newData.name" />
                    </BFormGroup>
                    <BFormGroup label="Email" label-for="userInfo_email" label-cols-sm="3" label-align-sm="end"
                        :state="check.email.valid" :invalid-feedback="check.email.message">
                        <BFormInput id="userInfo_email" :placeholder="userStore.userInfo.email"
                            v-model="newData.email" />
                    </BFormGroup>
                    <BFormGroup label="新密碼" label-for="userInfo_new_password" label-cols-sm="3" label-align-sm="end"
                        :state="check.new_password.valid" :invalid-feedback="check.new_password.message">
                        <BFormInput id="userInfo_new_password" placeholder="新密碼" v-model="newData.new_password"
                            @focus="activePasswordModal($event)">
                        </BFormInput>
                    </BFormGroup>
                    <BFormGroup label="確認新密碼" label-for="userInfo_password_again" label-cols-sm="3" label-align-sm="end"
                        :state="check.new_password_again.valid" :invalid-feedback="check.new_password_again.message">
                        <BFormInput id="userInfo_password_again" placeholder="再填入一次新密碼"
                            v-model="newData.new_password_again" @focus="activePasswordModal($event)">
                        </BFormInput>
                    </BFormGroup>
                    <BFormGroup label="居住的城市" label-for="userInfo_city" label-cols-sm="3" label-align-sm="end"
                        :state="check.city.valid" :invalid-feedback="check.city.message">
                        <BFormInput id="userInfo_city" :placeholder="userStore.userInfo.city" v-model="newData.city">
                        </BFormInput>
                    </BFormGroup>
                    <BFormGroup label="頭像" label-for="userInfo_avatar" label-cols-sm="3" label-align-sm="end"
                        :state="check.avatar_ext.valid || check.avatar_hash.valid">
                        <BFormInput id="userInfo_avatar" type="file" ref="inputToAvatar" @click="resetAvatar($event)"
                            @change="changeAvatar($event)" />
                    </BFormGroup>
                    <div style="width:30%;">
                        <img ref="previewAvatar" :src="userStore.userInfo.avatar" alt="" style="width: 100%;">
                    </div>
                    <BButton type="submit" :disabled="!submitable">更新</BButton>
                </BFormGroup>
            </BForm>
        </BCard>
    </div>
    <!-- <BModal v-model="modal_password.show" title="當前密碼確認" @shown="showPasswordModal"> -->
    <BModal v-model="modal_password.show" title="當前密碼確認" @shown="showPasswordModal">
        <template #default>
            <BFormGroup label="當前密碼" label-for="current_password" label-cols-sm="3" label-align-sm="end"
                :state="modal_password.check.valid" :invalid-feedback="modal_password.check.message">
                <BFormInput id="current_password" placeholder="當前密碼" v-model="modal_password.check.value">
                </BFormInput>
            </BFormGroup>
        </template>
        <template #footer>
            <button @click="checkPassword">確認</button>
            <button @click="modal_password.show = false">取消</button>
        </template>
    </BModal>
</template>

<script setup>
import SparkMD5 from "spark-md5";
import { ref, reactive, watch, computed, nextTick } from 'vue'
import { useUserStore } from '@/store/user'
import { useStatusStore } from '@/store/status'
import { validate } from '@/utils'

const userStore = useUserStore()
const statusStore = useStatusStore()

const inputToAvatar = ref()
const previewAvatar = ref()

const newData = reactive({
    name: '',
    email: '',
    city: '',
    new_password: '',
    new_password_again: '',
    avatar_ext: '',
    avatar_hash: ''
})
const check = reactive({
    name: {
        valid: null,
        message: ''
    },
    email: {
        valid: null,
        message: ''
    },
    new_password: {
        valid: null,
        message: ''
    },
    new_password_again: {
        valid: null,
        message: ''
    },
    city: {
        valid: null,
        message: ''
    },
    avatar_ext: {
        valid: null,
        message: ''
    },
    avatar_hash: {
        valid: null,
        message: ''
    }
})

const modal_password = reactive({
    show: false,
    check: {
        valid: null,
        value: '',
        message: ''
    }
})

async function activePasswordModal($event) {
    if (modal_password.check.valid) {
        return
    }
    $event.preventDefault()
    $event.target.blur()
    modal_password.show = true
}
async function showPasswordModal() {
    await nextTick()
    document.getElementById('current_password').focus()
}

async function checkPassword() {
    const payload = { password: modal_password.check.value }
    let validRes = await validate.user_password(payload)
    if (!validRes.valid) {
        const { valid, message } = validRes.password
        modal_password.check.valid = valid
        modal_password.check.message = message
        return
    }
    const msg = await userStore.checkPassword(payload)
    if (msg) {
        modal_password.check.valid = false
        modal_password.check.message = msg
    } else {
        alert('密碼正確')
        modal_password.show = false
        modal_password.check.valid = true
        modal_password.check.message = ''
        document.getElementById('userInfo_new_password').focus()
    }
}



watch(newData, async () => {
    const validateRes = await validate.user_settingForm({ ...newData, _old: { ...userStore.userInfo } })
    validateRes.forEach(({ valid, field_name, message }) => {
        const newDataVal = newData[field_name]
        // 校驗正確
        if (valid) {
            check[field_name] = {
                valid,
                message: 'ok',
            }
        }
        // 校驗不正確，若表格沒有值，恢復預設值
        else if (!newDataVal && !(field_name === 'new_password_again' && newData.new_password)) {
            check[field_name] = {
                valid: null,
                message: '',
            }
        }
        // 校驗不正確，若表格有值，提示錯誤
        else if (newDataVal || (field_name === 'new_password_again' && newData.new_password)) {
            check[field_name] = {
                valid,
                message,
            }
        }
    })
})

const submitable = computed(() => {
    const oneValid = Object.values(check).some(({ valid }) => valid)
    const withoutInvalid = !Object.values(check).some(({ valid }) => valid === false)
    return oneValid && withoutInvalid
})
async function submit() {
    const payload = Object.entries(newData)
        .filter(([k, v]) => v)
        .reduce((acc, [k, v]) => {
            acc[k] = v
            return acc
        }, {})
    const hasPassword = payload.hasOwnProperty('new_password') && payload.hasOwnProperty('new_password_again')
    const hasAvatar = payload.hasOwnProperty('avatar_hash') && payload.hasOwnProperty('avatar_ext')
    if (hasPassword) {
        payload.current_password = modal_password.check.value
        delete payload.new_password_again
    }
    const { valid } = await validate.user_setting(payload)
    if (!valid) {
        statusStore.reload({ prefix: '發生未知錯誤' })
        return
    }
    if (hasAvatar) {
        let formData = new FormData();
        formData.append("avatar", inputToAvatar.value.$el.files[0]);
        payload.formData = formData
    }
    let msg = await userStore.requestModify(payload)
    const options = {}
    if (msg) {
        options.prefix = msg
    } else {
        // 藉重新渲染組件，將當前組件的數據恢復預設狀態
        options.msg = '更新完成'
    }
    statusStore.reload(options)
}
async function logout() {
    await userStore.logout()
    alert('成功登出')
}


function resetAvatar($event) {
    const input = inputToAvatar.value?.$el
    const hasAvatar = Boolean(input.files.length)
    if (hasAvatar && !confirm('要再次更換頭像嗎?')) {
        // 阻止觸發選擇檔案的視窗跳出
        $event.preventDefault()
        return
    }
    // 一般來說，在hasAvatar有值的情況下，若有重新修改的需求，可能需要
    // input[type=file].value
    // 但是部分瀏覽器基於安全考量，會報錯/警告or阻止此行為，所以真要如此的話，要將該input[type=file]元素直接移除，並選染一個新的
    // 不過，我這裡直接以部分瀏覽器也會做的機制
    // 「再次點擊已有檔案的input[type=file]，自動清空該value」
    // 故省略掉代碼的編寫

    // 修改前，先將數據恢復到原設置
    previewAvatar.value.src = userStore.userInfo.avatar
    newData.avatar_ext = ''
    newData.avatar_hash = ''
}

async function changeAvatar($event) {
    const input = $event.target
    const avatar = input.files[0]
    if (!avatar) {
        return
    }
    const mark = /\.(?<ext>.*$)/.exec(avatar.name)

    const payload = {
        size: avatar.size,
        type: avatar.type,
        ext: mark ? mark.groups.ext.toLowerCase() : null,
        hash: await _hash(avatar),
        _old: userStore.userInfo
    }
    const validateRes = await validate.user_avatar(payload)
    if (!validateRes.valid) {
        const msg = validateRes.reduce((acc, { valid, message }, index) => {
            if (!valid) {
                if (acc.length) {
                    acc += '\n'
                }
                acc += `**${message}。`
            }
            return acc
        }, '')
        input.value = ''
        alert(msg)
    } else {
        // 預覽
        previewAvatar.value.src = await _dataURL(avatar)
        // 提供給newData
        newData.avatar_ext = payload.ext
        newData.avatar_hash = payload.hash
    }

    async function _dataURL(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.addEventListener('loadend', (progressEvent) => {
                if (fileReader.readyState === fileReader.DONE) {
                    resolve(progressEvent.target.result)

                }
            })
            fileReader.addEventListener("error", (error) => {
                reject(error);
            });
            fileReader.readAsDataURL($event.target.files[0])
        })
    }



    async function _hash(file) {
        return await new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.addEventListener("load", (evt) => {
                if (fileReader.readyState === FileReader.DONE) {
                    let arrayBuffer = fileReader.result;
                    let hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
                    resolve(hash);
                }
            });
            fileReader.addEventListener("error", (error) => {
                reject(error);
            });
            fileReader.readAsArrayBuffer(file);
        });
    }
}
</script>

<style scoped>
.b-form-group {
    margin-bottom: .5rem;
}
</style>