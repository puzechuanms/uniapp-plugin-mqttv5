// mqttMixin.js
import mqttManager from './MqttManager.js';

export default {
	methods: {
    // 页面调用此方法订阅
    mqttSubscribe(topic,qos, callback) {
      mqttManager.subscribe(topic,qos, callback, this);
    }
  }
};