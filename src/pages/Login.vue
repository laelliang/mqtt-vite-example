
<template>
  <div class="login-page">
    <div class="logign-div">
      <a-form
        :model="formData"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '用户名是必须的' }]"
        >
          <a-input v-model:value="formData.username"  placeholder="请输入用户名"/>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '密码是必须的' }]"
        >
          <a-input-password v-model:value="formData.password" placeholder="请输入密码"/>
        </a-form-item>

        <a-form-item
          label="验证码"
          name="code"
          :rules="[{ required: true, message: '验证码是必须的' }]"
        >
          
          <div class="row">
            <a-input style="width: calc(100% - 120px);" v-model:value="formData.code" placeholder="验证码" />
            <img class="img-code" v-if="imgsrc" @click="setImgSrc" :src="imgsrc" alt="验证码">
          </div>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, captcha } from '@/api'
const router =  useRouter()
const formData = ref({
  username: 'ceshi6',
  password: '123123',
  code: ''
})
const imgsrc = ref(null)
let key = ''
const setImgSrc = async () => {
  const data = await captcha()
  key = data.key
  imgsrc.value = data.base64
}

setImgSrc()

const onFinish = async () => {
  const { username, password, code } = formData.value
  const params = {
    username,
    password,
    mark: 'pc',
    code,
    key
  }
  const mqttData = await login(params)
  router.push({
    name: 'Mqtt',
    state: {
      mqttData
    }
  })
}

</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
}
.img-code {
  height: 32px;
}
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #999;
}
.logign-div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
}
</style>