<template>
  <p>状态: {{ connected ? '在线' : '离线' }}</p>
  <button @click="client.end()">断开</button>
  <ul>
    <li v-for="message in messages" :key="message">{{ message }}</li>
  </ul>
  <p>指令：</p>
  <textarea ref="textarea" class="textarea">

  </textarea>
  <p>
    <button @click="publishMag(trade)">trade主题发送指令</button>
  </p>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { connect } from 'mqtt'
const mqttData = window.history.state.mqttData
const options = computed(() => ({
  clientId: mqttData.id,
  host: mqttData.push.host,
  port: mqttData.push.port,
  username: mqttData.push.username,
  password: mqttData.token
}))

const connected = ref(false)
const messages = ref([])
const client = connect('ws://47.110.65.214:8083/mqtt', options.value)
const textarea = ref(null)

client.on("connect", () => {
  connected.value = true
  // 订阅主题
  const topics = [`push_${mqttData.id}`, 'match_quote']
  client.subscribe(topics, (error) => {
    if (error) {
      console.error('订阅主题失败:', error);
    } else {
      console.log('订阅成功:', topics.join(', '));
    }
  });
  client.subscribe("presence", (err) => {
    if (!err) {
      console.log("subscribed")
      client.publish("presence", "Hello mqtt")
    }
  })
})

client.on("message", (topic, message) => {
  console.log('message', topic, message.toString())
  messages.value.push(`${topic}主题消息：` + message.toString())
})

client.on("close", () => {
  console.log("close")
  connected.value = false
})

const publishMag = (topic) => {
  let message = undefined
  try {
    message = JSON.parse(textarea.value.value)
  } catch (error) {
    alert("请输入json类型消息")
  }
  client.publish(topic, message, (error) => {
    if (error) {
      alert('发送失败' + error)
    } else {
      alert('发送成功')
    }
  });

}
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 400px;
}
</style>