<template>
  <view class="chat-container">
    <!-- 消息列表区域 -->
    <scroll-view 
      class="message-list" 
      scroll-y="true"
      :scroll-into-view="lastMessageId"
      scroll-with-animation
    >
      <view 
        v-for="(msg, index) in messages" 
        :key="msg.id"
        :id="'msg' + msg.id"
        class="message-item"
        :class="{'message-right': msg.sender === 'me', 'message-left': msg.sender === 'other'}"
      > 
        <view class="message-bubble">
          <!-- 对方名称 -->
          <text v-if="msg.sender === 'other'" class="sender-name">{{msg.clientType}}</text>
          <!-- 消息内容 -->
          <text class="message-content">{{ msg.content }}</text>
          <!-- 消息时间 -->
          <text class="message-time">{{ formatTime(msg.time) }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-area">
      <input 
        class="input-box" 
        v-model="inputMessage" 
        placeholder="输入消息..."
        confirm-type="send"
        @confirm="sendMessage"
      />
      <button 
        class="send-button" 
        :disabled="!inputMessage.trim()" 
        @click="sendMessage"
      >发送</button>
    </view>
  </view>
</template>

<script>
import storage from '../../utils/storage'
import { v4 } from 'uuid'
// #ifdef H5
import MqttClient from '../../mqtt/h5/mqtt'
// #endif

// #ifdef APP
import mqttv5 from '../../mqtt/app/mqtt'

// #endif

export default {
  data() {
    return {
      messages: [
        { id: 1, sender: 'other', content: '你好呀！', time: new Date(Date.now() - 60000) },
        { id: 2, sender: 'me', content: '嗨！最近怎么样？', time: new Date(Date.now() - 30000) },
        { id: 3, sender: 'other', content: '还不错，有个新项目想和你聊聊', time: new Date() }
      ],
      inputMessage: '',
      messageId: 4,
	  mqttclient:null,
	  clientId:''
    }
  },
  computed: {
    lastMessageId() {
      if (this.messages.length === 0) return ''
      return 'msg' + this.messages[this.messages.length - 1].id
    }
  },
  methods: {
	getClientId(){
	      const key="talk-client"
	      var clientId=storage.get(key)
	      if(clientId==undefined || clientId==null || clientId==""){
	          clientId="talk_user_"+v4();
	          storage.set(key,clientId)
			  console.log(clientId)
	      }
	      return clientId;
	  },
    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    },
    sendMessage() {
      const content = this.inputMessage.trim()
      if (!content) return
      const newMessage = {
        id: this.messageId++,
        sender: 'me',
        content: content,
        time: new Date()
      }
      
      this.messages.push(newMessage)
      this.inputMessage = ''
      const message={
		  clientId:this.clientId,
		  content:content
	  }
	  // #ifdef H5
		message.clientType="H5"
		this.mqttclient.publish('demo/msg',JSON.stringify(message));
		// #endif
		// #ifdef APP
		message.clientType="APP"
		this.mqttclient.publish('demo/msg',JSON.stringify(message),0,false,(state,result)=>{
			console.log(result)
		})
		// #endif
    },
	receiveMessage(payload){
		const message=payload.message;
		console.log(payload)
		if(message.clientId!=this.clientId){
			const newMessage = {
			  id: this.messageId++,
			  sender: 'other',
			  content: message.content,
			  time: new Date(),
			  clientType:message.clientType
			}
			this.messages.push(newMessage)
		}
		
	},
	async connectMqtt(){
		this.clientId=this.getClientId()
		// #ifdef H5
			console.log("ttet")
			this.mqttclient=new MqttClient();
			const connectResult=await this.mqttclient.connect();
			console.log(connectResult)
			this.mqttclient.subscribe('demo/msg',this.receiveMessage)
		// #endif
		// #ifdef APP
			this.mqttclient=mqttv5;
			this.mqttclient.connect({},(state,result)=>{
				console.log(result)
			});
			this.mqttclient.setMessageCallback();
			this.mqttclient.subscribe("demo/msg",0,(state,result)=>{
				console.log(result);
			},this.receiveMessage)
		// #endif
	},
  },
  created() {
	this.connectMqtt()
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.message-list {
  flex: 1;
  padding: 20rpx;
  overflow: auto;
  box-sizing: border-box;
}

.message-item {
  display: flex;
  margin-bottom: 30rpx;
  align-items: flex-start;
}

.message-right {
  flex-direction: row-reverse;
}

.message-left {
  flex-direction: row;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 10rpx;
  margin: 0 20rpx;
}

.message-bubble {
  max-width: 65%;
  position: relative;
  padding: 20rpx;
  border-radius: 10rpx;
  display: flex;
  flex-direction: column;
}

.message-left .message-bubble {
  background-color: #fff;
  margin-left: 10rpx;
}

.message-right .message-bubble {
  background-color: #95ec69;
  margin-right: 10rpx;
}

.sender-name {
  font-size: 24rpx;
  color: #888;
  margin-bottom: 10rpx;
}

.message-content {
  font-size: 32rpx;
  line-height: 1.5;
}

.message-time {
  font-size: 24rpx;
  color: #999;
  align-self: flex-end;
  margin-top: 10rpx;
}

.input-area {
  display: flex;
  padding: 20rpx;
  background-color: #fff;
  border-top: 1rpx solid #eee;
  align-items: center;
}

.input-box {
  flex: 1;
  height: 80rpx;
  background-color: #f9f9f9;
  border-radius: 40rpx;
  padding: 0 30rpx;
  margin-right: 20rpx;
}

.send-button {
  width: 150rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-radius: 40rpx;
  background-color: #07c160;
  color: white;
  font-size: 32rpx;
  padding: 0;
}

.send-button[disabled] {
  background-color: #cccccc;
}
</style>