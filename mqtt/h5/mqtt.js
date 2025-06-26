import mqtt from 'mqtt/dist/mqtt'
import { v4 } from 'uuid'
import { setCookie,getCookie,setCookieWeek } from '../../utils/cookie.js'

function getCleintId(){
    const key="mqtt-client"
    var clientId=getCookie(key)
    if(clientId==undefined || clientId==null || clientId==""){
        clientId="client_"+v4();
        setCookieWeek(key,clientId)
    }
    return clientId;
}

class MqttClient {
  constructor(options) {
    // 默认配置
    const defaultOptions = {
      host: '120.46.54.180',
      port: 8083, 
      endpoint: '/mqtt',
      clientId: getCleintId(),
      username: 'zechuan',
      password: 'pu200207',
      clean: true,
      keepalive: 20,
      connectTimeout: 30 * 1000, // 30秒
      reconnectPeriod: 5000, // 5秒
    }

    // 合并配置
    this.options = { 
        ...defaultOptions,
        ...(options || {}),
        keepalive: Number(options?.keepalive) || defaultOptions.keepalive
    }
    // MQTT客户端实例
    this.client = null
    // 连接状态
    this.connected = false
    // 订阅列表
    this.subscriptions = {}
    
    // 消息回调映射
    this.messageCallbacks = new Map()

    // 心跳监控相关
    this.lastHeartbeat = null
    this.heartbeatTimer = null
  }

  // 创建连接
  connect() {
    return new Promise((resolve, reject) => {
      const { host, port, endpoint, ...options } = this.options
      const connectUrl = `ws://${host}:${port}${endpoint}`
      
      this.client = mqtt.connect(connectUrl, options)

      // 连接成功回调
      this.client.on('connect', () => {
        this.connected = true
        resolve('MQTT connected')
      })

      // 重连回调
      this.client.on('reconnect', () => {
        resolve('MQTT reconnecting...')
      })

      // 连接关闭回调
      this.client.on('close', () => {
        this.connected = false
        resolve('MQTT connection closed')
      })

      // 错误处理
      this.client.on('error', (error) => {
        console.error('MQTT error:', error)
        reject(error)
      })

      // 消息接收处理
      this.client.on('message', (topic, payload) => {
        const message = payload.toString()
        console.log(`Received message [${topic}]: ${message}`)
        const mqttMessage = {
          topic: topic,
          message: JSON.parse(message),
        }
        // 执行全局消息回调
        if (this.messageCallbacks.has(topic)) {
          this.messageCallbacks.get(topic)(mqttMessage)
        }
      })
    })
  }

  // 订阅主题
  subscribe(topic, callback) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject('Not connected to MQTT broker')
        return
      }

      this.client.subscribe(topic, (err) => {
        if (err) {
          reject(err)
        } else {
          this.messageCallbacks.set(topic, callback)
          resolve(`Subscribed to ${topic}`)
        }
      })
    })
  }

  // 取消订阅
  unsubscribe(topic) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        reject('Not connected to MQTT broker')
        return
      }

      this.client.unsubscribe(topic, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`Unsubscribed from ${topic}`)
          this.messageCallbacks.delete(topic)
          resolve()
        }
      })
    })
  }

  // 发布消息
  publish(topic, message) {
    return new Promise((resolve, reject) => {
      // if (!this.connected) {
      //   reject('Not connected to MQTT broker')
      //   return
      // }

      this.client.publish(topic, message, (err) => {
        if (err) {
          reject(err)
        } else {
          console.log(`Message published to ${topic}`)
          resolve(`Message published to ${topic}`)
        }
      })
    })
  }

  // 断开连接
  disconnect() {
    return new Promise((resolve) => {
      if (this.client) {
        this.client.end(() => {
          this.connected = false
          this.client = null
          this.messageCallbacks.clear()
          console.log('MQTT disconnected')
          resolve('MQTT disconnected')
        })
      }
    })
  }
}

export default MqttClient