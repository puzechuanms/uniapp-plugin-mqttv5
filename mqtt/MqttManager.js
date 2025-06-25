import store from "../store";

// mqttManager.js
class MqttManager {
  constructor() {
    this.subscriptions = new Map(); // 存储结构：{ topic => Set<{page, callback}> }
  }

  // 订阅 topic
  subscribe(topic,qos, callback, page) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, new Set());
	  store.dispatch('setSubscribeObject',{topic:topic,qos:qos});
	  store.dispatch('updateSubscribe');
    }
    this.subscriptions.get(topic).add({ page, callback });
  }

  // 取消订阅
  unsubscribe(topic, callback, page) {
    if (this.subscriptions.has(topic)) {
      const subs = this.subscriptions.get(topic);
      subs.delete({ page, callback });
      if (subs.size === 0) {
        this.subscriptions.delete(topic);
      }
    }
  }

  // 分发消息
  dispatch(topic, message) {
    if (this.subscriptions.has(topic)) {
      const subs = this.subscriptions.get(topic);
      subs.forEach(sub => {
		  sub.callback(message);
      });
    }
  }
}

export default new MqttManager();